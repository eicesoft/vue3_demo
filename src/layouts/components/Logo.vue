<template>
  <div class="logo">
    <img src="/@/assets/images/logo.png" alt="" />
    <h2 v-if="!collapse" class="title">eIce Dashbroad</h2>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    collapse: {
      type: Boolean
    }
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

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    margin-bottom: 0;
  }
}
</style>
