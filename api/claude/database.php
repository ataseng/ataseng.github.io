<?php

$env = parse_ini_file('.env');

define("SERVER_NAME", "ataseng.com");
define("FRONTEND_ORIGIN", "https://ataseng.com");

define("DB_NAME", $env["DB_NAME"]);
define("DB_USERNAME", $env["DB_USERNAME"]);
define("DB_PASSWORD", $env["DB_PASSWORD"]);
define("DB_SERVER", "mysql:host=" . SERVER_NAME . ";dbname=" . DB_NAME);

class Database {
    private $host = "localhost";
    private $db_name = "admin_system";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                )
            );
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

?>