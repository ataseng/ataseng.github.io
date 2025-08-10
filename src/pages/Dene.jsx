import { useState } from 'react'
import axios from 'axios';
import PostForm from '../components/Form/PostForm/PostForm';

const Dene = () => {

    const currentDate = new Date().toISOString().slice(0, 10);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState("08:00");
    const [location, setLocation] = useState("");
    const [last_application_date, setLastApplicationDate] = useState(currentDate);
    const [last_application_time, setLastApplicationTime] = useState("08:00");
    const [status, setStatus] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("location", location);
        formData.append("last_application_date", last_application_date);
        formData.append("last_application_time", last_application_time);
        formData.append("status", status);

        // axios.post("https://ataseng.com/api/education_post.php", formData)
        // .then(response => console.log(response))

        fetch("https://ataseng.com/api/education_post.php",
            {
                method: "post",
                body: formData,
            }
        )
        .then(res => res.json())
        .then(res => console.log(res));
    }

    const inputs = [
        {
            name: "title",
            type: "text",
            label: "Başlık",
            isRequired: true
        },
        {
            name: "content",
            type: "text",
            label: "İçerik",
            isRequired: false
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
            name: "location",
            type: "text",
            label: "Konum",
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
            name: "image",
            type: "file",
            label: "Görüntü",
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
                    text : "Aktif"
                },
                {
                    value: "passive",
                    text : "Pasif"
                }
            ]
        },
        {
            name: "educator_id",
            type: "select",
            label: "Eğitimci",
            isRequired: true,
            options: [
                {
                    value: 1,
                    text : "Osman DURDAĞ"
                },
                {
                    value: 2,
                    text : "Deneme"
                }
            ]
        },
    ];

    return (
        <section className='post-section'>
            <div className="section-content post-content">
                <h2>Add Education</h2>
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

                <PostForm inputs = {inputs}/>
        </div>
        </section>
    )
}

export default Dene