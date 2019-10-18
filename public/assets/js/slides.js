$.ajax({
    type:'get',
    url:'/slides',
    success:function(res) {
        var html=template('slidesTpl',{data:res})
        $('#slidesBox').html(html)
    }
})
$('#file').on('change',function(){
    //获取当前文件的数据(二进制的数据)
    var fd=new FormData();
    //formData.append添加键值
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,//不对data数据进行处理
        contentType:false,//jquery不处理数据
        success:function(res) {
            console.log(res);
            //隐藏域保存图片路径
           $('#hiddenImage').val(res[0].avatar)
           //给图片添加src属性和路径,显示图片
           $('.thumbnail').attr('src',res[0].avatar).show();
        }
    })
})
//添加轮播图
$('#slidesForm').on('submit',function(){
    //获取表单数据
    var data=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:data,
        success:function(res) {
            console.log(res);
            //刷新页面
            location.reload()
        }
    })
    return false;
})
// 删除轮播图
$('#slidesBox').on('click','.delete',function(){
    var id=$(this).attr('data-id')
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        data:$(this).serialize(),
        success:function(res) {
            location.reload()
        }
    })
  
})