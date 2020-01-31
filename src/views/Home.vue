<template>
  <div class="home">

		<div class="col-conversations">
			<nav class="panel">
			  <p class="panel-heading">
			    Conversations
			  </p>
			  <div class="panel-block nouvelle-conversation">
					<router-link to="/nouvelle-conversation" class="button is-fullwidth">Nouvelle conversation</router-link>
			  </div>

				<template v-for="channel in channels">
					<router-link 
					:to="{name:'conversation',params:{id:channel.id}}" 
					class="panel-block lien-conversation">
							<span class="panel-icon">
								<i class="fas fa-comment" aria-hidden="true"></i>
							</span>
    						{{ channel.topic }}
    						<small class="tag" v-show="channel.nbMessages">{{ channel.nbMessages }}</small>
					</router-link>
				</template>


			</nav>

		</div>


		<div class="col-conversation">
			<Messages v-if="channelCourant" :messages="messages" :channel="channelCourant"></Messages>
			<section v-else class="hero is-large">
			  <div class="hero-body">
			    <div class="container">
			      <h1 class="title">
			        Bienvenue sur Co'op
			      </h1>
			      <h2 class="subtitle">
			        Cliquez sur une conversation dans la liste à gauche pour commencer.
			      </h2>
			    </div>
			  </div>
			</section>			
		</div>

  </div>
</template>

<script>
import Messages from '@/components/Messages.vue'

export default {
  name: 'home',
    components: {
      Messages
    },
  data() {
  	return {
  		messages:[],
  		channels : [],
  		channelCourant:false
  	}
  },
  watch: {
    $route() {
    	this.chargerChannel();
    }
  },  
  mounted() {

	if(this.$route.params.id) {
		this.chargerChannel();
	} else {
		this.chargerChannels();
	}
	this.$bus.$on('rechargerChannel',this.chargerChannel);
	setInterval(this.chargerChannel,5000);
  },
  methods : {
  	chargerChannel() {
	      axios.get('channels/'+this.$route.params.id).then(response => {
	        this.channelCourant = response.data;
	        this.chargerMessages();
	        this.chargerChannels();
	      });
	},
  	chargerChannels() {
      axios.get('channels').then(response => {
        this.channels = response.data;
        this.calculnbMessages();
      });
  	},
  	calculnbMessages() {
        if(this.channelCourant) {
	        for(let i=0;i<this.channels.length;i++) {
	        	let channel = this.channels[i];
	        	if(channel.id == this.channelCourant.id) {
	        		channel.nbMessages = this.messages.length+' message(s)';
	        	} else {
					channel.nbMessages = '';	        		
	        	}
	        	this.channels[i] = channel;
	        }
		}  		
  	},
	chargerMessages() {
		if(this.channelCourant) {
			axios.get('channels/'+this.channelCourant.id+'/posts').then(response => {
				this.messages = response.data;
				this.calculnbMessages();				
			});
		}
	}
  }
}
</script>

<style scoped>
.panel {
	height: 100%;
}
.columns {
    display: flex;
    flex-direction: row;
    align-items: stretch;
}
.nouvelle-conversation {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
}
.lien-conversation {
	display: block;
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}
.home {
/*	position: relative;
	height: calc(100% - 3.25rem);*/
	display: flex;
	height: calc(100% - 3.25rem)
}
.col-conversations {
	position: relative;
	width:300px;
}
.col-conversation {
	position: relative;
	flex:1;
}

</style>