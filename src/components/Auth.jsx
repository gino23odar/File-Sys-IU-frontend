import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signImg from '../assets/SignUp.png';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: ''
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  //hook to change between sing up and sign in displays.
  const [isSignup, setIsSignup] = useState(true);

  //update state field
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    //get data from form
    const {username, password, phoneNumber, avatarURL} = form;
    //get the URL
    const URL = 'http://localhost:3001/auth';
    //make the request to back-end depending on if user is login in or signing up. 
    const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL
    });

    // store the data it gets back on cookies.
    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if(isSignup){
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }
    //reload browser
    window.location.reload();
  }

  //switch state of signin to the one not currently in use.
  const switchMode = () =>{
    setIsSignup((prevIsSignup)=> !prevIsSignup);
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_image'>
        <img src={signImg} alt='sign in'/>
      </div>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup? 'Anmelden' : 'Log In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup &&(
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='fullName'>Name</label>
              <input name='fullName' type='text' placeholder='Name' onChange={handleChange} required/>
            </div>
            )}
            <div className='auth__form-container_fields-content_input'>
                <label htmlFor='username'>Benutzername</label>
                <input name='username' type='text' placeholder='Benutzername' onChange={handleChange} required/>
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='phoneNumber'>Telefonnummer #</label>
                <input name='phoneNumber' type='text' placeholder='Telefonnummer' onChange={handleChange} required/>
              </div>
            )}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>Avatar URL</label>
                <input name='avatarURL' type='text' placeholder='Avatar URL' onChange={handleChange} required/>
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
                <label htmlFor='password'>Kenntwort</label>
                <input name='password' type='password' placeholder='Kenntwort' onChange={handleChange} required/>
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Kennwort bestätigen</label>
                <input name='confirmPassword' type='password' placeholder='Kennwort bestätigen' onChange={handleChange} required/>
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup? 'Anmelden': 'Log In'}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup? "Haben Sie bereits ein Konto? " : "Kein Konto? "}
              <span onClick={switchMode}>
                {isSignup? 'Log In' : 'Anmelden'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;