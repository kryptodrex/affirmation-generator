<template>
  <div class="affirmation">
    <div id="loading" class="loading" v-if="isLoading">
        <p class="loader">Loading...</p>
    </div>

    <div class="affirmationBody" v-if="!isLoading">
        <div class="affirmationPhoto" v-if="foundResult">
          <a :href="photoData.html" target="_blank"><img id="unsplashPhoto" :src="photoData.url" :alt="photoData.altText" loading="lazy"></a>
          <p class="photoCreds">
            Photo by <a target="_blank" :href="photoData.creatorProfile">{{ photoData.creatorName }}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>.
          </p>
        </div>
        <p class="noPhoto" v-if="!foundResult">No photo found for affirmation :(</p>

        <div class="affirmations">
          <p class="affirmationText">{{ affirmationData.affirmation }}.</p>
        </div>
        
      <div class="actions">
        <span  v-if="!foundResult && affirmationData.other_entities.length > 0"> 
        <!-- <span v-if="affirmationData.other_entities.length > 0"> -->
          Choose another word to search with: 
        </span>
        <div class="chooseEntity" v-if="!foundResult && affirmationData.other_entities.length > 0">
        <!-- <div class="chooseEntity" v-if="affirmationData.other_entities.length > 0"> -->
          <div v-for="entity in affirmationData.other_entities" :key="entity" v-on:click="getNewPhoto(entity)">
            <Entity :text="entity" />
          </div>
        </div>
        <div class="actionButtons">
          <div id="genActions" class="generateActions">
            <div class="newActionBtn" v-on:click="getNewPhoto(affirmationData.top_entity)">
             <Button text="New photo" size="medium" />
            </div>
            <div class="newActionBtn" v-on:click="getNewAffirmation()">
              <Button text="New affirmation" size="medium" />
            </div>
          </div>
          <div id="genNew" v-on:click="generateNew()">
            <Button text="New affirmation and picture" size="medium" />
          </div>
          <div id="shareBtn" class="shareBtn">
            <div v-on:click="createShareUrl(), isCopied = true" v-if="foundResult">
              <Button id="copyBtn" text="Share with friends!" size="medium"/>
            </div>
            <p v-if="isCopied" class="copied"> Link copied! </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Entity from '@/components/Entity.vue'

import Repository from "../repositories/repositoryFactory";
const affirm = Repository.get("affirm");
const photo = Repository.get("photo");

export default {
  name: "Affirmation",
  components: {
    Button,
    Entity
  },
  data() {
    return {
      sharing: null,
      reloadToken: "",
      affirmationData: null,
      isLoading: false,
      photoId: "",
      photoData: null,
      isCopied: false,
      foundResult: false
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

      // Get affirmation data from service, along with entity
      var { data } = await affirm.getAffirmation(this.reloadToken);
      this.affirmationData = data;

      var textToSearch;
      if (data.top_entity != "") {
        textToSearch = data.top_entity;
      } else {
        textToSearch = data.affirmation;
      }

      // Check if photo id was passed in shareToken
      // if it was, use that to get photo; if not, search for new based on entity
      if (this.photoId != "") {
        var { data } = await photo.getPhotoById(this.photoId,'regular');
      } else {
        var { data } = await photo.getPhotos(textToSearch,'regular');
      }

      this.setPhotoData(data);

      this.isLoading = false;
    },

    async generateNew() {
      this.isLoading = true;

      // Get affirmation data from service, along with entity
      var { data } = await affirm.getAffirmation("");
      this.affirmationData = data;

      var textToSearch;
      if (data.top_entity != "") {
        textToSearch = data.top_entity;
      } else {
        textToSearch = data.affirmation;
      }

      // Get new photo
      var { data } = await photo.getPhotos(textToSearch,'regular');

      this.setPhotoData(data);

      this.isLoading = false;
    },

    async getNewAffirmation() {
      // Get affirmation data from service, along with entity
      var { data } = await affirm.getAffirmation("");
      this.affirmationData = data;
    },

    async getNewPhoto(text) {
      var textToSearch;
      if (text != "") {
        textToSearch = text;
      } else {
        textToSearch = this.affirmationData.affirmation;
      }
      var { data } = await photo.getPhotos(textToSearch,'regular');
      this.setPhotoData(data);
    },

    setPhotoData(data) {
      if (data.foundPhoto != 0) {
        this.foundResult = true;
        this.photoData = {
          'url': data.urls.direct,
          'html': data.urls.html,
          'altText': data.alt_description,
          'photoId': data.photo_id,
          'creatorName': data.user.name,
          'creatorProfile': data.user.profile
        };
      } else {
        this.foundResult = false;
        this.photoData = {
          'url': "",
          'html': "",
          'altText': "",
          'photoId': "",
          'creatorName': "",
          'creatorProfile': ""
        };
      }
    },

    createShareUrl() {
      // Get current url to use for sharing
      var currentUrl = window.location.origin + window.location.pathname;

      // Create a share token
      var shareToken = btoa(this.photoData.photoId + ":" + this.affirmationData.reloadToken);

      // Create new url
      var shareUrl = currentUrl + '?share=' + shareToken;

      // Copy the new share url to clipboard
      this.$clipboard(shareUrl);
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
  border-radius: 0.3rem;
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

.chooseEntity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.actionButtons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 1rem 0;
}
#genActions {
  order: 2
}
#genNew {
  order: 3
}
#shareBtn {
  order: 1
}

.generateActions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.newActionBtn {
  margin: 0.2rem;
}

.shareBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.copied {
  font-size: 80%;
}

.noPhoto {
  font-size: 130%;
}

@media only screen and (min-width: 1024px) {

  img {
    border-radius: 0.5rem;
    max-height: 42rem;
    transition: 0.2s;
  }

  img:hover {
    box-shadow: 1px 3px 2px rgb(128, 68, 163);
  }

  .affirmationText {
    font-fize: 150%;
  }

  .actionButtons {
    flex-direction: row;
  }
  #genActions {
    order: 1
  }
  #genNew {
    order: 2
  }
  #shareBtn {
    order: 3
  }

  .generateActions {
    flex-direction: column;
  }

}


</style>
