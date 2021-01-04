<template>
  <div>
    <header>    
       <logo>
           <img slot="logo-img" src="@/assets/img/log.png" alt="">
           <h1 slot="logo-text">管理员操作页面</h1>
       </logo>
    </header>
    <div class="img">
            <img src="@/assets/img/extension_agent.png" alt="" @click="SalerBtn">
            <img src="@/assets/img/salesman.png" alt="" @click="EaBtn">
    </div>
  </div>
</template>

<script>
import logo from '@/components/logo'
export default {
  name: 'admin',
  data() {
    return {
      
    };
  },
  components: {
      logo
  },
  mounted() {
    
  },
  methods: {
    SalerBtn(){
        this.$router.push('/saler_list')
    },
    EaBtn(){
        this.$router.push('/ea_list')
    }
  },
};
</script>

<style scoped>
.img {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

</style>