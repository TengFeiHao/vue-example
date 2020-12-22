<template>
  <div>
    <TheForm :model="userInfo" :rules="rules" ref="loginForm">
      <FormItem label="用户名" prop="username">
        <TheInput v-model="userInfo.username" placeholder="请输入用户名"></TheInput>
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
    login() {
      this.$refs["loginForm"].validate(valid => {
        if(valid) {
          this.$create(Notice, {
            title: 'success',
            message: '登录成功'
          }).show()
        }else {
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