//ajax数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {     
       
        var html =template('tp1',{key:res});
        $('#tbody').html(html)
        

        
    }
  
})
//表单提交
  $('#userForm').on('submit',function(){
      var serialize=$(this).serialize();
      $.ajax({
          type:'post',
          url:'/users',
          data:serialize,
          success:function(res) {
              location.reload();//刷新当前页面
              return false;//代码不向下进行
          }
      })

  })
  //头像上传
  $('#tobody').on('change','#avatar',function(){
      var fd=new FormData();
      fd.append('avatar',this.files[0]);
      $.ajax({
          type:'post',
          url:'/upload',
          //固定写法
          //jq默认我们传的是一个对象，他会帮我们转换成key=value&key=value的格式,数据整体上传
          //但是我们现在数据文件上传multipart/form-data 数据分开 成
          processData:false,
          //jq默认会添加一行代码xhr.setRequestHeader('content-type')
          contentType:false,
          data:fd,
          success:function(res) {
              console.log(res);
            //   隐藏域收集上传图片路径
              $('#hiddenImg').val(res[0].avatar);
            // 添加src属性值为图片的路径
              $('#preview').attr('src',res[0].avatar)
          }
      })

  })
  //编辑功能
  $('#tbody').on('click','.edit',function(){
      var id=$(this).attr('data-id');
      $.ajax({
          type:'get',
          url:'/users/'+id,
          success:function(res){
              var html=template('modifyTp1',res);
              console.log(html);
              $('#modifyBox').html(html);
              
              
          }
      })
      
  })
  //事件委托修改用户
  $('#modifyBox').on('submit','#modifyForm',function(){
    var id=$(this).attr('data-id');
    console.log(id);
    var data= $(this).serialize();
    console.log(data);
    
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:data,
        success:function(res) {
            location.reload();
        }
    })
   
    return false;
    
    

  })
  //删除功能
  $('#tbody').on('click','.del',function(){
      if(confirm('您确定要删除吗?'));
      var id=$(this).attr('data-id');
      $.ajax({
          type:'delete',
          url:'/users/'+id,
          success:function(){
              location.reload();
          }
      })

  })
  //批量删除显示
  $('#checkAll').on('change',function(){
      var bool=$(this).prop('checked');
      //找到tbody下面所有的checkbox，给它们添加checked效果
      var checkList=$('#tbody input[type="checkbox"]');//jq对象，把tbody中所有的input找到
      checkList.prop('checked',bool);
      if(bool==true) {
        $('#deleteAll').show();
      }else {
        $('#deleteAll').hide();

      }
  })
  //全选效果切换
  $('#tbody').on('change','input[type="checkbox"]',function(){
      if($('#tbody input[type="checkbox"]').length==$('#tbody input[type="checkbox"]:checked').length){
  $('#checkAll').prop('checked',true);
      }else {
        $('#checkAll').prop('checked',false);
      }
      if($('#tbody input[type="checkbox"]:checked').length>0) {
        $('#deleteAll').show();
      }else {
        $('#deleteAll').hide();
      }
  })
  //批量删除功能
  $('#deleteAll').on('click',function(){
      //选出来所有打勾的checkbox
      var checkList=$('#tbody input[type="checkbox"]:checked');
      var str='';
      checkList.each(function(index,item){
          str+=$(item).attr('data-id')+'-'
      })
     str=str.substr(0,str.length-1)
    $.ajax({
        type:'delete',
        url:'/users/'+str,
        success:function(res){
            console.log(res);
            
           
        }
    })
     
      
  })
  