<template>
  <div class="c-login">

    <div class="login-bg">
      <div class="login-bg-img">
        <div class="login-container">
          <div class="login-header">
            登录
          </div>
          <div class="login-cont">
            <form class="login__form">
              <div class="form__name">
                <i class="iconfont icon-yonghu-tianchong"></i>
                <input type="text" class="form__name" placeholder="请输入账号" v-model="formName">
              </div>
              <div class="form__pwd">
                <i class="iconfont icon-suo"></i>
                <input :type="clsFlag ? 'text' : 'password'" placeholder="请输入密码" class="form__pwd" v-model="formPwd">
                <i class="iconfont icon-yanjing" :class="[clsFlag ? 'icon-showpwd': 'icon-biyan']" @mousedown="showpwd" @mouseup="hidepwd"></i>
              </div>
              <input type="submit" class="form__submit" value="登录" @click.enter="login">
              <div class="login__info" v-show="loginErrorInfo">
                <i class="iconfont icon-gantanhaozhong" :class="[remind ? 'remind' : '']"></i>
                <span>{{loginErrorInfo}}</span>
              </div>
            </form>

          </div>
        </div>
      </div>
      <!-- <div class="login-container">
        <div class="login__header"></div>
        <div class="bg-login-form">
          <form class="login__form">
            <div class="form__name">
              <i class="iconfont icon-user"></i>
              <input type="text" class="form__name" placeholder="请输入账号" v-model="formName">
            </div>
            <div class="form__pwd">
              <i class="iconfont icon-pwd"></i>
              <input :type="clsFlag ? 'text' : 'password'" placeholder="请输入密码" class="form__pwd" v-model="formPwd">
              <i class="iconfont eyes" :class="[clsFlag ? 'icon-showpwd': 'icon-hidepwd']" @mousedown="showpwd" @mouseup="hidepwd"></i>
            </div>
            <input type="submit" class="form__submit" value="登录" @click.enter="login">
          </form>
          <div class="login__info" v-show="loginErrorInfo">
            <i class="iconfont icon-error" :class="[remind ? 'remind' : '']"></i>
            <span>{{loginErrorInfo}}</span>
          </div>
        </div>
      </div> -->
    </div>

  </div>
</template>
<script type="text/javascript">
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

