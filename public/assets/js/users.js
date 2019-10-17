//ajax数据
//展示用户数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {     
       
        var html =template('tp1',{key:res});
        $('#tbody').html(html)
        

        
    }
  
})
//添加用户表单提交
  $('#userForm').on('submit',function(){
      var serialize=$(this).serialize();
      $.ajax({
          type:'post',
          url:'/users',
          data:serialize,
          success:function(res) {
              console.log(res);
              
              location.reload();//刷新当前页面
            
          }
          
      })
      return false;//代码不向下进行

  })
  //头像上传
  $('#modifyBox').on('change','#avatar',function(){
      var fd=new FormData();
      //往FormData添加键值
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
          },
          error:function(err) {
              console.log(err);
              
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
    //收集表单数据
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
   //阻止表单默认事件
    return false;
    
    

  })
  //删除功能
  $('#tbody').on('click','.del',function(){
    //   提示框显示确定或取消
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
    //   添加键值
      checkList.prop('checked',bool);
      if(bool==true) {
        // 批量删除显示
        $('#deleteAll').show();
      }else {
        // 批量删除隐藏
        $('#deleteAll').hide();

      }
  })
  //全选效果切换
  $('#tbody').on('change','input[type="checkbox"]',function(){
      //如果小复选框的长度完全等于小复选框勾选的长度
      if($('#tbody input[type="checkbox"]').length==$('#tbody input[type="checkbox"]:checked').length){
        // 大复选框勾选
        $('#checkAll').prop('checked',true);
      }else {
        $('#checkAll').prop('checked',false);
      }
    //   小复选框勾选的长度大于0
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
      //因为有多个复选框所以要遍历
      checkList.each(function(index,item){
          //id
          str+=$(item).attr('data-id')+'-'
          
          
      })
      //截取字符串
     str=str.substr(0,str.length-1);
     console.log(str);
     
     
    $.ajax({
        type:'delete',
        url:'/users/'+str,
        success:function(){
            location.reload();
            
           
        },
       
    })
     
      
  })
  