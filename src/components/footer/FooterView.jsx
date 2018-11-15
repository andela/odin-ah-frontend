import React from 'react';

import './Footer.scss';

const FooterView = () => (
  <footer className="app-footer">
    <div className="footer__content-wrapper">
      <div className="footer__branding" />
      <div className="footer__branding-text">
        <h3 className="footer__branding-title">Authors Haven</h3>
        <p className="footer__branding-message">
          A community of like minded authors that foster innovation and inspiration through writing
          and sharing
        </p>
      </div>
    </div>
  </footer>
);

export default FooterView;
