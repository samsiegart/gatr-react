import MyControls from '../MyControls/MyControls';
import './MyThumbnail.css';

function MyThumbnail() {
    return (
        <div className="my-thumbnail" id="my-thumbnail">
            <video autoplay muted className="local-video" id="local-video"></video>
            <div className="my-panel" id="my-panel">
                <h2 className="username">
                <span className="unselectable">One-time username: </span>
                <span id="my-username"></span>
                </h2>
                <div className="instruction" id="default-instruction">
                Call a username below or <a href="#" id="copy-invite-link">click to copy invite link <i class="material-icons">link</i></a>
                </div>
                <div className="instruction hidden" id="invitee-instruction">
                You've been invited to chat with <span className="inviter" id="inviter"></span>! Call them using the box below.
                </div>
            </div>
            <MyControls />
        </div>
    );
}

export default MyThumbnail;