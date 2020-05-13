<template>
  <v-app dark>
    <h1 class="mx-auto" :style="'font-size:40px'" v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>{{ otherError }}</h1>
    <br />
    <v-btn depressed color="red" class="mx-auto" to="/home" large>กลับไปหน้าแรก</v-btn>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound:
        "มึงใส่ url มั่วละครับ ",
      otherError: ""
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
