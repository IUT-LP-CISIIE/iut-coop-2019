<template>
    <div class="field">
      <label class="label">{{title}}</label>
      <div class="control has-icons-left has-icons-right">
        <input 
          required 
          class="input" 
          :class="{'is-danger' : error, 'is-success' : localvalue && !error}" 
          @keyup="checkData" 
          :type="type" 
          v-model="localvalue" 
          :placeholder="placeholder"
        >
        <span class="icon is-small is-left">
          <i class="fas" :class="'fa-'+this.icon"></i>
        </span>
        <span v-show="error" class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
        <span v-show="localvalue && !error" class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <p v-show="error" class="help is-danger">{{message}}</p>
    </div>
</template>

<script>
export default {
  name: 'champ',
  props : ['type','title','placeholder','name','value','icon'],
  data() {
    return {
      error:false,
      message:'',
      localvalue:false
    }    
  },
  mounted() {
    this.localvalue = this.value;
  },
  methods : {
      checkData() {
        this.error=false;
        if(!this.localvalue) {
          this.message="Ce champ ne peut pas être vide";
          this.error=true;
        }
        this.$bus.$emit(this.$parent.$options.name,this.name,this.localvalue)
      },    
  }
}
</script>
