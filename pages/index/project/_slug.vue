<template>
  <BaseModal :visible="true" @close="$router.back()">
    <template>
      <ValidationObserver v-slot="{ invalid }">
        <form class="project-edit" @submit.prevent="submit">
          <ValidationProvider v-slot="{ errors }" class="input-wrapper" name="name" rules="required">
            <BaseInput
              v-model="form.name"
              :class="['form-input', 'project-edit__name']"
              :errors="errors"
              placeholder="Name"
              type="text"
            />
          </ValidationProvider>
          <BaseButton :loading="formPending" label="Update" class="project-edit__submit-btn" type="submit" :disabled="invalid || formPending" />
        </form>
      </ValidationObserver>
    </template>
  </BaseModal>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  middleware: 'user',
  data() {
    return {
      form: {
        name: ''
      },
      formPending: false
    }
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get('projects-manage/' + this.$route.params.slug)
      this.form = data.project
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    /**
     * Project submit handler
     */
    async submit() {
      try {
        this.formPending = true
        const { data } = await this.$axios.post('projects-manage/update?id=' + this.$route.params.slug, {
          ...this.form
        })
        this.$emit('updated', data.project)
        this.$router.back()
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.project-edit {
  padding: 40px;
  max-width: 440px;

  &__submit-btn {
    margin-top: 16px;
  }
}
</style>
