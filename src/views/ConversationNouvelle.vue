<template>
	<section class="section">
		<h1 class="title">Créer une conversation</h1>
		    <section class="section">
		    	<form @submit.prevent="valider">

					<champ 
						type="text" 
						title="Sujet" 
						icon="quote-right" 
						placeholder="Sujet de la conversation" 
						name="topic" 
						:value="topic"
					/>

					<champ 
						type="text" 
						title="Tags" 
						icon="tag" 
						placeholder="Tags de la conversation" 
						name="label" 
						:value="label"
					/>
					<div class="field is-grouped">
					  <div class="control">
					    <button type="submit" class="button is-link">Valider</button>
					  </div>
					  <div class="control">
					    <router-link class="button is-text" to="/">Annuler</router-link>
					  </div>
					</div>

				</form>
			</section>
	</section>
</template>

<script>
	import Champ from '@/components/Champ.vue'
	export default {
		name:'ConversationNouvelle',
	    components: {
	      Champ
	    },
		data() {
			return {
				topic:'',
				label:''
			}
		},
		mounted() {
    	this.$bus.$on(this.$options.name,(name,value)=> {
    		this.$data[name] = value;
    	});

		},
		methods : {
			valider() {
				axios.post('channels',{session_token:this.$store.state.token_session,label:this.label,topic:this.topic}).then(response => {
					this.$router.push('/')
				}).catch(error => {
					alert(error.response.data.message);
				})
			}
		}
	}
</script>