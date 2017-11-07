CanActivate: 要求认证

应用程序通常会根据访问者来决定是否授予某个特性区的访问权。 我们可以只对已认证过的用户或具有特定角色的用户授予访问权，还可以阻止或限制用户访问权，直到用户账户激活为止。




canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  
- ActivatedRouteSnapshot包含了即将被激活的路由
- RouterStateSnapshot包含了该应用即将到达的状态。 

它们要通过我们的守卫进行检查。

如果用户还没有登录，我们会用RouterStateSnapshot.url保存用户来自的URL并让路由器导航到登录页（我们尚未创建该页）。