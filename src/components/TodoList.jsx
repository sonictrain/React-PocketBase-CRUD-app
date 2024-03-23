import { useEffect, useState } from 'react';
import { client } from '../lib/pocketbase';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip
} from "@material-tailwind/react";

const ToDoList = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        client
            .collection("tasks")
            .getFullList()
            .then(res => setTasks(res));
    }, [])

    return (
        <>
            <Typography variant="h3">Task List</Typography>
            {
                tasks.map((t) => (
                    <Card key={t.id} className="mt-6 w-96 items-start">
                        <Chip value={t.id} variant="ghost" size="sm" className="rounded-full mt-5 ms-5" />
                        <CardBody className="items-start pt-4">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {t.title}
                            </Typography>
                            <Typography>
                                {t.description}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 w-full">
                            <Button fullWidth disabled={t.isCompleted}>Mark as completed</Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </>
    )
};

export default ToDoList;