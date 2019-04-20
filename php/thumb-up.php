<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/24
 * Time: 10:49
 * function: 点赞
 * Add: 在photos中新增thumb-ups
 */
header("Content-type: text/html; charset=GB2312");
include_once("conn.php");
/*以某种形式传点赞数*/
$path = $_POST['zan'];
$str = "SELECT thumb-ups From photos WHERE paths=$path";
$num = mysqli_qery($a,$str);
$row = mysqli_num_rows($num);
    $num++;
    mysqli_query($a,"UPDATE photos SET thumb-ups=$num WHERE paths=$path");