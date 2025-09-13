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
      {{ medianResult }}
      <img src="/img/icons/average.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from "vue";
import type { User } from "@/types/User.type";

type CumulatedResult = {
  voteValue: string,
  voteCount: number,
  totalCount: number
}

const props = defineProps({
  users: {
    type: Array as PropType<Array<User>>,
    default: () => []
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
  for( const v of voteValues.sort(sortResults)) {
    res.push(votesByValue[v]);
  }
  return res;
});

const sortResults = (a:string, b:string) => {
  return voteToInt(a) - voteToInt(b);
}

const voteToInt = (vote:string) => {
  if (vote === '?') return -1;
  if (vote === '☕️') return -2;
  const int = parseInt(vote)
  if (isNaN(int)) return -1000;
  return int
}

const medianResult = computed(() => {
  const votes: number[] = [];
  props.users.forEach((user) => {
    if (user.vote) {
      const int = parseInt(user.vote);
      if (!isNaN(int)) {
        votes.push(int);
      }
    }
  });
  if (votes.length === 0) return "";
  votes.sort((a, b) => a - b);
  const mid = Math.floor(votes.length / 2);
  const median = (votes.length % 2)
    ? votes[mid]
    : ((votes[mid - 1] + votes[mid]) / 2);
  return median.toString();
});

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
