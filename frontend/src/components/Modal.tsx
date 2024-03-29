import { ReactNode } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../styles/Modal.css'
import { useAppDispatch, useAppSelector } from '../scripts/hooks';
import { ModalState, CloseModal } from '../store/modal';
import { store } from '../store/store';

function sleep(ms) {
    var start = new Date().getTime(), expire = start + ms;
    while (new Date().getTime() < expire) { }
    return;
}

const Modal = () => {

    const dispatch = useAppDispatch();
    const modalOpen = useAppSelector((state) => state.Modal.isOpen);
    const modalContent = useAppSelector((state) => state.Modal.modalContent);

    if (modalOpen) {
        return (
            <div className="ModalContainer fadeIn">
                <div className="Modal fadeIn">
                    <i onClick={() => dispatch(CloseModal())}><CloseRoundedIcon className='closeModalButton' fontSize='large' htmlColor='#adadad'/></i>
                    {modalContent}
                </div>
            </div>
        )
    } else {return null;}
}

export default Modal