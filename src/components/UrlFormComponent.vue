<script setup>
import { computed, useTemplateRef } from "vue";

const BUTTON_TEXT_TYPES = {
  "shortened": "Copy URL",
  "shorten": "Shorten URL"
};

const prop = defineProps(["type", "value"]);
const emit = defineEmits(["click"]);

const inputRef = useTemplateRef("input");

const isReadonly = computed(() => {
  return prop.type === "shortened";
});

const buttonText = computed(() => {
  return BUTTON_TEXT_TYPES[prop.type];
});


</script>

<template>
  <form class="flex f-centered" @submit.prevent="emit('click', inputRef.value)">
    <input ref="input" class="input-url" :value="prop.value" type="text" placeholder="🔗 Type the link here" :readonly="isReadonly" />
    <button class="input-button">{{ buttonText }}</button>
  </form>
</template>


<style scoped>
form {
  width: 100%;
  max-width: 700px;
  margin: auto;
}

.input-url {
  width: 100%;
  max-width: 420px;

  padding: 10px 15px;
  margin-right: 5px;

  border-radius: 10px;
  border: 1px solid var(--color-text);

  /* box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px; */

  font-size: 12pt;
}

.input-button {
  width: 100%;
  max-width: 140px;
  padding: 10px 15px;

  border-radius: 10px;
  border: 1px solid var(--color-brand);

  /* box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px; */

  cursor: pointer;

  font-size: 12pt;
  font-weight: 600;

  background-color: var(--color-brand);
  color: var(--white);

  transition: all 0.3s;
}

.input-button:hover {  
  background-color: var(--color-brand-hover);
  border: 1px solid var(--color-brand-hover);
}

@media (max-width: 640px) {
  form {
    flex-direction: column;
  }
  .input-url {
    max-width: 100%;

    margin: 0;
    margin-bottom: 5px;
  }
  .input-button {
    max-width: 100%;
  }
}
</style>