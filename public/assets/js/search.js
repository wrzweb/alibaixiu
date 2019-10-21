//获取地址栏中分类id值
// var categoryid=location.search.split('=')[1] 没有通用性在参数很多时会得到错误的结果
//根据key找响应的value值
function getUrlParams(key) {
    var str=location.search.substr(1);
    var arr=str.split('&');
    for(var i=0;i<arr.length;i++) {
        var arr1=arr[i].split('=');
        if(arr1[0]==key) {
            return arr1[1]
        }
    }
}
var key= getUrlParams('key');
$.ajax({
    type:'get',
    url:`/posts/search/${key}`,
    success:function(res) {
console.log(res);
var html=template('listTpl',{data:res});
$('#listBox').html(html);
    }
   
})
