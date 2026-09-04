import type { Metadata } from "next";

import { PrivacyScannerClient } from "./PrivacyScannerClient";

export const metadata: Metadata = {
  title: "Privacy Scanner Free - No Watermark | Paperkit",
  description:
    "Find and remove hidden PDF metadata. No watermark, no upload, no sign-up.",
};

export default function PrivacyScannerPage() {
  return <PrivacyScannerClient />;
}
