//获取分类的ajax数据
var id = location.search.substr(4);





$.ajax({
    type:'put',
    url:`/posts/${id}`,
    success:function(res) {
        console.log(res);
        var html=template('modifyTpl',{data:res});
        $('#modifyForm').html(html);
     
    }
})

