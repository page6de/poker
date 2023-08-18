<template>
  <div class="result-card" :class="{show, voted}">
    <div class="face back">
      
    </div>
    <div class="face front">
      {{ vote }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  voted: {
    type: Boolean,
    default: false
  },
  vote: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss">
.result-card {
  transition: transform .5s;
  transform-style: preserve-3d;
  position: relative;
  width: 60px;
  height: 90px;
  //border-radius: 10px;
  margin-bottom: .5rem;
  
  

  &.show {
    transform: rotateY(180deg);
  }
  .face {
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    vertical-align: baseline;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 3px rgba(0,0,0,.2);
    border: 2px solid #999;
  }
  .back {
    background-color: #999;
    color: #EEE;


  }
  &.voted .back {
    background-color: #333;
  }
  .front {
    background-color: #ccc;
    transform: rotateY( 180deg );
  }

}

</style>