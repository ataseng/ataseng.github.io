import { useState } from 'react'
import axios from 'axios';

const Dene = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(date);
        // const formData = new FormData();
        // formData.append("image", image);
        // formData.append("title", title);
        // formData.append("content", content);
        // formData.append("date", date);
        // formData.append("location", location);

        // // axios.post("https://ataseng.com/api/education_post.php", formData)
        // // .then(response => console.log(response))

        // fetch("https://ataseng.com/api/education_post.php",
        //     {
        //         method: "post",
        //         body: formData,
        //     }
        // )
        // .then(res => res.json())
        // .then(res => console.log(res));
    }

    return (
        <section id='events-section'>
            <div className="section-content events-content">
        <form onSubmit={handleSubmit}>
            <input type="text" name='title' onChange={e => setTitle(e.target.value)} value={title}/>
            <input type="text" name='content' onChange={e => setContent(e.target.value)} value={content}/>
            <input type="datetime" name="date" onChange={e => setDate(e.target.value)} value={date}/>
            <input type="text" name="location" onChange={e => setLocation(e.target.value)} value={location}/>
            <input type="file" name='image' onChange={e => setImage(e.target.files[0])}/>
            <button type="submit">Gönder</button>
        </form>
        </div>
        </section>
    )
}

export default Dene