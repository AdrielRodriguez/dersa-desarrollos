import type { Metadata } from "next";
import { content } from "@/lib/content";
import { LegalPage } from "@/components/ui/LegalPage";

const { terms } = content.legal;

export const metadata: Metadata = {
  title: terms.title,
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return <LegalPage {...terms} />;
}
