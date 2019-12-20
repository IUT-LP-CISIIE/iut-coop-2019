<template>
  <div>

    <!-- navigation masquée si personne n'est connecté -->
    <navigation v-show="membreConnecte"/>

    <!-- contenu de l'application (chargé via le router) -->
    <router-view/>


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

      }
    },
    mounted() {
      axios.get('ping').then(() => {

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


</style>
