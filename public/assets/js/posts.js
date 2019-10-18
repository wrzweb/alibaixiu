//查询文章
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res) {
        var html=template('postsTpl',res)
        console.log(res);
        
        $('#postsBox').html(html)
        
    }
})
//日期格式设置
function dateFormat(date) {
    date=new Date(date);
    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
}
//分页
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res) {
        var html=template('postsTpl',res);
        $('#postsBox').html(html);
        var page=template('pageTpl',res);
        $('.pagination').html(page)
    }
})
function changePage(pageNum) {
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:pageNum
        },
        success:function(res) {  
            //根据页码实参，显示不同的数据  pageNum页码
            console.log(res);
            
            var html=template('postsTpl',res);
            $('#postsBox').html(html);
            var page=template('pageTpl',res);
            $('.pagination').html(page)
        }
    })
}
//获取并渲染分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res) {
        
        
        var html=template('categoryTpl',{data:res});
        $('#categoryBox').html(html)
       
    }
})
//收集表单数据
$('#filterForm').on('submit',function(){
    var formDate=$(this).serialize();
    $.ajax({
        type:'get',
        url:'/posts',
        data:formDate,
        success:function(res) {
            var html=template('postsTpl',res);
            $('#postsBox').html(html);
            var page=template('pageTpl',res);
            $('.pagination').html(page)
        }
    })
   return false
})