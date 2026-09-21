#!/usr/bin/env bash
set -euo pipefail
mkdir -p public/models
cat <<'EOT'
Some sources require a free login or disallow direct cURL. Download the GLBs and save to these filenames:

  SAGE274.glb    -> CNC Machine (CC‑BY): https://sketchfab.com/3d-models/cnc-machine-af387e70d78a4ba4886af58dd7aec96b
  sim.glb      -> Wooden Pallets (CC0): https://sketchfab.com/3d-models/wooden-pallets-cc0-game-asset-a9f841eab92b460f939a115dab968351
  kuka.glb     -> Industrial Robot (CC‑BY): https://sketchfab.com/3d-models/industrial-robot-e5e6703e7788417e9761eb4dc516de5a
  vaguely.glb  -> Low Poly Laptop (CC0): https://sketchfab.com/3d-models/low-poly-laptop-a9c2e21a123542fdaf8edfdac4c22869
  hcp.glb      -> Server Rack (CC‑BY): https://sketchfab.com/3d-models/server-rack-62f6779cb7e448b19aaf58544c3c7218
  pipeline.glb -> Cylinder placeholder (CC‑BY): https://sketchfab.com/3d-models/glb-cylinder-c3583a59a440447d97c830d013494cc1
  xrpl.glb     -> Create a simple nodes/edges GLB (spheres+cylinders) or keep abstract.

Then run:
  VITE_USE_MODELS=1 npm run dev

Attribution (for CC‑BY) can go in public/models/CREDITS.md
EOT
