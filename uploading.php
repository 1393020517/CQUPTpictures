<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/18
 * Time: 11:03
 * function: 上传图片到临时文件夹和标签
 */
session_start();
include_once("./php/conn.php");
$id = $_SESSION['id'];
$image = $_POST['file'];
$label = $_POST["title"];
date_default_timezone_set("Asia/Chongqing");
$imageName = "Estation-" . "--" . date("His", time()) . "--" . rand(1111, 9999) . '.jpg';
if (strstr($image, ",")) {
    $image = explode(',', $image);
    $image = $image[1];
}
$insert_path = "./tempfile";
$imageSrc = $insert_path . "/" . $imageName;
$upSrc = "./manager/tempfile" . "/" . $imageName;    //上传地址
$r = file_put_contents($upSrc, base64_decode($image));
if (!$r) {
    echo json_encode(["status" => false]);     //上传不成功
} else {
    $sqlstr3 = "INSERT INTO tempphotos(paths) VALUES('" . $imageSrc . "')";   //tempphotos作为临时存储数据库
//            $extract2 = mysqli_query($a,"SELECT saved FROM USERINFO WHERE ID='$id'");
    mysqli_query($a, $sqlstr3);
    $aff = mysqli_affected_rows($a);
    if (!($aff > 0)) {
        echo json_encode(["status" => false]);    //插入路径到tempphotos不成功
    } else {
        mysqli_query($a, "UPDATE `tempphotos` SET label='" . $label . "',ID='" . $id . "' WHERE paths='" . $imageSrc . "'");
        $aff = mysqli_affected_rows($a);
        if ($aff > 0) {
            echo json_encode(["status" => true]);
        } else {
            echo json_encode(["status" => false]);  //更新信息不成功
        }
    }
}