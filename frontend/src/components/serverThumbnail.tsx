import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import { useDispatch } from 'react-redux/es/exports';
import Modal from './modal';
import { closeModal, openModal } from '../store/modal';
import { ModalState } from "../store/modal";

interface serverThumbnailProps {
    isHome?: boolean
    isDashboard?: boolean,
    isCreateServer?: boolean,
    iconUrl?: string
}

const ServerThumbnail = (props: serverThumbnailProps) => {

    const dispatch = useDispatch();
    
    const OpenAddServerModal = () => {
        
        dispatch(openModal(
        <>
            <h2>Dołącz do serwera</h2>
            <p style={{fontSize: '15px'}}>Wprowadź zaproszenie poniżej, aby dołączyć do istniejącego serwera</p>
            <input placeholder="https://survey.app/G7YkgeVV"/>
            <div className="img" style={{width: "100%", height: "120px", backgroundSize: "cover", backgroundImage: "url('https://img.freepik.com/free-vector/cartoon-galaxy-background_23-2148984167.jpg')", backgroundPosition: "center", margin: "20px"}}/>
            <div className="actionBar">
                <button onClick={() => {dispatch(closeModal())}}>Dołącz do serwera</button>
            </div>
        </>));
    }



    var component = <div className="serverThumb" style={{backgroundImage: `url(${props.iconUrl})`}}></div> 

    if (props.isHome) {
        return (
            <div className="serverThumb" style={{backgroundImage: `url(${props.iconUrl})`}}>
                <img src='https://cdn.discordapp.com/attachments/1023265697293406320/1105918466696949760/SurveyWhite.png' width={31} height={34} style={{filter: 'brightness(1000%)'}}/>
            </div>
        )
    } else if (props.isDashboard) {
        return (
            <div className="serverThumb">
                <SpaceDashboardRoundedIcon htmlColor='white' fontSize='large'/>
            </div>
        )
    } else if (props.isCreateServer) {
        return (
            <div className="serverThumb" style={{marginLeft: 'auto'}} onClick={OpenAddServerModal}>
                <AddBoxRoundedIcon htmlColor='white' fontSize='large'/>
            </div>
        )
    } else {
        return (
            <>
                <div className="serverThumb" style={{backgroundImage: `url(${props.iconUrl})`}}>
                <div className="activeServerThumb"></div>
                </div>
            </>
        )
    }
}

export default ServerThumbnail