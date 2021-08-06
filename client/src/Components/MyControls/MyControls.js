import './MyControls.css';

function MyControls() {
    return (
        <div className="my-controls fade unselectable hidden" id="my-controls">
            <span className="left-controls hidden" id="left-controls">
                <a href="#" id="hang-up" className="hang-up">
                <i className="material-icons">phone_disabled</i>
                </a>
            </span>
            <span className="middle-controls hidden" id="middle-controls">
            <a href="#" id="share-screen" className="share-screen">
                <i className="material-icons">screen_share</i>
            </a>
            </span>
            <span className="right-controls">
                <a href="#" id="mute-video" className="mute-video">
                <i className="material-icons" id="mute-video-icon">videocam</i>
                </a>
                <a href="#" id="mute-audio" className="mute-audio">
                <i className="material-icons" id="mute-audio-icon">mic</i>
                </a>
            </span>
        </div>
    );
}

export default MyControls;