import HomePage from './HomePageComponent'

export const MainConfig = {
  routes: [
    {
      path: '/',
      component: HomePage,
      state: 'home',
      exact: true,
      settings: {
        needLogin: false,
        title: 'Homepage',
      },
    },
    {
      path: '/admin',
      component: HomePage,
      state: 'admin',
      exact: true,
      settings: {
        needLogin: true,
        title: 'Admin',
      },
    },
  ],
}
