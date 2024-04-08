import React, { useState, useEffect } from 'react';
import { Alert, Button } from "@material-tailwind/react";
import ToDoList from '../components/TodoList';
import AddToDo from '../components/AddToDo';
import AvatarMenu from '../components/AvatarMenu';
import useVerified from '../hooks/useVerified';
import { pb } from '../lib/pocketbase';

const Dashboard = () => {
  const { isVerified, requestVerification } = useVerified();
  const [open, setOpen] = useState(true);
  const [keyData, setKeyData] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  const incrementKey = () => {
    setKeyData(keyData + 1);
  }

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await pb.authStore.model.email;
      setUserEmail(email);
    }

    getUserEmail();
  }, [])

  return (
    <>
      {isVerified ? (
        <>
          <ToDoList keyData={keyData} incrementKey={incrementKey} email={userEmail} />
          <AvatarMenu email={userEmail} />
          <AddToDo incrementKey={incrementKey} />
        </>
      ) : (
        <Alert
          variant="gradient"
          open={open}
          className='flex flex-col md:flex-row'
          action={
            <Button
              variant="text"
              color="white"
              size="sm"
              className="ms-auto text-left"
              onClick={requestVerification}
            >
              Send verification email
            </Button>
          }
        >
          Sorry your email doesn't appear to be verified yet. In order to use the system you have to verify your email.
        </Alert>
      )}
    </>
  );
}

export default Dashboard;