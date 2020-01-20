<template>
  <div class="app">

    <!-- navigation masquée si personne n'est connecté -->
    <navigation v-show="membreConnecte"/>

    <!-- contenu de l'application (chargé via le router) -->
    <router-view v-show="ready"/>


    <notification/>
  </div>
</template>
<script>
  import Navigation from '@/components/Navigation.vue'
  import Notification from '@/components/Notification.vue'
  export default {
    name : 'App',
    components: {
      Navigation, Notification
    },
    data() {
      return {
        ready:false
      }
    },
    mounted() {
      
      axios.get('ping').then(() => {
        this.ready=true;
        /* Si personne n'est connecté, rediriger vers la page de connexion */
        if(!this.membreConnecte) {
          this.$router.push('connexion');
        }

      }).catch(() => {

        alert("Impossible de se connecter à l'API");

      });

    },
    computed : {
      membreConnecte() {
        return this.$store.state.membre ? true : false;
      }
    }
  }
</script>

<style>
html,body,.app {
  height: 100%;
}
</style>
