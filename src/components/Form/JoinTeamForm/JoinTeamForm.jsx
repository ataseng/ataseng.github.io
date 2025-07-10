import { useEffect, useState } from 'react';
import './JoinTeamForm.css';
import { isNumeric } from '../../../utils/isNumeric';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

/**
 * JoinTeamForm component renders a form for users to apply to join the team.
 *
 * @component
 * @returns {JSX.Element} The rendered form element for joining the team.
 */

const JoinTeamForm = () => {

    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    // const [tempStudentTel, setTempStudentTel] = useState("");
    // const [studentTel, setStudentTel] = useState("0 (___) ___ __ __");

    const handleSubmit = e => {
        if(settings?.RegistrationActive !== '1'){
            return;
        }
        e.preventDefault();
        const targetElements = e.target.elements;
        const studentNo = targetElements.studentNo.value;
        const studentFullName = targetElements.studentFullName.value;
        const studentDepartment = targetElements.studentDepartment.value;
        const studentClass = targetElements.studentClass.value;
        const studentInterest = targetElements.studentInterest.value;
        const studentEmail = targetElements.studentEmail.value;
        const studentTel = targetElements.studentTel.value;
        
        const formData = {
            studentNo,
            studentFullName,
            studentDepartment,
            studentClass,
            studentInterest,
            studentEmail,
            studentTel
        }

        fetch(
            "https://ataseng.com/api/registration_post.php",
            {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
        });
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
            <div className='join-team-form-input-div'>
                <label htmlFor="studentNo">Öğrenci No: </label>
                <input required type="text" id='studentNo' name='studentNo' minLength={9} maxLength={9}/>
            </div>
            <div className='join-team-form-input-div'>
                <label htmlFor="studentFullName">İsim Soyisim: </label>
                <input required type="text" id='studentFullName' name='studentFullName'/>
            </div>
            <div className='join-team-form-input-div'>
                <label htmlFor="studentDepartment">Bölüm: </label>
                <input required type="text" id='studentDepartment' name='studentDepartment'/>
            </div>
            <div className='join-team-form-input-div'>
                <label htmlFor="studentClass">Sınıf: </label>
                <select required name="studentClass" id="studentClass">
                    <option value="">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="0">4+</option>
                </select>
            </div>
            <div className='join-team-form-input-div'>
                <label htmlFor="studentInterest">Başvurulan Pozisyon: </label>
                <select required name="studentInterest" id="studentInterest">
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
            <div className='join-team-form-input-div'>
                <label htmlFor="studentEmail">E-Posta: </label>
                <input required type="email" id='studentEmail' name='studentEmail' />
            </div>
            <div className='join-team-form-input-div'>
                <label htmlFor="studentTel">Telefon: </label>
                <input required type="tel" id='studentTel' name='studentTel' maxLength={20}
                // onKeyDown={telephoneHandle}
                // value={studentTel}
            />
            </div>
            
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
