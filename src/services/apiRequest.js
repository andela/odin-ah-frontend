import Axios from 'axios';
import { logout } from '../redux/actions/auth/login';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export class ApiRequest {
  /**
   *
   * @param {'facebook'|'twitter'|'google'} social
   * @return {string}
   */
  static socialAuthUrl(social) {
    return `${BASE_API_URL}/auth/${social}`;
  }

  constructor() {
    this.axios = Axios.create({
      baseURL: BASE_API_URL
    });
    const token = localStorage.getItem('jwtToken');
    this.setToken(token);
  }

  getInstance() {
    return this.axios;
  }

  setToken(token) {
    if (token) {
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.Authorization;
    }
  }

  /**
   *
   * @param {{email:string,password:string,username:string}} user
   * @return {Promise<object>} return a Promise of the request
   */
  createUser(user) {
    return this.axios.post('/auth/signup', user);
  }

  /**
   *
   * @param { string } token
   * @return {Promise<any>} 59c3d95d0e458f279d365c14fdcdd1b2305c3696
   */
  verityConfirmationToken(token) {
    return this.axios.get(`/auth/confirmation/${token}`);
  }

  /**
   *
   * @param {{email: string}} data
   * @return {Promise<any>}
   */
  resendVerificationToken(data) {
    return this.axios.post('/auth/confirmation', data);
  }

  fetchArticles(pageToLoad = 1, size = 20) {
    return this.axios.get(`/articles?page=${pageToLoad}&size=${size}`);
  }

  loginUser(data) {
    return this.axios.post('/auth/login', data);
  }

  deleteArticle(slug) {
    return this.axios.delete(`/articles/${slug}`);
  }

  authenticateUser() {
    return this.axios.get('/users');
  }

  startResetPassword(email) {
    return this.axios.post('/users/reset-password/begin', { email });
  }

  completeResetPassword(data) {
    return this.axios.post(`/users/reset-password/complete/${data.token}`, {
      password: data.password
    });
  }

  fetchPopularTags() {
    return this.axios.get('/tags/popular');
  }

  getComments(slug, id) {
    let url = `/articles/${slug}/comments`;
    if (id) url = `${url}/${id}`;
    return this.axios.get(url);
  }

  createArticle(data) {
    return this.axios.post('/articles', data);
  }

  getArticle(slug) {
    return this.axios.get(`/articles/${slug}`);
  }

  updateArticle(slug, payload) {
    return this.axios.put(`/articles/${slug}`, payload);
  }

  getProfileData() {
    return this.axios.get('/users');
  }

  setProfileData(data) {
    return this.axios.put('/users', data);
  }

  bookMarkArticle(slug) {
    return this.axios.post(`/bookmark/articles/${slug}`);
  }

  addReaction({ slug, status }) {
    return this.axios.post(`/articles/likes/${slug}/${status}`);
  }

  uploadImage(data) {
    const fetchData = {
      method: 'POST',
      body: data
    };
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, fetchData);
  }

  followUser(userId) {
    return this.axios.post(`/profiles/${userId}/follow`);
  }

  unfollowUser(userId) {
    return this.axios.delete(`/profiles/${userId}/follow`);
  }

  fetchFollowList(size = 100) {
    return this.axios.get(`/profiles/following?size=${size}`);
  }

  registerInterceptors(store) {
    this.axios.interceptors.response.use(
      response => response,
      (error) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          if (status === 401 && store) {
            store.dispatch(logout());
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const apiRequest = new ApiRequest();
export default apiRequest;
