import { useEffect, useState } from 'react';
import { getTasks } from '../lib/pocketbase';
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
        getTasks().then(res => setTasks(res));
    }, [])

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
                            <CardFooter className="pt-0 w-full">
                                <Button fullWidth disabled={t.isCompleted}>Mark as completed</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
};

export default ToDoList;