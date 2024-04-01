import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import { client, url } from '../lib/pocketbase';

const SignIn = () => {

    const [userData, setUserData] = useState({
        identity: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState({
        identity: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        setErrorMsg({
            ...errorMsg,
            [name]: ''
        });
    };

    const handleSignIn = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const res = await client.collection("users").authWithPassword(userData.identity, userData.password);
            if (res.token) {
                setLoading(false);
                navigate('/dashboard');
            };
        } catch (err) {
            setLoading(false);
            toast.error(`${err.message}`) 
        };
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000
                }}
            />
            {client.authStore.isValid && (<Navigate to="/dashboard" replace={true} />)}
            <div className="w-full">
                <Card className="w-96 mx-auto">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSignIn}>
                        <CardBody className="flex flex-col gap-4">

                            <Input
                                label="Email or username"
                                type="text"
                                name='identity'
                                onChange={handleInputChange}
                                size="lg" />

                            <Input
                                label="Password"
                                type="password"
                                name='password'
                                onChange={handleInputChange}
                                size="lg" />

                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                type='submit'
                                loading={loading}
                                className='justify-center'
                                fullWidth>
                                Sign In
                            </Button>
                            <div className='flex gap-1 justify-center items-center mt-4'>
                                <Typography variant="paragraph">
                                    Don't have an account?
                                </Typography>
                                <Link to='/signup'>Sign up</Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default SignIn;