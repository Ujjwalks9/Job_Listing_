import React from "react";
import "./Header.css"; // Import CSS styles

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo-section">
        <a aria-label="Go to Remote" className="logo-link" href="https://remote.com">
          remote.com/jobs
        </a>
      </div>
      <div className="header-navigation-section">
        <nav aria-label="Main navigation" className="main-navigation">
          <ul className="navigation-list">
            <li className="text-link">
              <a href="https://remote.com/jobs/c/for-job-seekers">For Job Seekers</a>
            </li>
            <li className="text-link">
              <a href="https://remote.com/jobs/c/for-employers">For Employers</a>
            </li>
            <li className="text-link">
              <a href="/jobs/pricing">Pricing</a>
            </li>
            <li>
              <button className="signup-button">Sign Up</button>
            </li>
            <li>
              <button className="login-button">Log In</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
