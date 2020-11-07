<template>
  <div class="affirmation">
    <div id="loading" class="loading" v-if="isLoading">
        <p>Loading...</p>
    </div>
    <div class="affirmationText" v-if="!isLoading">
      <p>{{ affirmationData.affirmation }}. (Entity: {{affirmationData.entity}})</p>
    </div>
  </div>
</template>

<script>
import Repository from "../repositories/repositoryFactory";
const affirm = Repository.get("affirm");
const photo = Repository.get("photo");

export default {
  name: "Affirmation",
  data() {
    return {
      affirmationData: null,
      isLoading: false,
      reloadToken: ""
    };
  },
  created () {
    var sharing = this.$route.query.share
    if (sharing != null) {
      this.reloadToken = sharing
    } else {
      this.reloadToken = ""
    }
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true;
      const { data } = await affirm.getAffirmation(this.reloadToken);
      const { entity } = await affirm.getEntity(data.affirmation);
      this.isLoading = false;

      this.affirmationData = {
        "affirmation": data.affirmation,
        "reloadToken": data.reloadToken,
        "entity": entity.result
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
