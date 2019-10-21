$('#logo').on('change',function(){
    //获取到管理员选择到的图片
    var file=this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData=new FormData();
    // 将管理员选择到的文件添加到formDate对象中
    formData.append('logo',file);
    //发送ajax实现文件上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res) {
            console.log(res);
            
           $('#hiddenLogo').val(res[0].logo);
           $('#preview').attr('src',res[0].logo)
            
        }
    })
})
//网站提交
$('#settingsForm').on('submit',function(){
    
    $.ajax({
        type:'post',
        url:'/settings',
        data:$(this).serialize(),
        success:function(res) {
            location.reload();
        }

    })
    return false;
})
//获取网站设置
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res) {
        console.log(res);
        if(res) {
//将logo地址存储在隐藏域中
            $('#hiddenlogo').val(res.val);
            //将logo显示出来
            $('#preview').attr('src',res.logo);

///将网站标题显示在页面中
$('input[name="comment"]').prop('checked',res.comment);
$('input[name="title"]').val(res.title);
$('input[name="review"]').prop('checked',res.review);



        }
    }
})

