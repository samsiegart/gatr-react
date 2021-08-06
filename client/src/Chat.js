import './Chat.css';
import Ringer from './Ringer.js';

function Chat(onFailedToGetUserMedia) {
  return (
    <div className="content-container">
        <Ringer />
    </div>
  );
}

export default Chat;
