import { useState, useRef } from 'react';
import './CreatePost.css';

export default function CreatePost({ products, onSubmit }) {
  const [imageUrl, setImageUrl]           = useState(null);
  const [caption, setCaption]             = useState('');
  const [pendingTags, setPendingTags]     = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [awaitingClick, setAwaitingClick] = useState(false);
  const imageWrapRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImageUrl(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setAwaitingClick(true);
  }

  function handleImageClick(e) {
    if (!awaitingClick || !selectedProduct) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(1));

    setPendingTags(prev => [...prev, {
      productId:   selectedProduct.id,
      productName: selectedProduct.name,
      price:       selectedProduct.price,
      x, y,
    }]);

    setSelectedProduct(null);
    setAwaitingClick(false);
  }

  function removeTag(index) {
    setPendingTags(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (!imageUrl) return;
    onSubmit({ imageUrl, caption, tags: pendingTags });
    // reset
    setImageUrl(null);
    setCaption('');
    setPendingTags([]);
    setSelectedProduct(null);
    setAwaitingClick(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <section className="create-post">
      <div className="create-header">
        <h1 className="create-title">New Post</h1>
        <p className="create-subtitle">Upload a photo and tag the products you're wearing</p>
      </div>

      <div className="create-layout">
        {/* Left: Image zone */}
        <div className="create-left">
          {!imageUrl ? (
            <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
              <span className="upload-icon">↑</span>
              <p className="upload-text"><strong>Click to upload</strong> or drag & drop</p>
              <p className="upload-hint">JPG, PNG — up to 10MB</p>
            </div>
          ) : (
            <>
              <div
                className={`image-preview-wrap ${awaitingClick ? 'crosshair' : ''}`}
                ref={imageWrapRef}
                onClick={handleImageClick}
              >
                <img src={imageUrl} alt="preview" className="preview-image" />
                {/* Render pending tag dots */}
                {pendingTags.map((tag, i) => (
                  <div
                    key={i}
                    className="preview-tag-dot"
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                    title={tag.productName}
                  />
                ))}
                {awaitingClick && (
                  <div className="click-overlay">
                    <span>Click to place tag for <strong>{selectedProduct?.name}</strong></span>
                  </div>
                )}
              </div>

              {/* Change photo */}
              <button className="btn-change-photo" onClick={() => fileInputRef.current.click()}>
                ↺ Change photo
              </button>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Pending tags pills */}
          {pendingTags.length > 0 && (
            <div className="pending-tags">
              {pendingTags.map((tag, i) => (
                <div key={i} className="tag-pill">
                  <span>📍 {tag.productName}</span>
                  <button className="remove-tag" onClick={() => removeTag(i)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Panel */}
        <div className="create-panel">
          {/* Caption */}
          <div>
            <h3 className="panel-title">Caption</h3>
            <textarea
              className="caption-input"
              placeholder="Describe your look..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              rows={4}
            />
          </div>

          {/* Product selection */}
          <div>
            <h3 className="panel-title">Tag a Product</h3>
            <p className="panel-hint">
              {awaitingClick
                ? '→ Now click on the image to place the tag'
                : 'Select a product below, then click on your image'}
            </p>
            <div className="product-list">
              {products.map(p => (
                <button
                  key={p.id}
                  className={`product-option ${selectedProduct?.id === p.id ? 'selected' : ''}`}
                  onClick={() => imageUrl && handleSelectProduct(p)}
                  disabled={!imageUrl}
                >
                  <span className="product-dot" />
                  <span className="product-name">{p.name}</span>
                  <span className="product-price">₹{p.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={!imageUrl}
          >
            Publish Post
          </button>
        </div>
      </div>
    </section>
  );
}
