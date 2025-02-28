import { INewUser } from "@/types";
import { account } from "./appwrite";
import { ID } from "appwrite";

async function createNewAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        return newAccount;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default createNewAccount;
