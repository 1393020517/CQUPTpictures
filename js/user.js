
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


/*搜索跳转*/


var search_result=document.getElementById('search_btn');
search_result.onclick=function () {
    var search_text=document.getElementById('search_1').value;
    if(search_text===''){
        alert('输入框不能为空');
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
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
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
            alert('无法连接服务器')
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
            ,url: '/upload/'
            ,size: 10240
            ,data:{
                title:title,
                src:11,
            }
            ,accept: 'images'
            ,before: function(obj){

                obj.preview(function(index, file, result){
                    $('#images').attr('src', result); //图片链接（base64）

                });

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
                url:"./Php/gettemp.php",/*待修改*/
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
                    alert('无法连接服务器')
                }
            })

        }
    });
});
/*收藏分页*/



// 删除收藏


function collect_del(number) {
    var imgs=document.getElementById('collect_pic'+number).src
    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            del_img:imgs
        },
        success:function (data) {
        if(data.status){
            alert('删除成功');
        document.getElementById('collect_pics-'+number).style.display="none"
        }


        },
        error:function () {
            alert('无法连接服务器')
        }
    })
}
