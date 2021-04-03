import axios from 'axios';

export const beeApiDelete = (params) => {
  return axios.delete('/api/v1/bee/del', params);
};

export const beeApiUpdate = (params) => {
  return axios.put('/api/v1/bee/update', params);
};

export const beeApiGetAll = () => {
  return axios.get('/api/v1/bee/all', {}).then(r => r.data);
};

export const beeApiAdd = (params) => {
  return axios.post('/api/v1/bee/add', params).then(r => r.data);
};
