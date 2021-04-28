import axios from "axios";

import { API_URL } from "../env";
import { DocumentDetails, SignerInfo } from "../types";

const client = axios.create({
  baseURL: API_URL,
});

const api = {
  async getDetails(signatureId: string): Promise<DocumentDetails> {
    const { data } = await client.get(`/documents/${signatureId}`);

    return data;
  },
  async sign(info: SignerInfo): Promise<void> {
    await client.post(`/documents/${info.documentUid}/sign`, info);
  },
};

export default api;
