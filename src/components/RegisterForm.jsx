import React, {useState} from 'react'

const RegisterForm = ({setIsRegistering}) => {
  return (
    <div>
      <div>RegisterForm</div>
      <button className = 'team-channel__registration-button' onClick={()=>{if(setIsRegistering){setIsRegistering((prevState)=> !prevState)}}}>Anmeldungen</button>
    </div>
  )
}

export default RegisterForm