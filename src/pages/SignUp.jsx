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

    const navigate = useNavigate();

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

    const handleSignUp = async (e) => {

        e.preventDefault();

        if (!userData.email) {
            setErrorMsg({
                ...errorMsg,
                email: "Cannot be blank.",
            })
        } else {
            try {
                const res = await fetch(`${url}/api/collections/users/records`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const json = await res.json();

                console.log(res);

                if (res.status == 200) {
                    toast.success('Signed Up Correctly. Sign In now.');
                } else {
                    toast.error(`${json.message} - Please check the errors and try again.`)
                    setErrorMsg({
                        username: json.data.username?.message,
                        email: json.data.email?.message,
                        password: json.data.password?.message,
                        passwordConfirm: json.data.passwordConfirm?.message
                    })
                }

            } catch (err) {
                toast.error(`${json.message} - Please check the errors and try again.`)

            }
        }

    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000
                }}
            />
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
                            <div>
                            <Typography
                                        variant="small"
                                        color="gray"
                                        className="my-1 flex items-center gap-1 font-normal"
                                    >
                                        Optional: leave it empty to auto-generate.
                                </Typography>
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
                                        className="my-1 flex items-center gap-1 font-normal"
                                    >
                                        {errorMsg.username}
                                    </Typography>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Email *"
                                    type="email"
                                    name='email'
                                    onChange={handleInputChange}
                                    size="lg" />
                                {errorMsg.email && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="my-1 flex items-center gap-1 font-normal"
                                    >
                                        {errorMsg.email}
                                    </Typography>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Password *"
                                    type="password"
                                    name='password'
                                    onChange={handleInputChange}
                                    size="lg" />
                                {errorMsg.password && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="my-1 flex items-center gap-1 font-normal"
                                    >
                                        {errorMsg.password}
                                    </Typography>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Confirm password *"
                                    type="password"
                                    name='passwordConfirm'
                                    onChange={handleInputChange}
                                    size="lg" />
                                {errorMsg.passwordConfirm && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="my-1 flex items-center gap-1 font-normal"
                                    >
                                        {errorMsg.passwordConfirm}
                                    </Typography>
                                )}
                            </div>

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