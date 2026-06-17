import { animate } from 'animejs';
import { useRef, useState } from 'react';


export default function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const modalRef = useRef(null);

  // Animate in on mount
  useRef(() => {
    if (modalRef.current) {
      animate({ targets: modalRef.current, scale: [0.9, 1], opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
    }
  });

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const mailto = `mailto:nebscodes@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.location.href = mailto;
    onClose();
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef} onClick={e => e.stopPropagation()}>
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-button">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}
