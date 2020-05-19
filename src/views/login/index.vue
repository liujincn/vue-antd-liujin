<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginCon">
        <p class="title">vue-antd-liujin后台模板</p>
        <p class="title">前台: Vue + Ant Design Vue</p>
        <a-card class="login-module">
          <h2 style=" text-align: center">密码登录</h2>

          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item label="账号" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="form.username" placeholder="请输入用户名"></a-input>
            </a-form-model-item>

            <a-form-model-item label="密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input-password v-model="form.password" placeholder="请输入密码"></a-input-password>
            </a-form-model-item>
            <a-button type="primary" @click="onSubmit('ruleForm')" style="width:100%">登录</a-button>
          </a-form-model>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]

      },
    }
  },
  methods: {
    // 登录
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('setToken', this.form.username).then(() => {
            this.$router.push({ path: '/' }, () => { }, () => { }) // https://blog.csdn.net/qq940390/article/details/103232115
          })
        } else {
          return false
        }
      })
    },
    openNotification () {
      this.$notification.open({
        message: '账号密码',
        description: '账号密码可以随意填写，为了测试效果填写的账号将会被存储为临时假 token',
      })
    },
  },
  mounted () {
    this.openNotification()
  }
}
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .loginBox {
    background: #2d3a4b;
    padding-top: 100px;
  }
  .loginBox {
    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        padding-top: 0px;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
          padding-top: 80px;
        }
      }
      .login-module {
        width: 380px;
        height: 325px;
        margin-top: 60px;
        border: none;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
