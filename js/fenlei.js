


function fenlei(number) {

    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var fenleipic=document.getElementById('fenleipic'+i);
                fenleipic.src=data[i].src
            }

            for(i=0;i<data.length;i++){

                var point=document.getElementById('point'+1);
                point.innerHTML=data[i].title


            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
};


function into_result(number) {

        var search_text=document.getElementById('point'+number).innerText;

            window.location.href ="./result.html?key="+search_text
}