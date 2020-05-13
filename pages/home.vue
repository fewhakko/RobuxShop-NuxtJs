<template>
  <div v-if="$store.state.authUser">
    <v-container class="container">
      <div class="row">
        <div class="col-md-10">
          <v-card>
            <v-card-text>
              <center>
                <h1 style="color:white;">ยินดีต้อนรับ : {{$store.state.authUser.username}}</h1>
              </center>
              <br />
              <center>
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
              </center>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-md-5">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <center>
                  <h3>Robux</h3>

                  <h1 style="color:#caf8ff" v-if="datauser.robux === 'mdi-spin mdi-loading'">
                    <v-icon>{{datauser.robux}}</v-icon>&nbsp;R$
                  </h1>
                  <h1 style="color:#caf8ff" v-else>{{datauser.robux}} R$</h1>ROBUX พร้อมจำหน่าย
                </center>
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-5">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <center>
                  <h3>TOP</h3>

                  <h1 style="color:#caf8ff" v-if="datauser.top === 'mdi-spin mdi-loading'">
                    <v-icon>{{datauser.robux}}</v-icon>&nbsp;
                  </h1>
                  <h1 style="color:#caf8ff" v-else>{{datauser.top}}</h1>คนที่เติมเงินเยอะสุด
                </center>
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;การเติมเงินล่าสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs1">
                        <td>{{ item.username }}</td>
                        <td>{{ item.amount }}฿</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>

            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;อันดับเติมเงินสูงสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs2">
                        <td>{{ item.username }}</td>
                        <td>{{ item.totalpoint }}฿</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>

            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;อันดับการซื้อสินค้าล่าสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">สินค้า</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs3">
                        <td>{{ item.username }}</td>
                        <td>{{ item.nameprice }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
  <div v-else>
    <v-container class="container">
      <div class="row">
        <div class="col-md-10">
          <v-card>
            <v-card-text>
              <center>
                <h1 style="color:white;">ท่านยังไม่ได้เข้าสู่ระบบ</h1>
              </center>
              <br />

              <center><v-btn color="error" to="/login">ไปที่หน้าเข้าสู่ระบบ</v-btn></center>
              
            </v-card-text>
          </v-card>
        </div>

        <div class="col-md-5">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <center>
                  <h3>Robux</h3>

                  <h1 style="color:#caf8ff" v-if="datauser.robux === 'mdi-spin mdi-loading'">
                    <v-icon>{{datauser.robux}}</v-icon>&nbsp;R$
                  </h1>
                  <h1 style="color:#caf8ff" v-else>{{datauser.robux}} R$</h1>ROBUX พร้อมจำหน่าย
                </center>
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-5">
          <v-card outlined>
            <v-list-item three-line>
              <div class="col-md-6 mx-auto">
                <center>
                  <h3>TOP</h3>

                  <h1 style="color:#caf8ff" v-if="datauser.top === 'mdi-spin mdi-loading'">
                    <v-icon>{{datauser.robux}}</v-icon>&nbsp;
                  </h1>
                  <h1 style="color:#caf8ff" v-else>{{datauser.top}}</h1>คนที่เติมเงินเยอะสุด
                </center>
              </div>
            </v-list-item>
          </v-card>
        </div>

        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;การเติมเงินล่าสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs1">
                        <td>{{ item.username }}</td>
                        <td>{{ item.amount }}฿</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>

            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;อันดับเติมเงินสูงสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs2">
                        <td>{{ item.username }}</td>
                        <td>{{ item.totalpoint }}฿</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>

            <div class="col-md-4">
              <v-card outlined>
                <v-card-title>
                  <v-icon>mdi-trophy</v-icon>&nbsp;อันดับการซื้อสินค้าล่าสุด
                </v-card-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center" style="font-size:14px;">ผู้ใช้</th>
                        <th class="text-center" style="font-size:14px;">สินค้า</th>
                      </tr>
                    </thead>
                    <tbody style="text-align:center;">
                      <tr v-for="item in logs3">
                        <td>{{ item.username }}</td>
                        <td>{{ item.nameprice }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>
          </div>
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
      datauser: {
        robux: "mdi-spin mdi-loading",
        top: "mdi-spin mdi-loading"
      },
      logs1: [],
      logs2: [],
      logs3: []
    };
  },

  mounted() {
    this.logsx();
  },

  methods: {
    async logsx() {
      this.logs1 = await this.$axios.$get("/api/totallogs/1");
      this.logs2 = await this.$axios.$get("/api/totallogs/2");
      this.logs3 = await this.$axios.$get("/api/totallogs/3");
      this.datauser = await this.$axios.$get("/api/topusers");
    }
  }
};
</script>