// 注意, 真正提交的是隐藏的 加密的password1; 而原来的password不会提交(因为设置了disabled=true, 否则明文password还是会被上传!), 但是浏览器会记住原来的password. 在firefox中测试正常.

{/* <form>
  <input type="password" name="password" id="password"/>
  <input type="hidden" name="password1" id="password1"/>
  <input id="s" type="submit" value="Submit"/>
  </form>
<script>
$(function(){
  $("form").submit(function() {
    var v=$.md5($("#password").val());
    $("#password1").val(v);
    $("#password").attr("disabled", "true");
    return true;
  });
});
</script> */}
