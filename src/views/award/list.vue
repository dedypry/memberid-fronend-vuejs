<template>
  <div>
    <div v-if="awards.length > 0">
      <v-col cols="12" v-for="(item, i) in awards" :key="i">
        <v-card color="#EBEBEB">
          <v-img
            :src="item.image"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
            cover
          >
            <v-card-title class="text-h5">
              <v-row>
                <v-col class="text-right">
                  <v-btn :color="btnCardColor(item.type)">{{
                    item.type
                  }}</v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <div class="py-6"></div>

            <v-card-actions>
              <v-btn color="white" variant="outline"
                >{{ formatNumber(item.point) }} Poin</v-btn
              >
            </v-card-actions>
          </v-img>
        </v-card>

        <h3 class="py-2">{{ item.name }} IDR {{ formatNumber(item.price) }}</h3>
      </v-col>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12">
          <h4 class="text-center">No Awards Found</h4>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState(["awards", "total"]),
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "Login" });
    }
    this.list = [];
    this.$store.commit("RESET_VALUE");
    this.$store.dispatch("getData");
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
    handleScroll() {
      let height = 1000;
      if (window.innerHeight) {
        height = window.innerHeight + 100;
      }
      const sc = window.scrollY;
      if (sc > this.page * height) {
        this.page++;
        if (this.total / (this.page * 10) > 1) {
          this.$store.dispatch("getData", {
            page: this.page,
          });
        }
      }
    },
    btnCardColor(type) {
      let result = "";
      switch (type) {
        case "VOUCHER":
          result = "blue-darken-3";
          break;
        case "PRODUCT":
          result = "orange-darken-4";
          break;

        default:
          result = "green-accent-4";
          break;
      }
      return result;
    },
  },
};
</script>
