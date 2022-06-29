import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";


export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const { state: { cart } } = useStore()

    if (!user) {
        return <Navigate to ='/signup' />
    }
    
    return children
}