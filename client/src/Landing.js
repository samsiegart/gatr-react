import './Landing.css';

function Landing({onGetStartedClicked}) {
    return (
        <div className="landing" id="landing">
            <div className="tip">
                <h2>Welcome to Gatr!</h2>
                <p>
                    Instantly video chat and screen share with anyone in the
                    world for free.
                </p>
                <ul>
                    <li className="icon-text">
                        Completely anonymous, no account or login required.
                    </li>
                    <li className="icon-text">
                        Connects directly and privately to peers with end-to-end
                        encryption through WebRTC.
                    </li>
                    <li className="icon-text">
                    All in the browser. No downloads or installs.
                    </li>
                    <p></p>
                </ul>
            </div>
            <button onClick={onGetStartedClicked}
                    className="get-started" id="get-started">
                Start Chatting Now
            </button>
        </div>
  );
}

export default Landing;