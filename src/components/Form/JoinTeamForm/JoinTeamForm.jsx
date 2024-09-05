import React from 'react';
import './JoinTeamForm.css';

/**
 * JoinTeamForm component renders a form for users to apply to join the team.
 *
 * @component
 * @returns {JSX.Element} The rendered form element for joining the team.
 */
const JoinTeamForm = () => {
  return (
    <form className='joinTeamForm'>

      <input type="text" placeholder='İsim Soyisim :' />
      <input type="text" placeholder='Bölüm :' />
      <input type="text" placeholder='Sınıf :' />
      <input type="text" placeholder='Tel :' />      
    
      <button>Gönder</button>
    </form>
  );
};

export default JoinTeamForm;
