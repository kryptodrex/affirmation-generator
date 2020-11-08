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
  color: rgb(128, 68, 163);;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  padding: 0.5rem;
}

a {
  text-decoration: none;
}

@media only screen and (min-width: 1024px) {

  #app {
    padding: 1rem;
  }

}

</style>
