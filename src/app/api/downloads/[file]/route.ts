import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { downloads, type DownloadFile } from "@/data/leads";
import { hasAccess } from "@/lib/access";

// Gated files live outside /public and are only served after the enquiry form.
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/downloads/[file]">) {
  const { file } = await ctx.params;
  if (!(file in downloads)) return new Response("Not found", { status: 404 });
  if (!(await hasAccess())) return new Response("Please fill in the enquiry form first.", { status: 401 });

  const meta = downloads[file as DownloadFile];
  const body = await readFile(path.join(process.cwd(), "private", "downloads", file));
  return new Response(body, {
    headers: {
      "Content-Type": meta.type,
      "Content-Disposition": `${meta.attachment ? "attachment" : "inline"}; filename="${file}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
