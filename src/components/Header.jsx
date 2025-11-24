import "./Header.css";

function Header({ userName }) {
  return (
    <header className="header">
      <div className="user-info">
        {userName && <span className="user-name">{userName}</span>}
      </div>
    </header>
  );
}

export default Header;
