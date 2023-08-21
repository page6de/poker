<template>
  <div id="results">
    <div v-for="r in cumulatedResults" :key="r.voteValue" class="result">
      <div class="bar">
        <div class="perc" :style="{height: `${r.voteCount / r.totalCount * 100}%`}"></div>
        <div class="num">{{ r.voteValue }}</div>
      </div>
      <div class="subline">
        {{ r.voteCount }}x
      </div>
    </div>
    <div class="avg">
      {{ avgResult }}
      <img src="/img/icons/average.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import type { User } from "@/types/User.type";

type CumulatedResult = {
  voteValue: string,
  voteCount: number,
  totalCount: number
}

const props = defineProps({
  users: {
    type: [] as PropType <User[]>,
    default: []
  }
});

const cumulatedResults = computed(() => {
  const res: CumulatedResult[] = [];
  const votesByValue:{[key: string]: CumulatedResult} = {};
  const voteValues:string[] = [];
  props.users.forEach( (user) => {
    if (user.vote) {
      if (!voteValues.includes(user.vote)) voteValues.push(user.vote);
      if (votesByValue[user.vote]) {
        votesByValue[user.vote].voteCount++;
      } else {
        votesByValue[user.vote] = {
          voteValue: user.vote,
          voteCount: 1,
          totalCount: props.users.length
        }
      }
    }
  });
  for( let v of voteValues.sort()) {
    console.log(v)
    res.push(votesByValue[v]);
  }
  console.log(res)
  return res;
});

const avgResult = computed(() => {
  let sum = 0;
  let votes = 0;
  props.users.forEach((user) => {
    if (user.vote) {
      let int = parseInt(user.vote);
      if(!isNaN(int)) {
        votes++;
        sum += int;
      }
    }
  })
  const avg = (sum / votes);
  return isNaN(avg) ? '' : avg.toFixed(1);
})

</script>

<style lang="scss">

#results {
 
  display: flex;
  gap: 20px;
  justify-content: center;

  .result {
    display: flex;
    flex-direction: column;
    align-items: center;

    .bar {
      position: relative;
      width: 30px;
      height: 80px;
      background-color: #ccc;;

      .perc {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--primary-color);
      }
      .num {
        font-weight: bold;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 1.2rem;
      }
    }
    .subline {
      font-size: .8rem;
    }
  }

  .avg {
    display: flex;
    align-items: center;
    font-size: 2rem;

    img  {
      height: 34px;
      fill: var(--text-color);
      
    }
   }
}

</style>
