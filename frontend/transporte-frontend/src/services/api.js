import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Substitua pela URL do seu backend ao subir em produção
});

export default api;