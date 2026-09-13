import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthUI.css";

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className = "",
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
    textArray.length,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}



function AuthFormContainer() {
  const { signInWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already signed in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');
      await signInWithEmail(email);
      setSuccessMessage('Magic link sent! Check your email to sign in.');
    } catch (err) {
      setError(err.message || 'Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h1 className="auth-title">Welcome to E-Cell UCEOU</h1>
        <p className="auth-subtitle">Sign in or create an account to continue</p>
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="auth-success" style={{ 
          background: 'rgba(34, 197, 94, 0.1)', 
          color: '#22c55e', 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleEmailSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="auth-input-email"
          disabled={loading || successMessage}
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
        />
        <button
          type="submit"
          className="auth-button-email"
          disabled={loading || successMessage}
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '12px',
            background: 'var(--brand-primary)',
            color: 'var(--text-inverse)',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: loading || successMessage ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s ease',
            opacity: loading || successMessage ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loading ? (
            <span className="auth-spinner" style={{ borderColor: 'var(--text-inverse) transparent var(--text-inverse) transparent' }} />
          ) : (
            'Send Magic Link'
          )}
        </button>
      </form>

      <p className="auth-google-note" style={{ marginTop: '1.5rem' }}>
        We use passwordless email login to keep your account secure.<br />
        No passwords to remember.
      </p>
    </div>
  );
}

const defaultSignInContent = {
  image: {
    src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png",
    alt: "A beautiful interior design for sign-in",
  },
  quote: {
    text: "Welcome Back! The journey continues.",
    author: "E-Cell UCEOU",
  },
};


export function AuthUI({ signInContent = {} }) {
  const currentContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form-section">
        <AuthFormContainer />
      </div>

      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div className="auth-image-gradient" />

        <div className="auth-quote-container">
          <blockquote className="auth-quote">
            <p className="auth-quote-text">
              “
              <Typewriter
                key={currentContent.quote.text}
                text={currentContent.quote.text}
                speed={60}
              />
              ”
            </p>
            <cite className="auth-quote-author">— {currentContent.quote.author}</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
