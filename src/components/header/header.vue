<template>
    <div class="header-wrap" >
       <div class="header-cont">
          <div class="logo">互联网大数据治安巡防平台</div>
           <ul v-if="$route.name !== 'login'">
              <!-- tag="li" 可以设定 router-link生成什么样的页面元素 -->
              <router-link class="item" tag="li" :to="{name:'home'}" @click.native="clickHome">
                <i class="iconfont icon-user"></i>首页
              </router-link>
              <!-- <router-link class="item" tag="li" :to="{name:'news'}">
                最新消息
              </router-link> -->
              <li class="item" :class="{'active':newsFlag===true}">
                <div class="blue1">
                  <div  class="white"></div>
                  <div  class="blue2"></div>
                </div>
                  <span>最新信息</span>
                  <div class="menu-bg" style="border-top: 1px solid blue;">
                      <div style="width: 100%; border-top: 1px solid #4db2ff;"></div>
                  </div>
                  <ul class='header-menu'>
                          <router-link class="item" tag="li" :to="{name:'latest-news'}" @click.native="clickNews">最新信息</router-link>
                          <router-link class="item" tag="li" :to="{name:'latest-info'}" @click.native="clickNews">最新信息统计</router-link>
                  </ul>
              </li>
              <li class="item" :class="{'active':basicDataFlag===true}">
                <div class="blue1">
                    <div  class="white"></div>
                    <div  class="blue2"></div>
                </div>
                  <span>基础数据</span>
                  <div class="menu-bg">
                    <div style="width: 100%; border-top: 1px solid #4db2ff;"></div>
                  </div>
                  <ul class="header-menu">
                      <router-link class="item" tag="li" :to="{name:'basic-data'}" @click.native="clickBasicData">辖区基础数据</router-link>
                      <router-link class="item" tag="li" :to="{name:'basic-data-anylsis'}" @click.native="clickBasicData">辖区基础数据分析</router-link>
                  </ul>
              </li>

              <li class="item" :class="{'active':warnFlag===true}">
                <div class="blue1">
                  <div  class="white"></div>
                  <div  class="blue2"></div>
                </div>
                  <span>警情备忘</span>
                  <div class="menu-bg" :class='{"hide":menuBgshow===true}'>
                    <div style="width: 100%; border-top: 1px solid #4db2ff;"></div>
                  </div>
                  <ul class="header-menu">
                      <router-link class="item" tag="li" :to="{name:'important-info'}" @click.native="clickWarn">重要信息记录</router-link>
                      <router-link class="item" tag="li" :to="{name:'check-list'}" @click.native="clickWarn">实地核查列表</router-link>
                       <router-link class="item" tag="li" :to="{name:'police-count'}" @click.native="clickWarn">民警核查工作统计</router-link>
                  </ul>
              </li>
            </ul>
            <div class="policeArea" v-if="$route.name !== 'login'">
                <span><img src='./police.png' width="24px" height="24px" /></span>
                <span>王警官</span>
                <i class="iconfont icon-msnui-logout" @click="logout"></i>
            </div>
            <div class="policeArea" v-else>
                <span><img src='./police.png' width="24px" height="24px" /></span>
                <span>请登录</span>
            </div>
       </div>
       <!-- <div class="header-menu-add"></div> -->
    </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      newsFlag: false,
      basicDataFlag: false,
      warnFlag: false,
      menuBgshow:false
    }
  },
  created(){
    window.addEventListener('scroll',()=>{

    })
  },
  methods: {
    clickHome() {
      this.newsFlag = false
      this.basicDataFlag = false
      this.warnFlag = false

    },
    clickNews() {
      this.newsFlag = true
      this.basicDataFlag = false
      this.warnFlag = false
    },
    clickBasicData() {
      this.newsFlag = false
      this.basicDataFlag = true
      this.warnFlag = false
    },
    clickWarn() {
      this.newsFlag = false
      this.basicDataFlag = false
      this.warnFlag = true
    },
    logout() {
      this.$router.push('login')
    }
  }

  // computed:{
  //   isActive(){

  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/lib-variable';
@import '~assets/css/lib-mixin';
.header-wrap {
  width: 100%;
  height: 76px;
  background-color: #0893fd;
  line-height: 40px;
  display: flex;
  position: relative;
      background: linear-gradient(to right, #0080ff 5%, #0099ff 50%, #007dfe);
  .header-cont {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
    .logo {
      width: 435px;
      height: 76px;
      line-height: 76px;
      font-size: 26px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 3px;
      // background-image: url(./logo.png);
      // background-size: 100% 100%;
    }
    > ul {
      line-height: 76px;
      font-size: 16px;
      display: flex;
      justify-content: flex-end;
      li {
        color: #dadff2;
        width: 150px;
        text-align: center;
        cursor: pointer;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          width: 2px;
          height: 20px;
          top: 30px;
          right: 0;
          background-color: #fff;
        }
        &:last-child {
          &:after {
            content: '';
            width: 0;
          }
        }
        // .hide {
        //   opacity: 0
        // }
        &.active {
          color: #fff;
          font-size: 20px;
        }
        .menu-bg {
          display: none;
          @include animate;
          width: 200vw;
          height: 45px;
          line-height: 45px;
          position: absolute;
          left: -100vw;
          top: 76px;
          background-color: #206ccc;
        }
        ul.header-menu {
          display: none;
          position: absolute;
          left: 0;

          li {
            flex: 0 0 150px;
            position: relative;
            line-height: 45px;
            font-size: 16px;
            &:hover {
              color: #fff;
              // border-bottom: 2px solid #ccc;
              &:before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: #fff;
                width: 150px;
                height: 2px;
              }
            }

            &:after {
              content: '';
              width: 0;
            }
          }
        }
        &:hover {
          font-size: 20px;
          color: #fff;
          .blue1 {
            display: block;
          }
          .menu-bg,
          > ul {
            display: flex;
          }
        }
      }
    }

    .policeArea {
      line-height: 76px;
      display: flex;
      color: #dadff2;
      cursor: pointer;
      span {
        margin-right: 10px;
        img {
          vertical-align: middle;
        }
      }
      i {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}

.blue1 {
  display: none;
  width: 20px;
  height: 20px;
  background: #206ccc;
  transform: rotate(45deg);
  position: absolute;
  top: 65px;
  z-index: 10;
  left: 60px;
  .white {
    width: 20px;
    height: 20px;
    position: absolute;
    background: #4db2ff;
    left: 1px;
    top: 1px;
    z-index: 9;
  }
  .blue2 {
    width: 20px;
    height: 20px;
    position: absolute;
    background: #206ccc;
    left: 2px;
    top: 2px;
    z-index: 9;
  }
}

.hide{
  display: none;
}
</style>
