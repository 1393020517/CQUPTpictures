<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 21:48
 * Function: 点赞量
 * Add: 在photos里添加 click
 * Bug: 前端还要返回page
 */
include_once("conn.php");
/*以某种形式传点赞数*/
$path0 = $_POST['click'];   //返回的是绝对路径
//echo $path0;
preg_match('#file/.+.jpg$#', $path0, $matches);
$path = "./".$matches[0];
$str = "SELECT click From photos WHERE paths='".$path."'";
$result = mysqli_query($a,$str);
$row = mysqli_num_rows($result);
if($row > 0){
    $arr = mysqli_fetch_assoc($result);
    $num = $arr['click'];
    $num++;
    mysqli_query($a,"UPDATE photos SET click ='".$num."' WHERE paths='".$path."'");
    $aff = mysqli_affected_rows($a);
    if($aff>0){
        echo json_encode(["status" => true]);
    }
    else{
        echo json_encode(["status" => false]);
    }
}