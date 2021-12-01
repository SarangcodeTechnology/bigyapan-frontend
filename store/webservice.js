const state = () => ({
  query: {
    page: 1,
    perPage: 10,
    search: ""
  },
});

const mutations = {};

const actions = {
  getItemCategories(state) {
    return new Promise((resolve, reject) => {
      const temp = this;
      state.dispatch("makeGetRequestWithoutAuthorization", {
        route: "get-item-categories"
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  makePostRequest(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BACKEND_API_URL + payload.route, payload.data, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/accessToken']
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  makeGetRequest(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BACKEND_API_URL + payload.route, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/accessToken']
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  makeGetRequestWithoutAuthorization(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BACKEND_API_URL + payload.route, {
        headers: {
          Accept: "application/json",
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
};

const getters = {
  query: state => state.query,
}

export default {
  state,
  mutations,
  actions,
  getters,
};

