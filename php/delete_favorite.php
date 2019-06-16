<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/6/12
 * Time: 22:15
 * Function: 删除收藏内容
 */
session_start();
include_once ("conn.php");
//$del = $_POST['del_img'];
$del = "http://localhost/photosbasement2/cqupt1.1/file/e.jpg";
//$id = $_SESSION['id'];
$id = "2018212454";
preg_match('#file/.+.jpg$#', $del, $matches);
$path = "./".$matches[0];
$result = mysqli_query($a,"SELECT favorite FROM USERINFO WHERE ID='".$id."'");
$fav_arr = $result->fetch_assoc();
if(strpos($fav_arr['favorite'],",")) $fav_arr = explode(",",$fav_arr['favorite']);
$temp_arr=[];
foreach($fav_arr as $item){
    if($item != $path) $temp_arr[] = $item;
}

if(count($temp_arr) > 1) $update = implode(",",$temp_arr);
else if(empty($temp_arr)) $update = null;
else $update = $temp_arr[0];
mysqli_query($a,"UPDATE USERINFO SET favorite='".$update."' WHERE ID='".$id."'");
$aff = mysqli_affected_rows($a);
if($aff > 0 ) echo json_encode(["status" => true]);
else echo json_encode(["status" => false]);