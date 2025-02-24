import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { INewPost, INewUser } from "@/types/index.ts";
import { ID } from 'appwrite'
import { Query } from 'appwrite'
import { ImageGravity } from "appwrite";

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

    if(!newAccount) throw new Error("Failed to create account");

    // create avatar
    const avatarUrl = new URL(avatars.getInitials(user.name));

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    })

    return newUser;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const saveUserToDB = async (user : {
  accountId: string,
  name: string,
  email: string,
  username?: string,
  imageUrl: URL
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )
    return newUser;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const signInAccount = async (user: {
  email: string,
  password: string
}) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    )
    return session; 
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw new Error("No account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw new Error("No user found");

    return currentUser.documents[0];
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSessions();
    return session;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const createPost = async (post: INewPost) => {
  try {
    // upload image to storage
    const uploadedFile = await uploadFile(post.file[0]);
    console.log(uploadedFile, "uploaded file");

    if(!uploadedFile) throw new Error("Failed to upload file");

    //Get file Url for preview
    const fileUrl = getFilePreview(uploadedFile.$id);
    if(!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw new Error("Failed to get file Url");
    }

    // Convert tags into an array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // save post to database
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags
      }
    )

    if(!newPost){
      await deleteFile(uploadedFile.$id);
      throw new Error("Failed to create post");
    }

    return newPost;
    
  } catch (error) {
    console.log(error);
  }

}

export const uploadFile = async (file: File): Promise<{ $id: string }> => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
    
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload file");
  }
}

export const getFilePreview = (fileId: string ) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100,
    );
    return fileUrl;
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile =async (fileId: string) => {
  try {
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )

    return {
      status: "ok"
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw new Error("No posts found");

    return posts;
    
  } catch (error) {
    console.log(error);
  }
}

