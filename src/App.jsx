import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Typography,
  ButtonGroup,
  Button
} from "@material-tailwind/react";

const App = () => {
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