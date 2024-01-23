<template>
  <section class="block-padding bottom-line">
    <div class="container">
      <div class="half copy text-white mb-20">
            <h2 class="h2 mb-40">{{ block.title }}</h2>
            <div class="paragraph">
              <SanityContent :blocks="block.contact_copy" />
            </div>
      </div>

      <div class="half form">
         <form @submit.prevent="submit" aria-label="Send us a mesage">
        <Transition name="list">
          <div
            class="form-errors mb-40"
            v-if="srOnlyErrors.length"
            aria-role="status"
          >
            <ol
              ref="formErrorsRef"
              class="text-red paragraph-small"
              tabindex="-1"
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
            {{ submitting ? 'Submitting' : 'Submit'}}
          </button>
        </div>
        <p v-if="success" role="status" class="success-message text-center text-white h3" tabindex="-1" ref="successMessageRef">
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


const attrs = useAttrs();
const block = attrs.block;

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
  zip: {
    val: "",
    errors: null,
    validators: [],
    label: "Zip Code",
  },
});

const submitting = ref(false);
const success = ref(false);
const successMessageRef = ref(null);

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

    })
  } else {
    success.value = false;
    submitting.value = false;
    nextTick(() => {
      formErrorsRef.value.focus();
    });
  }
};

const runtimeConfig = useRuntimeConfig();
async function send() {
  const data = {
    From: runtimeConfig.email,
    To: runtimeConfig.email,
    HtmlBody: `
        <h2>${formInputs.value.name.val}</h2>
        <h3>${formInputs.value.email.val}</h3>
        <p>${formInputs.value.message.val}</p>
    `,
  };

  await $fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(() => {})
    .catch((error) => {
      console.error("addEmailSignup error: ", error);
    });
}
</script>

<style lang="scss">
.block-contact {
  background: $black;
  .fields {
    grid-gap: 15px;
  }


  .form-errors {
    text-align: center;
   
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

                  // background: linear-gradient(160deg,$green 50%, $black 0);

  @media (min-width: 768px) {

    .container {
      display: flex;
      justify-content: space-between;
      .half {
        width: calc(50% - 40px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.copy {

        }
      }
    }
    .fields {
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > .form-field:not(:last-child) {
        width: calc(50% - 1rem);
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
