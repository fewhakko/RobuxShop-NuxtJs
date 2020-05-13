<template>
  <div>
    <v-container class="container">
      <div class="row">
        <v-card class="col-md-9">
          <v-toolbar flat outlined dark>
            <v-toolbar-title>ระบบเติมเงินอัตโนมัติ</v-toolbar-title>
          </v-toolbar>
          <v-tabs :style="'text-align:center;'">
            <v-tab>
              <v-icon left>mdi-bank</v-icon>เติมธนาคาร
            </v-tab>
            <v-tab>
              <v-icon left>mdi-wallet</v-icon>เติมวอเลท
            </v-tab>
            <v-tab>
              <v-icon left>mdi-wallet-travel</v-icon>เติมทรูมันนี่
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>ระบบธนาคารยังไม่เปิดให้เติมครับ :)</p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <br />
              <v-card flat>
                <center style="border-bottom: 5px solid #dc3545;">
                  <h1>เติมเงินด้วยทรูวอเลท</h1>
                </center>
                <br />
                <div class="row">
                  <div class="col-md-8">
                    <v-card class="mx-auto" outlined>
                      <v-card-text>
                        <v-alert type="red" outlined>
                          กมล เลิศธนสิน
                          <br />เบอร์ : 095-741-9962
                        </v-alert>
                        <v-text-field
                          v-model="formWallet"
                          :rules="nameRules"
                          :counter="14"
                          hint="กรุณากรอกเลขอ้างอิง 14 หลัก"
                          label="เลขอ้างอิง"
                          @keypress="isNumber($event)"
                          required
                        ></v-text-field>
                        <v-btn
                          color="red"
                          :disabled="statusbutton"
                          @click="truewallet()"
                        >คลิกเติมเงิน</v-btn>
                      </v-card-text>
                    </v-card>
                  </div>

                  <div class="col-md-3">
                    <v-card class="mx-auto" outlined>
                      <v-card-text>
                        <h3>วิธีการใช้งาน</h3>
                        <hr :style="'margin-bottom: 5px;'" />
                        <br />หากใส่เลขอ้างอิงถูกแล้วไม่ได้
                        <br />ให้ทำการรอ 1-5 นาที
                        <br />หรือถ้าเติมไม่เข้าให้ติดต่อทาง
                        <br />เพจ FB :
                        <a
                          href="https://www.facebook.com/LuaStore-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A1-403117073854663/"
                          target="_blank"
                          :style="'font-size:16px;'"
                          rel="noopener noreferrer"
                        >Luastore</a>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <br />
              <v-card flat>
                <center style="border-bottom: 5px solid #007bff;">
                  <h1>เติมเงินด้วยทรูมันนี่</h1>
                </center>
                <br />
                <div class="row">
                  <div class="col-md-8">
                    <v-card class="mx-auto" outlined>
                      <v-card-text>
                        <v-alert type="primary" outlined>
                          กมล เลิศธนสิน
                          <br />เบอร์ : 095-741-9962
                        </v-alert>
                        <v-text-field
                          v-model="formTruemoney"
                          :rules="nameRules"
                          :counter="14"
                          hint="กรุณากรอกรหัสบัตรทรูมันนี่ 14 หลัก"
                          label="รหัสบัตรทรูมันนี่"
                          @keypress="isNumber($event)"
                          required
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          :disabled="statusbutton"
                          @click="truemoney()"
                        >คลิกเติมเงิน</v-btn>
                      </v-card-text>
                    </v-card>
                  </div>

                  <div class="col-md-3">
                    <v-card class="mx-auto" outlined>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center">บัตรทรูราคา</th>
                                <th class="text-center">ได้พ้อยต์</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>50</td>
                                <td>+43</td>
                              </tr>
                              <tr>
                                <td>90</td>
                                <td>+77</td>
                              </tr>
                              <tr>
                                <td>150</td>
                                <td>+128</td>
                              </tr>
                              <tr>
                                <td>300</td>
                                <td>+257</td>
                              </tr>
                              <tr>
                                <td>500</td>
                                <td>+428</td>
                              </tr>
                              <tr>
                                <td>1,000</td>
                                <td>+856</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </div>
    </v-container>
    <br />
    <br />
  </div>
</template>

<style scoped>
.v-tab {
  font-size: 18px;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return {
      formWallet: "",
      formTruemoney: "",
      statusbutton: false
    };
  },
  mounted() {},
  methods: {
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

    async truewallet() {
      this.statusbutton = true;
      try {
        await this.$store
          .dispatch("truewallet", {
            tran: this.formWallet
          })
          .then(result => {
            this.statusbutton = false;
          });
      } catch (e) {
        this.formError = e.message;
      }
    },

    async truemoney() {
      //this.statusbutton = true;
      try {
        await this.$store
          .dispatch("truemoney", {
            code: this.formTruemoney
          })
          .then(result => {
            this.statusbutton = false;
          });
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>