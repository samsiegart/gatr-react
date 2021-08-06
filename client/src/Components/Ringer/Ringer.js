import './Ringer.css';
import { useState } from 'react';

function Ringer() {
    const [callerInfo, setCallerInfo] = useState('');
    let incomingCall;
    if (callerInfo) {
        incomingCall = (<div class="ringer">
            <h2 class="caller-info">{callerInfo} is calling</h2>
            <button class="decline-button" id="decline-button">Decline</button>
            <button class="accept-button" id="accept-button">Accept</button>
        </div>);
    }
    return (
        <div>
            {incomingCall}
            <div class="dialer" id="dialer">
                <span class="input">
                    <input type="text"
                        placeholder="Enter a username to call"
                        id="callee">
                    </input>
                    <button class="call-button" id="call-button">Call</button>
                </span>
                <p class="dialer-announce" id="dialer-announce"></p>
            </div>
        </div>
    );
}

export default Ringer;