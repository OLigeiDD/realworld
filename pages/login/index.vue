<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLoginPage ? 'Sign In' : 'Sign Up' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLoginPage" to="/register"
              >Not Have an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>
          <ul class="error-messages">
            <li v-for="msg in errorMessage" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-if="!isLoginPage"
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLoginPage ? 'Sign In' : 'Sign Up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex', // 注册和登录共用一个组件

  components: {},

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {},
    }
  },

  computed: {
    isLoginPage() {
      return this.$route.name === 'Login'
    },
    errorMessage() {
      const errorArr = []
      Object.keys(this.errors).forEach((key) => {
        this.errors[key].forEach((msg) => {
          errorArr.push(`${key} ${msg}`)
        })
      })
      return errorArr
    },
  },

  created() {},

  mounted() {},

  methods: {
    async onSubmit() {
      // TODO 增加校验
      try {
        const { email, password } = this.user
        // 提交表单
        const { data } = this.isLoginPage
          ? await login({
              user: {
                email,
                password,
              },
            })
          : await register({
              user: this.user,
            })
        // 登录后保持登录状态
        const { user } = data
        this.$store.commit('setUser', user)
        Cookie.set('token', user.token)
        // eslint-disable-next-line no-console
        console.log(data)
        this.$router.push('/')
      } catch (err) {
        // eslint-disable-next-line no-console
        // console.dir(err)
        this.errors = err.response.data.errors
      }
    },
  },

  beforeRouteUpdate(to, from, next) {
    // eslint-disable-next-line no-console
    console.log('beforeRouteUpdate')
    this.errors = {}
  },
}
</script>
<style scoped></style>
