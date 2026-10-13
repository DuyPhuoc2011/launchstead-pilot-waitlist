import "server-only";

// On Cloud Run, Launchstead sets LAUNCHSTEAD_API_URL and the API is private:
// every call carries an ID token for that URL from the metadata server.
// Locally, API_URL points at a plain dev server and no token is sent.
const cloudUrl = process.env.LAUNCHSTEAD_API_URL;
const baseUrl = cloudUrl ?? process.env.API_URL ?? "http://localhost:8080";

async function authHeader(): Promise<Record<string, string>> {
  if (!cloudUrl) return {};
  const res = await fetch(
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=" +
      encodeURIComponent(cloudUrl),
    { headers: { "Metadata-Flavor": "Google" }, cache: "no-store" },
  );
  if (!res.ok) throw new Error(`metadata server: ${res.status}`);
  return { Authorization: `Bearer ${await res.text()}` };
}

export async function api(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(baseUrl + path, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(await authHeader()), ...init.headers },
  });
}
