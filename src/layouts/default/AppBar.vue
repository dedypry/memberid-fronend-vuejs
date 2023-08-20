<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary>
      <div class="py-7" />
      <v-img height="100" src="@/assets/logo.png" />
      <div class="py-7" />
      <h2 class="text-center">Awards Menu</h2>
      <v-list density="compact" nav class="pl-10">
        <v-list-item
          title="Home"
          to="/award"
          value="home"
          @click.stop="drawer = !drawer"
        ></v-list-item>
        <v-list-item
          title="Logout"
          to="/"
          value="Logout"
          @click="removeToken"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawerRight" location="right" width="400">
      <v-container>
        <v-row>
          <v-col cols="6">
            <h2>Filter</h2>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn
              icon="mdi-close"
              @click.stop="drawerRight = !drawerRight"
            ></v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters style="height: 100px">
          <v-col cols="12" v-if="filter.poin">
            <v-btn color="blue" variant="outlined" size="small">
              Poin: 10.000 - {{ formatNumber(Math.ceil(form.point)) }}
              <v-icon
                end
                icon="mdi-close-circle-outline"
                @click="filter.poin = false"
              ></v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="filter.type">
            <v-btn color="blue" variant="outlined" size="small">
              Type:
              <span v-for="type in form.type" :key="type">{{ type }},</span>
              <v-icon
                end
                icon="mdi-close-circle-outline"
                @click="filter.type = false"
              ></v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="filter.type || filter.poin">
            <v-btn
              color="blue"
              variant="outlined"
              size="small"
              @click="resetFilter"
            >
              Clear All Filter
            </v-btn>
          </v-col>
        </v-row>

        <div class="py-4" v-if="filter.type || filter.poin"></div>

        <v-row no-gutters style="height: 50px">
          <v-col cols="12">
            <h4>Poin Needed</h4>
          </v-col>
          <v-col cols="6">
            <h3 style="color: rgb(86, 86, 252)">IDR 10.000</h3>
          </v-col>
          <v-col cols="6" class="text-right">
            <h3 style="color: rgb(86, 86, 252)">IDR 500.000</h3>
          </v-col>

          <v-col cols="12">
            <v-slider
              color="rgb(86, 86, 252)"
              min="10000"
              max="500000"
              v-model="form.point"
            ></v-slider>
          </v-col>
        </v-row>
        <div class="py-10"></div>

        <v-row no-gutters style="height: 50px">
          <v-col cols="12">
            <h3>Awards Type</h3>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              class="box-text"
              label="All Type"
              v-model="selects"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              class="box-text"
              label="Voucher"
              value="voucher"
              v-model="form.type"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="Product"
              value="product"
              v-model="form.type"
              style="height: 30px"
              class="box-text"
            >
            </v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="Others"
              value="giftcard"
              v-model="form.type"
              class="box-text"
            ></v-checkbox>
          </v-col>
        </v-row>
        <div class="py-15"></div>
        <div class="py-15"></div>
        <v-row>
          <v-col cols="12">
            <v-btn color="blue" @click="filterData" block="">Filter</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="text-center"><h3>Awards</h3></v-app-bar-title>
      <template v-slot:append>
        <v-btn
          icon="mdi-filter-variant"
          @click.stop="drawerRight = !drawerRight"
        ></v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      drawerRight: null,
      selects: false,
      form: {
        point: 10000,
        type: [],
      },
      filter: {
        poin: false,
        type: false,
      },
    };
  },
  computed: {
    point() {
      return this.form.point;
    },
    type() {
      return this.form.type;
    },
  },
  watch: {
    point() {
      this.filter.poin = true;
    },
    type() {
      this.filter.type = true;
    },
    selects(val) {
      if (val) {
        this.form.type = ["voucher", "product", "giftcard"];
      } else {
        this.filter.type = false;
        this.form.type = [];
      }
    },
  },
  methods: {
    formatNumber(intl) {
      if (!intl) return "-";
      if (typeof intl == "string") {
        if (intl.match(/,/g)) {
          intl = Number(intl.replaceAll(",", ""));
        }
      }
      return new Intl.NumberFormat().format(intl);
    },
    filterData() {
      this.$store.commit("RESET_VALUE");
      let query = "";
      if (this.filter.poin) {
        query += `point=${Math.ceil(this.form.point)}`;
      }

      if (this.filter.type) {
        query += `&type=${this.form.type}`;
      }
      this.$store.dispatch("getData", {
        page: 0,
        query: query,
      });
    },
    resetFilter() {
      this.filter.poin = false;
      this.filter.type = false;
      this.selects = false;
      this.form.point = 10000;

      this.$store.commit("RESET_QUERY");
    },
    removeToken() {
      localStorage.removeItem("token");
    },
  },
};
</script>

<style scoped>
.box-text {
  height: 30px;
  color: blue;
  font-weight: bold;
}
</style>
