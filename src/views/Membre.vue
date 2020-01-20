<template>

	<section class="section">
		<h1 class="title">{{membre.fullname}}</h1>
		<h2 class="subtitle">{{membre.email}}</h2>

			<template v-if="messages.length>0">			
				<Message v-for="message in messages" :message="message"></Message>
			</template>
			<section class="section" v-else><i>Ce membre n'a posté aucun message</i></section>
	</section>

</template>

<script>
	import Message from '@/components/Message.vue'
	export default {
		name : 'membre',
		components : {Message},
		data() {
			return  {
				membre : false,
				messages : []
			}
		},
		mounted() {
			this.membre = this.getMembre(this.$route.params.id)
			axios.get('channels').then(response => {
				let channels = response.data;
				channels.forEach(channel => {
				axios.get('channels/'+channel.id+'/posts').then(response => {
					let messages = response.data;
					messages.forEach(message => {
						if(message.member_id == this.membre.id) {
							this.messages.push(message);
						}
					})
				});

				})
			});

		}
	}
</script>