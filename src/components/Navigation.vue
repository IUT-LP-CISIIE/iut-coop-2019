<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Coop
        </a>

        <a role="button" class="navbar-burger burger"  @click="actif=!actif" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="actif ? 'is-active' : ''">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Conversation</router-link>
          
          <router-link class="navbar-item" to="/membres">Membres</router-link>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      actif:false
    }
  }
}
</script>
