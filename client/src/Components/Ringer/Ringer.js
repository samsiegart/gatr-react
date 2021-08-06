import './Ringer.css';
import { useState, useEffect } from 'react';

function Ringer({socket, ready, call, acceptCall, isHidden}) {
    const [callerInfo, setCallerInfo] = useState(null);
    const [callee, setCallee] = useState(
        window.location.hash.length > 1 ?
            window.location.hash.substr(1) : '');
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        if (socket === null) return;
        socket.on('call-made', data => {
            setCallerInfo(data);
        });
        socket.on('called-offline-user', _ => {
            setAnnouncement('That user doesn\'t appear to be online.')
        });
        socket.on('call-rejected', _ => {
            setAnnouncement('User declined the call.');
        });
        socket.on('end-call', _ => {
            setAnnouncement('Call disconnected.');
        });
    }, [socket]);

    function callUser() {
        call(callee);
        setAnnouncement(`Calling ${callee}...`);
    }

    function declineCall() {
        socket.emit('reject-call', {
            from: callerInfo.name
        })
        setCallerInfo(null);
    }

    let incomingCall;
    if (callerInfo) {
        incomingCall = (<div class="ringer">
            <h2 class="caller-info">{callerInfo.name} is calling</h2>
            <button class="decline-button" onClick={() => declineCall()}>
                Decline
            </button>
            <button class="accept-button" onClick={() => {
                    acceptCall(callerInfo);
                    setCallerInfo(null);
                }
            }>
                Accept
            </button>
        </div>);
    }

    return (
        <div className={`${isHidden ? 'hidden' : ''}`}>
            <div class="dialer">
                <span class="input">
                    <input type="text"
                        placeholder="Enter a username to call"
                        value={callee}
                        onChange={(e) => setCallee(e.target.value)}>
                    </input>
                    <button class="call-button"
                        disabled={!ready}
                        onClick={() => callUser()}>
                        Call
                    </button>
                </span>
                <p class="dialer-announce">{announcement}</p>
            </div>
            {incomingCall}
        </div>
    );
}

export default Ringer;