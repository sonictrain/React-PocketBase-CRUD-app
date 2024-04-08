import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

const useValid = () => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        function checkValid() {
            const userStatus = pb.authStore.isValid;
            console.log(userStatus);
            setIsValid(userStatus);
        }
        checkValid();
    }, [])

    return { isValid };
}

export default useValid;