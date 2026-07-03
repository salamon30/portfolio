import type { Metadata } from "next";
import HelmetDetectionClient from "./HelmetDetectionClient";

export const metadata: Metadata = {
  title: "PPE Helmet Detection — Live Cloud Deploy",
  description:
    "YOLOv8s fine-tuned for construction-site PPE compliance: 94.9% mAP@50 at 103 FPS, served as a FastAPI REST API + Streamlit dashboard, deployed on Render with GitHub Actions CI/CD.",
  openGraph: {
    title: "PPE Helmet Detection — Live Cloud Deploy · Recep Ulaş Uzun",
    description:
      "94.9% mAP@50 at 103 FPS — real-time helmet detection with compliance scoring, containerised in Docker and deployed with CI/CD.",
    images: [{ url: "/projects/helmet-detection/still-1.jpg", width: 624, height: 352 }],
  },
};

export default function HelmetDetectionPage() {
  return <HelmetDetectionClient />;
}
