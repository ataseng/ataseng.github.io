import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'user',
    is_active: 1,
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUser) {
        const updateData = { ...formData, id: editingUser.id };
        await userService.update(updateData);
      } else {
        await userService.create(formData);
      }
      
      setShowModal(false);
      resetForm();
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'İşlem başarısız');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        await userService.delete(id);
        loadUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Kullanıcı silinemedi');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: '',
      full_name: user.full_name,
      role: user.role,
      is_active: user.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      full_name: '',
      role: 'user',
      is_active: 1,
    });
    setEditingUser(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="user-management-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Kullanıcı Yönetimi</h1>
        </div>
        <div className="navbar-menu">
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Dashboard
          </button>
          <button onClick={handleLogout} className="btn btn-logout">
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="content">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Yeni Kullanıcı Ekle
          </button>
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Durum</th>
                <th>Kayıt Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                      {user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.is_active ? 'badge-active' : 'badge-inactive'}`}>
                      {user.is_active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('tr-TR')}</td>
                  <td>
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(user)}
                      title="Düzenle"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(user.id)}
                      title="Sil"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ad Soyad *</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={editingUser}
                />
              </div>

              <div className="form-group">
                <label>Şifre {editingUser && '(boş bırakılırsa değişmez)'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                />
              </div>

              <div className="form-group">
                <label>Rol *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="user">Kullanıcı</option>
                  <option value="admin">Yönetici</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  />
                  {' '}Aktif
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;