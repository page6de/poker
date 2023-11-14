<template>
  <DefaultLayout>
    <template v-slot:header-left>
      <RouterLink to="/" style="padding-left:1rem;"><img src="/img/logo.svg" height="60"></RouterLink>
    </template>
    <template v-slot:header-right>
      <div style="padding-top: 14px; padding-right: 1rem;">
        <img src="/img/icons/user-circle.svg" height="30" class="header-icon user-icon"/><b>{{ getCurrentUser() }}</b>
      </div>
    </template>
    <div id="room">
        
      <GameTable>
        <button v-if="!showCards" @click="onToggleShowCards">Reveal Cards</button>
        <VoteResults v-if="showCards" :users="users"/>
        <button v-if="showCards" @click="resetVotes">Next Round</button>
      </GameTable>
      
      <div class="players" ref="playersCont">
        <PlayerOnTable v-for="(user, i) in users" :key="user.id" :user="user" :position="calcPosForUser(i)" :show-result="showCards" />
      </div>
      <div class="vote-buttons">
        <a href="#" v-for="(c, i) in cards" :key="i" 
          @click.prevent="doVote(c)"
          :class="{voted: myVote === c}"
        >{{ c }}</a>
      </div>
      <div class="room-url" @click="copyRoomUrl">
        <div v-show="wasCopied">
          <img src="/img/icons/check.svg" height="20" class="header-icon check-icon"/>
          Room URL copied to clipboard! 
        </div>
        <div v-show="!wasCopied">
          <img src="/img/icons/link.svg" height="20" class="header-icon link-icon"/> 
          {{ getRoomUrl() }} 
        </div>
      </div>
    </div>
    <BetaBandarole/>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { Socket, io } from "socket.io-client";
import type { User, UserPosiotion} from '@/types/User.type'
import DefaultLayout from "../layouts/DefaultLayout.vue";
import GameTable from "../components/GameTable.vue";
import VoteResults from "@/components/VoteResults.vue"
import PlayerOnTable from "../components/PlayerOnTable.vue";
import BetaBandarole from "@/components/BetaBandarole.vue";

import { useUser } from "@/composables/useUser"
import { useRoom } from "@/composables/useRoom"
import { DefaultEventsMap } from '@socket.io/component-emitter';
import router from '@/router';
import { useRoute } from 'vue-router';

const { getCurrentUser } = useUser();

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

onBeforeMount(() => {
  if (!route.params.roomId) {
    if (getRoom() == '') {
      router.push('/');
    }
  } else {
    const roomId = route.params.roomId as string || '';
    setRoom(roomId);
  }
  if (getCurrentUser() == '') {
    router.push('/');
  }
})

onMounted(() => {
  const userName = getCurrentUser();
  if (!userName) {
    router.push('/');
  } else {
    socket = io(process.env.VUE_APP_WS_SERVER_URL);
    //socket.on('enterRoom', (msg) => { console.log('EnterRoom: ', msg) })
    socket.on('vote', (msg) => { 
      let user = users.value.find((u:User) => u.id === msg.id);
      if (user) user.vote = msg.vote ;
    })
    socket.on('updateUser', (payload) => users.value = payload.users)
    socket.on('showCards', (payload) => showCards.value = payload.show)
    socket.on('resetVotes', (payload) => {
      users.value = payload.users;
      myVote.value = '';
      showCards.value = false;
    });

    socket.emit('enterRoom', {name: getCurrentUser(),  room: getRoom()})
  } 
});

onBeforeUnmount(() => {
  socket?.disconnect();
});

const route = useRoute();
const { setRoom, getRoom, getRoomUrl } = useRoom();

onBeforeUnmount(() => {
  if(socket) socket.close();
  if (!route.params.roomId) {
    if (getRoom() == '') {
      router.push('/');
    }
  } else {
    const roomId = route.params.roomId as string || '';
    setRoom(roomId);
  }
});

const cards = ["?", "☕️", "1", "2", "3", "5", "8", "13", "16", "21"]

const showCards = ref(false);
const myVote = ref('');

const onToggleShowCards = () => {
  showCards.value = !showCards.value;
  socket.emit('showCards', { userId: socket.id, show: showCards.value });
}

const resetVotes = () => {
  socket.emit('resetVotes', {userId: socket.id} )
}

const playersCont = ref();
const users = ref<User[]>([]);

const calcPosForUser = (sequenceNo: number):UserPosiotion => {
  const pos: UserPosiotion = {
    x: '0px',
    y: '0px',
    userSequenceNo: sequenceNo,
    userTotal: users.value.length
  }

  const minX = 10;
  const maxX = 90;
  const minY = 5;
  const maxY = 52;

  if (sequenceNo < 2) {
    pos.y = "50%";
    pos.x = `${(sequenceNo === 0) ? 3: 97}%`;
  } else {
    const seq = sequenceNo - 2;
    const total = pos.userTotal - 2;
    const xf = 1 + Math.floor(seq / 2);
    const partsPerLine = seq % 2 === 0 ? Math.floor((total + 1) / 2) : Math.floor(total / 2);
    const p = (maxX - minX) / (partsPerLine + 1);
    const x = minX + ( xf * p );
    const y = seq % 2 === 0 ? minY : maxY;

    pos.x = `${x}%`
    pos.y = `${y}vh`
  }

  return pos;
};


const doVote = (vote:string) => {
  if (vote == myVote.value) {
    myVote.value = '';
  } else {
    myVote.value = vote;
  }
  
  socket.emit('vote', myVote.value);
}

const wasCopied = ref(false);
let wasCopiedTo: number;
const copyRoomUrl = () => {
  try {
    navigator.clipboard.writeText(getRoomUrl());
    wasCopied.value = true;
    if (wasCopiedTo) clearTimeout(wasCopiedTo);
    wasCopiedTo = setTimeout(() => {
      wasCopied.value = false
    }, 3000);
  } catch (e) {
    console.error('Could not copy to clipboard.')
  }
}

</script>

<style lang="scss">
#room {
  position: relative;
  perspective: 1200px;
  height: calc(100vh - 100px);

  .room-url {
    position: absolute;
    bottom: 0px;
    width: 100%;
  }

  .players {
    position: absolute;
    top: 5vh;
    left: 12vw;
    right: 12vw;
    height: 60vh;
  }

  .vote-buttons {
    position: fixed;
    bottom: 40px;
    left: 20px;
    right: 20px;
    text-align: center;
    display: flex;
    justify-content: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      width: 60px;
      height: 90px;
      margin: 5px;
      cursor: pointer;
      transition: all 200ms;
      border-radius: 5px;
      text-align: center;
      text-decoration: none;
      border: 2px solid var(--border-color);
      color: #222;
    
      &:hover {
        transform: translateY(-10px);
      }

      &.voted {
        background-color: #333;
        color: #ccc;
        transform: translateY(-20px);
      }
    }
  }
}

.user-icon {
  vertical-align: middle;
  margin-right: .5rem;
  margin-bottom: 3px;
}

.room-url > div {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  fill: #0ea70e;
}

</style>