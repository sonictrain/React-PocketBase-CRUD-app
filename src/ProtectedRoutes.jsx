import { Outlet } from "react-router-dom"
import { pb } from "./lib/pocketbase"
import SignIn from "./pages/SignIn"

const useAuth = () => {
    const user = pb.authStore.isValid;
    if (user) {
        return true;
    } else {
        return false;
    }
}

const ProtectedRoutes = () => {
    const isLoggedIn = useAuth()
    return isLoggedIn ? <Outlet /> : <SignIn /> 
}

export default ProtectedRoutes;