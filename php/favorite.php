<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/5/1
 * Time: 21:19
 * Function: Collect photos into your favorites.
 */
session_start();
include_once("conn.php");
$path0 = $_POST['fav']; //need checking.
$id = $_SESSION['id'];
//echo $path0;
$default = "http://127.0.0.1/photosbasement2/cqupt0.9/img/test.png";   //默认收藏夹待确认，放到服务器后修改
if($path0 == $default){
    echo json_encode(["status" => "default"]);    //收藏默认图片
}
else{
    preg_match('#file/.+.jpg$#', $path0, $matches);
//echo $matches[0];
    $path = "./".$matches[0];
    $str = "SELECT `added-to` FROM photos WHERE paths = '".$path."'";
    $result = mysqli_query($a,$str);
    $arr = $result->fetch_assoc();
    $adduser = $arr['added-to'];
    if($adduser != NULL)   $adduser = $adduser.','.$id;   //有用户收藏
    else $adduser = $id;
    mysqli_query($a,"UPDATE photos SET `added-to`='".$adduser."' WHERE paths='".$path."'");
    $aff = mysqli_affected_rows($a);
    if($aff > 0){
        $result = mysqli_query($a,"SELECT favorite FROM USERINFO WHERE ID = '".$id."'");
        $content = $result->fetch_assoc();
        $cont = $content['favorite'];
        if($cont != NULL){   //原来有收藏记录
            $insert_path = $cont.','.$path;
            mysqli_query($a,"UPDATE USERINFO SET favorite='".$insert_path."' WHERE ID = '".$id."'");
            if(mysqli_affected_rows($a) > 0){
                echo json_encode(["status" => true]);
            }
            else{
                echo json_encode(["status" => false]);   //更新失败
            }
        }
        else{   //原来没有收藏记录
             mysqli_query($a,"UPDATE USERINFO SET favorite='".$path."' WHERE ID ='".$id."'");
             if(mysqli_affected_rows($a) > 0 ){
                 echo json_encode(["status" => true]);
             }
             else{
                 echo json_encode(["status" => false]);   //更新失败
             }
        }
    }
    else{   //更新收藏用户信息失败
        echo json_encode(["status" => false]);
    }
}