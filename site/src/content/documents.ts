const publicHeader = `David Kohler
Pittsburgh, PA
(412) 526-6764 | Dkohlkat@gmail.com | github.com/kohlkat`

export const resumeBody = `PROFESSIONAL SUMMARY
Robotics and software developer building RS274-NEXT (SAGE-274), a legacy-safe extension of RS-274/NGC. It adds real-time sensor fusion, bounded adaptive policies, and deterministic networking while remaining compatible with existing G-code. I design and operate a custom CNC cell in manual, handheld, and VR teleoperation modes to collect, label, and evaluate data for learning. I also ship full-stack products and market-infrastructure software.

FOCUS
Robotics software, controls, simulation, and full-stack engineering. Hands-on machine operation when a role needs demonstrations, labeling, or safe, repeatable execution.

KEY PROJECT — RS274-NEXT (SAGE-274)
Interpreter and directives: RS-274/NGC-compatible interpreter with SENSE{}, ADAPT{}, QOS{}, and SYNC{}. Unknown directives are treated as comments so older controllers stay safe.

Directive examples:
SENSE{ae:on, ir:on, imu_hz:200}
SIM{domain:randomize, seed:42, noise:{ae:0.02, imu:0.005}, physics:{friction:range(0.6,0.9), backlash:mm(0.02)}}
SAFE{envelope:{x:[-1,220], y:[-1,120], z:[-150,0]}, estop:guarded, jerk_cap:true}
ADAPT{feed_pct:[-10,15], spindle_pct:[-5,10], bounds:{deflection_mm:<0.03, temp_C:<70}}
TRACE{rate_hz:500, topics:[pose,force,temp], label_schema:'op,tool,material'}
LABEL{op:'finish', tool:'EM6', material:'6061-T6', lot:'A42'}
CALIB{probe:'3D-touch', thermal:'on', backoff_mm:0.5}
VERIFY{chatter_idx<0.2 && stock_remaining_mm>=0}
SYNC{ptp:true, tsn:true}

Fusion and signals: EKF/UKF fusion of IMU, acoustic emission, spindle current, thermal/IR, and vision/depth. Outputs include chatter index, tool-wear proxy, stock remaining, and thermal load.

Policy hooks: unsupervised baselines and reinforcement-learning policies that apply bounded adjustments to feed, spindle, and jerk limits, with guarded feed-holds.

Edge inference: embedded NPU / Jetson-class targets for low-latency control, plus calibration, drift compensation, and confidence gating.

Digital twin and training simulation: STEP to OpenUSD, Omniverse/Isaac domain randomization, synthetic sensors, curriculum and procedural tasks, seeded scenarios, auto-labeling through TRACE{} and LABEL{}, and a sim-to-real shadow-mode gate before hardware activation.

Robotics mapping: ROS 2 / MoveIt 2 mapping of canonical RS-274 primitives, so the same program can target a mill or a 6-axis arm.

Deterministic networking: OPC UA PubSub and TSN concepts with PTP/802.1AS, time-aware scheduling, and EtherCAT/PROFINET gateways.

Data operations: logging, label schemas, QA checks, and replay tooling for repeatable evaluation.

ACHIEVEMENTS
- Designed a legacy-safe directive grammar for sensor-aware G-code so mixed old and new controllers can run the same programs.
- Built a randomized simulation curriculum (OpenUSD / Omniverse / Isaac) with auto-labeled datasets and reproducible seeds.
- Implemented bounded RL policy hooks with safety guards and jerk caps.
- Built sim-to-real parameter identification so the physics model tracks real telemetry.
- Set up data QA: schema checks, label validation, and a replay harness.

TECHNICAL SKILLS
- Robotics: VR teleoperation, handheld controllers, safety interlocks, repeatable task execution.
- Programming and ML: Python, C++, TypeScript, MATLAB; PyTorch/TensorFlow; React and Node.
- Controls and signals: EKF/UKF sensor fusion, motor control, jerk-limited trajectories, real-time feedback.
- Industrial I/O: microcontrollers, encoders, acoustic-emission mics, current sensors, thermal and vision, basic wiring.
- Platforms: ROS 2, LinuxCNC, Jetson/NPU edge devices; OPC UA PubSub and TSN basics; Git and unit testing.

EDUCATION
- A.S., Software Development (in progress, 2024–present) — Community College of Allegheny County
- A.S., Computer-Aided Drafting & Engineering (2021) — Community College of Allegheny County

EXPERIENCE
- CTO, Vaguely Media Group (2022–present): data-driven booking platform; authentication and recommendations; led a small team.
- Quality Control Technician, Aerotech (2019–2020): inspected precision assemblies; blueprint interpretation; deburring; process quality.
- Earlier work in sales, contract installation, and kitchens — reliability in fast, shift-based environments.

ADDITIONAL
- Based in Pittsburgh. Open to on-site, hybrid, commute, or relocation.
- RS274-NEXT internals, diagrams, and invention notes are available under NDA.`

export const coverBody = `Dear Hiring Manager,

I build robotics software and operate the machines that feed it data. I designed RS274-NEXT (SAGE-274), a control stack that extends RS-274/NGC with sensor fusion, bounded adaptive control, and deterministic networking while staying legacy-safe. I run a custom CNC cell in manual, handheld, and VR teleoperation so collection, labeling, and evaluation stay tied to the real process.

I am looking for robotics software, controls, simulation, or full-stack engineering work. I am also a fit for hands-on robot or VR roles where demonstration quality and careful procedure matter.

What I have built and run
- An RS-274/NGC-compatible interpreter with SENSE{}, ADAPT{}, QOS{}, and SYNC{}. Extensions are ignored by older controllers, so existing programs keep running.
- Real-time EKF/UKF fusion of IMU, acoustic emission, spindle current, thermal/IR, and vision/depth, producing a chatter index, tool-wear proxy, stock remaining, and thermal load.
- Learning hooks that stay inside jerk and safety limits, plus edge inference on NPU / Jetson-class hardware with confidence gating.
- A digital-twin path from CAD/STEP to OpenUSD and Omniverse/Isaac: randomized tasks, synthetic sensors, auto-labels, and a shadow mode before anything moves on hardware.
- A ROS 2 / MoveIt 2 mapping so the same program can drive a mill or a 6-axis arm.
- Production web work as CTO of Vaguely Media Group: authentication, recommendations, and a small team shipping a booking platform.

How I work
I follow procedures, troubleshoot quickly, and keep the path from hardware to model in one picture. That shortens iteration and raises the quality of both the data and the software around it.

I can walk through directive grammar, fusion pipelines, policy bounds, and edge deployment. Deeper code and diagrams are available under NDA.

Thank you for your time.

Sincerely,
David Kohler
Pittsburgh, PA
(412) 526-6764 | Dkohlkat@gmail.com | github.com/kohlkat`

export const resumePublic = `${publicHeader}\n\n${resumeBody}\n`
export const coverPublic = `${publicHeader}\n\n${coverBody}\n`
