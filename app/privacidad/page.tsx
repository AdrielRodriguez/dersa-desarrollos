import type { Metadata } from "next";
import { content } from "@/lib/content";
import { LegalPage } from "@/components/ui/LegalPage";

const { privacy } = content.legal;

export const metadata: Metadata = {
  title: privacy.title,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return <LegalPage {...privacy} />;
}
