<template>
  <div class="home">
    <router-link to="/affirmation">
      <Button text="Generate an affirmation" size="large"/>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    Button
  }
}
</script>
