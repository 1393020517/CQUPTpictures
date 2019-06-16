<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/16
 * Time: 18:59
 * Function: 登录检验   登录都用id
 * dbname=photos
 */
header("Access-Control-Allow-Origin: *");
session_start();
$id = $_POST["id"];
$pwd = $_POST["pwd"];
header("content-type: text/html; charset=utf-8");
include_once("conn.php");
$result = mysqli_query($a, "SELECT password FROM USERINFO WHERE ID='" . $id . "'");   //获取指定密码
$arrpwd = mysqli_fetch_assoc($result);
if ($pwd != $arrpwd['password']) {
    echo json_encode(["status" => false]);
} else {
    $_SESSION['id'] = $id;
    echo json_encode(["status" => true]);
}