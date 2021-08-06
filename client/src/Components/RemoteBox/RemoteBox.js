import './RemoteBox.css';

function RemoteBox() {
    return (
        <div className="remote-box" id="remote-box">
            <video autoplay className="remote-video" id="remote-video"></video>
            <div className="remote-panel fade" id="remote-panel">
                <a href="#" id="view-fullscreen">
                <i className="material-icons">fullscreen</i>
                </a>
                <a href="#" id="mute-remote">
                <i className="material-icons" id="mute-remote-icon">volume_up</i>
                </a>
            </div>
            <div className="thumbnail-toggle fade" id="thumbnail-toggle">
                <a href="#"
                    className="thumbnail-toggle-link"
                    id="thumbnail-toggle-link">
                <i className="material-icons" id="thumbnail-toggle-icon">
                    keyboard_arrow_right
                </i>
                </a>
            </div>
        </div>
    );
}

export default RemoteBox;