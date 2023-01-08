export default {
    state: {
        userSearchShow: true  
        
    },
    actions: {
        getUserSearchShow(context) {
            context.commit('GETUSERSEARCHSHOW')
        },
        
    },
    mutations: {
        GETUSERSEARCHSHOW(state) {
            state.userSearchShow = !state.userSearchShow
        },
    }
}