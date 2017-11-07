守卫可以用同步的方式返回一个布尔值。但在很多情况下，守卫无法用同步的方式给出答案。 守卫可能会向用户问一个问题、把更改保存到服务器，或者获取新数据，而这些都是异步操作。

因此，路由的守卫可以返回一个Observable<boolean>或Promise<boolean>，并且路由器会等待这个可观察对象被解析为true或false

用CanActivate来处理导航到某路由的情况。
用CanActivateChild来处理导航到某子路由的情况。
用CanDeactivate来处理从当前路由离开的情况.
用Resolve在路由激活之前获取路由数据。
用CanLoad来处理异步导航到某特性模块的情况。


我们还可以使用CanActivateChild守卫来保护子路由。 CanActivateChild守卫和CanAcitvate守卫很像。 它们的区别在于，CanActivateChild会在任何子路由被激活之前运行。

我们要保护管理特性模块，防止它被非授权访问，还要保护这个特性模块内部的那些子路由。


const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        // 轻松的守卫子路由
        canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];