<% %>流程控制标签
<%= %>输出标签（原文输出HTML标签）
<%- %>输出标签（HTML会被浏览器解析）
<%# %>注释标签
% 对标记进行转义
-%>去掉没用的空格
说明：ejs中的逻辑代码全部用JavaScript


<ul>
  <%if(flag){%>
    <%for (var i=0;i<data1.length;i++){%>
    <li><%=data1[i]%></li>
    <%}%>
  <%}else{%>
      <%for(var i=0;i<data2.length;i++){%>
        <li><%=data2[i]%></li>
      <%}%>
  <%}%>
</ul>
