import { React, useState } from 'react';
import { updateTask } from '../lib/pocketbase';
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

const EditToDo = ({ id, title, description, incrementKey }) => {

    const [taskData, setTaskData] = useState({
        title: title,
        description: description,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const handleOpen = () => {
        setOpenDialog((openDialog) => !openDialog);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        })

        const { title, description } = taskData;
        if (openAlert && title.length > 0 && description.length > 0) { setOpenAlert(false) };

    }

    const handleSubmit = (e) => {
        console.log('handleSubmit running')
        e.preventDefault();

        const { title, description } = taskData;

        if (title.length > 0 && description.length > 0) {

            updateTask(id, title, description);
            setAlertMsg('Task updated succefully.');
            setOpenConfirm(true);

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

    return (
        <div>
            <IconButton
                color="blue"
                className='grow-0'
                onClick={handleOpen}>
                <i className="fas fa-edit" />
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
                                Edit Task
                            </Typography>
                            <Input
                                label="Title"
                                size="lg"
                                name='title'
                                value={taskData.title}
                                onChange={handleInputChange}
                                error={false}
                            />
                            <Textarea
                                label="Description"
                                size="lg"
                                name='description'
                                value={taskData.description}
                                onChange={handleInputChange}
                                error={false}
                            />
                            <Input
                                label="Id"
                                size="lg"
                                value={`ID: ${id.toUpperCase()}`}
                                disabled
                            />
                            {openAlert && (
                                <Alert
                                    className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e]"
                                >
                                    {alertMsg}
                                </Alert>
                            )}
                            {openConfirm && (
                                <Alert
                                    className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                                >
                                    {alertMsg}
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

export default EditToDo;