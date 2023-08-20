import axios from "@/lib/axios";
import { createStore } from "vuex";

const store = createStore({
  state(){
    return {
      awards:[],
      total:0,
      query:''
    }
  },
  mutations:{
    SET_DATA(state, value){
      state.awards = [
        ...state.awards,
        ...value.results
      ]
      state.total = value.total
    },
    SET_QUERY(state, value){
      state.query = value
    },
    RESET_VALUE(state){
      state.awards = []
      state.total = 0
    },
    RESET_QUERY(state){
      state.query=''
    }
  },
  actions:{
    getData({commit, state}, data = {}){
      if(data.query){
        commit('SET_QUERY', data.query)
      }

      const params = `page=${data.page}&${state.query}`
      axios.get(`awards?${params}`).then(({data})=> {
        data.data.query =
        commit('SET_DATA', data.data)
      })
    }
  }
})

export default store
