import React, { useState } from 'react';
import { Alert, Button } from "@material-tailwind/react";
import ToDoList from '../components/TodoList';
import AddToDo from '../components/AddToDo';
import AvatarMenu from '../components/AvatarMenu';

const Dashboard = () => {
  const isVerified = true;
  const [open, setOpen] = useState(true);
  const [keyData, setKeyData] = useState(0)

  const incrementKey = () => {
    setKeyData(keyData + 1);
  }

  return (
    (
      <>
        {isVerified ? (
          <Alert
            variant="gradient"
            open={open}
            action={
              <Button
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={() => setOpen(false)}
              >
                Send verification
              </Button>
            }
          >
            Sorry your email doesn't appear to be verified yet. In order to use the system you have to verify your email.
          </Alert>
        ) : (
          <>
            <ToDoList keyData={keyData} incrementKey={incrementKey} />
            <AvatarMenu email={currentUserEmail} />
            <AddToDo incrementKey={incrementKey} />
          </>
        )}
      </>
    )
  )
}

export default Dashboard;