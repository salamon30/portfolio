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
    title: "Isolation Forest for Sensor Faults: Why 95% F1 Is Not the Whole Story",
    date: "2026-05-15",
    summary:
      "A small unsupervised anomaly-detection pipeline for multivariate sensor data, and the one hyperparameter that quietly decides whether it looks brilliant or mediocre.",
    tags: ["Machine Learning", "Anomaly Detection", "Python"],
    readingTime: 4,
    body: `
<p>Real industrial machines rarely come with labelled fault data. That is why unsupervised anomaly detection is attractive for predictive maintenance: you learn what "normal" looks like and flag whatever does not fit. As a self-study project before my Master's Edge AI work, I built a compact pipeline to understand how this behaves in practice.</p>

<h2>The Setup</h2>
<p>The data is simulated so that the ground truth is known. The pipeline generates 200 normal readings and 20 fault readings across three channels: temperature, vibration and pressure. Faults run hotter, vibrate harder and sit at higher pressure, each with its own noise.</p>
<pre><code>Raw sensor data → StandardScaler → Isolation Forest → labels + dashboard</code></pre>
<p>Scaling matters here. Pressure lives around 100 while vibration lives around 0.5, so without standardisation one channel would dominate the random splits.</p>

<h2>Why Isolation Forest</h2>
<p>Isolation Forest builds random trees that split on a random feature at a random value. Anomalies are few and different, so they get isolated in fewer splits. The average path length becomes the anomaly score. It needs no labels and stays cheap to score, which fits sensor workloads well.</p>

<h2>The Result, and the Catch</h2>
<p>With the default settings, the model detects 20 readings as faults, with 95% precision, recall and F1. That looks great, but one parameter does most of the work: <code>contamination</code>, the fraction of points the model is told to flag.</p>
<table>
  <thead><tr><th>contamination</th><th>Precision</th><th>Recall</th><th>F1</th></tr></thead>
  <tbody>
    <tr><td>0.05</td><td>100%</td><td>55%</td><td>71%</td></tr>
    <tr><td>0.09</td><td>95%</td><td>95%</td><td>95%</td></tr>
    <tr><td>0.15</td><td>61%</td><td>100%</td><td>76%</td></tr>
  </tbody>
</table>
<p>The default of 0.09 is almost exactly the true fault rate of 20 in 220. In other words, the strong score partly comes from telling the model how many faults to expect. On a real machine you do not know that number in advance.</p>

<h2>What I Took Away</h2>
<ul>
  <li><strong>Report the threshold, not just the score.</strong> An F1 without the contamination value behind it is hard to interpret.</li>
  <li><strong>Synthetic data flatters models.</strong> Here the fault and normal clusters are well separated. Real sensor drift and noise are much less kind.</li>
  <li><strong>Pick the operating point by cost.</strong> A missed fault and a false alarm rarely cost the same. The threshold should follow that trade-off, not a benchmark number.</li>
</ul>
<p>The natural next step is a real, time-ordered sensor dataset, where temporal context and simple statistical baselines become part of the comparison.</p>
<p>The code, including a command line for changing the data size and contamination, is on <a href="https://github.com/salamon30/sensor-anomaly-detection" target="_blank" rel="noreferrer">GitHub</a>.</p>
    `.trim(),
  },
  {
    slug: "yolov8-ppe-lessons",
    title: "What I Learned Building a YOLOv8 Helmet Detector",
    date: "2026-04-02",
    summary:
      "From merging two datasets to shipping a FastAPI and Streamlit app: practical lessons from a real-time PPE compliance detector.",
    tags: ["Computer Vision", "YOLOv8", "Deep Learning"],
    readingTime: 5,
    body: `
<p>For the Machine Learning and Deep Learning course at THD Deggendorf, I built a detector that checks whether people on a site are wearing hard hats. The final YOLOv8s model reaches 94.9% mAP@50. These are the lessons that mattered more than the headline number.</p>

<h2>Merging Datasets Is Real Work</h2>
<p>I combined the Kaggle hard-hat-detection dataset with a Roboflow PPE dataset, for 6,176 images in total. The two sources use different annotation formats, so the Kaggle Pascal VOC XML labels had to be converted to YOLO format and mapped onto the same two classes: <em>Helmet</em> and <em>No_Helmet</em>. A wrong class mapping fails silently, so I spot-checked converted labels before training.</p>

<h2>Training</h2>
<p>I fine-tuned a pretrained YOLOv8s on a Colab Tesla T4 for 50 epochs. Overall precision is 92.4% and recall is 90.2%.</p>
<table>
  <thead><tr><th>Class</th><th>Precision</th><th>Recall</th><th>mAP50</th></tr></thead>
  <tbody>
    <tr><td>Helmet</td><td>93.7%</td><td>92.1%</td><td>96.1%</td></tr>
    <tr><td>No_Helmet</td><td>91.1%</td><td>88.3%</td><td>93.7%</td></tr>
  </tbody>
</table>

<h2>The Class That Matters Is the Harder One</h2>
<p>For a safety tool, a missed <em>No_Helmet</em> is the expensive error, and that is exactly the class with the lowest recall. An averaged mAP hides this. If I deployed it for real, I would tune the confidence threshold for <em>No_Helmet</em> recall rather than for the overall score.</p>

<h2>A Second Architecture as a Sanity Check</h2>
<p>I also trained Faster R-CNN with a ResNet50-FPN backbone on the same data, once from COCO-pretrained weights and once from scratch. The comparison was a useful reminder of why one-stage detectors are the default for real-time use, and how much pretrained weights help on a dataset of this size.</p>

<h2>Shipping It</h2>
<p>A model in a notebook is not a product, so I wrapped it in a FastAPI service and a Streamlit dashboard. It handles photos, uploaded video and a live webcam, and it raises an alarm when compliance drops below 50%. The deployment taught its own lessons:</p>
<ul>
  <li><strong>Video codecs bite.</strong> Annotated videos written by OpenCV did not play in the browser until I re-encoded them with H.264.</li>
  <li><strong>Tests and CI pay off early.</strong> API tests run in a CI/CD pipeline, so a broken endpoint shows up before a demo, not during one.</li>
  <li><strong>Free hosting sleeps.</strong> The first request after idle takes about 30 seconds, which is worth telling users up front.</li>
</ul>

<p>Code, training notebooks and the live demo are on <a href="https://github.com/salamon30/helmet-detection" target="_blank" rel="noreferrer">GitHub</a>.</p>
    `.trim(),
  },
];
