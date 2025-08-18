import PostForm from "../../../components/Form/PostForm/PostForm";

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

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Kayıt Ol</h2>
                <PostForm inputs={inputs} url={"https://ataseng.com/api/auth/register.php"} jsonContent />
            </div>
        </section>
    )
}

export default Register