// src/components/OAuthButtons.jsx
import React from "react";
// import "./OAuthButtons.css";

const OAuthButtons = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:3000/auth/facebook";
  };

  return (
    <div className="oauth-buttons">
      <button onClick={handleGoogleLogin} className="google-btn">
        Login with Google
      </button>
      <button onClick={handleFacebookLogin} className="facebook-btn">
        Login with Facebook
      </button>
    </div>
  );
};

export default OAuthButtons;
