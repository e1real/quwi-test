<template>
  <button
    :class="[
      'base-btn',
      {'base-btn--with-icon': iconExist },
      `base-btn--${variant}`
    ]"
    :style="{ minWidth }"
    :type="type"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    <IconsAnimatedPreloader v-if="loading" />
    <slot name="icon" />
    <span v-if="!loading" class="base-btn__label">{{ label }}</span>
  </button>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: String,
      default: 'unset'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  data () {
    return {
      iconExist: false
    }
  },
  computed: {
    isDisabled () {
      if (this.loading) {
        return true
      }
      return this.disabled
    }
  },
  mounted () {
    this.iconExist =
      Array.isArray(this.$slots.icon) && this.$slots.icon.length === 1
  }
}
</script>
<style lang="scss" scoped>
.base-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: #2668c1;
  border-radius: 9px;
  font-family: Inter, sans-serif;
  font-style: normal;
  line-height: 142%;
  text-align: center;
  color: #FFFFFF;
  width: 100%;
  height: 52px;
  font-size: 18px;
  font-weight: 400;

  &--with-icon .base-btn__label {
    margin-left: 8px;
  }

  &--outlined {
    border: 1px solid #4C6FFF;
    color: #4C6FFF;
    background: transparent;
  }

  &--warn-outlined {
    border: 1px solid #FCBA39;
    color: #FCBA39;
    background: transparent;
  }

  &--sucess-outlined {
    border: 1px solid #0CC5A0;
    color: #0CC5A0;
    background: transparent;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
