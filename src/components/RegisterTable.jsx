import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const RegisterTable = ({setIsVisualising}) => {
  const [anmeldungenList, setAnmeldungenList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setAnmeldungenList(response.data);
    })
  }, []) 

  return (
    <div>
      <div className='register-channel-header__container'>Anmeldungen</div>
      <div className='register__form-container'>
        <div className='auth__form-container_fields'>
          {anmeldungenList.map((val)=>{
            return <h1>Student Name: {val.Student}</h1>
          })}
        </div>
      </div>
      <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>Anmeldungen</button>
    </div>
  )
}

export default RegisterTable