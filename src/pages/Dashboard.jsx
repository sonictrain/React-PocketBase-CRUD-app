import React, { useState } from 'react';
import ToDoList from '../components/TodoList';
import AddToDo from '../components/AddToDo';

const Dashboard = () => {

  const [keyData, setKeyData] = useState(0)

  const incrementKey = () => {
    setKeyData(keyData + 1);
  }

  return (
    <>
        <ToDoList keyData={keyData} incrementKey={incrementKey}/>
        <AddToDo incrementKey={incrementKey}/>
    </>
  )
}

export default Dashboard;