export async function sha256hex(str: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    Buffer.from(str, "utf-8")
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
