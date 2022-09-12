import React, {useState} from 'react';
import Axios from 'axios';


const RegisterForm = ({setIsRegistering, setIsVisualising}) => {
  const [student, setStudent] = useState('');
  const [fach, setFach] = useState('');
  const [dateiName, setDateiName] = useState('');
  const [seite, setSeite] = useState('');
  const [beschreibung, setBeschreibung] = useState('');

  //db post connection
  const submitRegistration = (event) =>{
    Axios.post("http://localhost:3001/api/insert", {
      Student: student,
      Fach: fach,
      DateiName: dateiName,
      Seite: seite,
      Beschreibung: beschreibung
    }).then((response)=>{
      alert(response);
    }, (err)=>{
      alert(err);
    })
  };

  return (
    <div>
      <div className='register-channel-header__container'>RegisterForm</div>
      <div className='register__form-container'>
        <div className='auth__form-container_fields'>
          <div className='auth__form-container_fields-content'>
            <form>
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='Student'>Deine Name</label>
                <input name='Student' type='text' placeholder='Name' onChange={(e)=>{ setStudent(e.target.value);}} required/>
              </div>
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='Fach'>Fach</label>
                <input name='Fach' type='text' placeholder='Fach' onChange={(e)=>{ setFach(e.target.value);}} required/>
              </div>
              <div className='register__form-container_fields-content_input'>
                <label htmlFor='DateiName'>Datei Name</label>
                <input name='DateiName' type='text' placeholder='Datei Name' onChange={(e)=>{ setDateiName(e.target.value);}} required/>
              </div>
              <div className='register__form-container_fields-content_input'>
                <label htmlFor='Seite'>Seite</label>
                <input name='Seite' type='number' placeholder='Nr.' onChange={(e)=>{ setSeite(e.target.value);}} required/>
              </div>
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='Beschreibung'>Beschreibung</label>
                <textarea id='beschreibung' name='Beschreibung' type='text' placeholder='Beschreibung' onChange={(e)=>{ setBeschreibung(e.target.value);}} required/>
              </div>
              <div>
                {/* <input name='Datum' type='hidden'>{currentDate()}</input>*/}
              </div>
              <div className='auth__form-container_fields-content_button'>
                <button onClick={submitRegistration}>Einreichen</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='register-channel-footer__container'>
        <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsRegistering){setIsRegistering((prevState)=> !prevState)}}}>Anmeldungen</button>
        <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>--&#62;List&#60;--</button>
      </div>
    </div>
  )
}

export default RegisterForm