<template>
  <div>
    <TheForm :model="userInfo" :rules="rules">
      <FormItem label="用户名">
        <TheInput v-model="userInfo.username" placeholder="请输入用户名"></TheInput>
      </FormItem>
      <FormItem label="密码">
        <TheInput type="password" v-model="userInfo.password" placeholder="请输入密码"></TheInput>
      </FormItem>
    </TheForm>
  </div>
</template>

<script>
import TheInput from './Input'
import FormItem from './FormItem'
import TheForm from './Form'
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
  }
}
</script>

<style lang="scss" scoped>
  
</style>