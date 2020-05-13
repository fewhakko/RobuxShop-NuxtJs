<template>
  <div>
    <v-container class="container">
      <div class="row">
        <div class="col-md-5" :style="'padding:10px; text-align: center;'">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <h3>Point</h3>
                <h1
                  style="color:#caf8ff"
                  v-if="$store.state.authUser"
                >{{$store.state.authUser.point}}฿</h1>ยอดคงเหลือเครดิตคุณ
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-5" :style="'padding:10px; text-align: center;'">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <h3>Robux</h3>
                <h1 style="color:#caf8ff">
                  <v-icon v-if="robuxfew.robux === 'mdi-spin mdi-loading'">{{robuxfew.robux}}</v-icon>
                  <span v-else>{{robuxfew.robux}}</span> R$
                </h1>ROBUX พร้อมจำหน่าย
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-10" :style="'padding:10px;'">
          <v-card>
            <v-card-title>เติม Robux</v-card-title>
            <v-card-text class="text--primary">
              <div class="row">
                <div class="col-md-6">
                  <v-alert type="warning" outlined>
                    <center>หากยังไม่ได้เข้ากลุ่มโปรดกดปุ่มด้านล่าง</center>
                  </v-alert>
                  <v-card outlined>
                    <v-card-title>รายละเอียดกลุ่ม</v-card-title>
                    <v-card-text>
                      <hr />
                      <div class="card-body px-lg-5 py-lg-5">
                        <center>
                          <div class="mt-3 mb-0 mx-3">
                            ขณะนี้ในกลุ่มมี Robux อยู่
                            <b>
                              <span data-text="rbx_group_stock">
                                <v-icon v-if="robuxfew.robux === 'mdi-spin mdi-loading'">{{robuxfew.robux}}</v-icon>
                                <span v-else>{{robuxfew.robux}}</span> R$
                              </span>
                            </b>
                            <br />จำหน่ายในเรท
                            <b>
                              <span data-text="rbx_group_rate">{{robuxfew.rate}}</span> R$ / 1 ฿
                            </b>
                          </div>
                          
                          <p class="mb-0">หากยังไม่ได้เข้ากลุ่มของเรา โปรดกดปุ่มด้านล่าง</p>
                        </center>
                        <center>
                          <v-btn
                            color="red"
                            outlined
                            target="_blank"
                            :style="'margin-top:10px'"
                            :href="robuxfew.link"
                          >JoinGroup</v-btn>
                          <p
                            class="text-danger mt-2"
                          >( กลุ่มเปลี่ยนได้ทุกเมื่อ โปรดตรวจสอบทุกครั้ง! )</p>
                        </center>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>

                <div class="col-md-6">
                  <v-alert type="success" outlined>
                    <center>กรุณาเข้ากลุ่มก่อนซื้อ Robux!</center>
                  </v-alert>

                  <v-card outlined>
                    <v-card-title>เติมแบบเข้าแบบกลุ่ม</v-card-title>
                    <v-card-text class="text--primary">
                      <hr />
                      <br />
                      <v-text-field class="col-md-12" v-model="formUsername" label="กรอกชื่อในเกม"></v-text-field>

                      <v-text-field
                        class="col-md-12"
                        v-model="formMoney"
                        @keypress="isNumber($event)"
                        label="กรอกจำนวนเงิน"
                      ></v-text-field>

                      <v-alert type="info">
                        {{captchanumber}}&nbsp;
                        <v-icon @click="getCaptcha()">mdi-reload</v-icon>
                      </v-alert>

                      <v-text-field
                        class="col-md-12"
                        v-model="formCaptcha"
                        @keypress="isNumber($event)"
                        counter="4"
                        label="กรอกตัวเลข 4 ตัวที่เห็น"
                      ></v-text-field>

                      <v-btn
                        block
                        color="success"
                        :disabled="statusbutton"
                        outlined
                        @click="buyrobux()"
                      >
                        <v-icon>mdi-credit-card</v-icon>&nbsp;ชำระเงิน
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      formUsername: "",
      formMoney: "",
      formCaptcha: "",
      captchanumber: "",
      statusbutton: false,
      robuxfew: {
        rate: "ฟิวเอง",
        link: "",
        robux: "mdi-spin mdi-loading"
      }
    };
  },
  mounted() {
    this.getCaptcha();
    this.RobuxStart();
  },
  methods: {
    async buyrobux() {
      this.statusbutton = true;
      try {
        await this.$store
          .dispatch("buyrobux", {
            username: this.formUsername,
            money: this.formMoney,
            captcha: this.formCaptcha
          })
          .then(result => {
            this.getCaptcha();
            this.statusbutton = false;
          });
      } catch (e) {
        this.formError = e.message;
      }
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    async RobuxStart() {
      this.robuxfew = await this.$axios.$get("/api/robuxcheck");
    },

    getCaptcha: function() {
      axios.post("/api/captcha").then(res => {
        console.log(res.data.message);
        this.captchanumber = res.data.message;
      });
    }
  }
};
</script>