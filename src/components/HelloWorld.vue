<template>
  <h1 class="a1">{{ msg }}</h1>
  <button @click="count += 3">Count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    a: [1, 2, 3]
  },
  data() {
    return {
      count: 0
    };
  }
};
</script>

<style lang="scss" scoped>
$color: red;
$width: 400px;
.a1 {
  background-color: $color;
  width: $width;
}
</style>
