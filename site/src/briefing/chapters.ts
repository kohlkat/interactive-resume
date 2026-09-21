export const chapters = [
  {
    id: 'sage',
    kicker: 'The machine language',
    title: 'SAGE-274',
    body: 'RS-274/NGC still runs. I add directives for sensors, bounds, and labels, and unknown words stay comments so an older controller ignores them. IMU, acoustic emission, spindle current, and heat fuse into a chatter index and a tool-wear proxy. Feed and spindle may move only inside a jerk cap.',
  },
  {
    id: 'sim',
    kicker: 'Before the spindle turns',
    title: 'Simulation',
    body: 'CAD becomes OpenUSD. Omniverse and Isaac randomize the task, the sensors, and the physics. The same TRACE and LABEL directives tag the synthetic runs and the real cell. A policy stays in shadow until it agrees with the hardware.',
  },
  {
    id: 'arm',
    kicker: 'One rig, two jobs',
    title: 'The arm',
    body: 'A KUKA path cuts or extrudes a part, changes tools, and picks the part up. ROS 2 and MoveIt carry it. The motion is left a little imperfect, because a perfect demo is a different machine than the one on the floor.',
  },
  {
    id: 'systems',
    kicker: 'Around the cell',
    title: 'Systems',
    body: 'Chat exports become local summaries, Obsidian notes, and a Neo4j graph. Market infrastructure on the XRP Ledger. Vaguely Media is a booking product: auth, recommendations, a small team. A home cluster takes the jobs that should not live on the edge box.',
  },
  {
    id: 'path',
    kicker: 'The record',
    title: 'Path',
    body: 'Pittsburgh. Quality control at Aerotech, then CTO of Vaguely Media Group. Drafting and engineering from the Community College of Allegheny County, software development still in progress. I will go through the internals of RS274-NEXT under NDA.',
  },
] as const
