<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 21:48
 * Function: 点赞量
 * Add: 在photos里添加 click
 */
header("Content-type:text/html;charset=GB2312");
include_once ("conn.php");
$path = $_POST['click'];
$str = "SELECT click FROM photos WHERE paths=$path";
$click_num = mysqli_query($a,$str);
$click_num++;
mysqli_query($a,"UPDATE photos SET click=$click_num WHERE paths=$path");