import Cookies from "js-cookie"
import { addRoute } from '../router/addRoute'
export default {
    state: {
        menu: [], //导航栏菜单
        menuShow: false,  //导航栏显示标志，

        //面包屑列表
        breadcrumbList: [
            {
                'path': '/index',
                "name": 'index',
                'label': '首页',
            },
        ],
        newShowMenu: "",//当前显示菜单,
        topicColor: "#545c64",//当前主题颜色
        
    },
    actions: {
        getmenu(context, value) {
            context.commit('GETMENUSHOW', value)
        },
        getMenuShow(context, value) {
            context.commit('GETMENUSHOW', value)
        },
        getBreadcrumbListAdd(context, value) {
            context.commit('GETBREADCRUMBLISTADD', value)
        },
        getBreadcrumbListDelete(context, value) {
            context.commit('GETBREADCRUMBLISTADD', value)
        },
        getnewShowMenu(context, value) {
            context.commit('GETNEWSHOWMENU', value)
        },
        gettopicColor(context, value) {
            context.commit('GETTOPICCOLOR', value)
        },
    },
    mutations: {
        GETTOPICCOLOR(state, value) {
            state.topicColor = value
        },
        GETMENU(state, value) {
            state.menu = value
            Cookies.set('menu', JSON.stringify(value))
            addRoute(state.menu)
        },
        GETMENUSHOW(state) {
            state.menuShow = !state.menuShow
        },
        GETBREADCRUMBLISTADD(state, value) {            
            if(value.name !== 'index') {
                const index = state.breadcrumbList.findIndex(
                    item => item.name === value.name
                )
                if(index === -1) {
                    state.breadcrumbList.push(value)
                }
            }
            
        },
        GETBREADCRUMBLISTDELETE(state, value) {
            state.breadcrumbList = value
        },
        GETNEWSHOWMENU(state, value) {
            state.newShowMenu = value
        },
    }
}