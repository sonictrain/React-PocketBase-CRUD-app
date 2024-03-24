import PocketBase from 'pocketbase';

const url = 'https://sonictrain-app-dark-surf-6793.fly.dev';
export const client = new PocketBase(url);

client.autoCancellation(false);

export const getTasks = async () => {
    return await client.collection("tasks").getFullList();
};