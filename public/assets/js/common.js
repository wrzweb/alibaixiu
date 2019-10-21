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

//索要登录用户信息
$.ajax({
    type:'get',
    url:`/users/${userId}`,
    success:function(res) {
        console.log(res);
        
        $('.profile .name').text(res.nickName);
        $('.profile img.avatar').attr('src',res.avatar);
    }
})
