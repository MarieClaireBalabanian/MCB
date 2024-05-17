<template>
  <section class="block-padding">
    <div class="container narrow">
      <div class="half copy mb-40 text-center">
        <PartialsTitle :title="block.title" class="mb-20" />
        <div class="paragraph">
          <SanityContent :blocks="block.contact_copy" />
        </div>
      </div>

      <div class="half form">
        <form @submit.prevent="submit" aria-label="Send us a mesage">
          <Transition name="list">
            <div
              id="form-errors"
              tabindex="-1"
              class="form-errors mb-40"
              v-if="srOnlyErrors.length"
              aria-atomic="true"
              aria-live="agressive"
            >
              <ol
                class="text-red paragraph-small"
                aria-label="Form Errors"
              >
                <li
                  class="text-left"
                  v-for="(error, index) in srOnlyErrors"
                  :key="`error-${index}`"
                >
                  {{ index + 1 }}. {{ error }}
                </li>
              </ol>
            </div>
          </Transition>

          <div class="fields mb-40 m-auto">
            <GlobalInput
              v-model="formInputs.name.val"
              :label="formInputs.name.label"
              labelStyle="absolute"
              :error="formInputs.name.errors"
              name="name"
              autocomplete="name"
              required
            />
            <GlobalInput
              v-model="formInputs.email.val"
              :label="formInputs.email.label"
              labelStyle="absolute"
              :error="formInputs.email.errors"
              name="email"
              autocomplete="email"
              required
            />

            <GlobalInput
              v-model="formInputs.message.val"
              :label="formInputs.message.label"
              labelStyle="absolute"
              :error="formInputs.message.errors"
              name="message"
              inputType="textarea"
              required
            />
          </div>

          <div class="actions text-center">
            <button
              type="submit"
              :disabled="submitting"
              ref="submitButton"
              class="button"
            >
              {{ submitting ? "Submitting" : "Submit" }}
            </button>
          </div>
          <p
            v-if="success"
            role="status"
            class="success-message text-center text-white h3"
            tabindex="-1"
            ref="successMessageRef"
          >
            Thanks for reaching out!
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import validators from "~/composables/validators";
import { scrollTo } from "../../composables/scrollTo.js";

const props = defineProps({
  block: Object,
  required: true
})

const requiredFields = ["name", "email", "message"];
const srOnlyErrors = ref([]);
const formErrorsRef = ref(null);

const formInputs = ref({
  email: {
    val: "",
    errors: null,
    validators: [validators.email, validators.required],
    label: "Email",
  },
  name: {
    val: "",
    errors: null,
    validators: [validators.required],
    label: "Name",
  },
  message: {
    val: "",
    errors: null,
    validators: [validators.required],
    label: "Message",
  },
});

const submitting = ref(false);
const success = ref(false);
const successMessageRef = ref(null);



// TODO: this could be a composable
const validateForm = () => {
  let valid = true;
  // Validates the whole form, including unique required validation
  requiredFields.forEach((fieldName) => {
    formInputs.value[fieldName].errors = null;
    if (!validators.required.fn(formInputs.value[fieldName].val)) {
      valid = false;
      let message = `${formInputs.value[fieldName].label} is required.`;
      formInputs.value[fieldName].errors = message;
      srOnlyErrors.value.push(message);
    } else {
      formInputs.value[fieldName].validators.forEach((validator) => {
        if (!validator.fn(formInputs.value[fieldName].val)) {
          valid = false;
          formInputs.value[fieldName].errors = validator.message;
          srOnlyErrors.value.push(validator.message);
        }
      });
    }
  });
  return valid;
};

const submit = () => {
  srOnlyErrors.value = [];
  submitting.value = true;
  if (validateForm()) {
    send();
    success.value = true;
    submitting.value = false;
    nextTick(() => {
      successMessageRef.value.focus();
      requiredFields.forEach((fieldName) => {
        formInputs.value[fieldName].val = "";
      });
    });
  } else {
    success.value = false;
    submitting.value = false;
    nextTick(() => {
      scrollTo('form-errors', 'smooth');
    });
  }
};

async function send() {
  const data = {
    name: formInputs.value.name.val,
    email: formInputs.value.email.val,
    message: formInputs.value.message.val,
  }
  await $fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(() => {})
  .catch((error) => {
    console.error("contact form error: ", error);
  });
}
</script>

<style lang="scss">
.block-contact {
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .form-errors {
    text-align: center;
    outline: none;

    ol {
      display: inline-block;
      width: auto;
      background: $red;
      padding: 10px 30px;
      color: $white;
    }
  }

  .success-message {
    margin-top: 30px;
  }

  .copy {
    .paragraph {
      width: 90%;
    }
  }

  @media (min-width: 768px) {
    .fields {
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > .form-field:not(:last-child) {
        width: calc(50% - 10px);
      }
      > .form-field:last-child {
        width: 100%;
      }
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
}
</style>
