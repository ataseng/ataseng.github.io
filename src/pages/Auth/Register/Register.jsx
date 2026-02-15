import { Link } from "react-router-dom";
import PostForm from "../../../components/Form/PostForm/PostForm";
import { useEffect, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Register = () => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [confirmState, setConfirmState] = useState(false);

    useEffect(() => {
        if(password !== passwordConfirm)
            setConfirmState(false);
        else
            setConfirmState(true);
    }, [password, passwordConfirm]);

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = e => {
        setPasswordConfirm(e.target.value);
    };

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
            isRequired: true,
            autoComplete: "new-password",
            setFunction: handlePasswordChange
        },
        {
            name: "password_again",
            type: "password",
            label: "Parola (Tekrar)",
            isRequired: true,
            autoComplete: "new-password",
            setFunction: handlePasswordConfirmChange,
            confirmState
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
            label: "İsim",
            isRequired: true
        },
        {
            name: "surname",
            type: "text",
            label: "Soyisim",
            isRequired: true
        },
        {
            name: "grade",
            type: "select",
            label: "Sınıf",
            isRequired: true,
            options: [
                {
                    value: "",
                    text: "---"
                },
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
                },
                {
                    value: "Yüksek Lisans",
                    text: "Yüksek Lisans"
                },
                {
                    value: "Doktora",
                    text: "Doktora"
                }
            ]
        },
        {
            name: "department",
            type: "text",
            label: "Bölüm",
            isRequired: true
        },
        {
            name: "policy_confirm",
            type: "checkbox",
            label: "",
            isRequired: true
        }
    ];

    const [completed, setCompleted] = useState(false);
    const [email, setEmail] = useState("");

    const [tooManyRequest, setTooManyRequest] = useState(false);
    const [resendOk, setResendOk] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        formData.delete("password_again"); 
        

        const body = JSON.stringify(Object.fromEntries(formData));

        const post_options = {
            method: "post",
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch("https://ataseng.com/api/auth/register.php", post_options)
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                toast.info(res.message);
                // form.current.reset();
                setCompleted(true);
                setEmail(Object.fromEntries(formData).email);
                // if(url.includes("login.php"))
            }
            if(res.error){
                if(res.fields){
                    Object.values(res.fields).forEach(error => toast.error(error));
                }
                else{
                    toast.error(res.message);
                }
            }
        }).catch(error => {
            toast.error(error);
        });
        // dispatch(login(email, password, setUserVerified));
    };
    
    const resendVerificationMail = () => {
        setResendOk(false);
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
            setResendOk(true);
        });
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
                        <PostForm inputs={inputs} url={"https://ataseng.com/api/auth/register.php"} jsonContent submitButtonText={"Kayıt Ol"} submitHandler={submitHandler}/>
                        <p>
                            Zaten Kayıtlı Mısın? <Link to={"/giris"}>Giriş Yap</Link>
                        </p>
                    </>
                }
                {
                    resendOk && tooManyRequest ?
                    <p className='error-text too-many-request'>Bu işlemi bu kadar sık gerçekleştiremezsiniz! Lütfen bir süre bekleyip tekrar deneyiniz!</p>
                    :
                    resendOk && !tooManyRequest ?
                    <p>Doğrulama bağlantısı e-posta adresinize  tekrar gönderildi!</p> : ""
                }
            </div>
        </section>
    )
};

export default Register;