<template>

	<section class="section">
		<nav class="breadcrumb" aria-label="breadcrumbs">
		  <ul>
		    <li><router-link to="/">Accueil</router-link></li>
		    <li class="is-active"><router-link to="/membres">Membres</router-link></li>
		  </ul>
		</nav>


		<h1 class="title">Membres</h1>
		<template v-for="membre in $store.state.membres">
		<router-link :to="{name:'membre',params:{id:membre.id}}" 
		 class="card">
		  <div class="card-content">
		    <div class="media">
		      <div class="media-left">
		        <figure class="image is-48x48">
		          <img :src="getGravatar(membre)">
		        </figure>
		      </div>
		      <div class="media-content">
		        <p class="title is-4">{{membre.fullname}}</p>
		        <p class="subtitle is-6">{{membre.email}}</p>
		      </div>
		    </div>
		</div>
		</router-link>
		</template>
	</section>

</template>

<script>
	export default {
		name : 'membres',
		data() {
			return  {

			}
		}
	}
</script>