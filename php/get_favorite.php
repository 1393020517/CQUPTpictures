<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/3/27
 * Time: 20:49
 * function: 返回用户收藏的图片
 */
session_start();
header("content-type: text/html; charset=utf-8");
include_once("conn.php");
const NUM_PAGE = 12;
$page = $_POST['page'];
$id = $_SESSION["id"];
$sql= "SELECT favorite FROM USERINFO WHERE ID='".$id."'";
$result=mysqli_query($a,$sql);
$row = mysqli_num_rows($result);
if ($row == 0) {
    echo json_encode(["status" => false]);    //无收藏图片
} else {
    $new_arr = explode(",",$result->fetch_assoc()['favorite']);
    $rows = [];
    for ($i = ($page - 1) * NUM_PAGE; $i < NUM_PAGE * $page; $i++) {
        if ($i < count($new_arr)) {
            $result = mysqli_query($a,"SELECT label FROM photos WHERE paths='".$new_arr[$i]."'");
            $rows[] = array("title" => $result->fetch_assoc()['label'], "src" => $new_arr[$i]);
        } else {
            $rows[] = array("title" => "", "src" => "");
        }
    }
    echo json_encode($rows);
}