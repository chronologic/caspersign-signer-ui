import axios from "axios";

import { API_URL } from "../env";
import { DocumentDetails } from "../types";

const client = axios.create({
  baseURL: API_URL,
});

const api = {
  async getDetails(signatureId: string): Promise<DocumentDetails> {
    const { data } = await client.get(`/getDetails?hash=${signatureId}`);

    return data;
  },
};

export default api;
