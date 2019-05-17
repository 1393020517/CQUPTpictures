







var changepwd = document.getElementById('changepwd');


changepwd.onclick =function() {
    var email = document.getElementById("email").value;
    var registername = document.getElementById("user_name").value;
    var pwd =document.getElementById("pwd").value;
    var new_pwd =document.getElementById("new_pwd").value;
    if (registername ===''){
        alert('学号不能为空！');
        return false;
    }
    if(pwd === ''){
        alert('密码不能为空！');
        return false;
    }
    if(new_pwd === ''){
        alert('密码不能为空');
        return false;
    }
    if(email === ''){
        alert('邮箱不能为空！');
        return false;
    }
    if(pwd !== new_pwd) {
        document.getElementById('registerpwd').value="";
        document.getElementById('registerrepwd').value="";
        alert("两次密码不同，请重新输入");
        return false;
    }
    else {
        $.ajax({
            url:"./php/index2.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                email:email,
                id:registername,
                newpwd:formpwd,

            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('signform').style.display="none";
                    document.getElementById('ok').style.display="";
                    alert('修改成功')
                    /*待修改*/
                }
                else {
                    document.getElementById('registerform').style.display="none";

                    alert('验证失败请重新登录')
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('registerform').style.display="none";
                alert('无法连接服务器')

            }
        })
    }


};



var go=document.getElementById('gotoindex');
go.onclick=function () {
    window.location.href ="./index.html"
}