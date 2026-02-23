import PostCard from './PostCard.jsx';
import './Feed.css';

export default function Feed({ posts, currentUserId, likes, onToggleLike }) {
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section className="feed">
      <div className="feed-header">
        <h1 className="feed-title">Your Feed</h1>
        <p className="feed-subtitle">Discover and shop the latest looks</p>
      </div>

      {sorted.length === 0 ? (
        <div className="feed-empty">
          <span className="feed-empty-icon">◈</span>
          <p>No posts yet. Be the first to share a look!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {sorted.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              liked={(likes[currentUserId] || []).includes(post.id)}
              onToggleLike={() => onToggleLike(post.id)}
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
