import { useRef } from 'react';
import { useSelector } from 'react-redux';
import "./PostForm.css";
import { toast, ToastContainer } from 'react-toastify';

const PostForm = ({ inputs, url, jsonContent = false, setCompleted=null }) => {

    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    const form = useRef(null);

    const handleSubmit = e => {
        if(settings?.PostActive !== '1'){
            return;
        }
        e.preventDefault();

        const formData = new FormData(form.current);
        const post_options = {
            method: "post",
            body: jsonContent ? JSON.stringify(Object.fromEntries(formData)) : formData
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
                if (setCompleted !== null) {
                    setCompleted(true);
                }
            }
            if(res.error){
                if(res.fields){
                    Object.values(res.fields).forEach(error => toast.error(error));
                }
                else{
                    toast.error(res.error);
                }
            }
        });
    }
    
    return (
        <>
            <form ref={form} className='post-form' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <div className='post-form-input-div' key={`post_form_input_${index}`}>
                            <label htmlFor={input.name}>{input.isRequired ? <span className='required'>*</span> : ""} {input.label}: </label>
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
            <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss pauseOnHover/>
        </>
        
    )
}

export default PostForm