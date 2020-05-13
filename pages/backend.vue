<template>
  <div v-if="$store.state.authUser">
    <div v-if="$store.state.fewrank.rank == 2">
      <v-container class="container">
        <div class="row">
          <div class="col-md-2" :style="'padding:10px;'">
            <v-card outlined>
              <v-list-item three-line>
                <div class="mx-auto">
                  <h3>ยอดเติมวันนี้</h3>ขกทำ ฿
                </div>
              </v-list-item>
            </v-card>
          </div>

          <div class="col-md-2" :style="'padding:10px;'">
            <v-card outlined>
              <v-list-item three-line>
                <div class="mx-auto">
                  <h3>ยอดเติมเดือนนี้</h3>ขกทำ ฿
                </div>
              </v-list-item>
            </v-card>
          </div>

          <div class="col-md-2" :style="'padding:10px;'">
            <v-card outlined>
              <v-list-item three-line>
                <div class="mx-auto">
                  <h3>ยอดคนซื้อวันนี้</h3>ขกทำ ฿
                </div>
              </v-list-item>
            </v-card>
          </div>

          <div class="col-md-2" :style="'padding:10px;'">
            <v-card outlined>
              <v-list-item three-line>
                <div class="mx-auto">
                  <h3>ยอดคนซื้อเดือนนี้</h3>ขกทำ ฿
                </div>
              </v-list-item>
            </v-card>
          </div>

          <div class="col-md-8" :style="'padding:10px;'">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mb-1" :style="'font-size:25px; margin-top:10px'">&nbsp;จัดการระบบ</v-list-item-title>

                  <div class="row">
                    <div class="col-md-4">
                      <v-text-field label="ตั้งค่าเรทราคา" v-model="robuxsettings[0].rate" :value="robuxsettings[0].rate"></v-text-field>
                    </div>

                    <div class="col-md-4">
                      <v-text-field label="ตั้งค่าคุ้กกี้" v-model="robuxsettings[0].cookie" :value="robuxsettings[0].cookie"></v-text-field>
                    </div>

                    <div class="col-md-4">
                      <v-text-field label="ตั้งค่าไอดีกลุ่ม" v-model="robuxsettings[0].idgroup" :value="robuxsettings[0].idgroup"></v-text-field>
                    </div>
                  </div>

                  <v-btn depressed color="primary" @click="RobuxChange()">เปลี่ยนการตั้งค่า</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>

          <div class="col-md-8" :style="'padding:10px;'">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mb-1" :style="'font-size:25px; margin-top:10px'">&nbsp;จัดการผู้ใช้</v-list-item-title>

                  <v-card>
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
      </v-container>
    </div>
    <div v-else>ไม่มียสแอดมินอย่าเสือกเข้ามานะครับ :)</div>
  </div>
  <div v-else>ไม่มียสแอดมินอย่าเสือกเข้ามานะครับ :)</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      robuxsettings: [
        {
          rate: "",
          cookie: "",
          idgroup: ""
        }
      ],

      search: "",
      headers: [
        {
          text: "ไอดี",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "ชื่อผู้ใช้", value: "username" },
        { text: "อีเมล", value: "email" },
        { text: "ยศ", value: "rank" },
        { text: "พ้อยต์", value: "point" }
      ],
      desserts: [
        {
          id: 142,
          username: "กรุณารอสักครู่.",
          password: "กรุณารอสักครู่.",
          email: "กรุณารอสักครู่.",
          rank: 2,
          point: 1000
        }
      ]
    };
  },

  mounted() {
    this.fetchData()
    this.RobuxSettings()
  },

  methods: {
    async fetchData () {
      this.desserts = await this.$axios.$get('/api/getallusers')
    },

    async RobuxSettings () {
      this.robuxsettings = await this.$axios.$get('/api/robuxset')
    },

   async RobuxChange() {
      try {
        await this.$store.dispatch("robuxchange", { 
          rate: this.robuxsettings[0].rate,
          cookie: this.robuxsettings[0].cookie,
          idgroup: this.robuxsettings[0].idgroup
        });
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>