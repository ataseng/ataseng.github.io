import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import "./PostForm.css";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PostForm = ({ inputs, url = "", jsonContent = false, submitHandler = null, submitButtonText = "Gönder" }) => {

    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    const form = useRef(null);

    const handleSubmit = e => {
        if(settings?.PostActive !== '1'){
            return;
        }
        e.preventDefault();

        const formData = new FormData(form.current);

        const body = jsonContent ? JSON.stringify(Object.fromEntries(formData)) : formData;

        if(inputs.find(input => input.type === "checkboxes")){

            const tags = [];
            for (let [key, _] of body.entries()) {
                if(key.includes("tag")){
                    tags.push(key.split("_")[1]);
                }
            }
            body.append("tags", tags);
            tags.forEach(tag => body.delete(`tag_${tag}`));

        }

        const post_options = {
            method: "post",
            body
        };

        if(jsonContent){
            post_options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }

        fetch(url, post_options)
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                toast.info(res.message);
                form.current.reset();
            }
            if(res.error){
                if(res.fields){
                    Object.values(res.fields).forEach(error => toast.error(error));
                }
                else{
                    toast.error(res.message);
                }
            }
        }).catch(error => {
            toast.error(error);
        });
    }

    return (
        <>
            <form ref={form} className='post-form' onSubmit={submitHandler ? submitHandler : handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <div className='post-form-input-div' key={`post_form_input_${index}`}>
                            {
                                input.type === "checkbox" && input.name === "policy_confirm" ? 
                                <div className='policy-confirm'>
                                    <input required={input.isRequired} type={input.type} id={input.name} name={input.name} onChange={input.setFunction ?? null} /> 
                                    <p>
                                        <Link to={"/kosullar-ve-sartlar"}>Koşullar</Link>, <Link to={"/gizlilik-politikasi"}>Gizlilik Politikası</Link> ve <Link to={"/cerez-politikasi"}>Çerez Politikasını</Link> okudum, kabul ediyorum.
                                    </p>
                                </div>
                                :
                                input.type === "file" && input.name === "Image" ?
                                <div className='post-form-image-div'>
                                    <img src={input.src} alt="" />
                                </div>
                                :
                                <>
                                    <label htmlFor={input.type === "checkboxes" ? null : input.name}>{input.isRequired ? <span className='required'>*</span> : ""} {input.label}: </label>
                                    {
                                        input.type === "checkboxes" ? 
                                            <div className='checkboxes_div'>
                                                {
                                                    input.options.map(checkbx => (
                                                        <div key={`${checkbx.value}_checkbx`}>
                                                            <label htmlFor={`tag_${checkbx.value}`}>{checkbx.text}</label>
                                                            <input className='tag_checkbox' type="checkbox" name={`tag_${checkbx.value}`} id={`tag_${checkbx.value}`} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        :
                                        input.type === "select" ? 
                                        <select required={input.isRequired} id={input.name} name={input.name} value={input.value} onChange={input.setFunction ?? null}>
                                            {
                                                input.options.map((option, option_index) =>(
                                                    <option key={`post_form_select_option_${option_index}`} value={option.value}>{option.text}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        input.disabled ? <span className='disabled'>{input.value}</span> :
                                        <input required={input.isRequired} type={input.type} id={input.name} name={input.name} value={input.value} onChange={input.setFunction ?? null} autoComplete={input.autoComplete} className={Object.hasOwn(input, "confirmState") ? input.confirmState ? "matched" : "unmatched" : ""}/>
                                    }
                                </>
                            }
                        </div>
                    ))
                }
                <button type='submit' disabled={settings?.PostActive !== '1'}>{submitButtonText}</button>
                {
                    settings?.PostActive !== '1' && <div className='post-not-active'>
                        <span>Post Not Active!</span>
                    </div>
                }

            </form>
        </>
        
    )
}

export default PostForm