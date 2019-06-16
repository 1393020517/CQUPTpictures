<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/6/12
 * Time: 17:11
 * Function: 返回分类图片
 */
//header("Content-type: text/html;charset = utf-8");
include_once("conn.php");
$result1 = mysqli_query($a, "SELECT paths FROM photos");
$new_arr = [];
while ($resarr = mysqli_fetch_row($result1)) {
    $new_arr[] = $resarr[0];
}
$rows = [];
foreach ($new_arr as $item) {
    $result2 = mysqli_query($a, "SELECT label FROM photos WHERE paths = '" . $item . "'");
    $rows[] = array("src" => $item, "title" => $result2->fetch_assoc()['label']);
}
echo json_encode($rows);