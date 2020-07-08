<template>
  <div class="home">
    <section class="hero is-fullheight">
    <div class="container hero-body">
      <div class="columns is-centered is-vcentered">
        <div class="column is-full">
          <h2 class="title is-1">Meet Sidebr</h2>
          <h2 class="is-size-2">The Fastest Communication Platform Ever Made</h2>
          <div v-if="!joinedWaitlist"
          class="field has-addons has-addons-centered">
            <div class="control">
              <input class="input is-large" v-model="email"
               type="email" placeholder="you@fasternow.com">
            </div>
            <div class="control">
              <a class="button is-large" v-on:click="submitForm()"
                v-bind:class="{ 'is-loading' : loading }"
               style="background-color: #6890F6; color: #FFF">
                Join The Waitlist
              </a>
            </div>
          </div>
          <h2 v-if="joinedWaitlist" class="is-size-3"
          style="color: #6890F6">
            You're in. We'll be in touch. Fast.
          </h2>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      email: '',
      loading: false,
      joinedWaitlist: false,
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      const data = {
        email: this.email,
      };
      const response = await this.$http.post('https://formspree.io/mnqggwnz', data);
      this.loading = false;
      this.joinedWaitlist = true;
      console.log(response);
    },
  },
};
</script>
