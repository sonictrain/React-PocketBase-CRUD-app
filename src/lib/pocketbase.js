import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL;
export const client = new PocketBase(url);
export const isUserValid = client.authStore.isValid;

client.autoCancellation(false);

export const getTasks = async () => {
    return await client.collection("tasks").getFullList();
};

export const createTask = async (t, d) => {
    const data = {
        title: t,
        description: d,
        field: client.authStore.model.id
    };
    await client.collection("tasks").create(data);
};

export const deleteTask = async (id, confirm) => {
    if (confirm) {
        await client.collection("tasks").delete(id);
    };
};

export const updateTask = async (id, title, description) => {
    const data = {
        title: title,
        description: description,
        field: client.authStore.model.id
    };
    await client.collection("tasks").update(id, data);
};

export const toggleTask = async (id, isCompleted) => {
    const data = {
        isCompleted: isCompleted,
        field: client.authStore.model.id
    };
    await client.collection("tasks").update(id, data);
};

export const signIn = async (username, pwd) => {
    await client.collection("users").authWithPassword(username, pwd);
};

export const signOut = () => {
    client.authStore.clear;
};

export const signUp = async (data) => {
    await client.collection("users").create(data);
};