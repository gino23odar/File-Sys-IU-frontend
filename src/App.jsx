import React, {useState} from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {ChannelListContainer, ChannelContainer, Auth} from './components';


//stream chats pre defined css to save time
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'bv4vx5f2vtnj';
const authToken = cookies.get('token');

//create instance of streamChat
const client = StreamChat.getInstance(apiKey);

//connect user through cookies
if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber')
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light' >
        <ChannelContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsRegistering}
          isRegistering = {isRegistering}
          setIsRegistering = {setIsRegistering}
          createType = {createType}
        />
        <ChannelListContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          setCreateType = {setCreateType}
          setIsRegistering = {setIsRegistering}
        />
      </Chat>
    </div>
  );
}

export default App;