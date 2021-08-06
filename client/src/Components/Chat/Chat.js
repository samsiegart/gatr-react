import './Chat.css';
import Ringer from '../Ringer/Ringer';
import VideoContainer from '../VideoContainer/VideoContainer';

function Chat({onFailedToGetUserMedia}) {
  return (
    <div className="content-container">
        <VideoContainer />
        <Ringer />
    </div>
  );
}

export default Chat;
