<template>
  <a href="https://github.com/page6de/poker/issues" target="_blank" class="bandarole" >
    <div class="text">beta</div>
    <div class="gif">
      
    </div>
  </a>
</template>

<script setup lang="ts">

</script>

<style lang="scss">

$size: 200px;

.bandarole {
  position: fixed;
  display: block;
  bottom: 0;
  left: 0;
  width: $size;
  height: $size;
  overflow: hidden;
  text-decoration: none;

  .text {
    background-color: #333;
    color: #CCC;
    font-size: 1.6rem;
    text-transform: uppercase;
    padding: 10px 0;
    transform: rotateZ(45deg) translateY(calc(130px)) translateX(50px);
  }
  .gif {
    position: absolute;
    top: 0;
    left: 0;
    height: $size;
    width: $size;
    z-index: 2;
    background-image: url('https://media4.giphy.com/media/wFmAaA333ZXOwTA7d8/giphy.gif?cid=de9bf95exiehfty0u3ykk3qnpihs4f682cxg9kt4fs75u8d1&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    transform: translateY($size);
    transition: transform 250ms ease-out;
  }
  &:hover .gif {
    transform: translateY(0);
  }
}
</style>