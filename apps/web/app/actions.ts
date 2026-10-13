"use server";

import { api } from "@/lib/api";

export type SignupState = { ok: boolean; message: string } | null;

export async function signup(_prev: SignupState, form: FormData): Promise<SignupState> {
  try {
    const res = await api("/signups", { method: "POST", body: JSON.stringify({ email: form.get("email") }) });
    if (res.status === 400) return { ok: false, message: "That doesn't look like an email address." };
    if (!res.ok) throw new Error(`api: ${res.status}`);
    return { ok: true, message: "You're on the list. We'll be in touch." };
  } catch (err) {
    console.error("signup failed", err);
    return { ok: false, message: "Something went wrong. Please try again in a minute." };
  }
}
