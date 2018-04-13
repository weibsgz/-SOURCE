<template>
  <div id="app" ref="app" :class="$route.name">
    <HeaderWrap></HeaderWrap>
    <router-view/>
    <footerWrap></footerWrap>
  </div>
</template>

<script>
import HeaderWrap from 'components/header/header.vue'
import footerWrap from 'components/footer.vue'
export default {
  name: 'app',
  components:{
    HeaderWrap,
    footerWrap
  }
}
</script>

<style>

</style>
