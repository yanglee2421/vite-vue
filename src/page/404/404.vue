<template>
  <div class="text-center pt-3">
    <h1 class="text-danger">出了点小问题</h1>
    <el-empty description="404，找不到对应内容"></el-empty>
    <el-button
      @click="router.push('/')"
      type="danger"
      size="large"
      plain
      >Take me home</el-button
    >
    <el-button @click="handleError">handleError</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function handleError() {
  const err = new Error("msg", { cause: "cause" });
  console.log(err.name);
  console.log(err.message);
  console.log(err.cause);
}
</script>
<style lang="scss" scoped></style>
