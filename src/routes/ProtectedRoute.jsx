import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ redirectTo = "/giris" }) => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    if(loading){
        return (
            <div className="p-6 text-center">
                <span className="animate-pulse">Yükleniyor…</span>
            </div>
        );
    }

    return userInfo ? <Outlet /> : <Navigate to={redirectTo} replace/>
}

export default ProtectedRoute