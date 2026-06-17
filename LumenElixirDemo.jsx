import { useState } from 'react';

const PRODUCTS = [
  { emoji: '🧪', name: 'Health Potion Dice',    price: '$24.99' },
  { emoji: '🔮', name: 'Enchanted Orb Bottle',  price: '$34.99' },
  { emoji: '✨', name: 'Luminous Night Vial',   price: '$22.99' },
  { emoji: '🌙', name: 'Arcane Eye Charm',      price: '$9.99'  },
  { emoji: '👑', name: 'Royal Elixir Flask',    price: '$89.99' },
  { emoji: '💜', name: 'Potion Drop Earrings',  price: '$18.99' },
];

export default function LumenElixirDemo() {
  const [page, setPage] = useState('home');

  return (
    <div className="website-demo-container">
      <div className="website-demo-browser">
        <div className="browser-bar">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-url">lumenelixir.com</div>
        </div>
        <div className="website-content">
          <div className="le-header">
            <div className="le-logo">🌙 Lumen Elixir</div>
            <div className="le-nav">
              <a onClick={() => setPage('home')}>Home</a>
              <a onClick={() => setPage('products')}>Products</a>
            </div>
          </div>

          {page === 'home' && (
            <div className="le-home">
              <h1>Welcome to Lumen Elixir</h1>
              <p className="subtitle">Your premium potion bottle craft shop</p>
              <p className="description">Handcrafted bottles for your magical potions, brewed with care and enchanted with purpose.</p>
              <button className="le-cta-button" onClick={() => setPage('products')}>Explore Our Collection</button>
            </div>
          )}

          {page === 'products' && (
            <div className="le-products">
              <h1>Our Potion Bottles</h1>
              <div className="le-products-grid">
                {PRODUCTS.map(p => (
                  <div className="le-product-card" key={p.name}>
                    <div className="le-product-emoji">{p.emoji}</div>
                    <h3>{p.name}</h3>
                    <div className="price">{p.price}</div>
                    <button className="le-buy-btn">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="demo-label">Interactive website demo • Click to explore</p>
    </div>
  );
}
