import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Typography,
  ButtonGroup,
  Button
} from "@material-tailwind/react";
import { useEffect } from 'react';
import { client } from './lib/pocketbase';

const App = () => {

  useEffect(() => {
    client
    .collection("tasks")
    .getFullList()
    .then(res => console.log(res));
  }, [])

  return (
    <div className="flex flex-row justify-between p-20">
      <Typography variant="h1">Task App</Typography>
      <ButtonGroup>
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </ButtonGroup>
    </div>
    )
}

export default App;