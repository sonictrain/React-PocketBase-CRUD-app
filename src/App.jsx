import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Typography,
  ButtonGroup,
  Button
} from "@material-tailwind/react";
import ToDoList from './components/TodoList';
import AddToDo from './components/AddToDo';

const App = () => {

  return (
    <div className='p-20'>
      <div className="flex flex-row justify-between mb-20">
        <Typography variant="h1">Task CRUD App</Typography>
        <ButtonGroup>
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </ButtonGroup>
      </div>
      <ToDoList />
      <AddToDo />
    </div>
  )
}

export default App;