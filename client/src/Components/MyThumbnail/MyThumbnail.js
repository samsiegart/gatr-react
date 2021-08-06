import './MyThumbnail.css';
import MyControls from '../MyControls/MyControls';
import Toast from '../Toast/Toast';
import { useState, useEffect, useRef } from 'react';

function MyThumbnail({socket, userMediaStream}) {
    const [username, setUsername] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [fadeToastTimeout, setFadeToastTimeout] = useState(null);
    const myVideo = useRef(null);

    useEffect(() => {
        if (userMediaStream === null) return;
        myVideo.current.srcObject = userMediaStream;
        myVideo.current.play();
    }, [userMediaStream]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('update-user-name', data => {
            setUsername(data.name);
        });
    }, [socket]);

    useEffect(() => {
        if (!toastVisible) return;
        if (fadeToastTimeout !== null) {
            clearTimeout(fadeToastTimeout);
        }
        
        setFadeToastTimeout(setTimeout(() =>  {
            setToastVisible(false);
            setFadeToastTimeout(null);
          }, 2400));
    }, [toastVisible]);

    function copyInviteLink(e) {
        e.preventDefault();
        var dummy = document.createElement('input');
        var text = window.location.href + '#' + username;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setToastVisible(true);
    }

    let instruction;
    if (window.location.hash.length < 2) {
        instruction = (
            <div className="instruction">
                Call a username below or&nbsp;
                <a href="#" onClick={(e) => copyInviteLink(e)}>
                    click to copy invite link <i class="material-icons">link</i>
                </a>
            </div>
        );
    } else {
        instruction = (
            <div className="instruction">
                You've been invited to chat with&nbsp;
                <span className="inviter">{window.location.hash.substr(1)}</span>!
                Call them using the box below.
            </div>
        );
    }

    return (
        <div className="my-thumbnail">
            <video autoplay
                ref={myVideo}
                muted 
                className="local-video">
            </video>
            <div className="my-panel" id="my-panel">
                <h2 className="username">
                    <span className="unselectable">One-time username: </span>
                    <span>{username}</span>
                </h2>
                {instruction}
            </div>
            <MyControls />
            <Toast fade={!toastVisible}/>
        </div>
    );
}

export default MyThumbnail;