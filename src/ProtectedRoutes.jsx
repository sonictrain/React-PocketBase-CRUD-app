import { Outlet } from "react-router-dom"
import { client } from "./lib/pocketbase"
import SignIn from "./pages/SignIn"

const useAuth = () => {
    const user = client.authStore.isValid;
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