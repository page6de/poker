<template>
  <DefaultLayout>
    <p style="margin-bottom: 3rem;">
      <img src="/img/logo.svg" height="180">
    </p>
    <p>
      
      <label for="i-username">Username:</label>
      <input v-model="username" id="i-username"><br>

      <label for="i-roomid">RoomId:</label>
      <input v-model="roomId" id="i-roomid"><br>
    </p>
    <p>
      <button @click="enterRoom">Enter Room</button>
      <button @click="createNewRoom">Create Room</button>
    </p>

  </DefaultLayout>
</template>

<script setup lang="ts">
import router from '@/router';
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useUser } from "../composables/useUser";
import { useRoom } from "../composables/useRoom";
import { onMounted, ref } from 'vue';

// User Controls
const { setUser, getCurrentUser } = useUser();
const { getRoom } = useRoom();
const username = ref('');

onMounted(() => {
  username.value = getCurrentUser();
  roomId.value = getRoom();
})

// Room Controls
const roomId = ref(''); 
const { generateRoomId } = useRoom();
 
const createNewRoom = async () => {
  const newRoomId = await generateRoomId();
  if (newRoomId) {
    roomId.value = newRoomId;
  }
};

const enterRoom = () => {
  setUser(username.value);
  router.push({name:'room', params: {roomId: roomId.value}});
} 


</script>

<style lang="scss">
  
</style>