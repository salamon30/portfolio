/**
 * Blog posts — yazı eklemek için POSTS dizisine yeni obje ekle.
 * body: HTML string — paragraf için <p>, başlık için <h2>/<h3>,
 * kod için <pre><code>, liste için <ul><li> kullan.
 */

export type Post = {
  slug: string;
  title: string;
  date: string;        // "YYYY-MM-DD"
  summary: string;
  tags: string[];
  readingTime: number; // dakika
  body: string;        // HTML
};

export const POSTS: Post[] = [
  {
    slug: "sensor-anomaly-detection-approaches",
    title: "Sensor Anomaly Detection: Three Approaches Compared",
    date: "2026-05-15",
    summary:
      "A hands-on comparison of rolling z-score, IQR filtering and Isolation Forest for detecting anomalous patterns in industrial sensor streams.",
    tags: ["Machine Learning", "Time Series", "Python"],
    readingTime: 6,
    body: `
<p>Anomaly detection in sensor data is one of those problems that looks straightforward until you actually try to solve it in production. During my personal study project on time-series ML, I benchmarked three approaches against the same dataset of vibration sensor readings from an industrial motor.</p>

<h2>The Dataset</h2>
<p>The dataset contained ~50k readings at 10 Hz from a rotating motor — temperature, vibration (x, y, z axes) and current draw. Anomalies ranged from gradual drift to sharp spikes, making it a good stress test for different detection strategies.</p>

<h2>Approach 1 — Rolling Z-Score</h2>
<p>The simplest baseline: compute a rolling mean and standard deviation over a window of N samples, flag any point more than k standard deviations away. Surprisingly robust for sudden spikes, but it struggles with gradual drift because the window mean shifts with the signal.</p>
<pre><code>z = (x - rolling_mean) / rolling_std
anomaly = abs(z) > threshold</code></pre>
<p><strong>Verdict:</strong> fast, interpretable, good starting point. Fails on slow drift and seasonality.</p>

<h2>Approach 2 — IQR Filtering</h2>
<p>Compute the interquartile range over a rolling window and flag points outside [Q1 − 1.5·IQR, Q3 + 1.5·IQR]. More robust to skewed distributions than z-score because it uses the median rather than the mean.</p>
<p><strong>Verdict:</strong> better on non-Gaussian noise, still misses contextual anomalies (a reading that is normal in isolation but abnormal in context).</p>

<h2>Approach 3 — Isolation Forest</h2>
<p>A tree-based unsupervised method that isolates anomalies by randomly selecting a feature and a split value — anomalies are isolated in fewer splits. I used a sliding window of 20 samples as a feature vector to give the model temporal context.</p>
<p><strong>Verdict:</strong> best F1 on the test set (0.87 vs 0.71 and 0.74 for the statistical methods), but ~40× slower to score. For offline analysis this is fine; for edge deployment you need the simpler methods.</p>

<h2>Takeaway</h2>
<p>For edge AI applications the practical answer is usually a hybrid: rolling z-score as a fast first-pass filter, Isolation Forest offline to tune thresholds and catch what the statistical methods miss. The right choice depends on your latency budget and how much labelled data you have.</p>
<p>The full code is on <a href="https://github.com/salamon30/sensor-anomaly-detection" target="_blank" rel="noreferrer">GitHub</a>.</p>
    `.trim(),
  },
  {
    slug: "yolov8-ppe-lessons",
    title: "What I Learned Training YOLOv8 for PPE Detection",
    date: "2026-04-02",
    summary:
      "Practical lessons from training a real-time helmet detection model: dataset curation, augmentation choices and the gap between mAP and real-world performance.",
    tags: ["Computer Vision", "YOLOv8", "Deep Learning"],
    readingTime: 5,
    body: `
<p>For the Machine Learning and Deep Learning course at THD Deggendorf I built a real-time PPE compliance detector — specifically for workers not wearing hard hats on construction sites. The final model hit 92.8% mAP@50. Here is what I wish I had known at the start.</p>

<h2>Dataset Quality Beats Model Size</h2>
<p>I started with YOLOv8m (medium) but switched to YOLOv8s (small) after finding that cleaning mislabelled images improved accuracy more than doubling the parameter count. Spend time on your data before scaling the model.</p>

<h2>Augmentation That Actually Helped</h2>
<p>Standard flips and crops helped, but the biggest gains came from:</p>
<ul>
  <li><strong>Mosaic augmentation</strong> — combines four images into one, forcing the model to detect small objects in cluttered scenes.</li>
  <li><strong>Random lighting shifts</strong> — construction sites have harsh shadows. Simulating this during training was critical for outdoor robustness.</li>
  <li><strong>Perspective transforms</strong> — helmet detection from CCTV cameras is often at steep angles.</li>
</ul>

<h2>The mAP vs. Real-World Gap</h2>
<p>The model scored well on the held-out test set but initially struggled on a live camera feed. The test set images were clean and well-lit; the live feed was lower resolution and motion-blurred. Adding 200 frames captured from the actual camera to the training set closed most of the gap — a reminder that your evaluation set needs to match your deployment environment.</p>

<h2>Inference Speed</h2>
<p>YOLOv8s runs at ~45 FPS on a laptop GPU and ~12 FPS on CPU — enough for real-time alerting. For edge deployment (Raspberry Pi / Jetson Nano), ONNX export + INT8 quantisation brings CPU inference to ~8 FPS, which is workable for a safety alert system that doesn't need frame-perfect accuracy.</p>

<p>Code and training notebooks are on <a href="https://github.com/salamon30/helmet-detection" target="_blank" rel="noreferrer">GitHub</a>.</p>
    `.trim(),
  },
];
