<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/6/12
 * Time: 15:31
 * Function: 重置密码
 */
include_once("conn.php");
$id = $_POST['id'];
$new_pwd = $_POST['newpwd'];
$code = $_POST["identify"];
$result = mysqli_query($a, "SELECT verification_code AND verification_time FROM USERINFO WHERE ID = '" . $id . "'");
$num = mysqli_num_rows($result);
$rearr = $result->fetch_assoc();
$time = time();
if ($num == 0 or $rearr['verification_code'] != $code) {   //验证码不正确
    echo json_encode(["status" => 300]);
} else if ($time > $rearr['verification_time']+10*60) {    //验证码超时
    echo json_encode(["status" => 400]);
} else {
    mysqli_query($a, "UPDATE USERINFO SET verification_code=null, verification_time=null WHERE ID ='" . $id . "'");
    $aff = mysqli_affected_rows($a);
    if ($aff > 0) echo json_encode(["status" => true]);
    else echo json_encode(["status" => false]);
}