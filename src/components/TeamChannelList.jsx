import React from 'react';

import {AddChannel} from '../assets/AddChannel.js';

const TeamChannelList = ({children, error=false, loading, type, isCreating, setIsCreating, setCreateType, setIsRegistering, setToggleContainer}) => {
  if(error){
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
        Verbindungsfehler
        </p>
      </div>
    ) : null
  }

  if(loading){
    return(
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
           {type === 'team' ? 'Channels': 'DMs'} Webanwendung wird geladen...
        </p>
      </div>
    )
  }
  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
        {type === 'team'? 'Channels' : 'them DMs'} 
        </p>
        {type === 'team'
        ? ''
        :<AddChannel 
          isCreating={isCreating} 
          setIsCreating={setIsCreating} 
          setCreateType={setCreateType} 
          setIsRegistering={setIsRegistering}
          type={type === 'team'? 'team': 'messaging'}
          setToggleContainer={setToggleContainer}
        />
        }
      </div>
      {children}
    </div>
  );
}

export default TeamChannelList;