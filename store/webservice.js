const state = () => ({
  query: {
    page: 1,
    perPage: 10,
    search: ""
  },
});

const mutations = {};

const actions = {};

const getters = {
  query: state => state.query,
}

export default {
  state,
  mutations,
  actions,
  getters,
};

