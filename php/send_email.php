<?php
session_start();
require_once("PHPMailer.php");
require_once("SMTP.php");
require_once("conn.php");
$id = $_POST['id'];
$result = mysqli_query($a,"SELECT email FROM USERINFO WHERE ID = '".$id."'");
$email = $result->fetch_assoc()['email'];
// 实例化PHPMailer核心类
$mail = new PHPMailer();
// 是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式
$mail->SMTPDebug = 1;
// 使用smtp鉴权方式发送邮件
$mail->isSMTP();
// smtp需要鉴权 这个必须是true
$mail->SMTPAuth = true;
// 链接qq域名邮箱的服务器地址
$mail->Host = 'smtp.163.com';
// 设置使用ssl加密方式登录鉴权
$mail->SMTPSecure = 'ssl';
// 设置ssl连接smtp服务器的远程服务器端口号
$mail->Port = 465;
// 设置发送的邮件的编码
$mail->CharSet = 'UTF-8';
// 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
$mail->FromName = '重邮e站项目部团队';
// smtp登录的账号
$mail->Username = 'e_station_team@163.com';
// smtp登录的密码 使用生成的授权码
$mail->Password = 'estation123';
// 设置发件人邮箱地址 同登录账号
$mail->From = 'e_station_team@163.com';
// 邮件正文是否为html编码 注意此处是一个方法
$mail->isHTML(true);
// 设置收件人邮箱地址
//$mail->addAddress('1103923008@qq.com');
$mail->addAddress($email);
// 添加多个收件人 则多次调用方法即可
//$mail->addAddress('87654321@163.com');
// 添加该邮件的主题
$mail->Subject = '找回密码';
// 添加邮件正文
function makecode($num=4) {
    $re = '';
    $s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    while(strlen($re)<$num) {
        $re .= $s[mt_rand(0, strlen($s)-1)]; //从$s中随机产生一个字符
    }
    return $re;
}
$code = makecode(8);
mysqli_query($a,"UPDATE USERINFO SET verification_code WHERE ID='".$id."'");
mysqli_query($a,"UPDATE USERINFO SET verification_time WHERE ID='".time()."'");
$return_words = "亲爱的：".$id.",您的验证码是：".$code."。请进入下方链接重置您的密码，谢谢您的配合！（验证码10分钟内有效）";
$return_words .= "<br>"."<a href='http://localhost/photosbasement2/cqupt1.1/password.html'>http://localhost/photosbasement2/cqupt1.1/password.html</a>";
$mail->Body = $return_words;
// 为该邮件添加附件
//$mail->addAttachment('./example.pdf');
// 发送邮件 返回状态
$status = $mail->send();