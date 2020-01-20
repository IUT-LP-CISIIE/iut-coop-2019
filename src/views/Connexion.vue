<template>
  <div class="connexion">

    <section class="section">
		<div class="container">
	    	<h1 class="title">Se connecter !</h1>
		    <section class="section">
		    	<form @submit.prevent="connect">

					<champ 
						type="email" 
						title="Adresse mail" 
						icon="envelope" 
						placeholder="Adresse mail du membre" 
						name="email" 
						:value="email"
					/>
					<champ type="password" title="Mot de passe" icon="lock" placeholder="Mot de passe du membre" name="password" :value="password"/>

					<div class="field is-grouped">
					  <div class="control">
					    <button type="submit" class="button is-link">Se connecter</button>
					  </div>
					  <div class="control">
					    <router-link class="button is-text" to="/creer-un-compte">Créer un compte</router-link>
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
    name : 'Connexion',
    components: {
      Champ
    },
    data() {
    	return {
    		password : 'test',
    		email : 'test@test.fr',
    	}
    },
    mounted() {
    	this.$bus.$on(this.$options.name,(name,value)=> {
    		this.$data[name] = value;
    	});
    },
    methods : {
    	connect() {
        axios.post('members/signin',{email:this.email,password:this.password}).then(response => {
          this.$store.commit('setSessionMembre',response.data);
          this.$router.push('/');
        }).catch(error => {
          console.log(error.response)
        })
    	},
    }
  }
</script>

