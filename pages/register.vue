<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-card class="mx-auto" outlined style="width:540px; padding: 12px;">
      <v-list-item three-line>
        <v-list-item-content>
          <h1 :style="'text-align: center;'">Register</h1>

            <v-text-field
              v-model="formUsername"
              class="col-md-12"
              label="ชื่อผู้ใช้"
              hint="ชื่อผู้ใช้กรอกได้เฉพาะ a-Z, A-Z, 0-9 และ _ (underscore)"
            ></v-text-field>
            <v-text-field
              v-model="formPassword1"
              class="col-md-12"
              label="รหัสผ่าน"
              :type="show1 ? 'text' : 'password'"
              hint="รหัสผ่านต้องมากว่า 4 ตัวอักษรเพื่อความปลอดภัย"
            ></v-text-field>
            <v-text-field
              v-model="formPassword2"
              class="col-md-12"
              label="รหัสผ่านอีกครั้ง"
              :type="show1 ? 'text' : 'password'"
              hint="รหัสผ่านต้องมากว่า 4 ตัวอักษรเพื่อความปลอดภัย"
            ></v-text-field>
            <v-text-field class="col-md-12" v-model="formEmail" label="อีเมล"></v-text-field>

        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-row justify="center">
          <div class="my-2">
            <v-btn small color="primary" :style="'font-size:16px'" @click="register()">สมัครสมาชิก</v-btn>
          </div>
        </v-row>
      </v-card-actions>

      
      <a href="/login" :style="'color: #888888;'">หากมีบัญชีอยู่แล้วให้กดที่นี้</a>
    </v-card>

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
      formPassword1: "",
      formPassword2: "",
      formEmail: ""
    };
  },

  methods: {
    async register() {
      try {
        await this.$store.dispatch("register", {
          username: this.formUsername,
          password1: this.formPassword1,
          password2: this.formPassword2,
          email: this.formEmail
        });

       
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style>
</style>
