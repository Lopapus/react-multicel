import Swal2 from '../components/SweetAlert2'

const timer = {
  timer: 1500,
  showConfirmButton: false
}

const SwalTimer = {
  fire: async (params) => {
    await Swal2.fire({ ...timer, ...params })
  },
  error: async (params) => {
    await Swal2.fire({ ...timer, ...params, icon: 'error' })
  },
  success: async (params) => {
    await Swal2.fire({ ...timer, ...params, icon: 'success' })
  },
  warning: async (params) => {
    await Swal2.fire({ ...timer, ...params, icon: 'warning' })
  },
  info: async (params) => {
    await Swal2.fire({ ...timer, ...params, icon: 'info' })
  },
  question: async (params) => {
    await Swal2.fire({ ...timer, ...params, icon: 'question' })
  }
}

export default SwalTimer
