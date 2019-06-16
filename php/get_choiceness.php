<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/6/12
 * Time: 17:01
 * Function: 返回精选图片
 */
include_once("conn.php");
const NUM_PAGE = 8;   //定义常量
$page = $_POST['page'];
$result = mysqli_query($a,"SELECT paths FROM photos");
    $new_arr = [];
    while ($resarr = mysqli_fetch_row($result)) {
        $new_arr[] = $resarr[0];
    }
    $rows = [];
    for ($i = ($page-1)*NUM_PAGE ; $i < $page*NUM_PAGE; $i++) {
        if ($i < count($new_arr)) {     //如果还有图就传图,防止溢出
            $result1 = mysqli_query($a, "SELECT ID, label FROM photos WHERE paths='" . $new_arr[$i] . "'");
            $arr = mysqli_fetch_assoc($result1);
            $label = $arr['label'];
            $id = $arr['ID'];
            $new_path = $new_arr[$i];   //返回的路径是html文件上一层的file
            $rows[] = array('src' => $new_path, 'title' => $label);
        } else {        //没有就传空元素
            $rows[] = array('src' => "", 'title' => "");
        }
    }
echo json_encode($rows);