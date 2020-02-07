<template>
	<div class="messages" v-if="channel">

		<header>
			<h2 class="title"> 
			<span ref="editer" 
			:contenteditable="editerConversation" 
			@keydown.esc="annulerEditerConversation()" 
			@keydown.enter.prevent="updateChannel()" 
			@input="topic = $event.target.innerText"
			>{{channel.topic}}</span></h2>
			
			<p class="subtitle">
				<span class="tag"><span 
				:contenteditable="editerConversation" 
				@keydown.esc="annulerEditerConversation()" 
				@keydown.enter.prevent="updateChannel()" 
				@input="label = $event.target.innerText"
				>{{channel.label}}</span></span>
			</p>

			<div class="buttons actions">
				<template v-if="editerConversation">
					<button class="button is-text" @click="annulerEditerConversation()">
						<span class="icon is-small">
							<i class="fa fa-times"></i>
						</span>
					</button>					
					<button class="button is-success" @click="updateChannel()">
						<span class="icon is-small">
							<i class="fa fa-save"></i>
						</span>
					</button>					
				</template>
				<template v-else>
					<button class="button" @click="activerEditerConversation()">
						<span class="icon is-small">
							<i class="fa fa-pen"></i>
						</span>
					</button>					
				</template>
			</div>
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
				label:'',
				topic:'',
				nouveauMessage:'',
				editerConversation:false
			}
		},
		mounted() {
		},
		methods : {
			annulerEditerConversation() {
				this.editerConversation=false;
				this.channel.label = this.label;
				this.channel.topic = this.topic;
			},
			activerEditerConversation() {
				this.label = this.channel.label;
				this.topic = this.channel.topic;
				this.editerConversation=true;
				setTimeout(()=>{
					this.$refs.editer.focus();
					this.selectText(this.$refs.editer)
				},100);
			},
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
			updateChannel() {
				let payload = {
					topic:this.topic,
					label:this.label,
				};
				axios.put('channels/'+this.channel.id,payload).then(response => {
					this.editerConversation=false;				
					this.$bus.$emit('rechargerChannel');			
				})

				return false;
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
	padding: 150px 1em;
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
	z-index: 10;
	padding-right: 200px;
}
.actions {
	position: absolute;
	top: 1em;
	right: 1em;
}
.actions .button {
	border-color: transparent;
}
[contenteditable="true"] {
	background:#eee;
	margin:-5px;
	padding: 5px;
}
</style>