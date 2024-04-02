import React, { useEffect, useState } from 'react';
import ToDoList from '../components/TodoList';
import AddToDo from '../components/AddToDo';
import AvatarMenu from '../components/AvatarMenu';
import { client } from '../lib/pocketbase';

const Dashboard = () => {

  const [keyData, setKeyData] = useState(0)
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  const incrementKey = () => {
    setKeyData(keyData + 1);
  }

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await client.authStore.model.email;
      setCurrentUserEmail(email);
    }

    getUserEmail();
  }, [])

  return (
    <>
        <ToDoList keyData={keyData} incrementKey={incrementKey}/>
        <AvatarMenu email={currentUserEmail}/>
        <AddToDo incrementKey={incrementKey}/>
    </>
  )
}

export default Dashboard;