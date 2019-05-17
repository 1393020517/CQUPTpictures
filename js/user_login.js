

/*********cookie******************/
function setCookie(c_name,value,expireseconds){
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireseconds * 1000);
    document.cookie=c_name+ "=" +escape(value)+
        ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start, c_end));
        }
    }

    return "";
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/***cookie********/



window.onload=function () {

    var cookie=getCookie('cookie_name');
    if(cookie==='' || username!==cookie){
        location = "./index.html"
    }
};




/*改用户名*/
var change_username= document.getElementById('change_btn');

change_username.onclick =function() {
    var username=getCookie('cookie_name');
    var form_username=document.getElementById("form_id").value;
    var user_name=document.getElementById("new_id").value;
    if(form_username === "") {
        alert("原用户名不能为空!");
        return false;
    }
    if(user_name === "") {
        alert("新用户名不能为空!");
        return false;
    }
    else {
        $.ajax({
            url:"./php/index3.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                id2:username,
                olduser:form_username,
                newuser:user_name
            },
            success:function(data){

                if (data.status) {/*indexOf("true")>-1*/
                    // location = "./用户界面.html"/*待修改*/
                    alert('修改成功')
                }
                else if(data.status==='unfound')
                {
                    document.getElementById('signform').style.display="none";
                    alert('找不到原用户名')
                }
                else {
                    document.getElementById('signform').style.display="none";
                    alert('用户名重复')
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('signform').style.display="none";
                alert('无法连接服务器')
            }
        })
    }

};






/*修改密码*/






var changepwd = document.getElementById('changepwd');
changepwd.onclick =function() {
    var password = document.getElementById("registerpwd").value;
    var repsword = document.getElementById("registerrepwd").value;
    var registername =document.getElementById("registeruser").value;
    var formpwd =document.getElementById("registerformpwd").value;
    if (registername ===''){
        alert('学号不能为空！');
        return false;
    }
    if(password === ''){
        alert('密码不能为空！');
        return false;
    }
    if(formpwd === ''){
        alert('原密码不能为空！');
        return false;
    }
    if(repsword === ''){
        alert('密码不能为空！');
        return false;
    }
    if(password !== repsword) {
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
                id:registername,
                oldpwd:formpwd,
                newpwd:password
            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('registerform').style.display="none";
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