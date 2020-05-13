<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
 
    <v-card class="mx-auto" outlined style="width:540px; padding: 12px;">
      <v-list-item three-line>
        <v-list-item-content>
          <h1 :style="'text-align: center;'">Login</h1>

          <v-text-field
            class="col-md-12"
            v-model="formUsername"
            label="ชื่อผู้ใช้"
            hint="ชื่อผู้ใช้กรอกได้เฉพาะ a-Z, A-Z, 0-9 และ _ (underscore)"
          ></v-text-field>

          <v-text-field
            class="col-md-12"
            v-model="formPassword1"
            label="รหัสผ่าน"
            type="password"
            hint="รหัสผ่านต้องมากว่า 4 ตัวอักษรเพื่อความปลอดภัย"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-row justify="center">
          <div class="my-2">
            <v-btn small color="error" :style="'font-size:16px'" @click="login()">เข้าสู่ระบบ</v-btn>
          </div>
        </v-row>
      </v-card-actions>
      <a href="/register" :style="'color: #888888;'">สมัครสมาชิก</a>
    </v-card>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>


<script>
export default {
  data() {
    return {
      formUsername: "",
      formPassword1: ""
    };
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.formUsername,
          password: this.formPassword1
        });

      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

