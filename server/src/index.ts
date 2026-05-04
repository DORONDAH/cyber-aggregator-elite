import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Simulated Cyber Intelligence Stream
const intelStreams = [
  {
    id: '1',
    source: 'GLOBAL_NET',
    title: 'Zero-Day Vulnerability Detected in Edge Gateways',
    summary: 'A critical path-traversal flaw has been identified in standard metropolitan edge infrastructure. Stitch protocols recommend immediate patch-synchronization.',
    vector: 'NETWORK',
    criticality: 0.95
  },
  {
    id: '2',
    source: 'DARK_TRACE',
    title: 'Neural Expansion: metropolitan Data Centers',
    summary: 'Autonomous architecture shifts detected in primary tier-1 nodes. Pattern analysis suggests high-density intelligence optimization.',
    vector: 'NEURAL',
    criticality: 0.4
  },
  {
    id: '3',
    source: 'SEC_OPS',
    title: 'Encryption Standard Shift: Quantum Resilience',
    summary: 'New professional grade encryption keys being deployed across station Alpha. Uptime remains at 99.9% during migration.',
    vector: 'CRYPT',
    criticality: 0.2
  }
];

app.get('/api/intel', (req, res) => {
  res.json({ data: intelStreams, error: null });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'nominal', load: '42%', uptime: '100%' });
});

app.listen(port, () => {
  console.log(`[Stitch Intelligence] Cyber Gateway active at http://localhost:${port}`);
});
