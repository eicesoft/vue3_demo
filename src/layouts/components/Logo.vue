<template>
  <div class="logo">
    <img :src="log_url" alt="" />
    <h2 v-if="!collapse" class="title">Dashbroad</h2>
  </div>
</template>

<script>
import log_url from "/@/assets/images/logo.png";

import VueTypes from "vue-types";

export default {
  name: "ice_logo",
  props: {
    collapse: VueTypes.bool.isRequired
  },
  setup() {
    return { log_url };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 16px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  background-color: rgb(46, 47, 49);

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    // margin-bottom: 10px;
  }
}
</style>
