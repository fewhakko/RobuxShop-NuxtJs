<template>
  <div v-if="$store.state.authUser">
    <v-container>
      <div class="row">
        <div class="col-md-8">
          <v-card outlined>
            <v-card-text>
              <h2>
                <v-icon>mdi-history</v-icon>&nbsp;ประวัติการสั่งซื้อ
              </h2>
              <br />

              <div class="row">
                <div class="col-md-4">
                  <h3 style="margin-right:10px;">ประวัติการเติมเงิน</h3>
                  <br />
                  <v-list-item>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">จำนวนเงิน</th>
                            <th class="text-left">เติมผ่าน</th>
                          </tr>
                        </thead>
                        <tbody v-if="!logstopup.status">
                          <tr v-for="item in logstopup" :key="item.name">
                            <td>{{ item.amount }}฿</td>
                            <td v-if="item.type === 1">วอเลท</td>
                            <td v-else>ทรูมันนี่</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-list-item>
                </div>

                <div class="col-md-4">
                  <h3 style="margin-right:10px;">ประวัติการซื้อของ</h3>
                  <br />
                  <v-list-item>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">ชื่อสินค้า</th>
                            <th class="text-left">ราคาที่ซื้อ</th>
                          </tr>
                        </thead>
                        <tbody v-if="!logsprice.status">
                          <tr v-for="item in logsprice" :key="item.name">
                            <td>{{ item.nameprice }}</td>
                            <td>{{ item.point }}฿</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-list-item>
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
import moment from 'moment'

export default {
  data() {
    return {
      passwordold: "",
      passwordnew1: "",
      passwordnew2: "",
      logsprice: [],
      logstopup: []
    };
  },
  mounted() {
    this.logsuser();
  },
  
  methods: {
    async logsuser() {
      try {
        this.logsprice = await this.$axios.$get('/api/logsuser/1')
        this.logstopup = await this.$axios.$get('/api/logsuser/2')
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>