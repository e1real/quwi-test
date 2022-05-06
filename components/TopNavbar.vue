<template>
  <nav class="nav">
    <div class="nav__logo-wrap">
      <nuxt-link
        to="/"
        tag="img"
        class="nav__logo"
        src="https://api.quwi.com/images/logo_150.png"
      />
    </div>
    <ul class="nav__links nav-link-list">
      <nuxt-link class="nav-link-list__item" tag="li" to="/"
        >Projects</nuxt-link
      >
      <nuxt-link
        v-if="!isAuthenticated"
        class="nav-link-list__item"
        to="/auth/login"
        >Login</nuxt-link
      >
      <a
        v-if="isAuthenticated"
        class="nav-link-list__item"
        to="/auth/login"
        @click.prevent="handleClickLogout"
        >Logout</a
      >
    </ul>
  </nav>
</template>
<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  name: 'TopNavbar',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {
    /**
     * Click logout button handler
     */
    handleClickLogout() {
      this.$store.commit('auth/SET_USER', null)
      this.$store.commit('auth/SET_TOKEN', null)
      Cookies.remove('token')
      this.$router.push('/auth/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  height: 42px;
  padding: 6px 48px;
  background-color: #5d5d5a;

  &__logo {
    width: 40px;
  }

  &__links {
    margin-left: auto;
  }
}

.nav-link-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    color: #ffcdab;
    text-transform: uppercase;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }
}
</style>
