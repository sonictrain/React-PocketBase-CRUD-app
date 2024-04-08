import { useEffect, useState } from "react";
import pb from '../lib/pocketbase';

const useVerified = () => {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        async function checkVerified() {
            const id = pb.authStore.model.id;

            const data = await pb.collection('users').getOne(id);
            setIsVerified(data.verfied);
        }

        if (pb.authStore.isValid) checkVerified();

    }, []);
    
    return { isVerified };
}