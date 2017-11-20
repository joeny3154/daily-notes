输出<C:out>标签
	<%@taglib url="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	<c:out value="这是我的第一个jstl标签"></c:out>


JSTL标签四大分类及JSTL函数


-经常与JSTL配合使用，使得JSP页面更加直观，写法更简单
-普通写法：<%=session.getValue("name") %>
-EL表达式写法：<c:out value="${sessionScope.name}"/>

fackebook.github.io/react/index.html


EL变量
	JSP内置对象		对应		El名称
		Page				PageScope
		Request				RequestScope
		Session 			SessionScope
		Application			ApplicationScope