<template>
  <div class="project-list-block">
    <ul class="project-list">
      <ProjectCard
        v-for="project in projectList"
        :key="project.id"
        class="project-list__item"
        :project="project"
        tag="li"
        @click.native="$router.push('/project/' + project.id)"
      />
    </ul>
    <NuxtChild  @updated="afterUpdateProject"/>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  middleware: 'user',
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios.get(
        'projects-manage/index?filters[is_active]=1&sort=dta_create'
      )
      return {
        projectList: data.projects
      }
    } catch (err) {
      console.error(err)
    }
  },
  data() {
    return {
      projectList: [],
    }
  },
  methods: {
    /**
     * Update project completed
     * @param {Object} newProject
     */
    afterUpdateProject(newProject) {
      const projectIdx = this.projectList.findIndex(project => project.id === newProject.id)
      this.projectList[projectIdx] = newProject
    }
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

.project-list {
  display: flex;
  flex-direction: column;

  &__item {
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 3px;
    padding-top: 20px;
    color: #000;
    margin: 0 auto 7px;
    cursor: pointer;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
