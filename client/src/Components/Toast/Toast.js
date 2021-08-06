import './Toast.css';

function Toast({fade}) {
    return (
        <div className={`toast ${fade ? "fade" : ""}`}>
            Chomp! Invite link copied to clipboard.
        </div>
    )
}

export default Toast;