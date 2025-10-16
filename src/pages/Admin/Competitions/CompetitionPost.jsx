import { useEffect, useState } from 'react';
import PostForm from '../../../components/Form/PostForm/PostForm';

const CompetitionPost = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        // setLoading(true);
        fetch("https://ataseng.com/api/tags/get.php")
            .then(res => res.json())
            .then(data => {
                if (data.message === "success") {
                    const content = data.content;
                    setTags(content);
                }
                else {
                    console.error(data.message);
                }
                // setLoading(false);
            });
    }, []);

    const inputs = [
        {
            name: "title",
            type: "text",
            label: "Başlık",
            isRequired: true
        },
        {
            name: "description",
            type: "text",
            label: "İçerik",
            isRequired: false
        },
        {
            name: "location",
            type: "text",
            label: "Konum",
            isRequired: true
        },
        {
            name: "date",
            type: "date",
            label: "Tarih",
            isRequired: true
        },
        {
            name: "time",
            type: "time",
            label: "Saat",
            isRequired: true
        },
        {
            name: "last_application_date",
            type: "date",
            label: "Son Başvuru Tarihi",
            isRequired: true
        },
        {
            name: "last_application_time",
            type: "time",
            label: "Son Başvuru Saati",
            isRequired: true
        },
        {
            name: "status",
            type: "select",
            label: "Durum",
            isRequired: true,
            options: [
                {
                    value: "active",
                    text: "Aktif"
                },
                {
                    value: "passive",
                    text: "Pasif"
                }
            ]
        },
        {
            name: "tags",
            type: "checkboxes",
            label: "Etiketler",
            isRequired: true,
            options: tags.map(tag => ({value : tag.ID, text: `${tag.Name}`}))
        },
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Yarışma Ekle</h2>
                {/* <form onSubmit={handleSubmit}>
                    <input type="text" name='title' onChange={e => setTitle(e.target.value)} value={title} placeholder='Başlık'/>
                    <input type="text" name='content' onChange={e => setContent(e.target.value)} value={content} placeholder='İçerik'/>
                    <input type="date" name="date" onChange={e => setDate(e.target.value)} value={date}/>
                    <input type="time" name="time" min={"08:00"} max={"21:00"} step={900} onChange={e => setTime(e.target.value)} value={time}/>
                    <input type="text" name="location" onChange={e => setLocation(e.target.value)} value={location} placeholder='Konum'/>
                    <input type="date" name="last_application_date" onChange={e => setLastApplicationDate(e.target.value)} value={last_application_date}/>
                    <input type="time" name="last_application_time" onChange={e => setLastApplicationTime(e.target.value)} value={last_application_time}/>
                    <input type="radio" name="status" onChange={e => setStatus(e.target.value)} value={status}/>
                    <input type="file" name='image' onChange={e => setImage(e.target.files[0])}/>
                    <button type="submit">Gönder</button>
                </form> */}

                <PostForm inputs={inputs} url={"https://ataseng.com/api/competitions/post.php"} />
            </div>
        </section>
    )
}

export default CompetitionPost