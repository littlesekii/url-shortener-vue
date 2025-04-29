<script setup>

const props = defineProps(["buttonText"]);
</script>

<template>
  <form class="flex f-centered" @submit.prevent="">
    <input class="input-url" type="url" placeholder="Enter the link here" />
    <button class="input-button">{{ props.buttonText }}</button>
  </form>
</template>


<style scoped>
form {
  width: 100%;
}

.input-url {
  width: 50%;
  padding: 10px 15px;
  margin-right: 5px;

  border-radius: 10px;
  border: none;

  font-size: 12pt;
}

.input-button {
  padding: 10px 15px;

  border-radius: 10px;
  border: none;

  cursor: pointer;

  font-size: 12pt;
  font-weight: bold;

  background-color: var(--brand-color);
  color: white;
}
</style>