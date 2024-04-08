import { React, useEffect, useState } from 'react';
import { deleteTask, getTasks, toggleTask } from '../lib/pocketbase';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
    Chip,
    Checkbox
} from "@material-tailwind/react";
import EditToDo from './EditToDo';

const ToDoList = ({ keyData, incrementKey, email }) => {

    const [tasks, setTasks] = useState([])
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleToggleTask = async (id, isCompleted) => {
        await toggleTask(id, !isCompleted);
        incrementKey();
    };

    const handleDeleteTask = async (id, confirm) => {
        await deleteTask(id, confirm);
        handleOpen();
        incrementKey();
    }

    useEffect(() => {

        const handleGetTasks = async () => {

            await getTasks().then(res => {
                setTasks(res)
            });
        };

        handleGetTasks();

    }, [keyData])

    return (
        <div>
            <Typography variant="h3" className='text-2xl'>Welcome {email}, here is your task list</Typography>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                {
                    tasks.map((t) => (
                        <Card key={t.id} className={`mt-2 flex flex-col items-start ${t.isCompleted ? 'bg-gray-300 line-through' : 'bg-white'}`}>
                            <Chip value={t.id} variant="ghost" size="sm" className="rounded-full mt-5 ms-5" />
                            <CardBody className="pt-4 h-full">
                                <div className='flex items-center'>
                                    <Checkbox
                                        defaultChecked={t.isCompleted}
                                        onClick={() => handleToggleTask(t.id, t.isCompleted)}
                                        ripple={true}
                                        className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                    />
                                    <Typography variant="h5" color="blue-gray" className="">
                                        {t.title}
                                    </Typography>
                                </div>
                                <Typography className='mx-3'>
                                    {t.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="flex flex-row gap-1 pt-0 w-full">

                                <EditToDo
                                    id={t.id}
                                    title={t.title}
                                    description={t.description}
                                    isCompleted={t.isCompleted}
                                    incrementKey={incrementKey}
                                />

                                <Button
                                    color="red"
                                    className={`h-10 ${t.isCompleted ? 'w-full' : 'basis-1/2'}`}
                                    onClick={handleOpen}>
                                    Delete
                                </Button>

                                <Dialog open={open} handler={handleOpen}>
                                    <DialogHeader>Are you sure you want to delete this task?</DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={() => handleDeleteTask(t.id, false)}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={() => handleDeleteTask(t.id, true)}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>

                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
};

export default ToDoList;