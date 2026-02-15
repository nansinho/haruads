"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const AccessibilityWidget = dynamic(
  () => import("@/components/AccessibilityWidget"),
  { ssr: false }
);

export default function ClientWidgets() {
  return (
    <>
      <AccessibilityWidget />
      <Chatbot />
    </>
  );
}