export default {
  name: 'login',
  data() {
    return {
      formName: '',
      formPwd: '',
      clsFlag: false,
      remind: false
    }
  },
  computed: {
    loginErrorInfo() {
      if (!this.formName || !this.formPwd) {
        return '请输入用户名或密码'
      }
    }
  },
  methods: {
    login() {
      if (this.loginErrorInfo) {
        this.remind = true
      }

      if (!this.loginErrorInfo) {
        this.$router.push('/home')
      }
    },
    showpwd() {
      this.clsFlag = true
    },
    hidepwd() {
      this.clsFlag = false
    }
  },
  watch: {
    formName() {
      this.remind = false
    },
    formPwd() {
      this.remind = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/css/lib-variable';
@import '~assets/css/lib-mixin';

$color-linear: rgba(255, 255, 255, 0.003);

.c-login {
  // @include flex(center, center);
  width: 100%;
  .login-bg{
     width: 100%;
     min-height: 832px;
     // height: calc(100vh - 76px - 64px);
     background-color: #eff2f9;
    .login-bg-img{
      width: 100%;
      height: 416px;
      background-image: url(./loginBg.jpg);
      background-size: 100% 100%;
      position: relative;
      .login-container{
        position: absolute;
        bottom:-274px;
        left: 50%;
        transform:translate(-50%,0);
        width: 400px;
        height: 434px;
        border-radius: 5px;
        .login-header{
          width: 100%;
          box-sizing:border-box;
          height: 160px;
          line-height: 160px;
          padding-left: 30px;
          font-size: 36px;
          background-color: rgba(0,144,251,.7);
          color: #fff;
          border-radius: 5px 5px 0 0;
        }
        .login-cont{
           position: relative;
           min-height: 273px;
           background-color: #fff;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 0 0 5px 5px;
           .login__form {
              width: 325px;
              .form__name {
                margin-bottom: 30px;
              }
              .form__name,
              .form__pwd {
                position: relative;
                width: 100%;
                height: 34px;
                line-height: 34px;
                .iconfont {
                  position: absolute;
                  top: 50%;
                  @include juzhong(vertical);
                  font-size: 26px;
                  color: #45b1ff;
                }
                .icon-yanjing {
                  right: 0;
                  font-size: 20px;
                  cursor: pointer;
                  color: #c4c4c4;
                  @include animate();
                }
                input {
                  padding: 0 40px;
                  width: 100%;
                  box-sizing: border-box;
                  background: none;
                  border: none;
                  border-bottom: 1px solid #ccc;
                  color: #333;
                }
              }
             .form__submit {
                margin-top: 25px;
                width: 100%;
                height: 42px;
                box-sizing: border-box;
                border-radius: 5px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                border: 1px solid #fff;
                background: rgba(0, 148, 255, 1);
                @include animate(background, 0.1s);
                &:hover {
                  background: rgba(0, 148, 255, 0.7);
                }
              }

              .login__info {
                position: absolute;
                text-align: center;
                margin-top: 22px;
                color: #45b1ff;
                .iconfont {
                  margin-right: 9px;
                }
                left: 50%;
                transform:translate(-50%,0);
                bottom:10px;
              }
           }
        }
      }
    }
  }
}

// .login-container {
//   width: 648px;
// }

// .login__header {
//   position: relative;
//   width: 100%;
//   height: 102px;
//   &::before,
//   &::after {
//     content: '';
//     display: block;
//     position: absolute;
//     width: 100%;
//   }
//   &::before {
//     height: 100%;
//     top: 0;
//     z-index: 0;
//     background: radial-gradient(50% 90% at center bottom -15px, rgba(0, 86, 158, 0.7), transparent);
//   }
//   &::after {
//     height: 100%;
//     z-index: 1;
//     background: url('./login.png') no-repeat 50% center;
//     background-size: 99px 64px;
//   }
// }

// .bg-login-form {
//   position: relative;
//   z-index: 101;
//   @include flex(flex-start, center, column);
//   height: 400px;
//   padding-top: 105px;
//   box-sizing: border-box;
//   background-color: rgba(3, 123, 217, 0.5);
//   background-image: linear-gradient(
//     -45deg,
//     $color-linear 25%,
//     transparent 25%,
//     transparent 50%,
//     $color-linear 50%,
//     $color-linear 75%,
//     transparent 75%,
//     transparent
//   );
//   background-size: 15px 15px;
//   border-radius: 5px;
//   .login__form {
//     @include flex(flex-start, center, column);
//     width: 325px;
//     .form__name {
//       margin-bottom: 30px;
//     }
//     .form__name,
//     .form__pwd {
//       position: relative;
//       width: 100%;
//       height: 34px;
//       line-height: 34px;
//       .iconfont {
//         position: absolute;
//         top: 50%;
//         @include juzhong(vertical);
//         font-size: 26px;
//       }
//       .eyes {
//         right: 0;
//         font-size: 20px;
//         cursor: pointer;
//         @include animate();
//       }
//       input {
//         padding: 0 40px;
//         width: 100%;
//         box-sizing: border-box;
//         background: none;
//         border: none;
//         border-bottom: 1px solid #fff;
//         color: #fff;
//       }
//     }
//     .form__submit {
//       margin-top: 45px;
//       width: 100%;
//       height: 42px;
//       box-sizing: border-box;
//       border-radius: 5px;
//       color: #0097f6;
//       font-size: $fz-md;
//       font-weight: bold;
//       text-shadow: 0 3px 4px #0097f6;
//       cursor: pointer;
//       border: 1px solid #fff;
//       background: rgba(255, 255, 255, 0.73);
//       @include animate(background, 0.1s);
//       &:hover {
//         background: rgba(255, 255, 255, 0.9);
//       }
//     }
//   }
//   .login__info {
//     @include flex(center, center);
//     margin-top: 42px;
//     color: #fff000;
//     .iconfont {
//       margin-right: 9px;
//     }
//   }
// }

@keyframes move {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(0, -20%, 0);
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(0, 20%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.remind {
  animation: move 0.2s linear;
  animation-iteration-count: 3;
}
</style>
