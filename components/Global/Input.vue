<template>
  <div
    class="form-field"
    :class="[
      { error: error, 'has-value': !!modelValue, focused: focused },
      inputType,
    ]"
  >
    <label :for="name" :class="[{ 'sr-only': srOnlyLabel }, labelStyle]">
      {{ label }}<span v-if="required" aria-hidden="true">*</span>
    </label>

    <textarea
      v-if="inputType === 'textarea'"
      ref="inputRef"
      :value="modelValue"
      @focus="focused = true"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-required="required.toString()"
      :aria-invalid="error ? true : null"
      :id="name"
      :name="name"
    />

    <input
      v-else
      ref="inputRef"
      :type="inputType"
      :value="modelValue"
      @focus="focused = true"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-required="required.toString()"
      :aria-invalid="error ? true : null"
      :autocomplete="autocomplete ? autocomplete : null"
      :id="name"
      :name="name"
    />
    <p class="error" v-if="error" :id="name + '-error'">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: false,
    default: "text",
  },
  label: {
    type: String,
    required: true,
  },
  srOnlyLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  autocomplete: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  focusOnMount: {
    tyoe: Boolean,
    required: false,
    default: false,
  },
  labelStyle: {
    type: String,
    required: false,
    default: "static",
  },
  error: {
    type: String,
    required: false,
  },
});

const focused = ref(null);
const inputRef = ref(null);
const { focusOnMount, modelValue } = toRefs(props);

onMounted(() => {
  if (process.client) {
    if (focusOnMount?.value) {
      inputRef.value.focus();
    }
  }
});
</script>

<style lang="scss">
.form-field {
  position: relative;
  margin-bottom: 1.9rem;

  &.error {
    input,
    textarea {
      border: 2px solid $red;
    }
  }

  input,
  textarea {
    background: white;
    padding: 15px;
    width: 100%;
	border-radius: 0;
	 filter: drop-shadow(0 3px 2px)
  }

  textarea {
    resize: none;
    min-height: 200px;
  }

  &.has-value {
    label.absolute,
    &.textarea label.absolute {
      opacity: 0;
    }
  }

  &.textarea label.absolute {
    top: 15px;
    transform: none;
  }

  label {
    &.static {
      display: block;
      margin-bottom: 10px;
    }
    &.absolute {
      transition: 0.25s ease;
      pointer-events: none;
      touch-action: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      z-index: 2;
    }
  }

  .error {
    @extend .paragraph-small;
    position: absolute;
    color: $white;
    top: 100%;
    left: 0;
  }
}
</style>
