import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL;
export const client = new PocketBase(url);

client.autoCancellation(false);

export const getTasks = async () => {
    return await client.collection("tasks").getFullList();
};

export const createTask = async (t, d) => {
    const data = { title: t, description: d }
    await client.collection("tasks").create(data);
}

export const deleteTask = async (id, confirm) => {
    if (confirm) {
        await client.collection("tasks").delete(id);
    }
}