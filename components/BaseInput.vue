<template>
  <div class="base-input-wrapper">
    <span v-if="placeholder && value.length" class="base-input-placeholder">
      {{ placeholder }}
    </span>
    <input
      ref="input"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      :class="['base-input', {'base-input--error': errors.length }]"
      :type="nativeType"
      @input.prevent="$emit('input', $event.target.value)"
      @keyup.enter="$emit('on-enter', $event.target.value)"
    >
  </div>
</template>
<script>
export default {
  $_veeValidate: {
    name () {
      return this.topLabel
    },
    value () {
      return this.value
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
}
</script>
<style lang="scss" scoped>
.base-input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.base-input {
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #192638;
  flex-grow: 1;

  &:disabled {
    background-color: rgb(208, 215, 226);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    -webkit-box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    -moz-box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }

  &--error {
    outline: none !important;
    box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 25%) !important;
    -webkit-box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 25%) !important;
    -moz-box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 25%) !important;
  }
}

.base-input-placeholder {
  position: absolute;
  color: #999;
  top: -10px;
  left: 6px;
  background: #fff;
  padding: 0 4px;
  
}
</style>
