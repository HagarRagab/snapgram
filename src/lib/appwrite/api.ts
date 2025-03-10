import { INewPost, INewUser, IUpdatePost } from "@/types";
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
        console.error(error);
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
        console.error(error);
        return error;
    }
}

export async function signout() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.error(error);
    }
}

export async function getCurrentUser() {
    try {
        // Will return data about user (email, phone, accountid, bio, ...)
        const loggedInAccout = await account.get();
        if (!loggedInAccout) throw Error;

        // Will return all user details in addition to documents related to that user (posts, saves, likes, email, bio, ...)
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", loggedInAccout.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createPost(post: INewPost) {
    try {
        // 1. Store file (image) in backend(appwirte) storage
        const createdFileRes = await createFile(post.file[0]);
        if (!createdFileRes) throw Error;

        // 2. Get file (image) url in the appwrite storage
        const createdFileUrl = getFilePreview(createdFileRes.$id);
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
        console.error(error);
    }
}

async function createFile(file: File) {
    try {
        const createdFile = await storage.createFile(
            appwriteConfig.storageId, // bucketId
            ID.unique(), // fileId
            file // file
        );

        return createdFile;
    } catch (error) {
        console.error(error);
    }
}

function getFilePreview(fileId: string) {
    const filePreview = storage.getFilePreview(
        appwriteConfig.storageId, // bucketId
        fileId, // fileId
        2000, // width (optional)
        2000, // height (optional)
        ImageGravity.Top, // gravity (optional)
        100 // quality (optional)
    );
    return filePreview;
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId, // bucketId
            fileId // fileId
        );

        return { status: "ok" };
    } catch (error) {
        console.error(error);
    }
}

export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            [Query.orderDesc("$createdAt"), Query.limit(20)]
        );

        if (!posts) throw Error;
        return posts;
    } catch (error) {
        console.error(error);
    }
}

// LIKE/UNLIKE post means updating the post (document)
export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            postId, // documentId
            { likes: likesArray } // data (optional)
        );

        if (!updatedPost) throw Error;
        return updatedPost;
    } catch (error) {
        console.error(error);
    }
}

//!
export async function savePost(postId: string, userId: string) {
    try {
        const savedPost = await databases.createDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.savesCollectionId, // collectionId
            ID.unique(), // documentId
            {
                user: userId,
                post: postId,
            } // data
        );

        if (!savePost) throw Error;
        return savedPost;
    } catch (error) {
        console.error(error);
    }
}

export async function unSavePost(savedRecordId: string) {
    try {
        const result = await databases.deleteDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.savesCollectionId, // collectionId
            savedRecordId // documentId
        );

        if (!result) throw Error;
        return { status: "ok" };
    } catch (error) {
        console.error(error);
    }
}

export async function getPostById(postId?: string) {
    try {
        if (!postId) throw Error;
        const post = await databases.getDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            postId // documentId
        );

        if (!post) throw Error;
        return post;
    } catch (error) {
        console.error(error);
    }
}

export async function updatePost(updatedPost: IUpdatePost) {
    // Checking if the user changed the image [changed => file array length will be more than 0 / NOT changed file array will be empty => BECAUSE we only add the Media File into the file array incase the user drag and drop file or uploaded image from computer ==> check FileUploader.tsx in onDrop function]
    const hasFileToUpload = updatedPost.file.length > 0;

    try {
        let image = {
            imageId: updatedPost.imageId,
            imageUrl: updatedPost.imageUrl,
        };

        if (hasFileToUpload) {
            // 1. Create file
            const createdFileRes = await createFile(updatedPost.file[0]);

            if (!createdFileRes) throw Error;
            // 2. Get file preview
            const filePreviewUrl = getFilePreview(createdFileRes.$id);

            if (!filePreviewUrl) {
                await deleteFile(createdFileRes.$id);
                throw Error;
            }

            image = {
                ...image,
                imageId: createdFileRes.$id,
                imageUrl: new URL(filePreviewUrl),
            };
        }

        const tags = updatedPost.tags?.replace(/\s/g, "").split(",");
        // 3. Update Document
        const result = await databases.updateDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            updatedPost.postId, // documentId
            {
                caption: updatedPost.caption,
                imageId: image.imageId,
                imageUrl: image.imageUrl,
                // file: updatedPost.file,
                location: updatedPost.location,
                tags,
            } // data (optional)
        );

        // 4. Check if updating file was failed
        if (!result) {
            if (hasFileToUpload) await deleteFile(image.imageId);
            throw Error;
        }

        // 5. Delete old file from storage
        await deleteFile(updatedPost.imageId);

        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;

    try {
        const status = await databases.deleteDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            postId // documentId
        );

        if (!status) throw Error;

        await deleteFile(imageId);

        return { status: "ok" };
    } catch (error) {
        console.error(error);
    }
}

export async function getInfinitePosts(pageParam?: number) {
    const queries: string[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

    if (pageParam) queries.push(Query.cursorAfter(pageParam.toString()));

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            queries // queries (optional)
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.error(error);
    }
}

export async function searchPosts(searchTerm: string) {
    try {
        if (!searchTerm) throw Error;

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.postCollectionId, // collectionId
            [Query.search("caption", searchTerm)] // queries (optional)
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.error(error);
    }
}
