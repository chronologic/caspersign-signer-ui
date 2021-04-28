import axios from "axios";

const api = {
  async getIp(): Promise<string> {
    const { data } = await axios.get("https://ipapi.co/json/");

    return data.ip;
  },
};

export default api;
