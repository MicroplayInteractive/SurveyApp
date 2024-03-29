import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { useEffect, useRef } from 'react';
import ChannelService from '../services/ChannelService';
import { useAppDispatch, useAppSelector } from '../scripts/hooks';
import { ShowContextMenu } from '../store/ContextMenu';

const TextInput = () => {

    const textInput = useRef<HTMLInputElement>(null);
    const CurrentChannel = useAppSelector(state => state.CurrentChannel.CurrentChannel);
    const dispatch = useAppDispatch();

    useEffect(() => {
        textInput.current.onkeydown = async (event) => {
            if (event.key === "Enter") {
                new ChannelService(CurrentChannel.toString()).SendMessage(textInput.current.value);
                textInput.current.value = "";
            }
        }
    }, [CurrentChannel])

    return (
        <div className="textInputContainer">
            <div className="textInput">
                <DataSaverOnRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
                <input placeholder="Napisz na #chat..." ref={textInput} onContextMenu={(e) => {
                    dispatch(ShowContextMenu({
                        x: e.pageX,
                        y: e.pageY
                    }));
                }}/>
                <GifBoxRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
                <EmojiEmotionsRoundedIcon htmlColor='var(--disabled)' fontSize='large' className='interactableIcon'/>
            </div>
        </div>
    )
}

export default TextInput