export default function BryceWorld() {
  return (
    <svg className="bryce" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123a86" />
          <stop offset="28%" stopColor="#2f7ed4" />
          <stop offset="58%" stopColor="#79d4f6" />
          <stop offset="82%" stopColor="#d9f6ff" />
          <stop offset="100%" stopColor="#f7e7b8" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d2" stopOpacity="1" />
          <stop offset="35%" stopColor="#ffe08a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7eefc" />
          <stop offset="100%" stopColor="#8ebfdf" />
        </linearGradient>
        <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fd0ea" />
          <stop offset="100%" stopColor="#4e8fb4" />
        </linearGradient>
        <linearGradient id="hillL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b7e38a" />
          <stop offset="45%" stopColor="#3f9a55" />
          <stop offset="100%" stopColor="#1c6a48" />
        </linearGradient>
        <linearGradient id="hillR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7f0a4" />
          <stop offset="50%" stopColor="#2f8f62" />
          <stop offset="100%" stopColor="#14543c" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b7ecf6" />
          <stop offset="18%" stopColor="#3aa8d4" />
          <stop offset="100%" stopColor="#08385e" />
        </linearGradient>
        <linearGradient id="glint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8dc" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#fff1b0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff1b0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glass" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="16%" stopColor="#e7fbff" stopOpacity="0.45" />
          <stop offset="48%" stopColor="#49c6ea" stopOpacity="0.28" />
          <stop offset="78%" stopColor="#176892" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#06263f" stopOpacity="0.82" />
        </radialGradient>
        <radialGradient id="amber" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff6df" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#ffd56a" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#f08a2a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7a2e10" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="violet" cx="34%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#d7c6ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3a2a78" stopOpacity="0.75" />
        </radialGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d5edf8" />
        </linearGradient>
      </defs>

      <rect width="900" height="520" fill="url(#sky)" />
      <ellipse cx="640" cy="150" rx="150" ry="90" fill="url(#sunGlow)" filter="url(#soft)" />
      <circle cx="640" cy="148" r="36" fill="#fff6cf" />
      <circle cx="640" cy="148" r="22" fill="#fff" />
      <g fill="#fff6cf" opacity="0.55">
        <circle cx="560" cy="168" r="7" />
        <circle cx="720" cy="176" r="4" />
        <circle cx="600" cy="210" r="3" />
        <circle cx="690" cy="120" r="3" />
      </g>

      <g fill="url(#cloud)">
        <ellipse cx="180" cy="92" rx="70" ry="22" />
        <ellipse cx="230" cy="84" rx="48" ry="20" />
        <ellipse cx="140" cy="88" rx="36" ry="16" />
        <ellipse cx="430" cy="70" rx="54" ry="16" opacity="0.85" />
        <ellipse cx="800" cy="96" rx="46" ry="14" opacity="0.8" />
      </g>

      <path fill="url(#far)" d="M0 310 C80 250 120 280 190 240 C270 190 300 250 380 210 C460 170 500 230 590 190 C690 140 740 210 820 180 C870 165 890 190 900 176 L900 330 L0 330 Z" />
      <path fill="url(#mid)" d="M0 340 C70 300 130 330 200 300 C280 262 320 320 410 286 C500 250 540 310 640 270 C730 236 790 300 900 250 L900 360 L0 360 Z" />
      <path fill="url(#hillL)" d="M0 360 C40 300 90 250 150 280 C190 300 170 360 120 390 C70 420 20 400 0 430 Z" />
      <path fill="url(#hillR)" d="M900 340 C820 280 760 250 700 290 C660 318 700 370 760 400 C820 428 880 400 900 430 Z" />

      <rect y="318" width="900" height="202" fill="url(#water)" />
      <path fill="url(#glint)" d="M610 328 L668 328 L760 520 L520 520 Z" />

      <g>
        <ellipse cx="150" cy="392" rx="58" ry="14" fill="#06283f" opacity="0.28" />
        <circle cx="150" cy="360" r="48" fill="url(#glass)" />
        <ellipse cx="132" cy="342" rx="16" ry="10" fill="#fff" opacity="0.85" />
        <ellipse cx="430" cy="404" rx="36" ry="10" fill="#06283f" opacity="0.25" />
        <circle cx="430" cy="378" r="30" fill="url(#amber)" />
        <ellipse cx="418" cy="366" rx="10" ry="6" fill="#fff" opacity="0.8" />
        <ellipse cx="760" cy="418" rx="28" ry="8" fill="#06283f" opacity="0.25" />
        <circle cx="760" cy="398" r="24" fill="url(#violet)" />
        <ellipse cx="750" cy="388" rx="8" ry="5" fill="#fff" opacity="0.75" />
      </g>

      <g fill="#ffffff" opacity="0.35">
        <ellipse cx="250" cy="450" rx="46" ry="6" />
        <ellipse cx="560" cy="470" rx="70" ry="7" />
        <ellipse cx="120" cy="480" rx="30" ry="4" />
      </g>
    </svg>
  )
}
