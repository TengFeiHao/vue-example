<template>
  <div>
    <!-- model rules 统一管理，统一分发 -->
    <TheForm :model="userInfo" :rules="rules" ref="loginForm">
      <FormItem label="用户名" prop="username">
        <TheInput @focus="focus" v-model="userInfo.username" placeholder="请输入用户名"></TheInput>
      </FormItem>
      <FormItem label="密码" prop="password">
        <TheInput type="password" v-model="userInfo.password" placeholder="请输入密码"></TheInput>
      </FormItem>
      <FormItem>
        <button @click="login">登录</button>
      </FormItem>
    </TheForm>
  </div>
</template>

<script>
import TheInput from './Input'
import FormItem from './FormItem'
import TheForm from './Form'
import Notice from '../../components/Notice'
export default {
  components: {
    TheInput,
    FormItem,
    TheForm
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名称' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    focus() {
      console.log('获取焦点')
    },
    login() {
      this.$refs["loginForm"].validate(valid => {
        if(valid) {
          // extend方式的Notice
          this.$Notice({
            title: 'success',
            message: '登录成功'
          })
        }else {
          // render 方式的Notice
          this.$create(Notice, {
            title: 'error',
            message: '登录失败'
          }).show()
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>