<template>
  <DefaultLayout>
    <p style="margin-bottom: 3rem;">
      <img src="/img/logo.svg" height="180">
    </p>
    <p>
      
      <label for="i-username">Username:</label>
      <input v-model="username" id="i-username"><br>
    </p>
    <p v-if="getRoom() !== ''" style="margin-bottom: 2rem">
      <label>Current Room:</label> <b style="margin-bottom: .6rem; display: inline-block;">{{ getRoomUrl() }}</b><br>
      <button @click="enterRoom">Enter Room</button>
    </p>
    <p>
      <button @click="createNewRoom">Create New Room</button>
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
const { generateRoomId, getRoomUrl } = useRoom();
 
const createNewRoom = async () => {
  const newRoomId = await generateRoomId();
  if (newRoomId) {
    roomId.value = newRoomId;
    enterRoom();
  }
};

const enterRoom = () => {
  if(username.value === '') return
  setUser(username.value);
  router.push({name:'room', params: {roomId: roomId.value}});
} 


</script>

<style lang="scss">
  
</style>