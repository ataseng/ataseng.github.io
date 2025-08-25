import { useRef } from 'react';
import { useSelector } from 'react-redux';
import "./PostForm.css";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PostForm = ({ inputs, url, jsonContent = false, setUserVerified = null, setCompleted=null, setEmail=null, submitHandler = null, submitButtonText = "Gönder" }) => {

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
                if (setCompleted !== null)
                    setCompleted(true);
                if(setEmail !== null)
                    setEmail(Object.fromEntries(formData).email);
                // if(url.includes("login.php"))
            }
            if(res.error){
                if(res.fields){
                    Object.values(res.fields).forEach(error => toast.error(error));
                }
                else{
                    toast.error(res.message);
                }
                
                if(url.includes("login.php") && res.error === "inactive_user"){
                    console.log("asd")
                    setUserVerified(false);
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
                                    <input required={input.isRequired} type={input.type} id={input.name} name={input.name} onChange={input.setFunction ?? null}/> 
                                    <p>
                                        <Link to={"/kosullar"}>Koşullar</Link>, <Link to={"/gizlilik-politikasi"}>Gizlilik Politikası</Link> ve <Link to={"/cerez-politikasi"}>Çerez Politikasını</Link> okudum, kabul ediyorum.
                                    </p>
                                </div>
                                :
                                <>
                                    <label htmlFor={input.name}>{input.isRequired ? <span className='required'>*</span> : ""} {input.label}: </label>
                                    {
                                        input.type === "select" ? 
                                        <select required={input.isRequired} id={input.name} name={input.name}>
                                            {
                                                input.options.map((option, option_index) =>(
                                                    <option key={`post_form_select_option_${option_index}`} value={option.value}>{option.text}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        <input required={input.isRequired} type={input.type} id={input.name} name={input.name} onChange={input.setFunction ?? null}/>
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