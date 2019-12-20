<template>
  <div class="connexion">

    <section class="section">
		<div class="container">
	    	<h1 class="title">Créer un compte</h1>
		    <section class="section">
		    	<form @submit.prevent="setMember">

          <champ type="text" title="Nom" icon="user" placeholder="Nom et prénom du membre" name="fullname" :value="fullname"/>
					<champ type="email" title="Adresse mail" icon="envelope" placeholder="Adresse mail du membre" name="email" :value="email"/>
          <champ type="password" title="Mot de passe" icon="lock" placeholder="Mot de passe du membre" name="password" :value="password"/>
					<champ v-show="password" type="password" title="Vérification du mot de passe" icon="check" placeholder="Entrez à nouveau le mot de passe" :value="passwordVerif"/>

					<div class="field is-grouped">
					  <div class="control">
					    <button type="submit" class="button is-link">Créer un compte</button>
					  </div>
					  <div class="control">
					    <router-link class="button is-text" to="/connexion">Retour</router-link>
					  </div>
					</div>
				</form>
			</section>
		</div>
	</section>
  </div>
</template>

<script>
  import Champ from '@/components/Champ.vue'
  export default {
    name : 'CreeUnCompte',
    components: {
      Champ
    },
    data() {
    	return {
        fullname : 'test',
    		password : 'test',
        passwordVerif : 'test',
    		email : 'test@test.fr',
    	}
    },
    mounted() {
      this.$bus.$on(this.$options.name,(name,value)=> {
    		this.$data[name] = value;
    	});
    },
    methods : {
      setMember() {
        if(this.password != this.passwordVerif) {
          this.$bus.$emit('erreur','Les deux mot de passe sont différents');
        } else {
          let parametres = {
            fullname:this.fullname,
            password:this.password,
            email:this.email
          };
          axios.post('members',parametres).then((response) => {
            this.$bus.$emit('message','Création ok')
            this.$router.push('/connexion');
          }).catch((error) => {
            this.$bus.$emit('erreur',error.response.data.message)
          });
        }
      },
    	connect() {
    		alert('oui')
    	},
    }
  }
</script>
