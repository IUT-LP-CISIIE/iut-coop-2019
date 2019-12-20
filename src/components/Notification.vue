<template>
	  <transition name="fade">
		<div v-show="afficherNotification" class="notification" :class="classe">
		  <button class="delete" @click="message=false"></button>
		  {{message}}
		</div>
	</transition>
</template>
<script>
	export default {
		name:'Notification',
		mounted() {
			this.$bus.$on('message',(message) => {
				this.classe='is-primary';
				this.afficher(message);
			});
			this.$bus.$on('erreur',(message) => {
				this.classe='is-danger';
				this.afficher(message);
			});
		},
		data() {
			return {
				classe : '',
				afficherNotification:false,
				message:false
			}
		},
		methods : {
			afficher(message) {
				this.afficherNotification=true;
				this.message=message;
				setTimeout(() => {
					this.afficherNotification=false;
				},3000);				
			}
		}
	}
</script>
<style scoped>
	.notification {
		position: fixed;
		top: 15px;
		right: 15px;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}	
</style>