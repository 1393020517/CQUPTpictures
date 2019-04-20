<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/3/27
 * Time: 20:49
 * function: 返回用户上传的图片
 */
header("content-type: text/html; charset=utf-8");
include_once("conn.php");
$id = $_POST["id"];
$sql= "SELECT saved FROM USERINFO WHERE ID=$id";
$result=mysqli_query($a,$sql);
if(!$result){
    echo json_encode(["status"=>false]);    //未上传图片
}
else{
    $rows = [];
    $result0 = mysqli_fetch_assoc($result);
    $temp0 = $result0['saved'];
    $arr = explode(",",$temp0);
    foreach ($arr as $temp){
        $lable=mysqli_query($a,"SELECT label FROM photos WHERE paths=$temp");//photos是上线图库
        $rows[]=array('title'=>$lable,'src'=>$temp);
    }
    echo json_encode($rows);
}