import { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen.jsx';
import Sidebar from './components/Sidebar.jsx';
import Feed from './components/Feed.jsx';
import CreatePost from './components/CreatePost.jsx';
import Profile from './components/Profile.jsx';
import Toast from './components/Toast.jsx';
import './App.css';

// ── Seed Data ──────────────────────────────────
const SAMPLE_POSTS = [
  {
    id: 'post_1', userId: 'u_sample', userName: 'Priya Sharma',
    imageUrl: null, imageBg: '#2d2d3a',
    caption: 'Cozy autumn layers 🍂 love this jacket so much',
    likeCount: 24,
    tags: [
      { productId: 'p1', productName: 'White Sneakers', price: 2999, x: 35, y: 75 },
      { productId: 'p2', productName: 'Denim Jacket',   price: 4499, x: 55, y: 35 },
    ],
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'post_2', userId: 'u_sample2', userName: 'Arjun Mehta',
    imageUrl: null, imageBg: '#1a2a1a',
    caption: 'Weekend vibes — kept it simple and clean today ✨',
    likeCount: 11,
    tags: [{ productId: 'p3', productName: 'Linen Trousers', price: 3200, x: 50, y: 65 }],
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'post_3', userId: 'u_sample3', userName: 'Kavya Nair',
    imageUrl: null, imageBg: '#2a1a1a',
    caption: 'Finally found the perfect white sneakers! 🤍',
    likeCount: 38,
    tags: [
      { productId: 'p4', productName: 'Leather Bag',  price: 5999, x: 70, y: 55 },
      { productId: 'p5', productName: 'Sunglasses',   price: 1800, x: 48, y: 18 },
    ],
    createdAt: Date.now() - 10800000,
  },
  {
    id: 'post_4', userId: 'u_sample4', userName: 'Rohan Das',
    imageUrl: null, imageBg: '#1a1a2a',
    caption: 'Going minimal this season. Less is more',
    likeCount: 7,
    tags: [{ productId: 'p6', productName: 'Cotton Tee', price: 899, x: 45, y: 38 }],
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'post_5', userId: 'u_sample5', userName: 'Sneha Joshi',
    imageUrl: null, imageBg: '#2a2a1a',
    caption: 'Street style inspo from today\'s walk in the city 🏙️',
    likeCount: 52,
    tags: [
      { productId: 'p7', productName: 'Gold Earrings', price: 1299, x: 52, y: 22 },
      { productId: 'p8', productName: 'Canvas Tote',   price: 1100, x: 30, y: 68 },
    ],
    createdAt: Date.now() - 172800000,
  },
];

export const PRODUCTS = [
  { id: 'p1', name: 'White Sneakers',  price: 2999, purchaseLink: '#' },
  { id: 'p2', name: 'Denim Jacket',    price: 4499, purchaseLink: '#' },
  { id: 'p3', name: 'Linen Trousers',  price: 3200, purchaseLink: '#' },
  { id: 'p4', name: 'Leather Bag',     price: 5999, purchaseLink: '#' },
  { id: 'p5', name: 'Sunglasses',      price: 1800, purchaseLink: '#' },
  { id: 'p6', name: 'Cotton Tee',      price: 899,  purchaseLink: '#' },
  { id: 'p7', name: 'Gold Earrings',   price: 1299, purchaseLink: '#' },
  { id: 'p8', name: 'Canvas Tote',     price: 1100, purchaseLink: '#' },
];

// ── App ────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers]   = useState(() => JSON.parse(localStorage.getItem('ts_users') || '[]'));
  const [posts, setPosts]   = useState(() => JSON.parse(localStorage.getItem('ts_posts') || 'null') || SAMPLE_POSTS);
  const [likes, setLikes]   = useState(() => JSON.parse(localStorage.getItem('ts_likes') || '{}'));
  const [screen, setScreen] = useState('feed');
  const [toast, setToast]   = useState('');

  // Persist
  useEffect(() => { localStorage.setItem('ts_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ts_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('ts_likes', JSON.stringify(likes)); }, [likes]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  }

  function handleLogin(email, password) {
    let user = users.find(u => u.email === email && u.password === password);
    if (!user && email === 'shivam@email.com' && password === 'password123') {
      user = { id: 'demo', name: 'Shivam Kumar', email: 'shivam@email.com', password: 'password123' };
    }
    if (!user) return 'Invalid email or password.';
    setCurrentUser(user);
    setScreen('feed');
    return null;
  }

  function handleRegister(name, email, password) {
    if (users.find(u => u.email === email)) return 'Email already registered.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    const user = { id: 'u_' + Date.now(), name, email, password };
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
    setScreen('feed');
    return null;
  }

  function handleLogout() {
    setCurrentUser(null);
    setScreen('feed');
  }

  function handleToggleLike(postId) {
    const uid = currentUser.id;
    setLikes(prev => {
      const userLikes = prev[uid] || [];
      const alreadyLiked = userLikes.includes(postId);
      return {
        ...prev,
        [uid]: alreadyLiked
          ? userLikes.filter(id => id !== postId)
          : [...userLikes, postId],
      };
    });
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, likeCount: p.likeCount + ((likes[uid] || []).includes(postId) ? -1 : 1) }
          : p
      )
    );
  }

  function handleCreatePost(postData) {
    const post = {
      id: 'post_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      createdAt: Date.now(),
      likeCount: 0,
      imageBg: null,
      ...postData,
    };
    setPosts(prev => [post, ...prev]);
    showToast('✓ Post published!');
    setScreen('feed');
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentUser={currentUser}
        activeScreen={screen}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
      <main className="app-main">
        {/* Mobile topbar */}
        <div className="mobile-topbar">
          <span className="mobile-logo">Tag<span>Shop</span></span>
          <div className="avatar sm">{currentUser.name.charAt(0).toUpperCase()}</div>
        </div>

        {screen === 'feed' && (
          <Feed
            posts={posts}
            currentUserId={currentUser.id}
            likes={likes}
            onToggleLike={handleToggleLike}
          />
        )}
        {screen === 'create' && (
          <CreatePost
            products={PRODUCTS}
            onSubmit={handleCreatePost}
          />
        )}
        {screen === 'profile' && (
          <Profile
            currentUser={currentUser}
            posts={posts}
            likes={likes}
          />
        )}
      </main>
      <Toast message={toast} />
    </div>
  );
}
