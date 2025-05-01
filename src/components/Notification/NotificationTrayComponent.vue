<script setup>
import { ref } from "vue";
import NotificationComponent from "./NotificationComponent.vue";

const queue = ref([]);

function notify(success, msg) {
  queue.value = [{id:performance.now(), success:success, msg:msg}];
}

function freeNotification(id) {
  let auxQueue = []; 
  queue.value.forEach(e => {
    if (e.id !== id)
      auxQueue.push(e);
  });
  queue.value = auxQueue;
}

defineExpose({notify});

</script>

<template>
  <div class="notification-tray flex f-column-reverse" ref="div-notification-tray">
    <NotificationComponent @vanished="freeNotification(notification.id)" v-for="notification in queue" :key="notification.id" :success="notification.success" :msg="notification.msg" />

  </div>
</template>

<style scoped>
.notification-tray {
  max-width: 100%;
  width: 300px;

  justify-content: flex-end;

  position: fixed;
  right: 0;
  top: 0;
}

@media (max-width: 400px) {
  .notification-tray {
    width: 100%;
  }
}
</style>

