<template>
  <div id="fullScreen" @click="handleFullScreen('click')">
    <img src="../assets/img/layput/全屏.png" alt=""
        class="fullScreen-icon"
        v-show="MaximizeSign == false">
    <div class="fullScreen-txt"
        v-show="MaximizeSign == false">
        全屏
    </div>

    <img src="../assets/img/layput/缩小.png" alt=""
        class="fullScreen-icon"
        v-show="MaximizeSign == true">
    <div class="fullScreen-txt"
        v-show="MaximizeSign == true">
        退出全屏
    </div>

  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
    name: 'FullScreen',
    data() {
        return {
            MaximizeSign: false,
        }
    },
    methods: {
        handleFullScreen(msg) {
            console.log('handleFullScreen方法被调用')
            if(this.MaximizeSign == false) {
                screenfull.request()
                console.log('全屏')
            }else if(this.MaximizeSign == true) {
                screenfull.exit()
                console.log('退出全屏')
            }
            if (msg == "click") {
                this.MaximizeSign = !this.MaximizeSign
            }
        },
        KeyDown(event) {
            console.log('监听到F11')
            if (event.keyCode === 122) {
                //禁用f11
                event.returnValue = false
                //触发全屏的按钮
                
                console.log('this.MaxmizeSign:',this.MaximizeSign)
                this.handleFullScreen('watch')
                
            }
        },
        // change () {
        //     this.MaximizeSign = screenfull.MaximizeSign
        // },
        // init () {
        //     if (screenfull.MaximizeSign) {
        //         screenfull.on('change', this.change)  // ！！！！这儿方法名不能带括号 
        //     }
        // },
        // destroy () {
        //     if (screenfull.MaximizeSign) {
        //         screenfull.off('change', this.change) // ！！！！这儿方法名不能带括号 
        //     }
        // }
    },
    mounted () {
        // this.init()
        // //解决按f11时图标不变化的问题
        window.addEventListener("keydown", this.KeyDown, true)// 监听按键事件
    },
    // beforeDestroy () {
    //     this.destroy()
    // },
}
</script>

<style lang="scss" scoped>

#fullScreen {
    display: flex;
    align-items: center;
}
.fullScreen-icon {
    width: 20px;
    height: 20px; 
    margin-right: 10px;
}
.fullScreen-txt {
    font-size: 20px;
    color: #fff;
}
</style>