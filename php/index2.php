<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/17
 * Time: 9:51
 * Function: 修改密码
 */
include_once("conn.php");
$oldpwd = $_POST["oldpwd"];
$newpwd = $_POST["newpwd"];
$id = $_POST["id"];
$orisql = "SELECT password FROM USERINFO WHERE ID='".$id."'";
$oriresult = mysqli_query($a, $orisql);
$oripwd = mysqli_fetch_assoc($oriresult);
if ($oripwd['password'] == $oldpwd) {      //判断原密码是否和现在输入的原密码相同
    $sqlstr1 = "UPDATE USERINFO SET password='".$newpwd."' WHERE ID='".$id."'";      //待确认ID
    $result3 = mysqli_query($a, $sqlstr1);
    $aff = mysqli_affected_rows($a);
    if ($aff > 0) {
        echo json_encode(["status" => true]);
    } else {
        echo json_encode(["status" => false]);
    }
} else {
    echo json_encode(["status" => false]);
}