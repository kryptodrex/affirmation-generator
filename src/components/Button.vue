<template>
  <div class="button">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: String,
    text: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.button {
    background-color: rgb(128, 68, 163);
    border: 0.2rem solid rgb(128, 68, 163);
    border-radius: 0.5rem;
    color: white;
    font-size: 1.2rem;

    padding: 0.8rem 1.5rem;
    margin: 0 auto;
    width: fit-content;

    cursor: pointer;
    transition: 0.2s;
}
.button:hover, .button:focus {
    background-color: white;
    color: rgb(128, 68, 163);
}

</style>
