import React from 'react';
import {Channel, useChatContext, MessageTeam} from 'stream-chat-react';

import {ChannelInner, CreateChannel, RegisterForm} from './';

const ChannelContainer = ({isCreating, setIsCreating, isRegistering, setIsRegistering, createType}) => {
  //get info on the specific channel
  const {channel} = useChatContext();

   if(isCreating){
     return (
       <div className='channel__container'>
         <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
       </div>
     )
  }

  if(isRegistering){
    return (
      <div className='channel__container'>
        <RegisterForm setIsRegistering={setIsRegistering}/>
      </div>
    )
  }

  const EmptyState = () =>(
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>Hier beginnt Ihr Chatverlauf.</p>
      <p className='channel-empty__second'>Erlaubt sind: Nachrichten, Anlagen, links und Emojis.</p>
    </div>
  )
  
  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState} 
        //display all the messages sent by users.
        Message={(messageProps, i)=> <MessageTeam key={i} {...messageProps}/>}
      >
        <ChannelInner setIsRegistering={setIsRegistering}/>
      </Channel>
    </div>
  );
}

export default ChannelContainer;