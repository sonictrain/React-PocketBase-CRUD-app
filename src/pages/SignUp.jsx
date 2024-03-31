import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    Alert,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import { url } from '../lib/pocketbase';

const SignUp = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [errorMsg, setErrorMsg] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [globalErr, setGlobalErr] = useState(null);
    const [showGlobalErr, setShowGlobalErr] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        setErrorMsg({
            ...userData,
            [name]: ''
        })
    };

    const notify = (message) => toast(message);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${url}/api/collections/users/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const json = await res.json();

            console.log(res.json);

            setErrorMsg({
                username: json.data.username?.message,
                email: json.data.email?.message,
                password: json.data.password?.message,
                passwordConfirm: json.data.passwordConfirm?.message
            })

            setErrorMsg(
                setUserData(
                    {
                        username: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }
                )
            );

        } catch (err) {
            notify(`${err.code} - ${err.message}`);
        }
    }

    return (
        <>
            <div className="w-full">
                <Card className="w-96 mx-auto">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign Up
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSignUp}>
                        <CardBody className="flex flex-col gap-4">

                            <Input
                                label="Username"
                                type="text"
                                name='username'
                                onChange={handleInputChange}
                                size="lg" />
                            {errorMsg.username && (
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal"
                                >
                                    {errorMsg.username}
                                </Typography>
                            )}

                            <Input
                                label="Email"
                                type="email"
                                name='email'
                                onChange={handleInputChange}
                                size="lg" />


                            <Input
                                label="Password"
                                type="password"
                                name='password'
                                onChange={handleInputChange}
                                size="lg" />


                            <Input
                                label="Confirm password"
                                type="password"
                                name='passwordConfirm'
                                onChange={handleInputChange}
                                size="lg" />


                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                type='submit'
                                fullWidth>
                                Sign Up
                            </Button>
                            <div className='flex gap-1 justify-center items-center mt-4'>
                                <Typography variant="paragraph">
                                    Already have an account?
                                </Typography>
                                <Link to='/'>Sign in</Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default SignUp;