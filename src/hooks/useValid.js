import { useEffect, useState } from "react";
import { client } from "../lib/pocketbase";

const useValid = () => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        function checkValid() {
            const userStatus = client.authStore.isValid;
            console.log(userStatus);
            setIsValid(userStatus);
        }
        checkValid();
    }, [])

    return { isValid };
}

export default useValid;