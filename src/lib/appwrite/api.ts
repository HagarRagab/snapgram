import { INewPost, INewUser } from "@/types";
import {
    account,
    appwriteConfig,
    avatars,
    databases,
    storage,
} from "./appwrite";
import { ID, ImageGravity, Query } from "appwrite";

//* Steps to sign up
// 1. create new account  2. save new account in database 3. logging in > creating session

export async function createNewAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl: URL = new URL(avatars.getInitials(newAccount.name));

        const savedUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username,
        });

        return savedUser;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.userCollectionId, // collectionId
            ID.unique(), // documentId
            user // data
        );

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailPasswordSession(
            user.email,
            user.password
        );

        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function signout() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const loggedInAccout = await account.get();
        if (!loggedInAccout) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", loggedInAccout.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createPost(post: INewPost) {
    try {
        // 1. Store file (image) in backend(appwirte) storage
        const createdFileRes = await storage.createFile(
            appwriteConfig.storageId, // bucketId
            ID.unique(), // fileId
            post.file[0] // file
        );
        if (!createdFileRes) throw Error;

        // 2. Get file (image) url in the appwrite storage
        const createdFileUrl = storage.getFilePreview(
            appwriteConfig.storageId, // bucketId
            createdFileRes.$id, // fileId
            2000, // width (optional)
            2000, // height (optional)
            ImageGravity.Top, // gravity (optional)
            100 // quality (optional)
        );
        if (!createdFileUrl) {
            await deleteFile(createdFileRes.$id);
            throw Error;
        }

        // 3. Create document in database with post collection attributes that we defined in appwrite
        // post collection attributes: creator, caption, tags, \likes\, imageUrl, imageId, location, \save\
        // Convert tags to array
        const postTags = post?.tags?.replace(/\s/g, "").split(",");
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            ID.unique(), // documentId
            {
                creator: post.userId,
                caption: post.caption,
                tags: postTags,
                imageUrl: createdFileUrl,
                imageId: createdFileRes.$id,
                location: post.location,
            } // data
        );
        if (!newPost) {
            await deleteFile(createdFileRes.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId, // bucketId
            fileId // fileId
        );

        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
}
