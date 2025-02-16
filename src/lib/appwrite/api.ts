import { account, appwriteConfig, avatars, databases } from "./config";
import { INewUser } from "@/types/index.ts";
import { ID } from 'appwrite'

export const createUserAccount = async (user: INewUser) => {
  try {
    console.log("Creating user with:", user);
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    // console.log(newAccount, "new account");

    if(!newAccount) throw new Error("Account not created");

    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const saveUserToDB = async (user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: URL,
  username?: string

}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}