<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/24
 * Time: 10:49
 * function: 点赞
 * Add: 在photos中新增thumb-ups
 */
include_once("conn.php");
/*以某种形式传点赞数*/
$path0 = $_POST['zan'];   //返回的是绝对路径
preg_match('#file/.+.jpg$#', $path0, $matches);
//echo $path0;
$default = "http://127.0.0.1/photosbasement2/cqupt0.9/img/test.png";    //点赞了默认的路径
if($path0 == $default){
  echo json_encode(["status" => "default"]);
}
else {
//    echo $path0."<br>";
    $path = "./" . $matches[0];
    $str = "SELECT `thumb-ups` From photos WHERE paths='" . $path . "'";
    $result = mysqli_query($a, $str);
    $row = mysqli_num_rows($result);
    if ($row > 0) {
        $arr = mysqli_fetch_assoc($result);
        $num = $arr['thumb-ups'];
//        echo $num;
        $num++;
//        echo "<br>$num";
        mysqli_query($a, "UPDATE photos SET `thumb-ups`='" . $num . "' WHERE paths='" . $path . "'");
        $aff = mysqli_affected_rows($a);
        if ($aff > 0) {
            echo json_encode(["status" => true]);
        } else {
            echo json_encode(["status" => false]);   //点赞不成功
        }
    } else {
        echo json_encode(["status" => false]);    //没有找到改图片
    }
}