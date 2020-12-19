import Vue from "vue";
import Cloudbase from "@cloudbase/vue-provider";
import config from "../cloudbaserc.json";

export default async () => {
  Vue.use(Cloudbase, {
    env: config.envId
  });
};
