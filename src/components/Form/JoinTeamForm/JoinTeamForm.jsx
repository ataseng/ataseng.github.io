import { useEffect, useState } from 'react';
import './JoinTeamForm.css';
import { isNumeric } from '../../../utils/isNumeric';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { api } from '../../../api';

/**
 * JoinTeamForm component renders a form for users to apply to join the team.
 *
 * @component
 * @returns {JSX.Element} The rendered form element for joining the team.
 */

const JoinTeamForm = () => {

    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const [tempStudentTel, setTempStudentTel] = useState("");
    // const [studentTel, setStudentTel] = useState("0 (___) ___ __ __");

    const handleSubmit = async e => {
        if(settings?.RegistrationActive !== '1'){
            return;
        }
        e.preventDefault();

        const formData = new FormData(e.target);
        const body = JSON.stringify(Object.fromEntries(formData));

        api.post(
            "https://ataseng.com/api/member/registration_post.php",
            body
        );
        
        // const targetElements = e.target.elements;
        // const studentNo = targetElements.studentNo.value;
        // const name = targetElements.name.value;
        // const surname = targetElements.surname.value;
        // const department = targetElements.department.value;
        // const grade = targetElements.grade.value;
        // const interest = targetElements.interest.value;
        // const email = targetElements.email.value;
        // const telephone = targetElements.telephone.value;
        
        // const formData = {
        //     studentNo,
        //     name,
        //     surname,
        //     department,
        //     grade,
        //     interest,
        //     email,
        //     telephone
        // }
    }

    // const telephoneHandle = e => {
    //     if(e.key === "Backspace"){
    //         setTempStudentTel(tempStudentTel.substring(0, tempStudentTel.length - 1));
    //     }
    //     else if(tempStudentTel.length < 10){
    //         if (isNumeric(e.key))
    //             setTempStudentTel(tempStudentTel + e.key);
    //     }
    // }

    // useEffect(() => {
    //     if(tempStudentTel.length < 1){
    //         setStudentTel(`0 (___) ___ __ __`);
    //     }
    //     else if(tempStudentTel.length < 4){
    //         const first_part = tempStudentTel.slice(0, 3);
    //         setStudentTel(`0 (${first_part}) ___ __ __`);
    //     }
    //     else if(tempStudentTel.length < 7){
    //         const first_part = tempStudentTel.slice(0, 3);
    //         const second_part = tempStudentTel.slice(3, 6);
    //         setStudentTel(`0 (${first_part}) ${second_part} __ __`);
    //     }
    //     else if(tempStudentTel.length < 9){
    //         const first_part = tempStudentTel.slice(0, 3);
    //         const second_part = tempStudentTel.slice(3, 6);
    //         const third_part = tempStudentTel.slice(6, 8);
    //         setStudentTel(`0 (${first_part}) ${second_part} ${third_part} __`);
    //     }
    //     else if(tempStudentTel.length < 11){
    //         const first_part = tempStudentTel.slice(0, 3);
    //         const second_part = tempStudentTel.slice(3, 6);
    //         const third_part = tempStudentTel.slice(6, 8);
    //         const fourth_part = tempStudentTel.slice(8, 10);
    //         setStudentTel(`0 (${first_part}) ${second_part} ${third_part} ${fourth_part}`);
    //     }
    // }, [tempStudentTel]);

    const location = useLocation();
    
    const scrollToElement = id => {
        const element = document.querySelector(id);
        if (element !== null) {
            element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    }

    useEffect(() => {
        if(location.hash !== ""){
            scrollToElement(location.hash);
        }
    }, [location]);
    

    return (
        <form className='join-team-form' onSubmit={handleSubmit}>
            {
                !userInfo && 
                <>
                    <div className='join-team-form-input-div'>
                        <label htmlFor="studentNo">Öğrenci No: </label>
                        <input required type="text" id='studentNo' name='studentNo' minLength={9} maxLength={9}/>
                    </div>
                    <div className='join-team-form-input-div'>
                        <label htmlFor="name">İsim: </label>
                        <input required type="text" id='name' name='name'/>
                    </div>
                    <div className='join-team-form-input-div'>
                        <label htmlFor="surname">Soyisim: </label>
                        <input required type="text" id='surname' name='surname'/>
                    </div>
                    <div className='join-team-form-input-div'>
                        <label htmlFor="department">Bölüm: </label>
                        <input required type="text" id='department' name='department'/>
                    </div>
                    <div className='join-team-form-input-div'>
                        <label htmlFor="grade">Sınıf: </label>
                        <select required name="grade" id="grade">
                            <option value="">--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="0">4+</option>
                        </select>
                    </div>
                </>
            }
            <div className='join-team-form-input-div'>
                <label htmlFor="interest">Başvurulan Pozisyon: </label>
                <select required name="interest" id="interest">
                    <option value="">--</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Mobil Uygulama Geliştirme">Mobil Uygulama Geliştirme</option>
                    <option value="Yapay Zekâ">Yapay Zekâ</option>
                    <option value="Tasarım (Grafik ve Web tasarım)">Tasarım (Grafik ve Web Tasarımı)</option>
                    <option value="Sosyal Medya ve İçerik Üretimi">Sosyal Medya ve İçerik Üretimi</option>
                    <option value="Etkinlik Düzenleme ve Organizasyon">Etkinlik Düzenleme ve Organizasyon</option>
                </select>
            </div>
            {
                !userInfo && 
                <div className='join-team-form-input-div'>
                    <label htmlFor="email">E-Posta: </label>
                    <input required type="email" id='email' name='email' />
                </div>
            }

            {
                !userInfo?.user?.phone && 
                <div className='join-team-form-input-div'>
                    <label htmlFor="phone">Telefon: </label>
                    <input required type="tel" id='phone' name='phone' maxLength={20}
                    // onKeyDown={telephoneHandle}
                    // value={studentTel}
                />
                </div>
            }
            
            <button type='submit' disabled={settings?.RegistrationActive !== '1'}>Gönder</button>
            {
                settings?.RegistrationActive !== '1' && <div className='recruitment-not-active'>
                    <span>Üye Alım Takvimi Dışındasınız!</span>
                </div>
            }
            
        </form>
    );
};

export default JoinTeamForm;
