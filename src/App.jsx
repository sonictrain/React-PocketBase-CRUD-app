import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Typography,
  ButtonGroup,
  Button
} from "@material-tailwind/react";
import ToDoList from './components/TodoList';
import AddToDo from './components/AddToDo';

const App = () => {

  const [keyData, setKeyData] = useState(0)

  const incrementKey = () => {
    setKeyData(keyData + 1);
  }

  return (
    <div className='p-8 md:p-12 lg:p-20'>
      <div className="flex flex-row justify-between mb-20">
        <Typography variant="h1" className='text-4xl'>React PocketBase App</Typography>
        {/* <ButtonGroup>
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </ButtonGroup> */}
      </div>
      <ToDoList keyData={keyData} incrementKey={incrementKey}/>
      <AddToDo incrementKey={incrementKey}/>
    </div>
  )
}

export default App;