import '../styles/App.css';
import '../styles/theme.css'
import Message from '../components/message';
import RoleGroup from '../components/rolegroup';
import {Channel, channelType} from '../components/channel';
import ServerBadge from '../components/serverBadge';
import User from '../components/user';
import TextInput from '../components/textInput';
import SelfUserInfo from '../components/selfUserInfo';
import ServerThumbnail from '../components/serverThumbnail';
import { useEffect, useState } from 'react';
import { socket } from '../scripts/socket';
import UserService, {Self} from '../services/UserService';
import AuthService from '../services/AuthService';
import Cookies from 'universal-cookie';
import Modal from '../components/modal';
import MessageService from '../services/MessageService';
import ChannelService, { IChannel } from '../services/ChannelService';
import { DisplayDevInfo } from '../scripts/dev';
import { useAppSelector } from '../scripts/hooks';
import currentGuild from '../store/currentGuild';
import { GuildService } from '../services/GuildService';

export default () => {

  const [Messages, setMessages] = useState([]);
  const [UserGuilds, setUserGuilds] = useState([]);

  const ActiveGuild = useAppSelector(state => state.currentGuild);
  const [GuildChannels, setGuildChannels] = useState([]);


  useEffect(() => {
    console.log(ActiveGuild);
    var guildChannels = []
    console.log(GuildChannels);
    for (const channel in ActiveGuild["activeGuild"]["channels"]) {
      
      const channelID = ActiveGuild["activeGuild"]["channels"][channel];
      console.log("Channel service");
      new ChannelService(channelID).Fetch().then((e) => {
        console.log("DASD");
        guildChannels = ([...guildChannels, e]);
        console.log(guildChannels);
      });
      setGuildChannels(guildChannels);
    } 
  }, [ActiveGuild])

  useEffect(() => {
    const cookies = new Cookies();
  
    const t = cookies.get("token"); 
  
    if (t == undefined) {
      window.location.href = "/login";
      return null;
    }

    socket.connect();

    new ChannelService("1").GetMessages().then((res: []) => {
      
      for (var i = 0; i < res.length; i++) {
        const id = res[i];
        setMessages(current => [...current, id])
      }
    })

    socket.on("sendMessage", (data: string) => {
      new MessageService(data).Fetch().then((msg) => {
        setMessages(current => [...current, msg])
      })
    });
    socket.on("UPDATE_GUILDS", () => {
      Self.GetUserGuilds().then((e) => {
        setUserGuilds(e);
      });
    });

    Self.GetUserGuilds().then((e) => {
      setUserGuilds(e);
    });

    DisplayDevInfo();

  }, [])

  return (
    <div className='appMount'>

    <Modal/>

      <div className="ServersBar">
        <ServerThumbnail isHome={true}/>
        {UserGuilds.map(server => server != null ? <ServerThumbnail iconUrl='https://cdn.discordapp.com/attachments/1023265697293406320/1106903348663291964/the-sandbox-sand-logo.png' name={server.name} key={server._id} id={server._id}/> : null)}
        <ServerThumbnail isCreateServer={true}/>
        <ServerThumbnail isDashboard={true}/>
      </div>
      <div className="Content">
        <div className="ChannelsBar">
          <div className="Mount1">
            <div className="ServerQuickInfo">
              <ServerBadge/>{ActiveGuild.activeGuild.name}
            </div>
          </div>
          <div className="Mount2">
            <div className="ServerBanner"/>

            {GuildChannels.map((ch: IChannel) => <Channel key={ch._id} type={channelType.text} name={ch.name} emoji={ch.emoji}/>)}
            
          </div>
          <div className="Mount3">
            <SelfUserInfo/>
          </div>
        </div>
        <div className="ContentBar">
          <div className="ChannelQuickInfo">
            #chat
          </div>
          <div className="messagesContainer" id="messagesContainer">
            {Messages.map(msg => <Message key={msg["_id"]} author={msg["author"]} content={msg["content"]} timestamp={msg["sendTimestamp"]}/>)}
          </div>
          <TextInput/>
        </div>
        <div className="MembersBar">
          <RoleGroup name="Administrator"/>
          <User name="SuperKing" customStatus='💯 Currently developing...' avatar='https://cdn.discordapp.com/avatars/726424660014530626/0d4accc92e2754ec2df9d1e5d45d319a.webp'/>
          <RoleGroup name="Moderator"/>
          <User name="Test user #1" customStatus='status' avatar='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
          <User name="Test user #2" customStatus='status' avatar='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
        </div>
      </div>
    </div>
  );
}