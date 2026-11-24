import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/data/leads";

/** True once this visitor has filled in the enquiry form. */
export async function hasAccess() {
  return (await cookies()).get(ACCESS_COOKIE)?.value === "1";
}
