<?php
/* =====================================
   login.php - receives the login form
===================================== */

session_start();
require "db.php";

// 1. Only accept data sent by the form (POST)
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: login.html");
    exit;
}

// 2. Collect what the person typed
$email    = strtolower(trim($_POST["email"] ?? ""));
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    header("Location: login.html?error=empty");
    exit;
}

try {

    // 3. Look for a user with this email
    $statement = $pdo->prepare(
        "SELECT id, full_name, password_hash FROM users WHERE email = ?"
    );
    $statement->execute([$email]);
    $user = $statement->fetch();

    // 4. Check the password against the scrambled one in the database
    if ($user && password_verify($password, $user["password_hash"])) {

        // 5. Start a fresh session and remember who is logged in
        session_regenerate_id(true);
        $_SESSION["user_id"]   = $user["id"];
        $_SESSION["full_name"] = $user["full_name"];

        header("Location: dashboard.php");
        exit;
    }

    // Wrong email or wrong password (we do not say which one)
    header("Location: login.html?error=invalid");
    exit;

} catch (PDOException $error) {

    header("Location: login.html?error=server");
    exit;

}