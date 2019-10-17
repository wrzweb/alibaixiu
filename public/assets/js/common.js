$('#logout').on('click',function(){
    var bool=confirm('确定要退出');
    if(bool) {
        $.ajax({
            type:'post',
            url:'/logout',
            success:function(res) {
                console.log(res);
                
                //跳转到登录页
               location.href='login.html'
                
            },
            error:function(){
                alert('退出失败')
            }
        })
    }
})