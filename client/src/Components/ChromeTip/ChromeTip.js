import './ChromeTip.css';

function ChromeTip() {
    return (
        <div className="chrome-tip">
            <div className="tip">
                <h2>Welcome to Gatr! To get started:</h2>
                <p>
                    1. Visit&nbsp;
                    <span class="green-accent">gatr.chat</span>
                    &nbsp;in Google Chrome on a laptop or desktop.
                </p>
                <p className="icon-text">
                    2. Grant access to share your webcam&nbsp;
                    <i className="material-icons green-accent">videocam</i>
                    &nbsp;
                    (<a id="permission-help"
                        className="permission-help"
                        href="img/permission_help.png"
                        taget="_blank">help</a>).
                </p>
                <p>3. Share your invite link with a friend to let them call you.</p>
                <p>4. You're connected! Chat or screenshare as long as you want.</p>
            </div>
    </div>
  );
}

export default ChromeTip;