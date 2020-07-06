<template>
  <div>
    <!-- This is the Team Name Section -->
    <section v-if="sectionIndex == 1" class="hero is-fullheight">
    <div class="container hero-body">
      <div class="columns is-centered is-vcentered">
        <h2 class="is-size-2">First Let's Create Your Team</h2>
        <div class="column is-half">
          <div class="field has-addons has-addons-centered">
            <div class="control">
              <input class="input is-large" v-model="teamName" type="text" placeholder="Team Name">
            </div>
            <div class="control">
              <a class="button is-large" v-on:click="nextStep()"
               style="background-color: #6890F6; color: #FFF">
                Make it real
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End of Team Name Section -->
  <!-- Here we have the User's Account Section -->
  <section v-if="sectionIndex == 2" class="hero is-fullheight">
  <div class="container hero-body">
    <div class="columns is-centered is-vcentered">
      <h2 class="is-size-2" style="margin-top: -50px">
        Now That We Have {{ teamName }}, Tell Us About You</h2>
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
            <button class="button is-medium" style="background-color: #6890F6; color: #FFF">
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
  </section>
<!-- end of user profile section -->
  <section v-if="sectionIndex == 3" class="hero is-fullheight">
  <div class="container hero-body">
    <div class="columns is-centered is-vcentered">
      <h2 class="is-size-2">Finally, Let's Get Some Teammates Onboard</h2>
      <div class="column is-half">
        <div class="field has-addons has-addons-centered"
          v-for="(teammate, index) in teammates" v-bind:key="index">
          <div class="control has-icons-left">
            <input class="input is-medium is-fullwidth"
             v-model="teammate.value"
             type="email" placeholder="Teammate Email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
          <div v-if="index == teammates.length - 1" class="control">
            <a class="button is-medium" v-on:click="addTeammate()"
            style="background-color: #6890F6; color: #FFF">
              Add Another
            </a>
          </div>
        </div>
        <button class="button is-medium is-success">
          That's The Whole Squad
        </button>
      </div>
    </div>
  </div>
  </section>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'ClosedBeta',
  data() {
    return {
      teamName: '',
      sectionIndex: 1,
      fullName: '',
      email: '',
      password: '',
      teammates: [{ value: '' }],
    };
  },
  methods: {
    nextStep() {
      this.sectionIndex += 1;
    },
    addTeammate() {
      this.teammates.push({
        value: '',
      });
    },
  },
};
</script>
