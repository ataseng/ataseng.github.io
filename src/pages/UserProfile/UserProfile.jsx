import { useSelector } from "react-redux";
import "./UserProfile.css";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";

const UserProfile = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const navigate = useNavigate();
    
    return (
        <section className='post-section user-profile-section'>
            <div className="section-content post-content">
                {
                    userInfo?.user?.image ? 
                    <img src={userInfo?.user?.image} alt="profile-image" className='profile-image' />
                    :
                    <Icon style={{fontSize: 80}} icon={"healthicons:ui-user-profile"} className="icon" />
                }
                <h3>{userInfo?.user?.name} {userInfo?.user?.surname}</h3>
                <button onClick={() => navigate("/profil/guncelle")}>Profili Düzenle</button>
                <button onClick={() => navigate("/profil/etkinlik-gecmisi")}>Etkinlik Geçmişim</button>
            </div>
        </section>
    )
}

export default UserProfile;