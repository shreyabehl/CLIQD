import { useState } from 'react';
import './PostCard.css';

function timeSince(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)    return 'just now';
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function PostCard({ post, liked, onToggleLike, style }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likeAnim, setLikeAnim] = useState(false);

  function handleLike() {
    setIsLiked(prev => !prev);
    setLikeCount(prev => prev + (isLiked ? -1 : 1));
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 400);
    onToggleLike();
  }

  const initial = post.userName?.charAt(0).toUpperCase() || '?';

  return (
    <article className="post-card" style={style}>
      {/* Header */}
      <div className="post-header">
        <div className="avatar sm" style={{ background: stringToGradient(post.userName) }}>
          {initial}
        </div>
        <span className="post-username">{post.userName}</span>
        <span className="post-time">{timeSince(post.createdAt)}</span>
      </div>

      {/* Image */}
      <div className="post-image-wrap">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="post" className="post-image" />
        ) : (
          <div className="post-image-placeholder" style={{ background: post.imageBg || '#1e1e2e' }}>
            <span>◈</span>
          </div>
        )}

        {/* Product tag dots */}
        {post.tags?.map((tag, i) => (
          <TagDot key={i} tag={tag} />
        ))}
      </div>

      {/* Footer */}
      <div className="post-footer">
        {post.caption && <p className="post-caption">{post.caption}</p>}
        <div className="post-actions">
          <button
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <span className={`like-icon ${likeAnim ? 'pop' : ''}`}>
              {isLiked ? '♥' : '♡'}
            </span>
            <span>{likeCount}</span>
          </button>
          {post.tags?.length > 0 && (
            <span className="tag-count">
              <strong>{post.tags.length}</strong> product{post.tags.length > 1 ? 's' : ''} tagged
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function TagDot({ tag }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="tag-dot"
      style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="tag-tooltip">
          <span>{tag.productName}</span>
          {tag.price && <span className="tag-price">₹{tag.price.toLocaleString()}</span>}
        </div>
      )}
    </div>
  );
}

function stringToGradient(str = '') {
  const hue = [...str].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return `linear-gradient(135deg, hsl(${hue},70%,45%), hsl(${(hue + 40) % 360},80%,55%))`;
}
