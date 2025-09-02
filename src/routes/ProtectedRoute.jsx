import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { api } from '../api';

const ProtectedRoute = ({ redirectTo = "/giris" }) => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    const [user, setUser] = useState({});

    const getUser = async () => {
        const result = await api.get_with_auth(
            `https://ataseng.com/api/member/get.php?id=${userInfo.user.id}`,
            userInfo.access_token
        );

        if(result.status === 200){
            const response = await result.json();
            setUser(response.content);
        }
    }

    useEffect(() => {
        if(userInfo && userInfo?.access_token?.length > 0){
            getUser();
        }
    }, [userInfo]);

    if(loading){
        return (
            <div className="p-6 text-center">
                <span className="animate-pulse">Yükleniyor…</span>
            </div>
        );
    }

    return <Outlet context={user}/>
}

export default ProtectedRoute