import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
        <h1>SME Project Management System</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2026 SME Project Management System</p>
      </footer>
    </div>
  );
};

export default MainLayout;