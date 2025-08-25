import { useSelector } from "react-redux";
import PostForm from "../../components/Form/PostForm/PostForm";
import "./UserProfile.css";

const UserProfile = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const inputs = [
        {
            name: "image",
            type: "file",
            label: "Fotoğraf",
        },
        {
            name: "email",
            type: "email",
            label: "Eposta",
            disabled: true,
            value: userInfo?.user?.email
            // setFunction: emailChangeHandler
        },
        {
            name: "old_password",
            type: "password",
            label: "Eski Parola",
            // setFunction: passwordChangeHandler
        },
        {
            name: "new_password",
            type: "password",
            label: "Yeni Parola",
            // setFunction: passwordChangeHandler
        },
        {
            name: "student_no",
            type: "text",
            label: "Öğrenci No",
        },
        {
            name: "name",
            type: "text",
            label: "Adı",
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        },
        {
            name: "grade",
            type: "text",
            label: "Sınıf",
        },
        {
            name: "position",
            type: "text",
            label: "Kulüpteki Rolü",
            disabled: true,
            value: userInfo?.user?.email
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
        }
    ];
    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Profil</h2>
                <PostForm inputs = {inputs} url={"https://ataseng.com/api/auth/login.php"} jsonContent/>
            </div>
        </section>
    )
}

export default UserProfile