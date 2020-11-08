<template>
  <div class="affirmation">
    <div id="loading" class="loading" v-if="isLoading">
        <p class="loader">Loading...</p>
    </div>
    <div class="affirmationBody" v-if="!isLoading">
      <img id="unsplashPhoto" :src="photoData.url" :alt="photoData.altText">
      <p class="photoCreds">
        Photo by <a target="_blank" :href="photoData.creatorProfile">{{ photoData.creatorName }}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>.
      </p>
      <p class="affirmationText">{{ affirmationData.affirmation }}.</p>

      <div class="actionButtons">
        <a href="/affirmation">
           <Button text="Generate new affirmation" size="medium" />
        </a>
        <div v-on:click="isCopied = true">
          <Button id="copyBtn" text="Copy share link" size="medium" v-clipboard="shareUrl"/>
        </div>
      </div>
      <p v-if="isCopied" class="copied"> Link copied! </p>
      
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Repository from "../repositories/repositoryFactory";
const affirm = Repository.get("affirm");
const photo = Repository.get("photo");

export default {
  name: "Affirmation",
  components: {
    Button
  },
  data() {
    return {
      sharing: null,
      reloadToken: "",
      affirmationData: null,
      isLoading: false,
      photoId: "",
      photoData: null,
      shareUrl: "",
      isCopied: false
    };
  },
  created () {
    this.sharing = this.$route.query.share
    if (this.sharing != null) {
      this.reloadToken = atob(this.sharing).split(":")[1];
      this.photoId = atob(this.sharing).split(":")[0]
    }
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true;
      var { data } = await affirm.getAffirmation(this.reloadToken);
      this.affirmationData = {
        "affirmation": data.affirmation,
        "reloadToken": data.reloadToken,
        "entity": data.entity
      };

      var textToSearch;
      if (data.entity != "") {
        textToSearch = data.entity;
      } else {
        textToSearch = data.affirmation;
      }

      if (this.photoId != ""){
        var { data } = await photo.getPhotoById(this.photoId,'regular');
      } else {
        var { data } = await photo.getPhotos(textToSearch,'regular');
      }
      this.photoData = {
        'url': data.urls.direct,
        'altText': data.alt_description,
        'photoId': data.photo_id,
        'creatorName': data.user.name,
        'creatorProfile': data.user.profile
      };

      var currentUrl = window.location.href;
      console.log(currentUrl);
      
      if (this.sharing != null) {
        this.shareUrl = currentUrl;
      } else {
        this.shareUrl = currentUrl + '?share=' + btoa(this.photoData.photoId + ":" + this.affirmationData.reloadToken);
      }

      this.isLoading = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loader {
  font-size: 120%;
}

img {
  max-width: 90%;
}

.photoCreds {
  margin: 0.5rem 1rem;
  font-size: 80%;
}

.affirmationText {
  margin: 1.2rem;
  font-size: 120%;
}

.actionButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.copied {
  color: rgb(128, 68, 163);
  font-size: 80%;
}

@media only screen and (min-width: 1024px) {

  img {
    max-height: 42rem;
  }

}


</style>
