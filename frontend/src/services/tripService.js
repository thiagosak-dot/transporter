import api from './api'

export const tripService = {
  async getAll(params = {}) {
    const response = await api.get('/trips', { params })
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/trips/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('/trips', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/trips/${id}`, data)
    return response.data
  },

  async start(id, data) {
    const response = await api.post(`/trips/${id}/start`, data)
    return response.data
  },

  async finish(id, data) {
    const response = await api.post(`/trips/${id}/finish`, data)
    return response.data
  },

  async cancel(id, data = {}) {
    const response = await api.post(`/trips/${id}/cancel`, data)
    return response.data
  },

    async assign(id, data) {
    const response = await api.post(`/trips/${id}/assign`, data)
    return response.data
    }
}