import { useState } from 'react'
import axios from 'axios';

const Dene = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);

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

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='title' onChange={e => setTitle(e.target.value)} value={title}/>
            <input type="text" name='description' onChange={e=> setDescription(e.target.value)} value={description}/>
            <input type="file" name='image' onChange={e => setImage(e.target.files[0])}/>
            <button type="submit">Gönder</button>
        </form>
    )
}

export default Dene