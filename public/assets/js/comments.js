//获取评论列表
$.ajax({
    type:'get',
    url:'/comments',
    success:function(res) {
        console.log(res);
        
       var html=template('commentsTpl',res);
       $('#commentsBox').html(html);
       var page=template('pageTpl',res);
       $('.pagination').html(page)
        
    }
})
//日期格式设置
function dateFormat(date) {
    date=new Date(date);
    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
}
function changePage(pageNum) {
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:pageNum
        },
        success:function(res) {
            console.log(res);
            var html=template('commentsTpl',res);
       $('#commentsBox').html(html);
       var page=template('pageTpl',res);
       $('.pagination').html(page)
            }
            
       
    })
}
//批准驳回功能
$('#commentsBox').on('click','.status',function(){
    //获取id
    var id=$(this).parent().attr('data-id');
    //获取状态 0/1
    var status=$(this).parent().attr('data-status');
   $.ajax({
       type:'put',
       url:`/comments/${id}`,
       data:{
           state:status==1?0:1 //判断状态
       },
       success:function(res) {
           location.reload();
       }
   })
    
})
//删除功能
$('#commentsBox').on('click','.delete',function() {
    if(confirm('确定要删除评论吗')) {
        var id=$(this).parent().attr('data-id');
        $.ajax({
            type:'delete',
            url:`/comments/${id}`,
            success:function(res) {
                location.reload();
            }
        })
    }
   
})