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
            
           $('#hiddenLogo').val(res[0].logo)
            
        }
    })
})