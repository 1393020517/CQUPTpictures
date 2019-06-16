<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/19
 * Time: 16:51
 * function: 搜索功能，前端返回page
 */
//session_start();
header("Content-type: text/html; charset=utf-8");
include_once("conn.php");
const NUM_PAGE = 16;
$page = $_POST['page'];
$words = urldecode($_POST['text']);
$sqlstr = "SELECT paths FROM photos WHERE label='" . $words . "'";
$result = mysqli_query($a, $sqlstr);
$row = mysqli_num_rows($result);
if ($row == 0) {
    echo json_encode(["status" => false]);    //未找到标签
} else {
    $new_arr = [];
    while ($resarr = mysqli_fetch_row($result)) {
        $new_arr[] = $resarr[0];
    }
    $rows = [];
    for ($i = ($page - 1) * NUM_PAGE; $i < NUM_PAGE * $page; $i++) {
        if ($i < count($new_arr)) {
            $rows[] = array("title" => $words, "src" => $new_arr[$i]);
        } else {
            $rows[] = array("title" => "", "src" => "");
        }
    }
    echo json_encode($rows);
}