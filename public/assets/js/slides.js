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
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res) {
           $('#hiddenImage').val(res[0].avatar)
           $('.thumbnail').attr('src',res[0].avatar).show();
        }
    })
})
//添加轮播图
$('#slidesForm').on('submit',function(){
    var data=$(this).serialize();
    console.log(data);
    
    $.ajax({
        type:'post',
        url:'/slides',
        data:data,
        success:function(res) {
            console.log(res);
            
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