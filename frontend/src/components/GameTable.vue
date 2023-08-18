<template>
  <div class="table">
    <slot/>
  </div>
</template>

<style lang="scss">
.table {
  position: absolute;
  top: 20vh;
  left: 20vw;
  right: 20vw;
  //width: calc(60vw - 10px);
  height: 25vh;
  border: 5px solid #AAA;
  border-radius: 100px;
  background-color: #FEFEFE;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>