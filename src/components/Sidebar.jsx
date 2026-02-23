import './Sidebar.css';

export default function Sidebar({ currentUser, activeScreen, onNavigate, onLogout }) {
  const initial = currentUser.name.charAt(0).toUpperCase();

  const navItems = [
    { id: 'feed',    icon: '◉', label: 'Feed' },
    { id: 'create',  icon: '＋', label: 'Create Post' },
    { id: 'profile', icon: '◎', label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Tag<span>Shop</span></div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-user">
        <div className="avatar md">{initial}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{currentUser.name.split(' ')[0]}</div>
          <div className="sidebar-user-tag">@{currentUser.name.split(' ')[0].toLowerCase()}</div>
        </div>
      </div>

      <button className="btn-logout" onClick={onLogout}>← Sign Out</button>
    </aside>
  );
}
