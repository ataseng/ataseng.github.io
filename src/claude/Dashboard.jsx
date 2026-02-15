import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Admin Panel</h1>
        </div>
        <div className="navbar-menu">
          <span className="user-info">
            {user?.full_name} ({user?.role})
          </span>
          <button onClick={handleLogout} className="btn btn-logout">
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Hoş Geldiniz, {user?.full_name}!</h2>
          <p>Rol: <strong>{user?.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</strong></p>
        </div>

        <div className="cards-container">
          <div className="card">
            <div className="card-icon">👤</div>
            <h3>Profil Bilgileri</h3>
            <p>Email: {user?.email}</p>
            <p>ID: {user?.id}</p>
          </div>

          {isAdmin() && (
            <div 
              className="card card-clickable" 
              onClick={() => navigate('/users')}
            >
              <div className="card-icon">👥</div>
              <h3>Kullanıcı Yönetimi</h3>
              <p>Kullanıcıları görüntüle, ekle, düzenle ve sil</p>
              <button className="btn btn-primary">Yönet</button>
            </div>
          )}

          <div className="card">
            <div className="card-icon">🔐</div>
            <h3>Güvenlik</h3>
            <p>JWT token ile güvenli kimlik doğrulama</p>
            <p>Otomatik token yenileme aktif</p>
          </div>
        </div>

        {!isAdmin() && (
          <div className="info-box">
            <p>ℹ️ Kullanıcı yönetimi için admin yetkisine ihtiyacınız var.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;