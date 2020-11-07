<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>

@font-face {
  font-family: "Poppins";
  src: url('assets/fonts/Poppins/Poppins-Regular.ttf');
}

#app {
  font-family: Poppins, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

a {
  text-decoration: none;
}

</style>
