import MyThumbnail from '../MyThumbnail/MyThumbnail';
import RemoteThumbnail from '../RemoteThumbnail/RemoteThumbnail';
import './Thumbnail.css';

function Thumbnail({socket, userMediaStream, activeCall}) {
    return (
        <div className={`thumbnail ${activeCall ? "active-call" : ""}`}>
            <RemoteThumbnail />
            <MyThumbnail socket={socket} userMediaStream={userMediaStream} />
        </div>
    );
}

export default Thumbnail;