<template>
  <div class="login">
    <div class="title">用户登录</div>

    <div class="panel">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-more"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import userApi from "/@/api/user";
import { store } from "/@/store";

export default defineComponent({
  name: "Login",
  setup() {
    const form = ref({ username: "", password: "" });

    const router = useRouter();
    const route = useRoute();

    const onSubmit = async () => {
      const { username, password } = form.value;

      try {
        let { token } = await userApi.login(form.value);

        store.dispatch("user/setToken", token);

        ElMessage.success({
          message: "登录成功",
          type: "success"
        });

        const toPath = decodeURIComponent(
          (route.query?.redirect || "/") as string
        );
        router.replace(toPath);
        // await test({});
      } catch (e) {
        form.value.username = "";
        form.value.password = "";
      }
      //
      // console.log(username, password);
    };

    return { form, onSubmit };
  }
});
</script>

<style lang="scss" scoped>
.login {
  background-color: rgb(53, 61, 82);
  height: 100%;
  padding-top: 20%;
  text-align: center;
  .title {
    font-size: 34px;
    font-weight: 800;
    margin: 10px 0;
    color: #fff;
  }
  .panel {
    margin: auto;
    width: 400px;
    text-align: center;
  }
}
</style>
