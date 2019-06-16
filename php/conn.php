<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/1/30
 * Time: 10:57
**/
$a=/*@*/mysqli_connect("localhost","root","","trail") or die("连接数据库服务器失败！".mysqli_error($a));
mysqli_query($a,"set names utf8");