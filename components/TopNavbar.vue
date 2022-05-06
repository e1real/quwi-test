<template>
  <nav class="nav">
    <ul class="nav__links nav-link-list">
      <nuxt-link class="nav-link-list__item" tag="li" to="/">Home</nuxt-link>
      <nuxt-link class="nav-link-list__item" tag="li" to="/about">About</nuxt-link>
    </ul>
    <div class="auth-buttons">
      <nuxt-link class="login-button" to="/auth/login">Login</nuxt-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'TopNavbar',
}
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  padding: 24px 48px;
  background-color: #5d5d5a;

  &__links {
    margin-right: auto;
  }
}

.nav-link-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    color: #ffcdab;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }
}

.login-button {
  color: #fff4e3;
}
</style>
