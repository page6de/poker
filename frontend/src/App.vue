<template>
  <router-view/>
</template>

<style lang="scss">

:root {
  --primary-color: #9A88DB;
  --secondary-color: #423966;
  --border-color: #747475;
  --main-bg: #FFFFFF;
  --text-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: var(--text-color);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


label {
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-bottom: .2rem;
  display: block;
}
input {
  font-size: 1.4rem;
  padding: .4rem .8rem;
  border-radius: .6rem;
  border: 2px solid var(--border-color);
  margin-bottom: 1rem;
  color: #222
}
button {
  font-size: 1.4rem;
  padding: .6rem 1.6rem;
  border-radius: .8rem;
  border: 2px solid var(--border-color);
  margin: .4rem;
  cursor: pointer;
  transition: all .2s;
  background-color: transparent;
  box-shadow: 2px 2px 4px rgba(0,0,0,.2);

  &:hover {
    background-color: #333;
    //border-color: #fff;//var(--primary-color);
    color: #fff;
  }
  &:active {
    box-shadow: 0px 0px 0px rgba(0,0,0,.2);
    transform: translateY(2px);
  }
}
</style>
