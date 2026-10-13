import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

type Signups = { count: number; signups: { id: number; email: string; createdAt: string }[] };

export default async function Admin() {
  const res = await api("/signups");
  if (!res.ok) throw new Error(`api: ${res.status}`);
  const data: Signups = await res.json();
  return (
    <main className="wrap">
      <p className="eyebrow">Admin</p>
      <h1>{data.count} signups</h1>
      <table>
        <thead>
          <tr><th>Email</th><th>Joined</th></tr>
        </thead>
        <tbody>
          {data.signups.map((s) => (
            <tr key={s.id}><td>{s.email}</td><td>{new Date(s.createdAt).toISOString().slice(0, 16).replace("T", " ")}</td></tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
