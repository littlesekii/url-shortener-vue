<script setup>
import { onMounted, useTemplateRef } from "vue";

const props =  defineProps(["success", "msg"]);
const emit = defineEmits(["vanished"]);

const component = useTemplateRef("div-notification");

onMounted(() => {
  if (props.success)
    component.value.classList.add("success");
  else
    component.value.classList.add("error");

  setTimeout(() => {
    component.value.classList.add("vanishing");
  }, 1000 * 7);

  setTimeout(() => {
    emit("vanished");
  }, 1000 * 10);
});

</script>

<template>
  <div @click="emit('vanished')" class="notification" ref="div-notification">
    {{ props.msg }}
  </div>
</template>

<style scoped>
  .notification {
    padding: 15px;
    margin: 0 10px;
    margin-top: 10px;

    word-break: keep-all;

    border-radius: 10px;

    color: var(--white);

    opacity: 1;

    /* z-index: 1; */

    user-select: none;
    cursor: pointer;
  }

  .success {
    background-color: var(--green-success-color);
  }
  .error {
    background-color: var(--red-error-color);
  }

  .vanishing {
    -webkit-transition: opacity 3s ease-out;
    -moz-transition: opacity 3s ease-out;
    -ms-transition: opacity 3s ease-out;
    -o-transition: opacity 3s ease-out;
    transition: opacity 3s ease-out;

    opacity: 0;
  }
</style>

