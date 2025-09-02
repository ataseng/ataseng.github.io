import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../../../components/Form/PostForm/PostForm";
import { api } from "../../../api";
import { USER_LOGIN_SUCCESS } from "../../../redux/constants/userConstants";
import { useNavigate, useOutletContext } from "react-router";
import { logout } from "../../../redux/actions/userActions";

const EditProfile = () => {

    const dispatch = useDispatch();
    // const userLogin = useSelector(state => state.userLogin);
    // const { error, loading, userInfo } = userLogin;
    const navigate = useNavigate();

    const userctx = useOutletContext();

    if(Object.keys(userctx).length === 0){
        dispatch(logout());
        navigate("/giris");
    }

    const [user, setUser] = useState(userctx);

    // const getUser = useCallback(async() => {
    //     const result = await api.get_with_auth(`https://ataseng.com/api/member/get.php?id=${userInfo.user?.id}`, userInfo.access_token);

    //     if (result.status === 401){
    //         dispatch(logout());
    //         navigate("/giris");
    //     }
        
    //     setUser(result.content);
    // }, [userInfo.user?.id, userInfo.access_token, dispatch, navigate]);

    // useEffect(() => {
    //    getUser();
    // }, []);

    const changeUserHandler = e => {
        setUser(prevState => ({
            ...prevState, [e.target.name] : e.target.value
        }));
    }

    // const submitHandler = async e => {
    //     e.preventDefault();

    //     // delete user.email;
    //     // delete user.position;
    //     // delete user.role;
    //     // delete user.task;
        
    //     const response = await api.put_with_auth("https://ataseng.com/api/member/update.php", user, userInfo.access_token);

    //     if(response.status === 204){

    //         dispatch({
    //             type: USER_LOGIN_SUCCESS,
    //             payload: {
    //                 ok: userInfo.ok,
    //                 access_token: userInfo.access_token,
    //                 token_type: userInfo.token_type,
    //                 expires_in: userInfo.expires_in,
    //                 user: {
    //                     email: user.Email,
    //                     role: userInfo.user.role,
    //                     name: user.Name,
    //                     surname: user.Surname,
    //                     image: userInfo.user.image
    //                 }
    //             }
    //         });
    //     }
        
    // }

    const inputs = [
        {
            setFunction: changeUserHandler,
            name: "Image",
            type: "file",
            label: "Fotoğraf",
            src: user?.Image
        },
        {
            name: "Email",
            type: "email",
            label: "Eposta",
            disabled: true,
            value: user?.Email
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
            name: "StudentNo",
            type: "text",
            label: "Öğrenci No",
            value: user?.StudentNo
        },
        {
            setFunction: changeUserHandler,
            name: "Name",
            type: "text",
            label: "Adı",
            value: user?.Name
        },
        {
            setFunction: changeUserHandler,
            name: "Surname",
            type: "text",
            label: "Soyadı",
            value: user?.Surname
        },
        {
            setFunction: changeUserHandler,
            name: "Grade",
            type: "select",
            label: "Sınıf",
            value: user?.Grade,
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
            name: "Position",
            type: "text",
            label: "Kulüpteki Rolü",
            disabled: true,
            value: user?.Position
        },
        {
            name: "Task",
            type: "text",
            label: "Görevi",
            disabled: true,
            value: user?.Task ?? "Üye"
        },
        {
            setFunction: changeUserHandler,
            name: "Department",
            type: "text",
            label: "Bölümü",
            value: user?.Department
        },
        {
            setFunction: changeUserHandler,
            name: "BirthDate",
            type: "date",
            label: "Doğum Tarihi",
            value: user?.BirthDate === "0000-00-00" ? "" : user?.BirthDate
        },
        {
            setFunction: changeUserHandler,
            name: "Gender",
            type: "select",
            label: "Cinsiyeti",
            value: user?.Gender,
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
            name: "Phone",
            type: "tel",
            label: "Telefon Numarası",
            value: user?.Phone
        }
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Düzenle</h2>
                <PostForm inputs = {inputs} jsonContent />
            </div>
        </section>
    )
};

export default EditProfile;