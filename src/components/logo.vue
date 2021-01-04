<template>
  <div>
     <nav @click="toLogin">
        <slot name="logo-img"></slot>
    </nav>
    <div class="text">
        <slot name="logo-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log',
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    toLogin(){
        this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
nav{
    display: inline-block;
}
.logo-nav img{
   border: 1px solid #000;
}
.text {
    display: flex;
    justify-content: center;
}
</style>