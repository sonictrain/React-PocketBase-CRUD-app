import { React, useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../lib/pocketbase';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Chip
} from "@material-tailwind/react";

const ToDoList = ({ keyData }) => {

    const [tasks, setTasks] = useState([])
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        getTasks().then(res => setTasks(res));
    }, [keyData])

    return (
        <div>
            <Typography variant="h3" className='text-2xl'>Task List</Typography>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {
                    tasks.map((t) => (
                        <Card key={t.id} className="mt-2 items-start">
                            <Chip value={t.id} variant="ghost" size="sm" className="rounded-full mt-5 ms-5" />
                            <CardBody className="items-start pt-4">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {t.title}
                                </Typography>
                                <Typography>
                                    {t.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="flex flex-row gap-1 pt-0 w-full">
                                <Button color='green' className='grow'> <i className="fa-solid fa-check" /> Mark as completed</Button>
                                <IconButton color="blue" className='grow-0'>
                                    <i className="fas fa-edit" />
                                </IconButton>
                                <IconButton
                                    color="red"
                                    className='grow-0'
                                    onClick={handleOpen}>
                                    <i className="fa-solid fa-trash" />
                                </IconButton>

                                <Dialog open={open} handler={handleOpen}>
                                    <DialogHeader>Are you sure you want to delete this task?</DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={() => {deleteTask(t.id, true); handleOpen}}>
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