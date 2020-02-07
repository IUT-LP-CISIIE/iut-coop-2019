<template>
	<div class="box un-message" :class="$route.params.message == message.id ? 'mis-en-avant' : ''">
		<article class="media">
			<div class="media-left">
				<figure class="image is-48x48">
					<img :src="getGravatar(membre)">
				</figure>
			</div>
			<div class="media-content">
				<div class="content">
					<template v-if="message.member_id == $store.state.membre.id"> 
						<template v-if="editerMessage">
							<div class="buttons actions">
								<button type="button" class="button is-text" @click="annulerEditerMessage()">
									<span class="icon is-small">
										<i class="fa fa-times"></i>
									</span>
								</button>					
								<button type="button" class="button is-success" :class="loading ? 'is-loading' : ''" @click="updateMessage()">
									<span class="icon is-small">
										<i class="fa fa-save"></i>
									</span>
								</button>
							</div>					
						</template>
						<template v-else>						
							<div class="buttons actions auto-hide">
								<button type="button" class="button" @click="activerEditerMessage()">
									<span class="icon is-small">
										<i class="fa fa-pen"></i>
									</span>
								</button>
							</div>
						</template>					
					</template>					
				</div>	      		
				<strong>
					<router-link :to="{name:'membre',params:{id:membre.id}}"> 
						{{membre.fullname}}
					</router-link>
				</strong> 
				<small>{{message.created_at}}</small>
				<template v-if="channel">
					dans la conversation <router-link 
					:to="{name:'conversation-message',params:{id:channel.id,message:message.id}}">{{channel.topic}}</router-link>
				</template>
				<br>
				<p v-if="editerMessage" ref="editer" 
				contenteditable="true" 
				@keydown.esc="annulerEditerMessage()" 
				@keydown.ctrl.prevent="" 
				>{{leMessage}}</p>
				<p v-else>{{message.message}}</p>
			</div>

		</article>

	</div>
</template>
<script>
	export default {
		name : 'Message',
		props : ['message','channel'],
		data() {
			return {
				editerMessage:false,
				loading:false
			}
		},
		computed :  {
			leMessage() {
				return this.message.message;
			},
			membre() {
				return this.getMembre(this.message.member_id);
			}
		},
		mounted() {
			this.origMessage = this.message.message;
		},
		methods : {
			annulerEditerMessage() {
				if(this.loading) return;
				this.editerMessage=false;
			},
			activerEditerMessage() {
				if(this.loading) return;
				this.editerMessage=true;
				setTimeout(()=>{
					this.$refs.editer.focus();
					this.selectText(this.$refs.editer)
				},100);
			},
			updateMessage() {
				if(this.loading) return;
				this.loading=true;
				setTimeout(() =>{	
					axios.put('channels/'+this.message.channel_id+'/posts/'+this.message.id,{message:this.$refs.editer.innerText}).then(response => {
						setTimeout(()=>{
							this.loading=false;
							this.editerMessage=false
						},1000);				
					})

				},100);
			}	
		}
	}
</script>
<style>
.un-message {
	position: relative;
}
.un-message .actions:not(.auto-hide) {
	top:100%;
}
.un-message .actions.auto-hide{
	visibility: hidden;
}
.un-message:hover .actions.auto-hide{
	visibility: visible;
}
div.mis-en-avant {
	box-shadow: 0 0.5em 1em -0.125em rgba(220, 0, 0, 0.3), 
	0 0px 0 1px rgba(255, 0, 0, 0.1);
}
</style>