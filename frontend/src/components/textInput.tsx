import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { useEffect, useRef } from 'react';
import ChannelService from '../services/ChannelService';

const TextInput = () => {

    const textInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        textInput.current.onkeydown = async (event) => {
            if (event.key === "Enter") {
                new ChannelService("1").SendMessage(textInput.current.value);
                textInput.current.value = "";
            }
        }
    }, [])

    return (
        <div className="textInputContainer">
            <div className="textInput">
                <DataSaverOnRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
                <input placeholder="Napisz na #chat..." ref={textInput}/>
                <GifBoxRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
                <EmojiEmotionsRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
            </div>
        </div>
    )
}

export default TextInput