<?php
/* =====================================
   signup.php - receives the signup form
===================================== */

require "db.php";

// 1. Only accept data sent by the form (POST)
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: signup.html");
    exit;
}

// 2. Collect what the person typed
$fullName        = trim($_POST["full_name"] ?? "");
$email           = strtolower(trim($_POST["email"] ?? ""));
$password        = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirm_password"] ?? "";

// 3. Check everything (the browser checks too, but never trust only the browser)
if ($fullName === "" || $email === "" || $password === "") {
    header("Location: signup.html?error=empty");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: signup.html?error=email");
    exit;
}

if (strlen($password) < 8) {
    header("Location: signup.html?error=weak");
    exit;
}

if ($password !== $confirmPassword) {
    header("Location: signup.html?error=mismatch");
    exit;
}

try {

    // 4. Is this email already used?
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->fetch()) {
        header("Location: signup.html?error=exists");
        exit;
    }

    // 5. Scramble the password so the real one is never stored
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // 6. Save the new user
    $insert = $pdo->prepare(
        "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)"
    );
    $insert->execute([$fullName, $email, $passwordHash]);

    // 7. Send them to the login page with a success message
    header("Location: login.html?registered=1");
    exit;

} catch (PDOException $error) {

    header("Location: signup.html?error=server");
    exit;

}