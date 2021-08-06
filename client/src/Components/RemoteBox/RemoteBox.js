import './RemoteBox.css';
import { useRef, useEffect } from 'react';

function RemoteBox({peerMediaStream}) {
    const remoteVideo = useRef(null);

    useEffect(() => {
        if (peerMediaStream === null) return;
        remoteVideo.current.srcObject = peerMediaStream;
        remoteVideo.current.play();
    }, [peerMediaStream]);

    return (
        <div className="remote-box" id="remote-box">
            <video autoplay className="remote-video" ref={remoteVideo}></video>
        </div>
    );
}

export default RemoteBox;