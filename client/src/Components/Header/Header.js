import './Header.css';

function Header() {
    return (
        <header onClick={() => window.location.href = '/'}
            className="header">
            <div className="logo-container" id="logo-container">
                <img src="./img/croc.png" alt="gatr logo" className="logo-img" />
                <h1 className="logo-text">
                G<span className="logo-highlight">atr</span>
                </h1>
            </div>
        </header>
    );
}

export default Header;