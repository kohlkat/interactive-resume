type A = {
  id: 'sage274'|'sim'|'kuka'|'xrpl'|'hcp'|'pipeline'|'vaguely'
  title: string
  lockedBlurb: string
  description: string
  highlights?: string[]
  codeLink?: string
  scene?: string
  sceneTransform?: { position:[number,number,number], rotation:[number,number,number], scale:number }
}
const achievements: A[] = [
  { id: 'sage274', title: 'SAGE274 — AI CNC Interpreter',
    lockedBlurb: 'Unlock with R then N.',
    description: 'Backwards-compatible RS274 extension with sensor-fusion, MaterialPINN, PDE physics hooks, federated learning, and real-time toolpath intelligence. Focus on safety gates and sim-to-real reliability.',
    highlights: ['Realtime: adaptive feeds/speeds from multi-sensor fusion','Safety: force/thermal envelopes + halt/rewind policies','Interop: ROS2, Isaac Lab, Omniverse bridges','Standards: NIST RS274 compatible semantics'],
    codeLink: 'file:///Users/you/Projects/SAGE274', scene: '/models/SAGE274.glb', sceneTransform: { position:[0,0,0], rotation:[0,0,0], scale:0.7 } },
  { id: 'sim', title: 'Training & Simulation Architecture',
    lockedBlurb: 'Hold SPACE ~2s.',
    description: 'Domain-randomized Isaac/ROS scenes + logging pipeline for VR-teleop and synthetic data. Auto-labeling, eval suites, and deployment checklists to reduce sim-to-real gap.',
    highlights: ['VR-teleop → episode logger with clear taxonomies','Domain randomization and contact-rich stress tests','Eval: success, disturbance recovery, contact quality','Artifacts: nightly batches; metrics-first dashboards'],
    codeLink: 'file:///Users/you/Projects/sim', scene: '/models/sim.glb', sceneTransform: { position:[0.1,0,0], rotation:[0.05,0.3,0], scale:0.75 } },
  { id: 'kuka', title: 'KUKA / Omniverse Rig + MoveIt',
    lockedBlurb: 'Tap ↑ → ↓ ←',
    description: '“Power of One” demo: same KUKA rig acts as spindle/extruder to fabricate a part from stock, then performs a tool-change to a gripper and picks the newly created object. Lightweight and intentionally imperfect motion for realism.',
    highlights: ['ROS2/MoveIt pipeline with careful controller isolation','Material-accurate render for contact cues','Safety: soft-limits, collision layers, logging hooks'],
    codeLink: 'file:///Users/you/Projects/kuka', scene: '/models/kuka.glb', sceneTransform: { position:[0,0,0], rotation:[0,0.4,0], scale:0.8 } },
  { id: 'xrpl', title: 'XRPL Arbitrage & Market Infra',
    lockedBlurb: 'Press 1',
    description: 'Low-latency arbitrage bot design on XRPL with Bellman-Ford exploration, plus node-distance mapping to place rippled near optimal peers.',
    highlights: ['Production-grade design with env secrets','Distance-aware node placement strategy','Stellar/Velo/SHX cross-chain analogs planned'],
    codeLink: 'file:///Users/you/Projects/xrpl', scene: '/models/xrpl.glb', sceneTransform: { position:[0,0,0], rotation:[0,0.2,0], scale:0.7 } },
  { id: 'pipeline', title: 'Chat Export → Local AI → Obsidian + Neo4j Pipeline',
    lockedBlurb: 'Type PIPE',
    description: 'Completed pipeline that parses ChatGPT/OpenAI exports, runs local AI (auto-summaries, topic tagging), injects YAML frontmatter, and materializes a knowledge graph in Neo4j with embeddings + vector DB for semantic queries—wired to Obsidian with idempotent watchers.',
    highlights: ['OpenAI/Chat export parsers with robust edge-case handling','Local inference first: summaries → richer topic tags','Frontmatter injection + QuickAdd/Templater compatibility','Neo4j graph + vector DB; semantic & path queries','Skip-already-processed notes; background-safe watchers','Starter + advanced dashboards for exploration'],
    codeLink: 'file:///Users/you/Projects/pipeline', scene: '/models/pipeline.glb', sceneTransform: { position:[0,0,0], rotation:[0,0.25,0], scale:0.85 } },
  { id: 'vaguely', title: 'Vaguely Media Website — Full-Stack Rebuild (Express + React)',
    lockedBlurb: 'Type SITE',
    description: 'Production-minded Node/Express backend with Google OAuth (Passport), security headers (helmet), rate-limiting, HubSpot CRM integration, KYC verification module (mock now, prod-ready interface), crypto invoice creation, Spotify token service, and a React client with a live raffle/donations flow.',
    highlights: ['Security: helmet, express-rate-limit, session management','Auth: Google OAuth 2.0 via Passport + sessions','CRM: HubSpot contact/events integration; graceful fallback when unconfigured','KYC: verification lifecycle with expiring links','Crypto: invoice creation abstraction; mock mode without API key','Spotify: client-credentials flow with token caching','Raffle: /api/raffle/donations + /api/raffle/status; React RafflePage.jsx','Config: dotenv + validation, centralized error types/middleware'],
    codeLink: 'file:///Users/you/Projects/vaguely', scene: '/models/vaguely.glb', sceneTransform: { position:[0,0,0], rotation:[0,0.15,0], scale:0.9 } },
  { id: 'hcp', title: 'Homebrew HCP Cluster',
    lockedBlurb: 'Type G P U or press 3',
    description: 'DIY supercomputer to offload learning/analysis from NPUs (AGX Orin / Mythic). MPI/HPC-X aware, with future Occamy-style coprocessor exploration.',
    highlights: ['Edge→HCP offload pipeline','MPI/HPC-X experiments for distributed training','Focus on low-latency data paths'],
    codeLink: 'file:///Users/you/Projects/hcp', scene: '/models/hcp.glb', sceneTransform: { position:[0,0,0], rotation:[0,0.15,0], scale:0.8 } },
]
export default achievements
