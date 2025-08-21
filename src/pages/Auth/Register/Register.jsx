import { Link } from "react-router-dom";
import PostForm from "../../../components/Form/PostForm/PostForm";
import { useState } from "react";
import "./Register.css";

const Register = () => {

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
        },
        {
            name: "student_no",
            type: "text",
            label: "Öğrenci No",
            isRequired: true
        },
        {
            name: "name",
            type: "text",
            label: "Ad",
            isRequired: true
        },
        {
            name: "surname",
            type: "text",
            label: "Soyad",
            isRequired: true
        },
        {
            name: "grade",
            type: "select",
            label: "Sınıf",
            isRequired: true,
            options: [
                {
                    value: "1",
                    text: "1"
                },
                {
                    value: "2",
                    text: "2"
                },
                {
                    value: "3",
                    text: "3"
                },
                {
                    value: "4",
                    text: "4"
                },
                {
                    value: "4+",
                    text: "4+"
                }
            ]
        },
        {
            name: "department",
            type: "text",
            label: "Bölüm",
            isRequired: true
        }
    ];

    const [completed, setCompleted] = useState(false);

    const resendVerificationMail = () => {
        
    };

    return (
        <section className='post-section'>
            <div className="section-content post-content" style={{ gap: 16 }}>
                {
                    completed ?
                    <div className="form-completed-div">
                        <h3 className="form-completed-h3">Kayıt Başarılı!</h3>
                        <p className="form-completed">Doğrulama E-Postası Gönderildi!</p>
                        <p className="form-completed">Lütfen e-posta adresinizi kontrol ediniz!</p>
                        <button onClick={() => resendVerificationMail()}>Tekrar Gönder</button>
                    </div>
                    :
                    <>
                        <h2>Kayıt Ol</h2>
                        <PostForm inputs={inputs} url={"https://ataseng.com/api/auth/register.php"} jsonContent setCompleted={setCompleted} />
                        <p>
                            Zaten Kayıtlı Mısın? <Link to={"/giris"}>Giriş Yap</Link>
                        </p>
                    </>
                }

            </div>
        </section>
    )
}

export default Register