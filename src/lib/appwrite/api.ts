import { account } from "./config";
import { INewUser } from "@/types/index.ts";
import { ID } from 'appwrite'

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}