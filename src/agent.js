import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_ROOT = 'http://127.0.0.1:8000/api/';

export const mediaServer = process.env.REACT_APP_MEDIA_SERVER;

const requests = {
  get: url => {
    const promise = axios.get(`${API_ROOT}${url}`);
    promise.catch(e => {
      if (e.response.status == 401) {
        Auth.cleanCookies();
        Auth.removeHeaders();
        useDispatch({ type: 'LOGOUT' });
      }
    });
    return promise;
  },
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body),
  put: (url, body) => axios.put(`${API_ROOT}${url}`, body),
  delete: url => axios.delete(`${API_ROOT}${url}`)
};

export const CDN = {
  getUrl: imageUrl =>
    imageUrl.includes('http') || imageUrl.includes('base64')
      ? imageUrl
      : `${mediaServer}/${imageUrl}`
};

export const Auth = {
  login: credentials => requests.post('authentication/login/', credentials),
  signUp: userData => requests.post('authentication/signup/', userData),
  configHeaders: () => {
    const session_cookie = cookies.get('token');
    if (session_cookie !== undefined) {
      const token = `Token ${session_cookie}`;
      axios.defaults.headers.common['Authorization'] = token;
    }
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  },
  removeHeaders: () => {
    delete axios.defaults.headers.common.Authorization;
  },
  cleanCookies: () => {
    cookies.remove('csrftoken');
    cookies.remove('token');
  },
  configCookies: data => {
    cookies.set('csrftoken', data['csrf'], { path: '/' });
    cookies.set('token', data['token'], { path: '/' });
  },
  hasCookies: () => {
    const token = cookies.get('token');
    const csrfToken = cookies.get('csrftoken');
    if (token != null && csrfToken != null) {
      return true;
    }
    return false;
  }
};

export const Clientes = {
  all: () => requests.get('clientes/clientes/'),
  get: lessonId => requests.get(`lessons/lessons/${lessonId}/`),
  create: lesson => requests.post('clientes/clientes/', lesson),
  update: (lessonId, lesson) =>
    requests.put(`lessons/lessons/${lessonId}/`, lesson),
  withConcepts: lessonId =>
    requests.get(`lessons/lessons/${lessonId}/concepts/`),
  delete: lessonId => requests.delete(`lessons/lessons/${lessonId}/`),
  saveTrainingScore: (lessonId, conceptsScore) =>
    requests.post(`lessons/lessons/${lessonId}/training/`, {
      concepts: conceptsScore
    })
};

export const Requisiciones = {
  all: () => requests.get('requisiciones/requisiciones/'),
  tipos: {
    all: () => requests.get('requisiciones/requisiciones/tipos/')
  },
  create: requisicion =>
    requests.post('requisiciones/requisiciones/', requisicion),
  get: lessonId => requests.get(`lessons/lessons/${lessonId}/`),
  update: (lessonId, lesson) =>
    requests.put(`lessons/lessons/${lessonId}/`, lesson),
  withConcepts: lessonId =>
    requests.get(`lessons/lessons/${lessonId}/concepts/`),
  delete: lessonId => requests.delete(`lessons/lessons/${lessonId}/`),
  saveTrainingScore: (lessonId, conceptsScore) =>
    requests.post(`lessons/lessons/${lessonId}/training/`, {
      concepts: conceptsScore
    })
};
