<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $email;
    public $password;
    public $full_name;
    public $role;
    public $is_active;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Email ile kullanıcı bul
    public function findByEmail() {
        $query = "SELECT id, email, password, full_name, role, is_active, created_at 
                  FROM " . $this->table_name . " 
                  WHERE email = :email 
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        return $stmt;
    }

    // ID ile kullanıcı bul
    public function findById() {
        $query = "SELECT id, email, full_name, role, is_active, created_at 
                  FROM " . $this->table_name . " 
                  WHERE id = :id 
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        return $stmt;
    }

    // Tüm kullanıcıları getir
    public function getAll() {
        $query = "SELECT id, email, full_name, role, is_active, created_at 
                  FROM " . $this->table_name . " 
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Yeni kullanıcı oluştur
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  (email, password, full_name, role, is_active)
                  VALUES (:email, :password, :full_name, :role, :is_active)";

        $stmt = $this->conn->prepare($query);

        // Şifreyi hashle
        $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $hashed_password);
        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":is_active", $this->is_active);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Kullanıcı güncelle
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET full_name = :full_name,
                      role = :role,
                      is_active = :is_active";

        // Eğer şifre değiştiriliyorsa
        if (!empty($this->password)) {
            $query .= ", password = :password";
        }

        $query .= " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":is_active", $this->is_active);
        $stmt->bindParam(":id", $this->id);

        if (!empty($this->password)) {
            $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $hashed_password);
        }

        return $stmt->execute();
    }

    // Kullanıcı sil
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    // Refresh token kaydet
    public function saveRefreshToken($user_id, $refresh_token) {
        $query = "INSERT INTO refresh_tokens (user_id, token) 
                  VALUES (:user_id, :token)
                  ON DUPLICATE KEY UPDATE token = :token, created_at = NOW()";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":token", $refresh_token);

        return $stmt->execute();
    }

    // Refresh token doğrula
    public function validateRefreshToken($user_id, $refresh_token) {
        $query = "SELECT id FROM refresh_tokens 
                  WHERE user_id = :user_id AND token = :token 
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":token", $refresh_token);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    // Refresh token sil (logout)
    public function deleteRefreshToken($user_id) {
        $query = "DELETE FROM refresh_tokens WHERE user_id = :user_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);

        return $stmt->execute();
    }
}
?>