<script setup>
import { computed, useTemplateRef } from "vue";

const prop = defineProps(["type", "value"]);
const emit = defineEmits(["click"]);

const inputRef = useTemplateRef("input");

const readonly = computed(() => {
  return prop.type === "shortened";
});

const buttonText = computed(() => {
  if (prop.type === "shortened") {
    return "Copy URL";
  }

  return "Shorten URL";
});


</script>

<template>
  <form class="flex f-centered" @submit.prevent="emit('click', inputRef.value)">
    <input ref="input" class="input-url" :value="prop.value" type="text" placeholder="Type the link here" :readonly="readonly" />
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
  width: 60%;
  padding: 10px 15px;
  margin-right: 5px;

  border-radius: 10px;
  border: none;

  font-size: 12pt;
}

.input-button {
  width: 20%;
  padding: 10px 15px;

  border-radius: 10px;
  border: none;

  cursor: pointer;

  font-size: 12pt;
  font-weight: 600;

  background-color: var(--brand-color);
  color: white;
}
</style>