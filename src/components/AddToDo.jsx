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
    Progress,
    Alert
} from "@material-tailwind/react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

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
                                    icon={<Icon />}
                                    className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e]"
                                >
                                    { alertMsg }
                                </Alert>
                            )}
                            {openConfirm && (
                                <Alert
                                    icon={<Icon />}
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