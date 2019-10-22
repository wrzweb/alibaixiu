//获取地址栏中的id值
var id=location.search.split('=')[1]
// ajax嵌套ajax
/* $.ajax({
    type:'get',
    url:`/posts/${id}`,
    success:function(res) {
        $.ajax({
            type:'get',
            url:'/categories',
            success:function(res1) {
                
                res.creatList=res1 //把分类的数据作为res的属性
                console.log(res);
                
                //渲染数据应该保证2个ajax数据都回来才能做
                var html=template('modifyTpl',res);
                $('#modifyBox').append(html);
                
                
                
            }
        })
    }
}) */
 //渲染数据应该保证2个ajax数据都回来才能做
 $.when(
     //传入两个ajax
     $.ajax({
         type:'get',
         url:`/posts/${id}`
     }),
     $.ajax({
        type:'get',
        url:'/categories',
     })
 ).done(function(res,res1){
     res=res[0];
     res1=res1[0];
     res.creatList=res1;//把分类数据作为文章数据的属性
     var html=template('modifyTpl',res);
     $('#modifyBox').append(html);
 }) 
// 图片上传
$('#modifyBox').on('change','#feature',function(){
    //表单数据的处理
    var fd=new FormData();
    fd.append('avatar',this.files[0]); //把元素添加给formdata处理
    $.ajax({
        type:'post',
        url:'/upload',
        processData:false,//不对data数据进行序列化处理
        contentType:false, //不对内容进行编码
        data:fd,
        success:function(res){
           $('#preview').attr('src',res[0].avatar);//给图片元素添加src属性
           $('#hiddenImg').val(res[0].avatar)//隐藏域中的内容就是图片的路径
           
        }

    })

})
//保存用户更改
$('#modifyBox').on('submit','#modifyForm',function(){
    $.ajax({
        type:'put',
        url:`/posts/${id}`,
        data:$(this).serialize(),  //收集表单数据
        success:function(res) {
            location.href='posts.html'
        }
    })
    return false; //阻止默认提交事件
})


