"use client";

import { useActionState } from "react";
import { signup, type SignupState } from "./actions";

export function SignupForm() {
  const [state, action, pending] = useActionState<SignupState, FormData>(signup, null);
  if (state?.ok) return <p className="note ok">{state.message}</p>;
  return (
    <form action={action} className="form">
      <label htmlFor="email" className="sr-only">Email</label>
      <input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
      <button type="submit" disabled={pending}>{pending ? "Joining…" : "Join the waitlist"}</button>
      {state && <p className="note err" role="alert">{state.message}</p>}
    </form>
  );
}
