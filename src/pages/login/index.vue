<template>
  <div class="login-container">
    <canvas height="640" width="100%" id="canvas" class="canvas"></canvas>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Welcome</h3>
      </div>

      <el-form-item prop="nick">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="nick"
          v-model="loginForm.nick"
          placeholder="nick"
          name="nick"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

    </el-form>

  </div>
</template>

<script>
  /* eslint-disable */
import { validUsername } from '@/utils/validate'
import {
    goLogin
} from '@/api/common.js'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        nick: 'admin',
        password: '123123'
      },
      loginRules: {
        nick: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.handleCanvas()
    if (this.loginForm.nick === '') {
      this.$refs.nick.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        // eslint-disable-next-line
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          goLogin(this.loginForm).then(res => {
            this.loading = false
            if (res.status === 0) {
                this.$message.success(res.msg)
                this.$store.commit('updateToken', res.data)
                this.$store.commit('updateUserInfo', {
                  name: res.data.name,
                  avatar: res.data.avatar,
                  id: res.data.id
                })
                this.$router.push({
                    path: '/dashboard'
                })
            } else {
                this.$message.warning(res.msg)
            }
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleCanvas() {
      var canvasEl = document.getElementById('canvas')
      var ctx = canvasEl.getContext('2d')
      var mousePos = [0, 0]  //鼠标位置

      var easingFactor = 5.0
      var backgroundColor = '#2d3a4b'
      var nodeColor = '#20a0ff'
      var edgeColor = '#20a0ff'

      var nodes = []
      var edges = []

      canvasEl.width = document.body.clientWidth
      canvasEl.height = document.body.clientHeight

      function constructNodes() {  //生成节点
          for (var i = 0; i < 15; i++) {
              var node = {
                  drivenByMouse: i == 0,
                  x: Math.random() * canvasEl.width,
                  y: Math.random() * canvasEl.height,
                  vx: Math.random() * 1 - 0.5,
                  vy: Math.random() * 1 - 0.5,
                  radius: Math.random() > 0.9 ? 2 + Math.random() * 2 : 1 + Math.random() * 2
              }

              nodes.push(node)
          }

          nodes.forEach(function (e) {
              nodes.forEach(function (e2) {
                  if (e == e2) {
                      return
                  }

                  var edge = {
                      from: e,
                      to: e2
                  }

                  addEdge(edge)
              })
          })
      }

      function addEdge(edge) {     //添加链接线
          var ignore = false

          edges.forEach(function (e) {
              if (e.from == edge.from && e.to == edge.to) {
                  ignore = true
              }

              if (e.to == edge.from && e.from == edge.to) {
                  ignore = true
              }
          })

          if (!ignore) {
              edges.push(edge)
          }
      }

      function step() {
          nodes.forEach(function (e) {
              if (e.drivenByMouse) {
                  return
              }

              e.x += e.vx
              e.y += e.vy

              function clamp(min, max, value) {
                  if (value > max) {
                      return max
                  } else if (value < min) {
                      return min
                  } else {
                      return value
                  }
              }

              if (e.x <= 0 || e.x >= canvasEl.width) {
                  e.vx *= -1
                  e.x = clamp(0, canvasEl.width, e.x)
              }

              if (e.y <= 0 || e.y >= canvasEl.height) {
                  e.vy *= -1
                  e.y = clamp(0, canvasEl.height, e.y)
              }
          })

          adjustNodeDrivenByMouse()
          render()
          window.requestAnimationFrame(step)
      }

      function adjustNodeDrivenByMouse() {
          nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor
          nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor
      }

      function lengthOfEdge(edge) {         //边框的长度
          return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2))
      }

      function render() {
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)

          edges.forEach(function (e) {
              var l = lengthOfEdge(e)
              var threshold = canvasEl.width / 4

              if (l > threshold) {
                  return
              }

              ctx.strokeStyle = edgeColor;
              ctx.lineWidth = (1.0 - l / threshold) * 2;
              ctx.globalAlpha = 1.0 - l / threshold;
              ctx.beginPath()
              ctx.moveTo(e.from.x, e.from.y)
              ctx.lineTo(e.to.x, e.to.y)
              ctx.stroke()
          })
          ctx.globalAlpha = 1.0

          nodes.forEach(function (e) {
              if (e.drivenByMouse) {
                  return
              }

              ctx.fillStyle = nodeColor
              ctx.beginPath()
              ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI)
              ctx.fill()
          })
      }

      window.onresize = function () {
          canvasEl.width = document.body.clientWidth
          canvasEl.height = document.body.clientHeight

          if (nodes.length == 0) {
              constructNodes()
          }

          render()
      }

      window.onmousemove = function (e) {
          mousePos[0] = e.clientX
          mousePos[1] = e.clientY
      }

      window.onresize() // trigger the event manually.
      window.requestAnimationFrame(step)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .canvas{
    position: absolute;
    background-color: $bg;
    z-index: 1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    z-index: 2;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
