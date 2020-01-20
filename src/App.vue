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

        /**
        recuperer tous les membres
        */
        axios.get('members').then((response) => {
          this.ready=true;
          this.$store.commit('setMembres',response.data);

          /* Si personne n'est connecté, rediriger vers la page de connexion */
          let membre_id = this.membreConnecte;
          if(!membre_id) {
            this.$router.push('/connexion');
          } else {
            // si une session est en cours, on teste sa validité
            axios.get('members/'+membre_id+'/signedin').catch((error) => {
              this.$store.commit('setSessionMembre',false);
              this.$router.push('/connexion');
            });
          }
        });

      }).catch(() => {

        alert("Impossible de se connecter à l'API");

      });

    },
    computed : {
      membreConnecte() {
        return this.$store.state.membre ? this.$store.state.membre.id : false;
      }
    }
  }
</script>

<style>
html,body,.app {
  height: 100%;
}
</style>
