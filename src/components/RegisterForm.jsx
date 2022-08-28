import React, {useState} from 'react';

const initialState = {
  StudentName: '',
  DateiName: '',
  Seite: '',
  Beschreibung: ''
}

const RegisterForm = ({setIsRegistering}) => {
  const [form, setForm] = useState(initialState);
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  }
  return (
    <div>
      <div className='register-channel-header__container'>RegisterForm</div>
        <div className='register__form-container'>
        <div className='auth__form-container_fields'>
          <div className='auth__form-container_fields-content'>
            <form onSubmit={()=>{}}>
                <div className='auth__form-container_fields-content_input'>
                <label htmlFor='StudentName'>Student Name</label>
                <input name='StudentName' type='text' placeholder='Name' onChange={handleChange} required/>
              </div>
              <div className='register__form-container_fields-content_input'>
                <label htmlFor='DateiName'>Datei Name</label>
                <input name='DateiName' type='text' placeholder='Datei Name' onChange={handleChange} required/>
                <label htmlFor='Seite'>Seite</label>
                <input name='Seite' type='text' placeholder='Nr.' onChange={handleChange} required/>
              </div>
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='Beschreibung'>Beschreibung</label>
                <input name='Beschreibung' type='text' placeholder='Beschreibung' onChange={handleChange} required/>
              </div>
              <div className='auth__form-container_fields-content_button'>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <div className='register-channel-footer__container'>
        <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsRegistering){setIsRegistering((prevState)=> !prevState)}}}>Anmeldungen</button>
      </div>
    </div>
  )
}

export default RegisterForm