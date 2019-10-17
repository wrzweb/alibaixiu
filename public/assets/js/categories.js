$.ajax({
    type:'get',
    url:'/categories',
    success:function(res) {
        console.log(res);
        
        var html=template('categoriesTpl',{data:res});
        $('#categoryBox').html(html);
    }
})
//实现添加分类功能
$('#addCategory').on('submit',function(){
    var data=$(this).serialize();
   $.ajax({
    type:'post',
    url:'/categories',
    data:data,
    success:function(){
        location.reload();
    }
   })
   //阻止表单默认事件
   return false;
})
//编辑添加分类功能
$('#categoryBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            var html=template('modifyCategoryTpl',res);
            $('#modifyBox').html(html)
            
        }
    })
})
//修改添加分类功能
$('#modifyBox').on('submit','#modifyCategory',function(){
    var id=$(this).attr('data-id');
    var data=$(this).serialize();
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:data,
        success:function(){
            location.reload();
        }

    })
    return false;
})