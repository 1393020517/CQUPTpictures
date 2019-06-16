<?php
//include_once ("conn.php");
//$result = mysqli_query($a,"SELECT email FROM USERINFO WHERE ID = '2018212454'");
//echo $result->fetch_assoc()['email'];
session_start();
echo $_SESSION['id'];