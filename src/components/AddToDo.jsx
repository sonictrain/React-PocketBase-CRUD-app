import { React, useState } from 'react';
import {
    IconButton,
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea
} from "@material-tailwind/react";

const AddToDo = () => {

    const [newTaskData, setNewTaskData] = useState({
        title: null,
        descriotion: null,
    });
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTaskData({
            ...newTaskData,
            [name]: value
        })
    }

    const handleOpen = () => {
        setOpen((open) => !open);
    };

    return (
        <div className="fixed bottom-0 right-0">

            <IconButton
                onClick={handleOpen}
                size="lg"
                className="m-8 md:m-12 lg:m-20 rounded-full">
                <i className="fa-solid fa-plus" />
            </IconButton>

            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">

                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Add a new Task
                        </Typography>
                        <Input
                            label="Title"
                            size="lg"
                            onChange={handleInputChange}
                            required />
                        <Textarea
                            label="Description"
                            size="lg"
                            onChange={handleInputChange}
                            required />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Save task
                        </Button>
                    </CardFooter>
                </Card>

            </Dialog>

        </div>
    )
};

export default AddToDo;