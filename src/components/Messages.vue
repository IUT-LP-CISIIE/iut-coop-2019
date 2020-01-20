<template>
	<div class="messages" v-if="channel">

			<header>
				<h2 class="title">{{channel.topic}}</h2>
				<p class="subtitle" v-html="afficherTags(channel.label)"></p>
			</header>

			<template v-if="messages.length>0">			
				<Message v-for="message in messages" :message="message"></Message>
			</template>
			<section class="section" v-else><i>Il n'y a aucun message dans cette discussion</i></section>


			<div class="poster">

		    	<form @submit.prevent="posterMessage">
				<div class="field">
					<p class="control has-icons-left">
					<input class="input" type="text" placeholder="Entrez votre message ici" v-model="nouveauMessage">
					<span class="icon is-small is-left">
					<i class="fas fa-comment"></i>
					</span>
					</p>
				</div>		    		
				</form>
			</div>

	</div>
</template>

<script>
  import Message from '@/components/Message.vue'
	export default {
		name : 'Messages',
		props : ['channel','messages'],
		components : {Message},
		data() {
			return {
				nouveauMessage:''
			}
		},
		mounted() {
		},
		methods : {
			getMembre(id) {
				for(let i=0;i<membres.length;i++){
					if(membres[i].id == id) {
						return membres[i];
					}
				}
			},
			posterMessage() {
				if(this.nouveauMessage) {
					axios.post('channels/'+this.channel.id+'/posts',{
							member_id:this.$store.state.membre.id,
							message:this.nouveauMessage
						}).then(response => {
							this.nouveauMessage='';
							this.$bus.$emit('rechargerChannel');
						})
				}
			},
		  	afficherTags(tags) {
		  		if(tags) {
			  		let html = [];
			  		tags.split(',').forEach(tag => {
			  			html.push('<span class="tag">'+tag+'</span>');
			  		});
			  		return html.join(' ');
			  	}
		  	}			
		}
	}
</script>

<style>
.poster {
	padding: 8px 12px;
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
}
.messages {
	padding: 100px 1em;
	height: 100%;
	overflow: auto;
}

header {
	position: absolute;
	left: 0;
	top:0;
	background: white;
	width: 100%;
	padding: 1em;
}
</style>