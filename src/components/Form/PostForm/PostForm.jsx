import { useEffect, useRef, useState } from 'react';
import { isNumeric } from '../../../utils/isNumeric';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import "./PostForm.css";

const PostForm = ({ inputs }) => {

    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    const form = useRef(null);

    const handleSubmit = e => {
        if(settings?.PostActive !== '1'){
            return;
        }
        e.preventDefault();

        const formData = new FormData(form.current);

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
        <form ref={form} className='post-form' onSubmit={handleSubmit}>
            {
                inputs.map((input, index) => (
                    <div className='post-form-input-div' key={`post_form_input_${index}`}>
                        <label htmlFor={input.name}>{input.label}: </label>
                        {
                            input.type === "select" ? 
                            <select required={input.isRequired} id={input.name} name={input.name}>
                                {
                                    input.options.map((option, option_index) =>(
                                        <option key={`post_form_select_option_${option_index}`} value={option.value}>{option.text}</option>
                                    ))
                                }
                            </select> :
                            <input required={input.isRequired} type={input.type} id={input.name} name={input.name}/>
                        }
                    </div>
                ))
            }
            <button type='submit' disabled={settings?.PostActive !== '1'}>Gönder</button>
            {
                settings?.PostActive !== '1' && <div className='post-not-active'>
                    <span>Post Not Active!</span>
                </div>
            }

        </form>
    )
}

export default PostForm