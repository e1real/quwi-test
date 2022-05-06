<template>
  <div class="page login-page">
    <ValidationObserver v-slot="{ invalid }">
      <Form class="auth-form" @submit.prevent="submit">
        <img
          class="auth-form__app-logo"
          src="https://api.quwi.com/images/logo_150.png"
        />
        <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
          <input
            v-model="form.email"
            :class="['form-input', {'form-input--error': errors.length }, 'auth-form__login']"
            placeholder="email"
            type="text"
          />
        </ValidationProvider>
        <ValidationProvider  v-slot="{ errors }" name="password" rules="required|min:6">
          <input
            v-model="form.password"
            :class="['form-input', {'form-input--error': errors.length }, 'auth-form__password']"
            placeholder="password"
            type="password"
          />
        </ValidationProvider>
        <button class="auth-form__submit-btn" type="submit" :disabled="invalid || formPending">
          Login
        </button>
        <nuxt-link class="auth-form__forgot-btn" to="/auth/forgot">
          Forgot password?
        </nuxt-link>
      </Form>
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
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.formPending = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  padding: 64px 32px 32px;
  background-color: #5d5d5a;
  -webkit-box-shadow: 1px 4px 22px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 4px 22px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 4px 22px 0px rgba(34, 60, 80, 0.2);

  &__app-logo {
    align-self: center;
    width: 80px;
    margin-bottom: 16px;
  }

  &__password {
    margin: 16px 0 32px;
  }

  &__forgot-btn {
    margin-top: 8px;
    align-self: center;
  }
}

.form-input {
  padding: 6px 12px;

  &--error {
    border: 1px solid red;
  }
}
</style>
