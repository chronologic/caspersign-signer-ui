export interface IUser {
  address: string;
  email: string;
  operatorAddress: string;
  balanceEth: string;
}

export interface TorusUserInfo {
  email: string;
  name: string;
  verifier: string;
}

export enum DocumentStatus {
  OUT_FOR_SIGNATURE = "OUT_FOR_SIGNATURE",
  AWAITING_MY_SIGNATURE = "AWAITING_MY_SIGNATURE",
  COMPLETED = "COMPLETED",
  DECLINED = "DECLINED",
}

export interface DocumentSummary {
  documentUid: string;
  title: string;
  status: DocumentStatus;
  createdAt: string;
  signatures: SignatureSummary[];
}

export interface DocumentDetails extends DocumentSummary {
  createdByEmail: string;
  createdByName: string;
  signatures: SignatureDetails[];
  hashes: string[];
  history: DocumentHistory[];
}

export enum DocumentHistoryType {
  SENT = "SENT",
  VIEWED = "VIEWED",
  SIGNED = "SIGNED",
  COMPLETED = "COMPLETED",
  SIGNED_ON_CHAIN = "SIGNED_ON_CHAIN",
}

export interface DocumentHistory {
  type: DocumentHistoryType;
  timestamp?: string;
  ip?: string;
  email: string;
  description: string;
  txHash?: string;
}

export interface SignatureSummary {
  signatureUid: string;
  ip: string;
  email: string;
  name: string;
  completed: boolean;
  payload?: string;
  txHash: string;
  signedAt: string;
}

export interface SignatureDetails extends SignatureSummary {
  hs: {
    isOwner: boolean;
    email: string;
    name: string;
    statusCode: string;
    signedAt: string;
  };
}

export interface SignatureInfo {
  /** signer verifier (torus) */
  v: string;
  /** signer hashed email */
  e: string;
  /** recipient hashed email */
  r: string;
  /** signer hashed IP */
  i: string;
  /** timestamp */
  t: number;
  /** document hashes */
  h: string[];
  /** signer pubkey */
  p: string;
}

export interface SignatureInfoSigned extends SignatureInfo {
  /** signature */
  s: string;
}

export interface SignerInfo {
  documentUid: string;
  signatureUid: string;
  verifier: string;
  email: string;
  documentHashes: string[];
  payload: string;
}
