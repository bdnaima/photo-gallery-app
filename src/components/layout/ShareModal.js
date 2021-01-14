import React, { useState, useRef } from 'react'
import { BiCopyAlt } from 'react-icons/bi';
import { Modal, Button } from 'react-bootstrap';

const ShareModal = () => {
    const [copyLink, setCopyLink] = useState('');
    const inputRef = useRef(null);
    const [show, setShow] = useState(false);

    const handleModal = () => {
        setShow(true);
        setCopyLink('');
    }

    const handleClose = () => {     
        setShow(false)
    }

    const handleCopy = (e) => {
        inputRef.current.select();
        document.execCommand('copy');

        e.target.focus();
        setCopyLink('Copied!');
    }

    return (
        <div>
             <Button onClick={handleModal}>Share album</Button>
            <Modal 
                show={show} 
                onHide={handleClose} 
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Copy URL and share with customer</Modal.Title> 
                </Modal.Header>

                <Modal.Body>
                    <div style={{
                        display: "flex", 
                        flexDirection: "row-reverse", 
                        justifyContent:"center", 
                        flexWrap:"wrap",
                        marginTop:"2em"
                    }}>
                        {
                            document.queryCommandSupported('copy') &&
                            <div>
                            <Button onClick={handleCopy}><BiCopyAlt/></Button> 
                            {copyLink}
                            </div>
                        }   
                        <input 
                            id="margin-left" 
                            style={{marginLeft:"2em"}}
                            ref={inputRef} 
                            type="text" 
                            readOnly
                            value={window.location.href.replace('/albums/', '/customer/')} 
                        /> 
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default  ShareModal