import './Profile.css';

export default function Profile({ currentUser, posts, likes }) {
  const myPosts   = posts.filter(p => p.userId === currentUser.id);
  const likesGiven = (likes[currentUser.id] || []).length;
  const initial   = currentUser.name.charAt(0).toUpperCase();

  return (
    <section className="profile" style={{ animation: 'fadeUp 0.35s ease both' }}>
      {/* Hero */}
      <div className="profile-hero">
        <div className="avatar lg">{initial}</div>
        <div className="profile-info">
          <h2 className="profile-name">{currentUser.name}</h2>
          <p className="profile-email">{currentUser.email}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-num">{myPosts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-num">{likesGiven}</span>
              <span className="stat-label">Likes Given</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <h3 className="profile-grid-title">My Posts</h3>
      {myPosts.length === 0 ? (
        <p className="profile-empty">You haven't posted anything yet.</p>
      ) : (
        <div className="profile-grid">
          {myPosts.map(post => (
            <div key={post.id} className="profile-thumb">
              {post.imageUrl ? (
                <img src={post.imageUrl} alt="" />
              ) : (
                <div
                  className="profile-thumb-bg"
                  style={{ background: post.imageBg || '#1e1e2e' }}
                >
                  <span>◈</span>
                </div>
              )}
              <div className="profile-thumb-overlay">
                <span>♥ {post.likeCount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
