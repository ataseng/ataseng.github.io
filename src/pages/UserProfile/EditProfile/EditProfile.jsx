import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostForm from "../../../components/Form/PostForm/PostForm";
import { api } from "../../../api";

const EditProfile = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const [user, setUser] = useState(userInfo?.user ?? {});

    useEffect(() => {
        if(userInfo && userInfo !== null){
            setUser(userInfo.user);
        }
    }, [userInfo]);

    const changeUserHandler = e => {
        setUser(prevState => ({
            ...prevState, [e.target.name] : e.target.value
        }));
    }

    const submitHandler = e => {
        e.preventDefault();

        delete user.email;
        delete user.position;
        delete user.role;
        delete user.task;
        
        api.put_with_auth("https://ataseng.com/api/member/update.php", user, userInfo.access_token)
    }

    const inputs = [
        {
            setFunction: changeUserHandler,
            name: "image",
            type: "file",
            label: "Fotoğraf",
        },
        {
            setFunction: changeUserHandler,
            name: "email",
            type: "email",
            label: "Eposta",
            disabled: true,
            value: user?.email
        },
        {
            setFunction: changeUserHandler,
            name: "old_password",
            type: "password",
            label: "Eski Parola",
            // setFunction: passwordChangeHandler
        },
        {
            setFunction: changeUserHandler,
            name: "new_password",
            type: "password",
            label: "Yeni Parola",
            // setFunction: passwordChangeHandler
        },
        {
            setFunction: changeUserHandler,
            name: "student_no",
            type: "text",
            label: "Öğrenci No",
            value: user?.student_no
        },
        {
            setFunction: changeUserHandler,
            name: "name",
            type: "text",
            label: "Adı",
            value: user?.name
        },
        {
            setFunction: changeUserHandler,
            name: "surname",
            type: "text",
            label: "Soyadı",
            value: user?.surname
        },
        {
            setFunction: changeUserHandler,
            name: "grade",
            type: "select",
            label: "Sınıf",
            value: user?.grade,
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
            setFunction: changeUserHandler,
            name: "position",
            type: "text",
            label: "Kulüpteki Rolü",
            disabled: true,
            value: user?.position
        },
        {
            setFunction: changeUserHandler,
            name: "task",
            type: "text",
            label: "Görevi",
            disabled: true,
            value: user?.task ?? "Üye"
        },
        {
            setFunction: changeUserHandler,
            name: "department",
            type: "text",
            label: "Bölümü",
            value: user?.department
        },
        {
            setFunction: changeUserHandler,
            name: "birthdate",
            type: "date",
            label: "Doğum Tarihi",
            value: user?.birthdate === "0000-00-00" ? "" : user?.birthdate
        },
        {
            setFunction: changeUserHandler,
            name: "gender",
            type: "select",
            label: "Cinsiyeti",
            value: user?.gender,
            options: [
                {
                    value: "",
                    text: "---"
                },
                {
                    value: "female",
                    text: "Kadın"
                },
                {
                    value: "male",
                    text: "Erkek"
                }
            ]
        },
        {
            setFunction: changeUserHandler,
            name: "phone",
            type: "text",
            label: "Telefon Numarası",
            vale: user?.phone
        }
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Düzenle</h2>
                <PostForm inputs = {inputs} jsonContent submitHandler = {submitHandler}/>
            </div>
        </section>
    )
};

export default EditProfile;