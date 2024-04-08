import { useEffect, useState } from "react";
import { pb } from '../lib/pocketbase';

const useVerified = () => {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        async function checkVerified() {
            const id = pb.authStore.model.id;

            const data = await pb.collection('users').getOne(id);
            setIsVerified(data.verified);
        }

        if (pb.authStore.isValid) {
            checkVerified();
        }

    }, []);

    async function requestVerification() {
        const email = pb.authStore.model.email;
        const res = await pb.collection('users').requestVerification(email);
        if (res) {
            console.log("Verification email sent!");
        }
    }
    
    return { isVerified, requestVerification };
}

export default useVerified;