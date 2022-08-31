import React from 'react'

const RegisterTable = ({setIsVisualising}) => {
  return (
    <div>
      <div className='register-channel-header__container'>Anmeldungen</div>
      <div className='register__form-container'>
        <div className='auth__form-container_fields'>
          
        </div>
      </div>
      <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>Anmeldungen</button>
    </div>
  )
}

export default RegisterTable