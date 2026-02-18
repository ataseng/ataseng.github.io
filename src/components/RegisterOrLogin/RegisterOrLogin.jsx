import { Navigate, useNavigate } from "react-router-dom";
import "./RegisterOrLogin.css";

const RegisterOrLogin = () => {

    const navigate = useNavigate();

    return (
        <div className="register_or_login">
            <h3>Yönetim Ekibine Başvurmak İçin Üye Olmalısınız!</h3>

            <div className="button_area">
                <button onClick={() => navigate("/giris")}>Giriş Yap</button>
                <p>veya</p>
                <button onClick={() => navigate("/kayit")}>Kayıt Ol</button>
            </div>
        </div>
    )
}

export default RegisterOrLogin