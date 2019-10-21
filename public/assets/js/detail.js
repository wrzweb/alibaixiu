var id=getUrlParams('id')
$.ajax({
    type:'get',
    url:`/posts/${id}`,
    success:function(res) {
        console.log(res);
        var html=template('detailTpl',res)
        $('.article').html(html)
    }
})
var state=0;//评论的状态是否需要经过审核
$('.article').on('click','#like',function(res){
    $.ajax({
        type:'post',
        url:`/posts/fabulous/${id}`,
        success:function(res) {
            alert('点赞成功')
        }
    })
    
})
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res) {
        console.log(res);
        if(res.review==false) {
            state=0;//不需要审核
        }else {
            state=1//需要审核
        }
        if(res.comment==true) {
            $('.comment').show()
        }
    }
})
//评论的提交功能
$('.comment form').on('submit',function(){
    var content=$(this).find('textarea').val();
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:id,
            state:state
        },
        success:function(res) {
            alert('评论成功');
            $('.comment form').find('textarea').val('');
        }
    })
    return false;
})
