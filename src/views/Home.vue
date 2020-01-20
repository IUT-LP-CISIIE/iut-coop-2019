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
<!--			  <div class="panel-block">
			    <p class="control has-icons-left">
			      <input class="input" type="text" placeholder="Search">
			      <span class="icon is-left">
			        <i class="fas fa-search" aria-hidden="true"></i>
			      </span>
			    </p>
			  </div>-->

				<template v-for="channel in channels">
					<router-link 
					:to="{name:'conversation',params:{id:channel.id}}" 
					class="panel-block lien-conversation">
							<span class="panel-icon">
								<i class="fas fa-comment" aria-hidden="true"></i>
							</span>
    						{{ channel.topic }} 
					</router-link>
				</template>


			</nav>

		</div>
		<div class="col-conversation">
			<Messages :channel="channelCourant"></Messages>
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
  		channels : [],
  		channelCourant:false
  	}
  },
  watch: {
    $route() {
    	this.changerChannel();
    }
  },  
  mounted() {

      if(this.$route.params.id) {
      	this.changerChannel();
      } else {
      	this.chargerChannels();
      }

  },
  methods : {
  	changerChannel() {
	      axios.get('channels/'+this.$route.params.id).then(response => {
	        this.channelCourant = response.data;
	        this.chargerMessages();
	        this.chargerChannels();
	      });
	},
  	chargerChannels() {
      axios.get('channels').then(response => {
        this.channels = response.data;
      });
  	},
	chargerMessages() {
		axios.get('channels/'+this.channelCourant.id+'/posts').then(response => {
			this.messages = response.data
		});
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
	position: relative;
	height: calc(100% - 3.25rem);
}
.col-conversations {
	position: absolute;
	width: 300px;
	left: 0;
	top:0;
	height: 100%;
}
.col-conversation {
	margin-left: 300px;
	position: relative;
	height: 100%;
}

</style>