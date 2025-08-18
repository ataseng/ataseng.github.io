import { useEffect } from 'react';
import { useLocation } from 'react-router';
import "./Login.css";
import { useGoogleLogin } from '@react-oauth/google';
import PostForm from '../../../components/Form/PostForm/PostForm';
import { Link } from 'react-router-dom';

const Login = () => {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const formData = {
                access_token : tokenResponse.access_token
            };
            fetch(
                "https://ataseng.com/api/google_login.php",
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

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const targetElements = e.target.elements;
    //     const studentNo = targetElements.studentNo.value;
    //     const password = targetElements.password.value;

    //     const formData = {
    //         studentNo,
    //         password
    //     }

    //     fetch(
    //         "https://ataseng.com/api/registration_post.php",
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         }
    //     )
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         });
    // }

    const inputs = [
        {
            name: "email",
            type: "email",
            label: "Eposta",
            isRequired: true
        },
        {
            name: "password",
            type: "password",
            label: "Parola",
            isRequired: true
        }
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Giriş Yap</h2>
                <PostForm inputs = {inputs} url={"https://ataseng.com/api/auth/login.php"} jsonContent/>
                <p>
                    Hesabın mı yok? <Link to={"/kayit"}>Kayıt Ol</Link>
                </p>
            </div>
        </section>
    );
}

export default Login