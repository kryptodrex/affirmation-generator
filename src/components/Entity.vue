<template>
  <div class="entity">
    {{ text.toLowerCase() }}
  </div>
</template>

<script>
export default {
  name: 'Entity',
  props: {
    text: String
  },
  methods: {
    // getSize() {
    //   var button = 'button';
    //   switch (this.size) {
    //     case 'large':
    //       return button + '-lg'
    //     case 'medium':
    //       return button + '-med'
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.entity {
  background-color: rgb(128, 68, 163);
  border: 0.15rem solid rgb(128, 68, 163);
  color: white;
  margin: 0.5rem;
  width: fit-content;
  cursor: pointer;
  border-radius: 1.5rem;
  font-size: 0.8rem;
  padding: 0.4rem 0.7rem;
  transition: 0.2s;
}

.entity:hover, .entity:focus {
    background-color: white;
    color: rgb(128, 68, 163);
}


@media only screen and (min-width: 1024px) {

  div[class*='button'] {
    margin: 0 1rem;
  }

}

</style>
