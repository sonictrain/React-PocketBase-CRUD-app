import PocketBase from 'pocketbase';

export const url = import.meta.env.VITE_POCKETBASE_URL;
export const pb = new PocketBase(url);
export const isUserValid = pb.authStore.isValid;

pb.autoCancellation(false);

export const getTasks = async () => {
    return await pb.collection("tasks").getFullList();
};

export const createTask = async (t, d) => {
    const data = {
        title: t,
        description: d,
        field: pb.authStore.model.id
    };
    await pb.collection("tasks").create(data);
};

export const deleteTask = async (id, confirm) => {
    if (confirm) {
        await pb.collection("tasks").delete(id);
    };
};

export const updateTask = async (id, title, description) => {
    const data = {
        title: title,
        description: description,
        field: pb.authStore.model.id
    };
    await pb.collection("tasks").update(id, data);
};

export const toggleTask = async (id, isCompleted) => {
    const data = {
        isCompleted: isCompleted,
        field: pb.authStore.model.id
    };
    await pb.collection("tasks").update(id, data);
};

export const signOut = () => {
    pb.authStore.clear();
};