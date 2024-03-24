import { IconButton } from "@material-tailwind/react";

const AddToDo = () => {

    return (
        <div className="fixed bottom-0 right-0">
            <IconButton
                size="lg"
                className="m-8 md:m-12 lg:m-20 rounded-full">
                <i className="fa-solid fa-plus" />
            </IconButton>
        </div>
    )
};

export default AddToDo;