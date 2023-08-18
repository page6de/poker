<template>
  <div class="player" :style="{top: position?.y, left: position.x}">
    <ResultCard :show="showResult" :voted="hasVoted" :vote="user.vote"></ResultCard>
    <!--<div class="avatar">{{ position.userSequenceNo }}</div>-->
    <div class="username">{{ user.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserPosiotion } from '@/types/User.type'
import { PropType, computed } from 'vue';
import ResultCard from "@/components/ResultCard.vue"

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    default: () => { return {id: 0, name: 'nobody', voted: ''} }
  },
  position: {
    type: Object as PropType<UserPosiotion>,
    required: true,
  },
  showResult: {
    type: Boolean,
    default: false,
  }
})

const hasVoted = computed(() => {
  return props.user.vote !== '';
});

</script>

<style lang="scss">
.player {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 2px solid #AAA;
  border-radius: 50px;
  background-color: #CCC;
  box-shadow: 0 5 10px rgba(0,0,0,0.2);
  padding-top: 10px;
}
.username {
  font-weight: bold;
}
</style>