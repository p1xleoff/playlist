import { ID, Account, Client, Databases, Query } from "appwrite";


const APPWRITE_ID = 'playl1st';
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const DATABASE_ID = 'playl1st.db';
const LISTS_ID = 'playl1st.lists';
const ITEMS_ID = 'playl1st.items';

type CreateUserAccount = {
    email: string;
    name: string;
    password: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

export type User = {
    email: string;
    name: string;
    registration: string;
}

type Preferences = {
    //TODO: app user prefs(themes etc)
}

const client = new Client();
client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_ID);

const account = new Account(client);
const databases = new Databases(client);


export const createUser = async ({ name, email, password }: CreateUserAccount) => {
    try {
        const user = await account.create(ID.unique(), email, password, name);
        if (user) {
            //create user session after account creation
            return await account.createEmailPasswordSession(email, password);

            //create default lists
            await createDefaultLists(user.$id);
        }
        return user;
    } catch (error) {
        console.log('appwrite :: createUser()' + error);
    }
};

export const loginUser = async ({ email, password }: LoginUserAccount) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log('appwrite :: loginUser()', error);
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.log('appwrite :: getCurrentUser()', error)
    }
};

export const logOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.log('appwrite :: logOut()', error);
    }
};

//function to create default lists
const createDefaultLists = async (userId: string) => {
    const defaultLists = ['Playlist', 'Wishlist', 'Completed'];
    const promises = defaultLists.map(listName =>
        databases.createDocument(DATABASE_ID, LISTS_ID, ID.unique(), {
            userId,
            name: listName,
        })
    );
    try {
        await Promise.all(promises);
    } catch (error) {
        console.error('Error creating default lists', error)
    }
};

//fucntion to get all lists for a user
export const getUserLists = async (userId: string) => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, LISTS_ID, [
            Query.equal('userId', userId),
        ]);
        return response.documents;
    } catch (error) {
        console.error('Error fetching lists', error);
    }
}