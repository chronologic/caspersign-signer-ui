import axios from "axios";

const api = {
  async getIp(): Promise<string> {
    try {
      const { data } = await axios.get("https://ipapi.co/json/");

      return data.ip;
    } catch (e) {
      return "";
    }
  },
};

export default api;
