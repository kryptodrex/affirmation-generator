import axios from "axios";

// You can use your own logic to set your local or production domain
// const baseDomain = "http://affirmation-photo-service:10000";
const baseDomain = "http://127.0.0.1:5000";
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});