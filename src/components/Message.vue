<template>
	<div class="box">
	  <article class="media">
		<div class="media-left">
			<figure class="image is-48x48">
			<img :src="getGravatar(membre)">
			</figure>
		</div>
	    <div class="media-content">
	      <div class="content">
	        <p>
	          <strong>
				<router-link :to="{name:'membre',params:{id:membre.id}}"> 
	          		{{membre.fullname}}
	          	</router-link></strong> <small>{{message.created_at}}</small>
	          <br>
	          {{message.message}}
	        </p>
	      </div>
	    </div>
	  </article>
	</div>
</template>
<script>
	export default {
		name : 'Message',
		props : ['message'],
		data() {
			return {
			}
		},
		computed :  {
			membre() {
				return this.getMembre(this.message.member_id);
			}
		},
		updated() {
		},
		methods : {
		}
	}
</script>
