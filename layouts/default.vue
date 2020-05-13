<template>
  <v-app dark>
    <v-content>
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list v-if="$store.state.authUser">
          <v-list-item link to="/home">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">หน้าหลัก</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/topup">
            <v-list-item-action>
              <v-icon>mdi-credit-card</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">เติมเงิน</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/robux">
            <v-list-item-action>
              <v-icon>mdi-checkbox-blank mdi-spin</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">ซื้อ Robux</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/info">
            <v-list-item-action>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">ข้อมูลส่วนตัว</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/history">
            <v-list-item-action>
              <v-icon>mdi-history</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">ประวัติต่างๆ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/about">
            <v-list-item-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">วิธีการใช้งาน</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link v-if="$store.state.fewrank.rank == 2" to="/backend">
            <v-list-item-action v-if="$store.state.fewrank.rank == 2">
              <v-icon>mdi-arrange-send-backward</v-icon>
            </v-list-item-action>
            <v-list-item-content v-if="$store.state.fewrank.rank == 2">
              <v-list-item-title :style="'font-size: 16px;'">หลังบ้าน</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">ออกจากระบบ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list v-else>
          <v-list-item link to="/home">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">หน้าหลัก</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/login">
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>เข้าสู่ระบบ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/register">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>สมัครสมาชิก</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          
          <v-list-item link to="/about">
            <v-list-item-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :style="'font-size: 16px;'">วิธีการใช้งาน</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Luastore</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-icon v-if="$store.state.authUser">mdi-account</v-icon>&nbsp;
        <div v-if="$store.state.authUser">{{$store.state.authUser.username}}</div>&nbsp;
        <div v-if="$store.state.authUser">
          |
          {{$store.state.authUser.point}}
        </div>

        <v-icon v-if="$store.state.authUser">mdi-file-powerpoint-box</v-icon>
      </v-app-bar>

      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app id="lur-footer" class="py-2 navbar-color text-white-50">
      <div class="container text-center">
        <small>Copyright © {{ new Date().getFullYear() }} LUASTORE.COM All Right Reserved.</small>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      datausername: "",
      datapoint: ""
    };
  },

  props: {
    source: String
  },

  data: () => ({
    drawer: true
  }),

  mounted() {
    this.getdatauser();
    if (this.$store.state.authUser) {
      if (this.$route.name === "login" || this.$route.name === "register") {
        this.$router.push("/home");
      }
    } else {
      if (
        this.$route.name === "login" ||
        this.$route.name === "register" ||
        this.$route.name === "home"
      ) {
      } else {
        this.$router.push("/login");
      }
    }
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        alert(e.message);
      }
    },

    async getdatauser() {
      try {
        await this.$store.dispatch("users", {
          username: "FewNo1"
        });
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style>
*,
.swal2-title,
.swal2-content {
  font-family: "Kanit", sans-serif;
}

.swal2-styled {
  border-radius: 0px !important;
}

.swal2-popup {
  background: rgba(29, 29, 29, 0.8) !important;
  /* rgba(10, 10, 10, 0.8) !important */
  /* border: 1px solid #FFF !important; */
  border-radius: 50px !important;
}

.v-list-item__title {
  font-size: 16px;
}

.navbar .dropdown-menu a:not(.active) {
  color: #1d1c1c;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #403838;
}

::-webkit-scrollbar-thumb:hover {
  background: #211d1d;
}

#lur-footer {
  flex-shrink: none;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  background-color: rgba(29, 29, 29, 0.8);
  font-size: 18px;
}

#swal2-title,
#swal2-content {
  color: white;
}

.swal2-success-fix,
.swal2-success-circular-line-right,
.swal2-success-circular-line-left {
  background-color: transparent !important;
}

a {
  color: white;
  text-decoration: none;
  padding: 5px;
}

a:hover {
  color: rgba(204, 201, 201, 0.849);
}

.activefew {
}
</style>
