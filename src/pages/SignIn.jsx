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
import { client, signIn } from '../lib/pocketbase';

const SignIn = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenAlert(false);
        const { email, password } = userData;

        if (email.length > 0 && password.length > 0) {
            try {
                await signIn(email, password);
                const isLoggedIn = client.authStore.isValid;
                if (isLoggedIn) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.log(error.status)
                setAlertMsg(`Error ${error.status} - ${error.message}`);
                setOpenAlert(true);
            }
        } else {
            setAlertMsg('Please fillout the form properly');
            setOpenAlert(true);
        }
    };

    return (
        <>
        { client.authStore.isValid && (<Navigate to="/dashboard" replace={true} />)}
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
                <form onSubmit={handleSubmit}>
                    <CardBody className="flex flex-col gap-4">

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

                        {openAlert && (
                            <Alert
                                className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e]"
                            >
                                {alertMsg}
                            </Alert>
                        )}

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            type='submit'
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