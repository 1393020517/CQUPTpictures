

window.onload=function () {

    var cookie=getCookie('cookie_name');
    if(cookie==='' ){
        location = "./index.html"
    }
};





/*导航栏*/
document.getElementById('to_collect').onclick=function(){
    document.getElementById('main').style.display="";
    document.getElementById('information').style.display="none";
    document.getElementById('inbox').style.display="none";
};
document.getElementById('to_help').onclick=function(){
    document.getElementById('main').style.display="";
    document.getElementById('information').style.display="none";
    document.getElementById('inbox').style.display="none";
};



/*用户框*/
$(function ()
{
    $('.change a').click(function ()
    {
        $('.signform').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
    });
});

function start() {
    document.getElementById('signform').style.display=""
}

function signclose() {
    document.getElementById('signform').style.display="none";
    document.getElementById('registerform').style.display="none"
}
/*用户框*/


/*搜索框*/
layui.use(['form'], function(){
    var layer = layui.layer
});
/*搜索跳转*/


var search_result=document.getElementById('search_btn');
search_result.onclick=function () {
    var search_text=document.getElementById('search_1').value;
    if(search_text===''){
        layer.msg('输入框不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    else{

        var search_text1=document.getElementById('search_1').value;
        window.location.href ="./result.html?key="+search_text1
    }
};


// 页面加载
window.onload=function () {



    $.ajax({
        url:"/Home/ Server/user_favorite",/*待修改*/
        type:"GET",
        dataType:"json",
        data:{
            page:1
        },
        success:function (data) {
            var choose_pics=document.getElementsByClassName('choose_pics');

            for(i=0;i<choose_pics.length;i++){
                var sort_pic =choose_pics[i];
                sort_pic.src=data[i].src
            }
            var collect_title=document.getElementsByClassName('collect_title');
            for(i=0;i<collect_title.length;i++){
                var collecttitle=collect_title[i];
                collecttitle.innerHTML=data[i].title
            }

        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    });



    /*加载轮播*/
    $.ajax({
        url:"/Home/Server/user_player",/*待修改*/
        type:"GET",
        dataType:"json",
        data:{

        },
        success:function (data) {
            var carousel_img=document.getElementsByClassName('carousel_img');

            for(i=0;i<carousel_img.length;i++){
                var carousel_pic =carousel_img[i];
                carousel_pic.src=data[i].src
            }

        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    });


/*消息提醒*/
    $.ajax({
        url:"./php/message.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{

        },
        success:function (data) {
            if(data.status){
            document.getElementById('message_remind').style.display=""
            }
            else{

            }
        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
};


/*图片上传*/

    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;


        var title=$("#select").find("option:selected").text();

        //拖拽上传
        upload.render({
            elem: '#upload'
            ,url: '/Home/Client/upload'
            ,size: 10240

            ,auto:false
            ,bindAction:'#upload_button'
            ,accept: 'images'
            ,choose:function (obj) {

                obj.preview(function(index, file, result){
                    $('#images').attr('src', result); //图片链接（base64）

                });

            }
            ,data:{
                file:$("#images").src,
                label:title

            }

            ,done: function(res){
                console.log(res)
            }
        });
    });
/*图片上传*/









/*轮播*/
layui.use(['carousel', 'form'], function(){
    var carousel = layui.carousel
        ,form = layui.form;

    //常规轮播
    carousel.render({
        elem: '#carousel'
        ,arrow: 'hover'
        ,width: '800px'
        ,height: '440px'
        ,anim: 'default'
    });
});
/*轮播*/



/*收藏分页*/
layui.use('laypage', function(){
    var laypage = layui.laypage;

    laypage.render({
        elem: 'collect_page' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 50 //数据总数，从服务端得到
        ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
        ,theme: '#1E9FFF'
        ,jump: function(obj){
            //得到当前页，以便向服务端请求对应页的数据。
            $.ajax({
                url:"/Home/ Server/user_favorite",/*待修改*/
                type:"POST",
                dataType:"json",
                data:{
                    page:obj.curr
                },
                success:function (data) {
                    var choose_pics=document.getElementsByClassName('choose_pics');

                    for(i=0;i<choose_pics.length;i++){
                        var sort_pic =choose_pics[i];
                        sort_pic.src=data[i].src
                    }
                    var collect_title=document.getElementsByClassName('collect_title');
                    for(i=0;i<collect_title.length;i++){
                        var collecttitle=collect_title[i];
                        collecttitle.innerHTML=data[i].title
                    }

                },
                error:function () {
                    layer.open({
                        type: 1
                        ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                        ,btn: '关闭'
                        ,offset: '100px'
                        ,btnAlign: 'c' //按钮居中
                        ,area: ['220px', ]
                        ,shade: 0 //不显示遮罩
                        ,yes: function(){
                            layer.closeAll();
                        }
                    });
                }
            })

        }
    });
});
/*收藏分页*/



// 删除收藏


function collect_del(number) {
    var imgs=document.getElementById('collect_pic'+number).src;
    $.ajax({
        url:"/Home/Client/delete_favorite",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            del_img:imgs
        },
        success:function (data) {
        if(data.status){
            layer.msg('删除成功', {
                icon: 1,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
        document.getElementById('collect_pics-'+number).style.display="none"
        }


        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}



/******************收件箱**********************/

function into_box() {
    document.getElementById('message_remind').style.display="none";
    document.getElementById('main').style.display="none";
    document.getElementById('information').style.display="none";
    document.getElementById('inbox').style.display="";
    layui.use('laypage', function(){
        var laypage = layui.laypage;

        laypage.render({
            elem: 'inbox_page' //注意，这里的 是 ID，不用加 # 号
            ,count: 50 //数据总数，从服务端得到
            ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
            ,theme: '#1E9FFF'
            ,jump: function(obj){
                //得到当前页，以便向服务端请求对应页的数据。
                $.ajax({
                    url:"/Home/Server/get_feedback",/*待修改*/
                    type:"GET",
                    dataType:"json",
                    data:{
                        page:obj.curr
                    },
                    success:function (data) {
                        for(i=0;i<data.length;i++){
                            document.getElementById('message_title'+i).innerText=data[i].title;
                            document.getElementById('message_text'+i).innerText=data[i].content;
                            document.getElementById('message_img'+i).src=data[i].src;
                        }

                    },
                    error:function () {
                        layer.open({
                            type: 1
                            ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                            ,btn: '关闭'
                            ,offset: '100px'
                            ,btnAlign: 'c' //按钮居中
                            ,area: ['220px', ]
                            ,shade: 0 //不显示遮罩
                            ,yes: function(){
                                layer.closeAll();
                            }
                        });
                    }
                })

            }
        });
    });



}



/*动态加载*/
// var receive=document.getElementById('receive');
// for(i=0;i<data.length;i++){
//     var inner  = '<div class="layui-colla-item">'+'<h2 class="layui-colla-title" style="position: relative;">'+data.title[i]+'<button class="layui-btn layui-btn-sm layui-btn-normal del_message" onclick="delmessage('+i+')">删除消息</button>'+'</h2>'+'<div class="layui-colla-content">'+'<p>'+data.content[i]+'</p>'+'<img src="'+data[i].src+'" alt="" id="message_img'+i+'">'+'</div>'+ '</div>';
//     receive.appendChild(inner)
// }
/*动态加载*/


/*删除消息*/

function delmessage(number) {
    var message_img=document.getElementById('message_img'+number);
    $.ajax({
        url:"/Home/Client/delete_feedback_photo",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
           path:message_img,
        },
        success:function (data) {
            layer.msg('删除成功', {
                icon: 1,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}


// 收件箱分页

/*个人信息*/


/*修改*/
document.getElementById('change').onclick=function(){
    document.getElementById('name').removeAttribute('disabled');
    document.getElementById('pwd').removeAttribute('disabled');
    document.getElementById('phone').removeAttribute('disabled');
    document.getElementById('email').removeAttribute('disabled');

}

function information() {
    document.getElementById('main').style.display="none";
    document.getElementById('inbox').style.display="none";
    document.getElementById('information').style.display="";

    $.ajax({
        url:"/Home/Server/get_info",/*待修改*/
        type:"GET",
        dataType:"json",
        data:{

        },
        success:function (data) {

            document.getElementById('name').value=data.username;
            document.getElementById('pwd').value=data.password;
            document.getElementById('phone').value=data.phone;
            document.getElementById('email').value=data.email;

            layer.msg('保存成功', {
                icon: 1,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}



    document.getElementById('save_infor').onclick=function () {

        var email = document.getElementById("email").value;
        var name = document.getElementById("user_name").value;
        var pwd = document.getElementById("email").value;
        var phone = document.getElementById("user_name").value;
        var email_test =new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var phone_test =new RegExp("^1[3|4|5|8][0-9]\\d{4,8}$");
        var pwd_test=new RegExp("^[\\S]{6,12}$");
        if(email===''){
            layer.msg('邮箱不能为空', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(pwd===''){
            layer.msg('密码不能为空', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(phone===''){
            layer.msg('手机号不能为空', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(name===''){
            layer.msg('用户名不能为空', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(!phone_test.test(phone)){
            layer.msg('请输入正确的手机号', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(!email_test.test(email)){
            layer.msg('邮箱格式不正确', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }
        if(!pwd_test.test(pwd)){

            layer.msg('密码必须6到12位，且不能出现空格', {
                icon: 2,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, );
            return false;
        }

        $.ajax({
            url:"/Home/Client/update_info",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                username:name,
                password:pwd,
                email:email,
                phone:phone,
            },
            success:function (data) {

               if(data.status){
                   document.getElementById('name').value=data.name;
                   document.getElementById('pwd').value=data.pwd;
                   document.getElementById('phone').value=data.phone;
                   document.getElementById('email').value=data.email;
                   document.getElementById('name').setAttribute('disabled','true');
                   document.getElementById('pwd').setAttribute('disabled','true');
                   document.getElementById('phone').setAttribute('disabled','true');
                   document.getElementById('email').setAttribute('disabled','true');
                   layer.msg('保存成功', {
                       icon: 1,
                       time: 1000 //2秒关闭（如果不配置，默认是3秒）
                   }, );
               }


            },
            error:function () {
                layer.open({
                    type: 1
                    ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                    ,btn: '关闭'
                    ,offset: '100px'
                    ,btnAlign: 'c' //按钮居中
                    ,area: ['220px', ]
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        })
    }


/*返回按钮*/
function inbox_back() {
    document.getElementById('main').style.display="";
    document.getElementById('inbox').style.display="none";
    document.getElementById('information').style.display="none";
}
function information_back() {
    document.getElementById('main').style.display="";
    document.getElementById('inbox').style.display="none";
    document.getElementById('information').style.display="none";
}