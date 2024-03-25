import { React, useState } from 'react';
import { createTask } from '../lib/pocketbase';
import {
    IconButton,
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea,
    Alert
} from "@material-tailwind/react";

const AddToDo = ({ incrementKey }) => {

    const [newTaskData, setNewTaskData] = useState({
        title: '',
        description: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTaskData({
            ...newTaskData,
            [name]: value
        })

        const { title, description } = newTaskData;
        if (openAlert && title.length > 0 && description.length > 0) { setOpenAlert(false) };

    }

    const handleSubmit = (e) => {
        console.log('handleSubmit running')
        e.preventDefault();

        const { title, description } = newTaskData;

        if (title.length > 0 && description.length > 0) {

            createTask(title, description);
            setAlertMsg('The task has been saved succefully.');
            setOpenConfirm(true);
            setNewTaskData({
                title: '',
                description: '',
            });

            setTimeout(() => {
                setOpenConfirm(false);
                setOpenDialog(false);
                incrementKey();
            }, 3000);

        } else {
            setAlertMsg('Please fill out all the fields.');
            setOpenAlert(true);
        }
    }

    const handleOpen = () => {
        setOpenDialog((openDialog) => !openDialog);
    };

    return (
        <div className="fixed bottom-0 right-0">

            <IconButton
                onClick={handleOpen}
                size="lg"
                className="m-8 md:m-12 lg:m-20 rounded-full">
                <i className="fa-solid fa-plus" />
            </IconButton>

            <Dialog
                size="xs"
                open={openDialog}
                handler={handleOpen}
                dismiss={{
                    enabled: false,
                }}
                className="bg-transparent shadow-none">

                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Add a new Task
                            </Typography>
                            <Input
                                label="Title"
                                size="lg"
                                name='title'
                                value={newTaskData.title}
                                onChange={handleInputChange}
                                error={false}
                            />
                            <Textarea
                                label="Description"
                                size="lg"
                                name='description'
                                value={newTaskData.description}
                                onChange={handleInputChange}
                                error={false}
                            />
                            {openAlert && (
                                <Alert
                                    className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e]"
                                >
                                    { alertMsg }
                                </Alert>
                            )}
                            {openConfirm && (
                                <Alert
                                    className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                                >
                                    { alertMsg }
                                </Alert>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0 flex gap-2">
                            <Button variant="outlined" color="gray" className='basis-1/2' onClick={handleOpen}>
                                Cancel
                            </Button>
                            <Button
                                variant="gradient"
                                className='basis-1/2'
                                type='submit'
                                fullWidth>
                                Save task
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

            </Dialog>

        </div>
    )
};

export default AddToDo;