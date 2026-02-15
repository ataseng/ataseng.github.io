# JWT Tabanlı Admin Panel - React & PHP

Profesyonel bir JWT kimlik doğrulama sistemi ile React frontend ve PHP backend kullanılarak geliştirilmiş admin paneli.

## 🚀 Özellikler

### Güvenlik
- ✅ JWT (JSON Web Token) tabanlı kimlik doğrulama
- ✅ Access Token (15 dakika) & Refresh Token (7 gün) mekanizması
- ✅ Otomatik token yenileme
- ✅ Şifrelerin bcrypt ile hashlenmesi
- ✅ CORS koruması
- ✅ SQL Injection koruması (PDO prepared statements)

### Kullanıcı Yönetimi
- ✅ Kullanıcı CRUD işlemleri (Create, Read, Update, Delete)
- ✅ Rol bazlı yetkilendirme (Admin & User)
- ✅ Kullanıcı aktif/pasif durumu
- ✅ Admin-only korumalı sayfalar

### Frontend
- ✅ React Router ile sayfa yönetimi
- ✅ Context API ile state yönetimi
- ✅ Axios interceptor ile otomatik token yenileme
- ✅ Protected Routes
- ✅ Modern ve responsive tasarım

## 📁 Proje Yapısı

```
├── php-backend/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.php          # Giriş endpoint
│   │   │   ├── logout.php         # Çıkış endpoint
│   │   │   └── refresh.php        # Token yenileme
│   │   └── users/
│   │       ├── list.php           # Kullanıcı listesi
│   │       ├── create.php         # Kullanıcı oluşturma
│   │       ├── update.php         # Kullanıcı güncelleme
│   │       └── delete.php         # Kullanıcı silme
│   ├── config/
│   │   └── database.php           # Veritabanı bağlantısı
│   ├── models/
│   │   └── User.php               # User model
│   ├── utils/
│   │   └── JWTHandler.php         # JWT işlemleri
│   ├── database/
│   │   └── schema.sql             # Veritabanı şeması
│   └── composer.json              # PHP bağımlılıkları
│
└── react-frontend/
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.js    # Korumalı route
    │   ├── context/
    │   │   └── AuthContext.js     # Auth state
    │   ├── pages/
    │   │   ├── Login.js           # Giriş sayfası
    │   │   ├── Dashboard.js       # Ana sayfa
    │   │   └── UserManagement.js  # Kullanıcı yönetimi
    │   ├── services/
    │   │   └── api.js             # API servisleri
    │   ├── App.js                 # Ana uygulama
    │   └── index.js               # Giriş noktası
    └── package.json               # React bağımlılıkları
```

## 🛠️ Kurulum

### 1. Gereksinimler

- PHP 7.4 veya üzeri
- MySQL 5.7 veya üzeri
- Composer
- Node.js 14 veya üzeri
- npm veya yarn

### 2. Backend Kurulumu

```bash
# PHP backend dizinine gidin
cd php-backend

# Composer bağımlılıklarını yükleyin
composer install

# Veritabanını oluşturun
mysql -u root -p < database/schema.sql
```

**Önemli:** `config/database.php` dosyasındaki veritabanı bilgilerinizi güncelleyin:
```php
private $host = "localhost";
private $db_name = "admin_system";
private $username = "root";
private $password = "your_password";
```

**Güvenlik:** `utils/JWTHandler.php` dosyasındaki secret key'leri değiştirin:
```php
private $secret_key = "YOUR_UNIQUE_SECRET_KEY_HERE";
private $refresh_secret_key = "YOUR_UNIQUE_REFRESH_SECRET_KEY_HERE";
```

### 3. Frontend Kurulumu

```bash
# React frontend dizinine gidin
cd react-frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

### 4. CORS Ayarları

Eğer farklı bir port kullanıyorsanız, tüm PHP API dosyalarındaki CORS header'larını güncelleyin:

```php
header("Access-Control-Allow-Origin: http://localhost:3000");
```

## 🔐 Test Hesapları

### Admin Hesabı
- **Email:** admin@example.com
- **Şifre:** admin123

### Kullanıcı Hesabı
- **Email:** user@example.com
- **Şifre:** user123

**Önemli:** Üretim ortamında bu hesapları mutlaka değiştirin veya silin!

## 📚 API Endpoints

### Authentication

#### Login
```
POST /api/auth/login.php
Body: {
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### Refresh Token
```
POST /api/auth/refresh.php
Body: {
  "refresh_token": "your_refresh_token"
}
```

#### Logout
```
POST /api/auth/logout.php
Headers: {
  "Authorization": "Bearer your_access_token"
}
```

### User Management (Admin Only)

#### Tüm Kullanıcıları Getir
```
GET /api/users/list.php
Headers: {
  "Authorization": "Bearer your_access_token"
}
```

#### Kullanıcı Oluştur
```
POST /api/users/create.php
Headers: {
  "Authorization": "Bearer your_access_token"
}
Body: {
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name",
  "role": "user",
  "is_active": 1
}
```

#### Kullanıcı Güncelle
```
PUT /api/users/update.php
Headers: {
  "Authorization": "Bearer your_access_token"
}
Body: {
  "id": 1,
  "full_name": "Updated Name",
  "role": "admin",
  "is_active": 1,
  "password": "new_password" // Opsiyonel
}
```

#### Kullanıcı Sil
```
DELETE /api/users/delete.php
Headers: {
  "Authorization": "Bearer your_access_token"
}
Body: {
  "id": 1
}
```

## 🔒 Güvenlik Önlemleri

1. **Secret Key'leri Değiştirin:** `JWTHandler.php` içindeki tüm secret key'leri güçlü ve benzersiz değerlerle değiştirin.

2. **Veritabanı Şifrelerini Güncelleyin:** Varsayılan admin ve user şifrelerini değiştirin veya silin.

3. **HTTPS Kullanın:** Üretim ortamında mutlaka HTTPS kullanın.

4. **CORS Ayarlarını Güncelleyin:** Sadece güvendiğiniz domain'lere izin verin.

5. **Rate Limiting:** API endpoint'lerine rate limiting ekleyin.

6. **Input Validation:** Tüm kullanıcı girdilerini doğrulayın.

## 🎯 Kullanım

1. Uygulamaya http://localhost:3000 adresinden erişin
2. Test hesaplarından biriyle giriş yapın
3. Admin hesabıyla giriş yaparsanız kullanıcı yönetimi sayfasına erişebilirsiniz
4. Access token 15 dakika sonra otomatik olarak yenilenir
5. Refresh token 7 gün geçerlidir

## 🚧 Üretim Ortamı İçin Yapılması Gerekenler

- [ ] Secret key'leri güçlü ve benzersiz değerlerle değiştirin
- [ ] Varsayılan kullanıcı hesaplarını silin
- [ ] HTTPS yapılandırması yapın
- [ ] Environment variables kullanın (.env dosyası)
- [ ] Rate limiting ekleyin
- [ ] Logging sistemi kurun
- [ ] Veritabanı yedekleme planı oluşturun
- [ ] CORS ayarlarını güvenli hale getirin
- [ ] Input validation'ı güçlendirin
- [ ] XSS ve CSRF korumaları ekleyin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 Destek

Sorularınız için issue açabilirsiniz.