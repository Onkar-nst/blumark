// Shared by the enquiry form (client) and the server action.

export const interests = [
  "Buying new equipment",
  "Renting equipment",
  "Service & spare parts",
  "Just exploring",
] as const;

/** Files in /private/downloads that the enquiry form unlocks. */
export const downloads = {
  "blu-fe30-p3.jpg": { type: "image/jpeg", attachment: false },
  "blu-fe30-p4.jpg": { type: "image/jpeg", attachment: false },
  "blumark-blu-fe30-brochure.pdf": { type: "application/pdf", attachment: true },
  "blumark-company-catalogue.pdf": { type: "application/pdf", attachment: true },
} as const;

export type DownloadFile = keyof typeof downloads;

export const ACCESS_COOKIE = "bm_access";
