<template>
  <div v-if="$store.state.authUser">
    <v-container>
      <div class="row">
        <div class="col-md-8">
          <v-card outlined>
            <v-card-text>
              <h2>
                <v-icon>mdi-account-box</v-icon>&nbsp;ข้อมูลส่วนตัว
              </h2>
              <br />

              <v-list-item three-line>
                <v-list-item-avatar tile size="100" color="grey">
                  <img
                    src="data:image/png;base64,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"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="mb-1"
                    :style="'font-size:25px; color:yellow;'"
                  >{{$store.state.authUser.username}}</v-list-item-title>
                  <v-list-item-subtitle :style="'font-size: 16px;'">
                    อีเมล : {{$store.state.authUser.email}}
                    <br />
                    จำนวนเงินที่เติมทั้งหมด : {{$store.state.authUser.totalpoint}} บาท
                  </v-list-item-subtitle>
                  </br>
                  </br>
                  </br>
                  </br>
                  <v-card>
                    <v-card-text>
                      <p
                        class="text--primary"
                        style="margin-top:10px; font-size:20px;"
                      >&nbsp;เปลี่ยนรหัสผ่าน</p>

                      <v-text-field v-model="passwordold" type="password" label="กรอกรหัสเก่า"></v-text-field>
                      <v-text-field v-model="passwordnew1" type="password" label="กรอกรหัสใหม่"></v-text-field>
                      <v-text-field
                        v-model="passwordnew2"
                        type="password"
                        label="กรอกรหัสใหม่อีกครั้ง"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="error" @click="chnagepassword()" style="text-align:center;">เปลี่ยนรหัสผ่าน</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>
       

<script>
export default {
  data() {
    return {
      passwordold: "",
      passwordnew1: "",
      passwordnew2: ""
    };
  },
  methods: {
    async chnagepassword() {
      this.statusbutton = true;
      try {
        await this.$store
          .dispatch("changepassword", {
            passwordold: this.passwordold,
            passwordnew1: this.passwordnew1,
            passwordnew2: this.passwordnew2
          })
          .then(result => {
            this.getCaptcha();
            this.statusbutton = false;
          });
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>