import { useEffect, useState } from 'react';
import "./Login.css";
import { useGoogleLogin } from '@react-oauth/google';
import PostForm from '../../../components/Form/PostForm/PostForm';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions';

const Login = () => {

    const google_login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const formData = {
                access_token : tokenResponse.access_token
            };
            fetch(
                "https://ataseng.com/api/auth/google_login.php",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
            .then(res => res.json())
            .then(res => console.log(res))
        }
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChangeHandler = e => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = e => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const inputs = [
        {
            name: "email",
            type: "email",
            label: "Eposta",
            isRequired: true,
            setFunction: emailChangeHandler
        },
        {
            name: "password",
            type: "password",
            label: "Parola",
            isRequired: true,
            setFunction: passwordChangeHandler
        }
    ];

    const [userVerified, setUserVerified] = useState(null);
    const [tooManyRequest, setTooManyRequest] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password, setUserVerified));
    }

    const resendVerificationMail = () => {

        const post_options = {
            method: "post",
            body: JSON.stringify({
                email
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch("https://ataseng.com/api/auth/resend_verification.php", post_options)
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                toast.info("E-posta Gönderildi!");
                setTooManyRequest(false);
            }
            if(res.error){
                toast.error("Çok fazla istek atıldı!");
                setTooManyRequest(true);
            }
        });
    };

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Giriş Yap</h2>
                <PostForm inputs = {inputs} url={"https://ataseng.com/api/auth/login.php"} jsonContent submitHandler={submitHandler}/>
                <p>
                    Hesabın mı yok? <Link to={"/kayit"}>Kayıt Ol</Link>
                </p>
                {
                    userVerified === false &&
                    <>
                        <p className='error-text'>E-Posta adresiniz doğrulanmamış! Giriş yapabilmek için E-posta adresinizi doğrulamanız gerekmektedir!</p>
                        <button className='login-verify-again-button' onClick={() => resendVerificationMail()}>Doğrulama E-Postası Gönder</button>
                        {
                            tooManyRequest && <p className='error-text too-many-request'>Bu işlemi bu kadar sık gerçekleştiremezsiniz! Lütfen bir süre bekleyip tekrar deneyiniz!</p>
                        }
                    </>
                }
            </div>
        </section>
    );
}

export default Login;