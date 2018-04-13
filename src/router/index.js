import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/home'
// import page1 from 'pages/page1/page1'
// import page2 from 'pages/page2/page2'
// import page3 from 'pages/page3/page3'
import News from 'pages/news/news'
import LatestNews from 'pages/news/latest-news/latest-news'
import LatestInfo from 'pages/news/latest-info/latest-info'

import BasicData from 'pages/basic-data/basic-data/basic-data'
import BasicDataAnylsis from 'pages/basic-data/basic-data-anylsis/basic-data-anylsis'

import CheckList from 'pages/warning/check-list/check-list'
import ImportantInfo from 'pages/warning/important-info/important-info'
import PoliceCount from 'pages/warning/police-count/police-count'

import Page from 'pages/page/public'

import Login from 'pages/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path: '/',  //路由默认跳转
      redirect: 'login'
    }, {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
        name:'latest-news',
        path:'/latest-news',
        component:LatestNews
    },
    {
        name:'latest-info',
        path:'/latest-info',
        component:LatestInfo
    },
    {
        name:'basic-data',
        path:'/basic-data',
        component:BasicData
    },
    {
        name:'basic-data-anylsis',
        path:'/basic-data-anylsis',
        component:BasicDataAnylsis
    },
    {
        name:'check-list',
        path:'/check-list',
        component:CheckList
    },
    {
        name:'important-info',
        path:'/important-info',
        component:ImportantInfo
    },
    {
      name:'police-count',
      path:'/police-count',
      component:PoliceCount
    },
    {
      name:'page',
      path:'/page',
      component:Page
    },

  ],
  linkActiveClass: 'active'
})
