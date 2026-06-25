import type { Metadata } from "next";
import ArielClient from "./ArielClient";

export const metadata: Metadata = {
  title: "Project Ariel — Low-Altitude Aerial Detection",
  description:
    "Research collaboration at THD × THI × Fraunhofer IVI: fine-tuned YOLOv8n achieving 91.8% mAP@0.5 on a custom low-altitude drone dataset at 3–9 m altitude.",
  openGraph: {
    title: "Project Ariel — Low-Altitude Aerial Detection · Recep Ulaş Uzun",
    description:
      "Fine-tuned YOLOv8n achieving 91.8% mAP@0.5 on a custom drone dataset at 3–9 m altitude, with 4.2 ms real-time inference.",
    images: [{ url: "/projects/ariel.svg", width: 1200, height: 675 }],
  },
};

export default function ArielPage() {
  return <ArielClient />;
}
