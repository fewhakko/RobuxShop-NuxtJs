import axios from 'axios'
import Swal from 'sweetalert2'

export const state = () => ({
  authUser: null,
  fewrank: null
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  ranking(state, user) {
    state.fewrank = user
  },
}

function swalalert(status, message) {
  if (status == "success") {
    Swal.fire({
      title: "สำเร็จ!",
      text: message,
      icon: status,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'ตกลง'
    }).then((result) => {
      if (result) {
        window.location.reload();
      }
    })
    return;
  } else if (status == "error") {
    Swal.fire({
      title: "ผิดพลาด!",
      text: message,
      icon: status,
      confirmButtonColor: '#E54D40',
      confirmButtonText: 'ตกลง'
    }).then((result) => {
      if (result) { }
    })
    return;
  }

}

export const actions = {


  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
      commit('ranking', req.session.fewrank)
    }
  },

  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      swalalert(data.status, data.message)

      if (data.status == "success") {
        commit('SET_USER', data)
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async users({ commit }, { username }) {
    try {
      const { data } = await axios.get('/api/users', { username })

      if (data.status == "success") {
        commit('SET_USER', data)
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async truewallet({ commit }, { tran }) {
    try {
      const { data } = await axios.post('/api/truewallet', { tran })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async robuxchange({ commit }, { rate,cookie,idgroup }) {
    try {
      const { data } = await axios.post('/api/robuxchange', { rate,cookie,idgroup })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  }, 

  async changepassword({ commit }, { passwordold,passwordnew1,passwordnew2 }) {
    try {
      const { data } = await axios.post('/api/changepassword', { passwordold,passwordnew1,passwordnew2 })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  }, 

  async truemoney({ commit }, { code }) {
    try {
      const { data } = await axios.post('/api/truemoney', { code })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async buyrobux({ commit }, { username, money, captcha }) {
    try {
      const { data } = await axios.post('/api/buyrobux', { username, money, captcha })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async register({ commit }, { username, password1, password2, email }) {
    try {
      const { data } = await axios.post('/api/register', { username, password1, password2, email })

      swalalert(data.status, data.message)

    } catch (error) {
      if (error.response && error.response.status === 401) {

        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
    swalalert("success", "ออกจากระบบแล้ว.")
  }
}
