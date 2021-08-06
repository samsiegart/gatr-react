import RemoteBox from '../RemoteBox/RemoteBox';
import Thumbnail from '../Thumbnail/Thumbnail';
import './VideoContainer.css';

function VideoContainer() {
    return (
        <div className="video-chat-container">
            <div className="video-container">
                <Thumbnail />
                <RemoteBox />
            </div>
        </div>
    );
}

export default VideoContainer;