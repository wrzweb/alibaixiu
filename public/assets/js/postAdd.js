//获取分类的ajax数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res) {
        console.log(res);
        
        var html=template('categoryTpl',{data:res});
        $('#category').html(html)
    }
})
//图片上传功能
$('#feature').on('change',function(){
    var fd=new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res) {
            console.log(res);
            $('.thumbnail').attr('src',res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar)
            
        }

    })

})
$('#addForm').on('submit',function(){
    var data=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:data,
        success:function(){
            location.href='posts.html'
        }
    })
    return false;
})