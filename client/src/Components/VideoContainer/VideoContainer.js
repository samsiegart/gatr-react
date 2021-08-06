import './VideoContainer.css';
import RemoteBox from '../RemoteBox/RemoteBox';
import Thumbnail from '../Thumbnail/Thumbnail';
import { useState } from 'react';

function VideoContainer({socket, userMediaStream, peerMediaStream}) {    
    let remoteBox;
    if (peerMediaStream !== null) {
        remoteBox = (
            <RemoteBox peerMediaStream={peerMediaStream}/>
        );
    }

    return (
        <div className="video-chat-container">
            <div className="video-container">
                <Thumbnail socket={socket}
                    userMediaStream={userMediaStream}
                    activeCall={peerMediaStream !== null} />
                {remoteBox}
            </div>
        </div>
    );
}

export default VideoContainer;