<template>
  <div class="layout-container">
    <Header />
    <SideNav />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/header/Header.vue';
import SideNav from '~/components/side-nav/SideNav.vue';
export default Vue.extend({
  components: {
    Header,
    SideNav,
  },
});
</script>
<style lang="scss">
body {
  background: $grey3;
}
</style>
