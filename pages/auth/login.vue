<template>
  <div class="page login-page">
    <ValidationObserver v-slot="{ invalid }" ref="login-form">
      <form class="auth-form" @submit.prevent="submit">
        <div class="auth-form__app">
          <img
            class="auth-form__app-logo"
            src="https://api.quwi.com/images/logo_150.png"
          />
          <span class="auth-form__app-name">
            QUWI
          </span>
        </div>
        <ValidationProvider v-slot="{ errors }" class="input-wrapper auth-form__login" name="email" rules="required|email">
          <BaseInput
            v-model="form.email"
            class="form-input"
            :errors="errors"
            placeholder="Email"
            type="text"
          />
          <span class="input-error">{{ errors [0] }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }"  class="input-wrapper auth-form__password" name="password" rules="required|min:6">
          <BaseInput
            v-model="form.password"
            class="form-input"
            :errors="errors"
            placeholder="Password"
            native-type="password"
          />
          <span class="input-error">{{ errors [0] }}</span>
        </ValidationProvider>
        <BaseButton :loading="formPending" label="Login" class="auth-form__submit-btn" type="submit" :disabled="invalid || formPending" />
        <nuxt-link class="auth-form__forgot-btn" to="/auth/forgot">
          Forgot password?
        </nuxt-link>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'LoginPage',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      formPending: false,
    }
  },
  methods: {
    /**
     * Login form submit handler
     */
    async submit() {
      this.formPending = true
      try {
        const { data } = await this.$axios.post('auth/login', this.form)
        this.$store.commit('auth/SET_USER', data.app_init.user)
        this.$store.commit('auth/SET_TOKEN', data.token)
        Cookies.set('token', data.token, { expires: 365})

        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 417) {
          this.$refs['login-form'].setErrors({ email: ['Incorrect email or password.'] })
        }
      } finally {
        this.formPending = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  margin: auto;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 40px 35px;
  background: #fff;
  border: 1px solid rgba(0,0,0,.11);
  box-shadow: 0 0 12px rgb(0 0 0 / 25%);
  border-radius: 15px;
  width: 440px;
  text-align: center;

  &__app {
    display: flex;
    align-items: center;
    align-self: center;
    margin-bottom: 26px;
  }

  &__app-logo {
    width: 40px;
    margin-right: 14px;
  }

  &__app-name {
    font-family: Arial,sans-serif;
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
  }

  &__password {
    margin: 16px 0 32px;
  }

  &__forgot-btn {
    margin-top: 8px;
    align-self: center;
  }
}

.input-wrapper {
  width: 100%;
}

.input-error {
  display: flex;
  font-size: 14px;
  color: rgb(126, 26, 26);
  align-self: flex-start;
  margin-top: 6px;
}
</style>
