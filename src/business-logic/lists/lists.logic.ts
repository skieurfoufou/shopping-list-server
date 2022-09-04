import listsController from "../../data-layer/controllers/lists.controller";
import BadRequestError from "../../utils/errors/BadRequestError";
import NotFoundError from "../../utils/errors/NotFoundError";
import InternalServerError from "../../utils/errors/InternalServerError";
import { IList } from "../../data-layer/models/lists.model";
const { isValidObjectId } = require("mongoose");

const isListExistWithId = async (id: string) => {
  try {
    const listByIdRes = await getListById(id);
    if (listByIdRes) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const getListById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError(`id is not valid ObjectId`);
  }
  const res = await listsController.findById(id);
  if (!res) {
    throw new NotFoundError(`no list found with id ${id}!`);
  }
  return res;
};

export const createList = async (list: IList) => {
  try {
    const res = await listsController.create(list);
    if (!res) {
      console.error(res);
      throw new InternalServerError(`error creating list`);
    }

    return res;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getAllLists = async () => {
  let filter = {};

  const allLists = await listsController.read(filter);
  if (allLists.length === 0) {
    throw new NotFoundError("no list found!");
  }
  return allLists;
};

export const updateList = async (id: string, list: IList) => {
  //TODO: validate the data -- same as create list
  if (!list.title) {
    throw new BadRequestError(`missing data -- title`);
  }
  await listsController.update(id, list);
  return { success: true, _id: id };
};

export const deleteList = async (id: string) => {
  try {
    const res = await listsController.remove(id);
    return res;
  } catch (error) {
    throw new InternalServerError("Error deleting list");
  }
};
