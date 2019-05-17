




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







/*登录框*/
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
/*登录框*/













window.onload=function(){

    /*分类图片*/
    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{

        },
        success:function (data) {
            var sort_pics=document.getElementsByClassName('sort_pics');

            for(i=0;i<sort_pics.length;i++){
                var sort_pic =sort_pics[i];
                sort_pic.src=data[i].src
            }
            var sort_title=document.getElementsByClassName('sort_title');
            for(i=0;i<sort_title.length;i++){
                var sorttitle=sort_title[i];
                sorttitle.innerHTML=data[i].title
            }

        },
        error:function () {
            alert('无法连接服务器')
        }
    })



    /*精选图片*/



    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1
        },
        success:function (data) {
            var pictures=document.getElementsByClassName('choose_pics');

            for(i=0;i<pictures.length;i++){
                var picture=pictures[i];
                picture.src=data[i].src
            }
            var chose_title=document.getElementsByClassName('chose_title');
            for(i=0;i<chose_title.length;i++){
                var chosetitle=chose_title[i];
                chosetitle.innerHTML=data[i].title
            }

        },
        error:function () {
            alert('无法连接服务器')
        }
    })


};



/*精选图片分页*/
layui.use('laypage', function(){
    var laypage = layui.laypage;


    laypage.render({
        elem: 'choose_page' //注意，这里的 test1 是 ID，不用加 # 号
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
                    var sort_pics=document.getElementsByClassName('sort_pics');

                    for(i=0;i<sort_pics.length;i++){
                        var sort_pic =sort_pics[i];
                        sort_pic.src=data[i].src
                    }
                    var sort_title=document.getElementsByClassName('sort_title');
                    for(i=0;i<sort_title.length;i++){
                        var sorttitle=sort_title[i];
                        sorttitle.innerHTML=data[i].title
                    }

                },
                error:function () {
                    alert('无法连接服务器')
                }
            })

        }
    });
});




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

/*精选点赞*/


function choose_nice(number) {
    var pic=document.getElementById('choose_nice'+number).src;
    $.ajax({
        url:"./php/thumb-up.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            zan:pic,

        },
        success:function(data){

            if(data.status){
                document.getElementById('choose_nice'+number).style.display="none";
                document.getElementById('choose_nice_on-'+number).style.display=""
            }
            else
            {
                if(data.status==='default'){
                    alert('不要赞默认图片哦')
                }
                else{
                    alert('点赞失败')
                }
            }

        },
        error:function(){

            alert('无法连接服务器')
        }
    })
}

/*精选点击*/
function choose_click(number) {
    var pic=document.getElementById('choose_pic'+number).src;
    $.ajax({
        url:"./php/click.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            click:pic,

        },
        success:function(data){
            if(data.status){
                alert('ok')
            }
            else
            {
                if(data.status==='default'){
                    alert('默认图片哦')
                }
                else{
                    alert('点击失败')
                }
            }
        },
        error:function(){

            alert('无法连接服务器')
        }
    })
}

/*精选收藏*/
function choose_collect(number) {
    var cookie=getCookie('cookie_name');
    if (cookie===''){
        alert('请先登录');
        document.getElementById('signform').style.display=""

    }
    else{
        var pic=document.getElementById('choose_pic'+number).src;
        $.ajax({
            url:"./php/thumb-up.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                cang:pic,

            },
            success:function(data){

                if(data.status){
                    document.getElementById('choose_collect'+number).style.display="none";
                    document.getElementById('choose_collect_on-'+number).style.display=""
                }
                else
                {
                    if(data.status==='default'){
                        alert('不要赞默认图片哦')
                    }
                    else{
                        alert('点赞失败')
                    }
                }

            },
            error:function(){

                alert('无法连接服务器')
            }
        })
    }

}

/*分类点赞*/


function sort_nice(number) {
    var pic=document.getElementById('sort_pic'+number).src;
    $.ajax({
        url:"./php/thumb-up.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            zan:pic,

        },
        success:function(data){

            if(data.status){
                document.getElementById('sort_nice'+number).style.display="none";
                document.getElementById('sort_nice_on-'+number).style.display=""
            }
            else
            {
                if(data.status==='default'){
                    alert('不要赞默认图片哦')
                }
                else{
                    alert('点赞失败')
                }
            }

        },
        error:function(){

            alert('无法连接服务器')
        }
    })
}

/*分类点击*/
function sort_click(number) {
    var pic=document.getElementById('sort_pic'+number).src;
    $.ajax({
        url:"./php/click.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            click:pic,

        },
        success:function(data){
            if(data.status){
                alert('ok');
                var title=document.getElementsByClassName('sortitle')[number];
                window.location.href ="./result.html?key="+title
            }
            else
            {
                if(data.status==='default'){
                    alert('默认图片哦')
                }
                else{
                    alert('点击失败')
                }
            }
        },
        error:function(){

            alert('无法连接服务器')
        }
    })
}

/*分类收藏*/


function sort_collect(number) {
    var cookie=getCookie('cookie_name');
    if (cookie===''){
        alert('请先登录');
        document.getElementById('signform').style.display=""
    }
    else{

        var pic=document.getElementById('sort_pic'+number).src;
        $.ajax({
            url:"./php/thumb-up.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                cang:pic,

            },
            success:function(data){

                if(data.status){
                    document.getElementById('sort_collect'+number).style.display="none";
                    document.getElementById('sort_collect_on-'+number).style.display=""
                }
                else
                {
                    if(data.status==='default'){
                        alert('不要赞默认图片哦')
                    }
                    else{
                        alert('点赞失败')
                    }
                }

            },
            error:function(){

                alert('无法连接服务器')
            }
        })

    }

}
