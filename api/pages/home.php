<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    
    $pdo = db();

    $pdo->beginTransaction();

    $homepage_content_sql = "SELECT * FROM HomePage";

  	$stmt = $pdo->prepare($homepage_content_sql);
	$stmt->execute();
	$homepage_content = $stmt->fetch();

    $team_cards_content_sql = "SELECT Name, Surname, Department, Grade, Position FROM Member WHERE Position = 'Başkan' OR Position = 'Başkan Yardımcısı'";

    $stmt = $pdo->prepare($team_cards_content_sql);
	$stmt->execute();
	$teamcard_content = $stmt->fetchAll();

	$pdo->commit();

	http_response_code(200);
	
    echo json_encode([
        'message' => "success",
        'homepage_content' => $homepage_content,
        "teamcard_content" => $teamcard_content
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
	// http_response_code($e->status);
    http_response_code(500);
	echo json_encode([
        'error' => $e->getMessage()
    ]);
}

?>