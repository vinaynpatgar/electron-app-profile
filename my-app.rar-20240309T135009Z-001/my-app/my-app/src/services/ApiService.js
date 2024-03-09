import axios from 'axios';
let API_BASE_URL = `http://localhost:2000/records`;

export let IMAGE_SERVER_URL = 'http://localhost:2000/'
export let id = '65ec753f01e863d42068549e';

const ApiService = {
  getData: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profileData?_id=${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postData: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/profileDetails`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  postUpload: async (profilePhoto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, profilePhoto, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  putNameUpdate: async (id, fullName) => {
    let data = { fullName };
    try {
      const response = await axios.put(`${API_BASE_URL}/profilenameupdate/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
