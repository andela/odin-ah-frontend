import Axios from 'axios';

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
      baseURL: BASE_API_URL,
    });

    // Add a response interceptor
    this.axios.interceptors.response.use(
      response => response,
      (error) => {
        const { status } = error;
        if (status === 401) {
          // todo clear authentication token from local storage
          // redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.axios;
  }

  setToken(token) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   *
   * @param {{email:string,password:string,username:string}} user
   * @return {Promise<object>} return a Promise of the request
   */
  createUser(user) {
    return this.axios.post('/auth/signup', user);
  }

  fetchArticles() {
    return this.axios.get('/articles');
  }

  loginUser(data) {
    return this.axios.post('/auth/login', data);
  }

  createArticle(data) {
    return this.axios.post('/articles', data);
  }

  getArticle(slug) {
    return this.axios.get(`/articles/${slug}`);
  }
}

const apiRequest = new ApiRequest();
export default apiRequest;
