<template>
  <div id="default-layout">
    <div class="header">
      <div class="left">
        <slot name="header-left" />
      </div>
      <div class="right">
          <slot name="header-right" />
        </div>
    </div>
    <slot/>
  </div>
</template>

<style lang="scss">
#default-layout {
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>