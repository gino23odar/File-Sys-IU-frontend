import React, {useState} from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {ChannelSearch, TeamChannelList, TeamChannelPreview} from './';
import IUicon from '../assets/IU-logo.svg';
import logouticon from '../assets/logouticon.jpg';

const cookies = new Cookies();

//functional component
const SideBar = ({logout, setIsCreating, setIsRegistering, setIsVisualising}) => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner' onClick={()=>{setIsCreating(false); setIsRegistering(false); setIsVisualising(false);}}>
        <img src={IUicon} alt='Chat' width='auto' />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon2__inner' onClick={logout}>
        <img src={logouticon} alt='Logout' width='30' />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>File-SYS IU</p>
  </div>
)

const customChannelTeamFilter = (channels)=>{
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelDMsFilter = (channels)=>{
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsRegistering, setIsVisualising, setToggleContainer}) => {
  const {client} = useChatContext();
  
  // clear the cookies to logout
  const logout = () =>{
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = {members: {$in: [client.userID]}}

  return (
    <>
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList 
          filters={filters} 
          channelRenderFilterFn={customChannelTeamFilter} 
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps} 
              type='team' 
              isCreating={isCreating} 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsRegistering={setIsRegistering} 
              setIsVisualising={setIsVisualising}
              setToggleContainer={setToggleContainer}
            />)} 
            Preview={(previewProps)=>(
              <TeamChannelPreview 
                {...previewProps} 
                setIsCreating={setIsCreating} 
                setIsRegistering={setIsRegistering} 
                setIsVisualising={setIsVisualising}
                setToggleContainer={setToggleContainer}  
                type='team'
              />
            )}
        />
        <ChannelList 
          filters={filters} 
          channelRenderFilterFn={customChannelDMsFilter} 
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps} 
              type='messaging'
              isCreating={isCreating} 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsRegistering={setIsRegistering} 
              setIsVisualising={setIsVisualising}
              setToggleContainer={setToggleContainer}
            /> 
          )} 
          Preview={(previewProps) =>(
            <TeamChannelPreview 
              {...previewProps} 
              type='messaging'
              setIsCreating={setIsCreating} 
              setIsRegistering={setIsRegistering}
              setIsVisualising={setIsVisualising} 
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
      <SideBar 
        logout={logout}
        setIsCreating={setIsCreating} 
        setIsRegistering={setIsRegistering} 
        setIsVisualising={setIsVisualising}/>
    </>
  );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsRegistering, setIsVisualising}) =>{
  const [toggleContainer, setToggleContainer] = useState(false);

  return(
    <>
      <div className='channel-list__container'>
        <ChannelListContent 
          setIsCreating ={setIsCreating}
          setCreateType ={setCreateType}
          setIsRegistering = {setIsRegistering}
          setIsVisualising={setIsVisualising}
        />
      </div>
    
      <div className='channel-list__container-responsive' style={{left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}>
        <div className='channel-list__container-toggle' onClick={()=> setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
        </div>
        <ChannelListContent 
          setIsCreating ={setIsCreating}
          setCreateType ={setCreateType}
          setIsRegistering = {setIsRegistering}
          setIsVisualising={setIsVisualising}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
}

export default ChannelListContainer;