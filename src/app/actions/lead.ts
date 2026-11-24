"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { ACCESS_COOKIE, interests } from "@/data/leads";

export type LeadState = { ok: boolean; error?: string; values?: Record<string, string> };

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);

/**
 * Saves an enquiry and unlocks gated downloads for this visitor.
 * Leads are appended to /leads/leads.jsonl on the server.
 * TODO: forward to email / CRM / Google Sheet before going live on a serverless host.
 */
export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  const values = {
    name: clean(form.get("name"), 100),
    email: clean(form.get("email"), 150),
    phone: clean(form.get("phone"), 20),
    company: clean(form.get("company"), 150),
    interest: clean(form.get("interest"), 60),
    source: clean(form.get("source"), 80),
  };

  if (values.name.length < 2) return { ok: false, error: "Please enter your name.", values };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return { ok: false, error: "Please enter a valid email address.", values };
  if (values.phone.replace(/\D/g, "").length < 10)
    return { ok: false, error: "Please enter a valid phone number.", values };
  if (!(interests as readonly string[]).includes(values.interest))
    return { ok: false, error: "Please choose what you're interested in.", values };

  const dir = path.join(process.cwd(), "leads");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify({ ...values, at: new Date().toISOString() }) + "\n");

  (await cookies()).set(ACCESS_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  refresh();
  return { ok: true };
}
