<template>
  <div class="project-list-block">
    <ul class="project-list">
      <ProjectCard
        v-for="project in projectList"
        :key="project.id"
        class="project-list__item"
        :project="project"
        tag="li"
      />
    </ul>
    <div v-if="projectListPending">Pending...</div>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  middleware: 'user',
  data() {
    return {
      projectList: [],
      projectListPending: false,
    }
  },
  mounted() {
    this.fetchProjectList()
  },
  methods: {
    async fetchProjectList() {
      try {
        this.projectListPending = true
        const { data } = await this.$axios.get(
          'projects-manage/index?filters[is_active]=1&sort=dta_create'
        )
        this.projectList = data.projects
      } catch (err) {
        window.console.error(err)
      } finally {
        this.projectListPending = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.project-list-block {
  padding: 40px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>