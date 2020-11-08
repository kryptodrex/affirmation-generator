<template>
  <div :class="getSize()">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: String,
    text: String
  },
  methods: {
    getSize() {
      var button = 'button';
      switch (this.size) {
        case 'large':
          return button + '-lg'
        case 'medium':
          return button + '-med'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div[class*='button'] {
  background-color: rgb(128, 68, 163);
  border: 0.2rem solid rgb(128, 68, 163);
  color: white;
  margin: 0 1rem;
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;
}
.button-lg {
  border-radius: 0.5rem;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
}
.button-med {
  border-radius: 0.4rem;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
}

div[class*='button']:hover, div[class*='button']:focus {
    background-color: white;
    color: rgb(128, 68, 163);
}

</style>
