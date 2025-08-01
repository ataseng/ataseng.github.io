import { useEffect } from 'react';
import { useLocation } from 'react-router';
import "./Login.css";

const Login = () => {

    const handleSubmit = e => {
        e.preventDefault();
        const targetElements = e.target.elements;
        const studentNo = targetElements.studentNo.value;
        const password = targetElements.password.value;

        const formData = {
            studentNo,
            password
        }

        fetch(
            "https://ataseng.com/api/registration_post.php",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    const location = useLocation();

    const scrollToElement = id => {
        const element = document.querySelector(id);
        if (element !== null) {
            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }

    useEffect(() => {
        if (location.hash !== "") {
            scrollToElement(location.hash);
        }
    }, [location]);


    return (
        <div id='login'>
            <div className="login-content">
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='login-form-input-div'>
                        <label htmlFor="studentNo">Öğrenci No: </label>
                        <input required type="text" id='studentNo' name='studentNo' minLength={9} maxLength={9} />
                    </div>
                    <div className='login-form-input-div'>
                        <label htmlFor="password">Parola: </label>
                        <input required type="password" id='password' name='password' />
                    </div>
                    <button type='submit'>Gönder</button>
                </form>
            </div>
        </div>

    );
}

export default Login