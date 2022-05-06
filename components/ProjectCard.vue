<template>
  <component :is="tag" class="project-card">
    <img class="project-card__logo" :src="project.logo_url" />
    <div class="project-card__name">{{ project.name }}</div>
    <div
      :class="[
        'project-card-status',
        'project-card__status',
        { active: !!project.is_active },
        { disabled: !project.is_active },
      ]"
    >
      {{ project.is_active ? 'Active' : 'Not active' }}
    </div>
    <div class="project-card__time project-card-time">
      <div class="project-card-time__row">
        <span class="project-card-time__title">time this week</span>
        <span class="project-card-time__value">00:00:00</span>
      </div>

      <div class="project-card-time__row">
        <h5 class="project-card-time__title">this month</h5>
        <span class="project-card-time__value">00:00:00</span>
      </div>

      <div class="project-card-time__row">
        <h5 class="project-card-time__title">total</h5>
        <span class="project-card-time__value">00:00:00</span>
      </div>
    </div>
  </component>
</template>
<script>
export default {
  name: 'ProjectCard',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.project-card {
  display: flex;
  align-items: center;
  border: 1px solid whitesmoke;
  padding: 16px 32px;

  &__logo {
    width: 70px;
  }

  &__name {
    font-weight: bold;
    margin: 0 18px;
  }

  &__status {
    font-weight: bold;
    margin: 0 18px;
  }
}

.project-card-time {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    padding: 4px;
  }

  &__title {
    margin-right: 18px;
  }

  &__value {
    font-weight: bold;
    flex-grow: 1;
    text-align: right;
  }
}

.project-card-status {
  &.active {
    color: green;
  }

  &.disabled {
    color: red;
  }
}
</style>
