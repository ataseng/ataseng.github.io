import PostForm from '../../../components/Form/PostForm/PostForm';

const EducationPost = () => {

    const inputs = [
        {
            name: "name",
            type: "text",
            label: "Adı",
            isRequired: true
        },
        {
            name: "surname",
            type: "text",
            label: "Soyadı",
            isRequired: true
        },
        {
            name: "image",
            type: "file",
            label: "Fotoğraf",
            isRequired: false
        },
        {
            name: "expertise",
            type: "text",
            label: "Uzmanlık Alanları",
            isRequired: false
        },
        {
            name: "gender",
            type: "select",
            label: "Cinsiyet",
            isRequired: true,
            options: [
                {
                    value: "female",
                    text : "Kadın"
                },
                {
                    value: "male",
                    text : "Erkek"
                }
            ]
        }
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Eğitimci Ekle</h2>
                <PostForm inputs = {inputs} url={"https://ataseng.com/api/educator_post.php"}/>
        </div>
        </section>
    )
}

export default EducationPost