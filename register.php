<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$conn= new mysqli("localhost","root","","ecommerce");

$username=$_POST['name'];
$email=$_POST['email'];
$password=$_POST['password'];

$check =$conn->query("SELECT*FROM register where email='$email'");
if($check->num_rows>0){
    echo "Email already exists. Try to login <a href='login.php'>ClICK HERE</a>";
}
else{
    $hashed=password_hash($password,PASSWORD_DEFAULT);
    $conn->query("INSERT INTO register(user_name,email,password)VALUES('$username','$email','$hashed')");

    session_start();
    $_SESSION['user']=$email;

    header("Location: categories.html");
}
?>