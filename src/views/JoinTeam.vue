<template>
  <div>
    <section v-if="sectionIndex == 0" class="hero is-fullheight">
      <div class="container hero-body">
        <div class="columns is-centered is-vcentered">
          <div class="column is-full">
            <h2 class="is-size-1">Welcome to the Sidebr Closed Beta</h2>
            <h3 class="is-size-4">
              You've been invited to join {{ teamName }} on
              the fastest communication platform ever made
            </h3>
            <button class="button is-large" v-on:click="nextStep()"
             style="background-color: #6890F6; color: #FFF">
              Let's Go!
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-if="sectionIndex == 1" class="hero is-fullheight">
      <div class="container hero-body">
        <div class="columns is-centered is-vcentered">
          <h2 class="is-size-2" style="margin-top: -50px">
          We've Already Got {{ teamName }}, Tell Us About You</h2>
          <div class="column is-half">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" v-model="fullName"
                type="text" placeholder="Name">
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" v-model="email"
                type="email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" v-model="password"
                type="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-medium" v-on:click="createUser()"
                 v-bind:class="{ 'is-loading' : loading }"
                 style="background-color: #6890F6; color: #FFF">
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- image upload section -->
    <section v-if="sectionIndex == 2" class="hero is-fullheight">
      <div class="container hero-body">
        <div class="columns is-centered is-vcentered">
          <div class="column is-full">
            <h2 class="is-size-2">Now lets pick a 🔥 photo for your avatar </h2>
            <picture-input
              ref="pictureInput"
              @change="onChanged"
              @remove="onRemoved"
              :width="256"
              :removable="true"
              removeButtonClass="ui red button"
              :height="256"
              accept="image/jpeg, image/png"
              buttonClass="button"
              :customStrings="{
              upload: '<h1>Upload it!</h1>',
              drag: 'Drag and drop your image here'}">
            </picture-input>
            <button class="button is-medium is-success" v-bind:class="{ 'is-loading' : loading }"
              v-if="image !== ''" v-on:click="uploadDP()">
              Good to go
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
/* eslint-disable prefer-arrow-callback, prefer-template, no-unused-vars, arrow-parens */
import * as firebase from 'firebase/app';
import PictureInput from 'vue-picture-input';

export default {
  name: 'JoinTeam',
  components: {
    PictureInput,
  },
  data() {
    return {
      teamName: '',
      sectionIndex: 0,
      fullName: '',
      email: '',
      password: '',
      dpURL: '',
      loading: false,
      image: '',
    };
  },
  mounted() {
    this.teamName = this.$route.query.team;
  },
  methods: {
    nextStep() {
      this.sectionIndex += 1;
    },
    createUser() {
      this.loading = true;
      const this2 = this;
      this.$FireAuth.createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          const this3 = this2;
          const user2 = user;
          this2.$Firestore.collection('users').doc(user.user.uid).set({
            fullName: this2.fullName,
          }).then(function () {
            const member = this3.$Firestore.doc('users/' + user2.user.uid);
            this3.$Firestore.collection('teams').doc(this3.teamName).update({
              members: firebase.firestore.FieldValue.arrayUnion(member),
            });
            this3.loading = false;
            this3.nextStep();
          });
        },
        function (err) {
          alert('Oops. ' + err.message);
          this.loading = false;
        },
      );
    },
    uploadDP() {
      this.loading = true;
      const storageRef = this.$FirebaseStorage.ref().child('userDPs/' + this.$FireAuth.currentUser.uid);
      storageRef.put(this.image).then(response => {
        response.ref.getDownloadURL().then(downloadURL => {
          this.dpURL = downloadURL;
          this.updateUser();
        });
        console.log('Uploaded file!');
      });
    },
    onChanged() {
      console.log('New picture loaded');
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log('Old browser. No support for Filereader API');
      }
    },
    onRemoved() {
      this.image = '';
    },
    updateUser() {
      const teamRef = this.$Firestore.doc('teams/' + this.teamName);
      this.$Firestore.collection('users').doc(this.$FireAuth.currentUser.uid).update({
        dpURL: this.dpURL,
        team: teamRef,
      });
      this.loading = false;
      this.goToDownload();
    },
    getFileBlob(url, cb) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.addEventListener('load', function () {
        cb(xhr.response);
      });
      xhr.send();
    },
    goToDownload() {
      this.$router.push({
        name: 'Download',
      });
    },
  },
};
</script>
