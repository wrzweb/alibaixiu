//修改密码
$('#modifyForm').on('submit',function(){
    var data=$(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:data,
        success:function(res){
           
            
            location.href='login.html'

        }
    })
    return false;
})