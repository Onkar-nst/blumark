"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { interests } from "@/data/leads";

const field =
  "mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink focus:ring-2 focus:ring-ink/10";
const label = "block text-sm font-medium text-ink";

export default function LeadForm({
  source,
  title = "Unlock the full details",
  text = "Tell us a little about yourself and we'll show the rest right away.",
  cta = "Unlock now",
  pendingText = "Unlocking…",
  doneText,
  dark = false,
  className = "",
}: {
  /** Where the form was filled, e.g. "blu-fe30" or "catalogue". */
  source: string;
  title?: string;
  text?: string;
  cta?: string;
  pendingText?: string;
  /** If set, shown in place of the form once it has been sent. */
  doneText?: string;
  dark?: boolean;
  className?: string;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { ok: false });
  const v = state.values ?? {};
  const box = `rounded-lg p-6 sm:p-7 ${dark ? "bg-white" : "bg-soft"} ${className}`;

  if (state.ok && doneText) {
    return (
      <div role="status" className={`${box} flex flex-col items-start justify-center`}>
        <CheckCircle2 className="size-10 text-[#1ebe5a]" />
        <h3 className="mt-4 font-display text-3xl leading-none font-bold text-ink uppercase">Thank you!</h3>
        <p className="mt-2 max-w-md leading-relaxed text-muted">{doneText}</p>
      </div>
    );
  }

  return (
    <form action={action} className={box}>
      <p className="flex items-center gap-2 text-sm font-medium text-ink/60">
        <Lock className="size-4" /> Free · takes 20 seconds
      </p>
      <h3 className="mt-2 font-display text-3xl leading-none font-bold text-ink uppercase">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>

      <input type="hidden" name="source" value={source} />
      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${source}-name`} className={label}>Name *</label>
          <input id={`${source}-name`} name="name" required autoComplete="name" defaultValue={v.name} className={field} />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className={label}>Phone *</label>
          <input id={`${source}-phone`} name="phone" type="tel" required autoComplete="tel" defaultValue={v.phone} className={field} />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>Email *</label>
          <input id={`${source}-email`} name="email" type="email" required autoComplete="email" defaultValue={v.email} className={field} />
        </div>
        <div>
          <label htmlFor={`${source}-company`} className={label}>Company</label>
          <input id={`${source}-company`} name="company" autoComplete="organization" defaultValue={v.company} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${source}-interest`} className={label}>I&apos;m interested in *</label>
          <select id={`${source}-interest`} name="interest" required defaultValue={v.interest ?? ""} className={field}>
            <option value="" disabled>Choose one</option>
            {interests.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      {state.error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-dark group mt-5 w-full disabled:opacity-60">
        {pending ? pendingText : cta}
        {!pending && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
      </button>
      <p className="mt-3 text-xs text-muted">We&apos;ll only use these details to help with your enquiry.</p>
    </form>
  );
}
