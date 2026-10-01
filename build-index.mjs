import fs from 'fs';
import path from 'path';

// PostFlow World-Class SVG Logo
const postFlowLogo = `
<svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pf-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181528" />
      <stop offset="100%" stop-color="#0d0f17" />
    </linearGradient>
    <linearGradient id="pf-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <linearGradient id="pf-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#00f2fe" />
    </linearGradient>
    <filter id="pf-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Squircle Base with Gradient Border -->
  <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#pf-bg-grad)" stroke="url(#pf-stroke-grad)" stroke-width="1.8" />
  <!-- Continuous Dynamic Flowing 'P' & Forward Pulse Wave -->
  <path d="M12 28V12C12 10.8954 12.8954 10 14 10H21.5C25.6421 10 29 13.3579 29 17.5C29 21.6421 25.6421 25 21.5 25H17.5V28C17.5 28.5523 17.0523 29 16.5 29H13C12.4477 29 12 28.5523 12 28Z" fill="url(#pf-flow-grad)" />
  <!-- Inner Cutout Creating Futuristic Aero Geometry -->
  <path d="M17.5 14.5H21.5C23.1569 14.5 24.5 15.8431 24.5 17.5C24.5 19.1569 23.1569 20.5 21.5 20.5H17.5V14.5Z" fill="#0d0f17" />
  <!-- Glowing Cyan Forward Dot (Flow Node) -->
  <circle cx="28" cy="27" r="3.2" fill="#00f2fe" filter="url(#pf-glow)" />
</svg>
`;

// Channel items matching Screenshot 1 (3 Columns of 10)
const col1Channels = [
  { name: 'Facebook', slug: 'facebook', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`, cat: 'social video' },
  { name: 'Linkedin', slug: 'linkedin', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`, cat: 'pro' },
  { name: 'TikTok', slug: 'tiktok', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000"/><path d="M16.6 5.82s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V2.5h3.3v3.32z" fill="#00f2fe"/><path d="M15.4 4.62s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V6.8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V1.3h3.3v3.32z" fill="#fe0979"/></svg>`, cat: 'video' },
  { name: 'Reddit', slug: 'reddit', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 4.14a.5.5 0 0 0-.085.701c.732.898 2.02 1.233 2.8 1.233.78 0 2.068-.335 2.8-1.233a.5.5 0 1 0-.776-.63c-.527.648-1.48.913-2.024.913-.544 0-1.497-.265-2.024-.913a.5.5 0 0 0-.69-.071z"/></svg>`, cat: 'community' },
  { name: 'Slack', slug: 'slack', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#e01e5a"/></svg>`, cat: 'community' },
  { name: 'Mastodon', slug: 'mastodon', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#6364ff"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C16.42.096 14.156 0 12.001 0c-2.155 0-4.42.096-5.963.309-2.687.394-4.954 2.426-5.304 5.004C.358 8.083.25 11.235.25 14.07c.05 3.18.32 6.353 1.942 9.07 1.637 2.743 4.665 3.398 7.42 3.58 2.062.137 4.126.069 6.182-.206a8.55 8.55 0 0 0 2.227-.663v-2.287c-.77.29-1.574.49-2.392.597-2.072.274-4.225.297-6.262-.229-1.258-.32-1.92-1.246-2.046-2.493a10.966 10.966 0 0 1-.035-1.12c1.722.423 3.504.64 5.294.646 1.708-.006 3.415-.205 5.074-.593 2.92-.684 5.48-2.73 5.76-5.748.33-3.56.24-7.14-.14-10.72zM17.41 15.012h-2.502v-6.38c0-1.39-.58-2.096-1.74-2.096-1.282 0-1.923.827-1.923 2.48v3.58h-2.49v-3.58c0-1.653-.641-2.48-1.923-2.48-1.16 0-1.74.706-1.74 2.096v6.38H2.59V8.293c0-1.39.355-2.494 1.066-3.313.73-.819 1.688-1.238 2.873-1.238 1.374 0 2.417.528 3.13 1.583L10.999 7.4l1.34-2.075c.713-1.055 1.756-1.583 3.13-1.583 1.185 0 2.143.419 2.873 1.238.711.819 1.066 1.923 1.066 3.313v6.72z"/></svg>`, cat: 'social' },
  { name: 'Skool', slug: 'skool', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#18181b"/><path d="M12 4L3 9l9 5 9-5-9-5zm-7 8.5v4.2c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.2l-7 3.9-7-3.9z" fill="#f59e0b"/></svg>`, cat: 'community' },
  { name: 'Vk', slug: 'vk', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0077ff"><path d="M15.684 0H8.316C2.992 0 0 2.992 0 8.316v7.368C0 21.008 2.992 24 8.316 24h7.368C21.008 24 24 21.008 24 15.684V8.316C24 2.992 21.008 0 15.684 0zm4.515 17.185h-1.892c-.716 0-.935-.57-2.222-1.868-1.121-1.09-1.618-1.233-1.892-1.233-.385 0-.495.11-.495.637v1.737c0 .45-.143.725-1.342.725-1.98 0-4.18-1.2-5.73-3.43-2.35-3.32-3.003-5.81-3.003-6.32 0-.23.09-.45.54-.45h1.892c.407 0 .56.187.715.626 1.012 2.924 2.705 5.485 3.409 5.485.264 0 .385-.12.385-.79V9.897c-.077-1.419-.825-1.54-.825-2.046 0-.242.209-.484.54-.484h2.98c.374 0 .506.198.506.638v3.443c0 .374.165.506.275.506.23 0 .418-.132.847-.561 1.309-1.474 2.244-3.74 2.244-3.74.12-.253.33-.484.737-.484h1.892c.572 0 .693.286.572.693-.242.99-2.32 3.86-2.42 4.026-.22.33-.297.473 0 .869.21.286.913.891 1.386 1.452.88.99 1.55 1.826 1.738 2.398.176.572-.11.858-.682.858z"/></svg>`, cat: 'social' },
  { name: 'Nostr', slug: 'nostr', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z"/></svg>`, cat: 'cms' },
  { name: 'Medium', slug: 'medium', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`, cat: 'cms' }
];

const col2Channels = [
  { name: 'Instagram', slug: 'instagram', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><defs><linearGradient id="ig-nav-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffd600"/><stop offset="25%" stop-color="#ff0100"/><stop offset="50%" stop-color="#d800b9"/><stop offset="100%" stop-color="#7000ff"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig-nav-grad)"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="#fff"/></svg>`, cat: 'social video' },
  { name: 'Bluesky', slug: 'bluesky', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284c7"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.874-1.113 7.823-4.308.949 3.195 2.81 9.498 7.823 4.308 4.557-5.073 1.082-6.498-2.83-7.078-.139-.016-.277-.034-.415-.056.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.689-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg>`, cat: 'social' },
  { name: 'YouTube', slug: 'youtube', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`, cat: 'video' },
  { name: 'Telegram', slug: 'telegram', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#229ed9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>`, cat: 'community' },
  { name: 'Pinterest', slug: 'pinterest', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#bd081c"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.94-.13-2.39.03-3.42l1.1-4.7s-.28-.56-.28-1.39c0-1.3.75-2.28 1.7-2.28.8 0 1.18.6 1.18 1.32 0 .8-.52 2-.78 3.11-.22.94.47 1.71 1.4 1.71 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85-2.69 0-4.27 2.02-4.27 4.1 0 .81.31 1.68.7 2.16a.35.35 0 0 1 .08.34c-.09.37-.29 1.19-.33 1.35-.05.22-.17.27-.4.16-1.49-.69-2.42-2.87-2.42-4.62 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.34-1.49 3.13A12 12 0 1 0 12 0z"/></svg>`, cat: 'pro' },
  { name: 'Whop', slug: 'whop', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff6200"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`, cat: 'community' },
  { name: 'Kick', slug: 'kick', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000"/><path d="M5 4h4v6.5l5.5-6.5H19l-6.8 8 7 8h-4.7L9 13.5V20H5V4z" fill="#53fc18"/></svg>`, cat: 'video community' },
  { name: 'Lemmy', slug: 'lemmy', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#00bc8c"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-2 3a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z"/></svg>`, cat: 'community' },
  { name: 'Listmonk', slug: 'listmonk', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0052cc"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`, cat: 'cms' },
  { name: 'Hashnode', slug: 'hashnode', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2962ff"><path d="M22.351 8.019l-6.37-6.37a2.828 2.828 0 00-4 0l-6.37 6.37a2.828 2.828 0 000 4l6.37 6.37a2.828 2.828 0 004 0l6.37-6.37a2.828 2.828 0 000-4zm-8.351 5.981a2 2 0 110-4 2 2 0 010 4z"/></svg>`, cat: 'cms' }
];

const col3Channels = [
  { name: 'Threads', slug: 'threads', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12.001 2c-5.523 0-10 4.477-10 10s4.477 10 10 10c2.58 0 4.938-.977 6.732-2.583l-1.42-1.42C15.89 19.345 14.04 20 12.001 20a8 8 0 118-8c0 .874-.15 1.713-.42 2.493l1.895.632C21.84 14.062 22 13.05 22 12c0-5.523-4.477-10-10-10zm2.7 7.7a3.5 3.5 0 00-4.95 0l-.7.7a3.5 3.5 0 000 4.95l.7.7a3.5 3.5 0 004.95 0l.7-.7a3.5 3.5 0 000-4.95l-.7-.7z"/></svg>`, cat: 'social' },
  { name: 'X', slug: 'x', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`, cat: 'social' },
  { name: 'Google My Business', slug: 'google-my-business', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`, cat: 'pro' },
  { name: 'Discord', slug: 'discord', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`, cat: 'community' },
  { name: 'Dribbble', slug: 'dribbble', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ea4c89"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.88 5.62a10.03 10.03 0 0 1 2.45 6.33c-.35-.07-2.74-.53-5.37.19-.07-.16-.14-.32-.21-.49a21.6 21.6 0 0 0-1.84-3.66c3.21-1.24 4.8-2.28 4.97-2.37zm-7.9 1.76c.64 1.25 1.22 2.5 1.72 3.73-3.13 1-6.72.95-7.39.95a10.04 10.04 0 0 1 5.67-4.68zm-7.6 6.32c.32 0 3.32.03 6.33-.87.23.47.45.95.66 1.44-4.8 1.46-6.63 4.28-6.78 4.52a9.97 9.97 0 0 1-.21-5.09zm2.46 6.64c.2-.28 1.83-2.6 6.43-4.14.7 1.86 1.19 3.82 1.43 4.97-2.67 1.1-5.7.83-7.86-.83zm9.64-.17c-.22-1.04-.69-2.88-1.34-4.64 2.46-.75 4.62-.27 4.97-.18a10.02 10.02 0 0 1-3.63 4.82zM17.8 13.9c-.3-.08-2.14-.5-4.43.2a19.78 19.78 0 0 1-1.63-3.55c.08-.03.16-.06.24-.09 2.92-.93 5.34.1 5.82.34z"/></svg>`, cat: 'pro' },
  { name: 'Twitch', slug: 'twitch', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#9146ff"><path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582H12l-3.045 3.045v-3.045H4.119V2.149h17.194v11.463zm-3.582-7.343v6.269h-2.149V6.269h2.149zm-5.731 0v6.269H9.851V6.269h2.149z"/></svg>`, cat: 'video community' },
  { name: 'Warpcast', slug: 'warpcast', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#472a84"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 14h-2.5l-2.5-4-2.5 4H7l3.75-6L7 4h2.5l2.5 4 2.5-4H17l-3.75 6L17 16z"/></svg>`, cat: 'social' },
  { name: 'MeWe', slug: 'mewe', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#008287"/><path d="M5 8l4 6 3-4 3 4 4-6v8h-3v-4l-4 5-4-5v4H5V8z" fill="#fff"/></svg>`, cat: 'social' },
  { name: 'WordPress', slug: 'wordpress', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#21759b"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2a10.8 10.8 0 1 1 0 21.6 10.8 10.8 0 0 1 0-21.6zM2.87 12c0 3.73 2.29 6.94 5.58 8.3L3.84 8.27A10.8 10.8 0 0 0 2.87 12zm15.18-.54c0-1.8-.65-3.04-1.2-4.01-.74-1.25-1.44-2.31-1.44-3.56 0-1.39 1.06-2.69 2.56-2.69.11 0 .22.01.32.03A10.74 10.74 0 0 0 12 1.2c-3.8 0-7.14 1.96-9.08 4.93l6.57 17.96 1.9-5.74-2.73-7.5c.81-.03 1.58-.1 1.58-.1.74-.07.82-1.15.08-1.15 0 0-2.22.18-3.66.18-1.37 0-3.6-.18-3.6-.18-.74 0-.66 1.08.08 1.15 0 0 .74.07 1.5.11l2.25 6.18-3.18 9.54A10.74 10.74 0 0 0 12 22.8c3.27 0 6.22-1.45 8.24-3.76l-5.69-16.5c1.9.15 3.5 1.57 3.5 4.92z"/></svg>`, cat: 'cms' },
  { name: 'Dev.to', slug: 'devto', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><rect width="24" height="24" rx="3" fill="#000"/><path d="M7.5 15.5h-2V8.5h2c1.7 0 2.5 1.1 2.5 3.5s-.8 3.5-2.5 3.5zm-.8-1.2h.8c1 0 1.3-.7 1.3-2.3 0-1.6-.3-2.3-1.3-2.3h-.8v4.6zm5.8 1.2h-3V8.5h3v1.2h-1.8v1.4h1.6v1.2h-1.6v1.8h1.8v1.4zm3.8 0l-1.5-7h1.3l.9 4.6.9-4.6h1.3l-1.5 7h-1.4z"/></svg>`, cat: 'cms' }
];

// All 30 channels combined for grid
const allChannels = [...col1Channels, ...col2Channels, ...col3Channels];

// AI Agents with authentic SVG logos matching Screenshot 2
const col1Agents = [
  { 
    name: 'ChatGPT', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#10a37f"/><path d="M19.15 10.34a4.8 4.8 0 0 0-.41-3.69 4.9 4.9 0 0 0-4.43-2.45c-.4 0-.8.06-1.18.17A4.86 4.86 0 0 0 9.2 2.8a4.91 4.91 0 0 0-4.69 3.4 4.84 4.84 0 0 0-2.3 2.18 4.9 4.9 0 0 0 .28 5.09 4.84 4.84 0 0 0 .41 3.69 4.9 4.9 0 0 0 4.43 2.45c.4 0 .8-.06 1.18-.17a4.86 4.86 0 0 0 3.93 1.57 4.91 4.91 0 0 0 4.69-3.4 4.84 4.84 0 0 0 2.3-2.18 4.9 4.9 0 0 0-.28-5.09zm-6.62 9.53a3.52 3.52 0 0 1-2.2-.77l.1-.06 3.6-2.08a.72.72 0 0 0 .36-.62v-4.9l1.49.86v4.11a3.54 3.54 0 0 1-3.35 3.46zm-6.73-3.08a3.5 3.5 0 0 1-.48-2.28v-4.22l3.6 2.08a.71.71 0 0 0 .72 0l4.24-2.45v1.73l-3.56 2.06a3.53 3.53 0 0 1-4.52-.92zm-1.07-7.85a3.5 3.5 0 0 1 1.72-1.5l3.6 2.08a.73.73 0 0 0 .72 0l4.24-2.45-1.49-.86-3.56 2.06a3.54 3.54 0 0 1-5.23.67zm12.38 3.86l-3.6-2.08a.71.71 0 0 0-.72 0L8.5 13.17V11.44l3.56-2.06a3.54 3.54 0 0 1 5.23 2.79v1.63zm1.55 3.73a3.5 3.5 0 0 1-1.72 1.5l-3.6-2.08a.73.73 0 0 0-.72 0l-4.24 2.45 1.49.86 3.56-2.06a3.54 3.54 0 0 1 5.23-.67z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Claude Cowork', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#3b2314"/><path d="M12 4.5l1.6 5.2 5.4 1.6-5.4 1.6L12 18.1l-1.6-5.2-5.4-1.6 5.4-1.6z" fill="#f59e0b"/></svg>` 
  },
  { 
    name: 'Cursor', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M12 5l6 3.5v7L12 19l-6-3.5v-7z" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M12 5v7m0 0l6 3.5M12 12L6 15.5" stroke="#fff" stroke-width="1.6"/></svg>` 
  },
  { 
    name: 'Hermes Agent', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M12 5c-3.5 0-6 2.5-6 6 0 2 .8 3.8 2.2 5.1L12 19l3.8-2.9C17.2 14.8 18 13 18 11c0-3.5-2.5-6-6-6zm-1 4h2v4h-2zm0 5h2v1.5h-2z" fill="#a78bfa"/></svg>` 
  },
  { 
    name: 'DeepSeek', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0284c7"/><path d="M17 9c-1.5-1.5-3.5-2-6-1.5C8 8.2 6 10.5 6 13c0 2 1.5 4 3.5 4.5 2 .5 4-.5 5.5-2l3 1.5c-1-1.5-1.5-3-1-4.5z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Manus', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M7 14l5-9v6h5l-6 9v-6H7z" fill="#f43f5e"/></svg>` 
  },
  { 
    name: 'nanoclaw', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0f766e"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="10" cy="11" r="1.5" fill="#0f766e"/><circle cx="14" cy="11" r="1.5" fill="#0f766e"/></svg>` 
  },
  { 
    name: 'AI Agents CLI', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#27272a"/><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"/></svg>` 
  }
];

const col2Agents = [
  { 
    name: 'OpenAI dots', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#18181b"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="12" cy="12" r="2.5" fill="#18181b"/></svg>` 
  },
  { 
    name: 'Claude Code', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#ea580c"/><rect x="5" y="6" width="14" height="12" rx="2" fill="#fff"/><path d="M8 10l2 2-2 2M12 14h4" stroke="#ea580c" stroke-width="2" stroke-linecap="round"/></svg>` 
  },
  { 
    name: 'Gemini', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1e1b4b"/><path d="M12 3C12 7.97 7.97 12 3 12c4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z" fill="#60a5fa"/></svg>` 
  },
  { 
    name: 'Grok Bot', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#000"/><path d="M7 17L17 7M10 7h7v7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` 
  },
  { 
    name: 'Kimi K3', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#18181b"/><path d="M8 6v12h2.5V13l3.5 5h3L13 12l3.5-6h-3L10.5 11V6H8z" fill="#c084fc"/></svg>` 
  },
  { 
    name: 'Cue', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><circle cx="9" cy="11" r="2" fill="#ec4899"/><circle cx="15" cy="11" r="2" fill="#ec4899"/><path d="M9 16c1.5 1 4.5 1 6 0" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/></svg>` 
  },
  { 
    name: 'Paperclip', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#334155"/><path d="M16.5 6.5L8.5 14.5a3 3 0 0 0 4.24 4.24l8-8a5 5 0 0 0-7.07-7.07l-8.5 8.5" fill="none" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/></svg>` 
  }
];

const col3Agents = [
  { 
    name: 'Claude', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#cc785c"/><path d="M13.8 6.5l-3.6 11h2.5l3.6-11h-2.5zm-5.6 2.8l2.1 6.5h2.1l-2.1-6.5h-2.1zm8 2.2l-2.1 4.3h2.1l2.1-4.3h-2.1z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Codex', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1e293b"/><path d="M7 9l3 3-3 3M12 15h5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/></svg>` 
  },
  { 
    name: 'OpenClaw', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#dc2626"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="10" cy="11" r="1.2" fill="#dc2626"/><circle cx="14" cy="11" r="1.2" fill="#dc2626"/><path d="M6 10c0-2 2-3 3-3M18 10c0-2-2-3-3-3" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>` 
  },
  { 
    name: 'Grok Build', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#27272a"/><circle cx="12" cy="12" r="7" stroke="#fff" stroke-width="1.8" fill="none"/><line x1="7" y1="17" x2="17" y2="7" stroke="#fff" stroke-width="1.8"/></svg>` 
  },
  { 
    name: 'Muse', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0891b2"/><path d="M6 16V8l6 7 6-7v8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>` 
  },
  { 
    name: 'Perplexity Computer', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#134e4a"/><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round"/></svg>` 
  },
  { 
    name: 'MCP Server', 
    icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#6d28d9"/><circle cx="7" cy="12" r="2.5" fill="#fff"/><circle cx="17" cy="7" r="2.5" fill="#fff"/><circle cx="17" cy="17" r="2.5" fill="#fff"/><line x1="9" y1="12" x2="15" y2="8" stroke="#fff" stroke-width="1.8"/><line x1="9" y1="12" x2="15" y2="16" stroke="#fff" stroke-width="1.8"/></svg>` 
  }
];

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PostFlow — The Agentic Social Media Management Platform</title>
  <meta name="description" content="PostFlow by Amana Flow: Schedule, automate, and publish to 30+ social media channels from one visual calendar on our high-speed private VPS." />
  <link rel="canonical" href="https://post.amanaflow.com/" />
  
  <!-- Favicon & Fonts -->
  <link rel="icon" type="image/png" href="/assets/favicon.png" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #090a0f;
      --bg-surface: #12151e;
      --bg-card: rgba(18, 22, 34, 0.7);
      --bg-card-hover: rgba(28, 34, 52, 0.85);
      --border: rgba(255, 255, 255, 0.08);
      --border-focus: rgba(16, 185, 129, 0.45);
      --text: #f3f4f6;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --primary: #06b6d4;
      --primary-glow: rgba(6, 182, 212, 0.35);
      --secondary: #10b981;
      --cyan: #06b6d4;
      --emerald: #10b981;
      --blue: #2563eb;
      --gradient-main: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #2563eb 100%);
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --font-heading: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --shadow-lg: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
      --shadow-glow: 0 0 50px -10px var(--primary-glow);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Ambient background glow */
    .ambient-glow {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1100px;
      height: 550px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
    }

    .container {
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }

    /* Header & Navigation */
    header {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: rgba(9, 10, 15, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 74px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
    }

    .brand-logo-img {
      height: 40px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.35));
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .brand:hover .brand-logo-img {
      transform: scale(1.06);
    }

    .brand-text {
      font-family: var(--font-heading);
      font-size: 21px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.1;
      display: flex;
      align-items: center;
    }

    .brand-text span.gradient-text {
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 1px;
    }

    .brand-sub {
      font-size: 10px;
      color: var(--text-dim);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .brand-sub-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
      display: inline-block;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 22px;
      list-style: none;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 24px 6px;
      cursor: pointer;
    }

    .nav-link:hover, .nav-item:hover .nav-link, .nav-item.open .nav-link {
      color: #fff;
    }

    .nav-link svg.arrow {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }

    .nav-item:hover .nav-link svg.arrow,
    .nav-item.open .nav-link svg.arrow {
      transform: rotate(180deg);
    }

    /* 3-Column Dropdown (Matching Postiz.com Reference Exactly) */
    .dropdown-postiz {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: #141416;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 16px;
      padding: 14px 16px;
      width: 610px;
      box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.88), 0 0 1px 1px rgba(255, 255, 255, 0.08);
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 500;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px 12px;
      pointer-events: none;
    }

    /* Invisible hover bridge to prevent premature closing */
    .dropdown-postiz::before {
      content: "";
      position: absolute;
      top: -14px;
      left: 0;
      right: 0;
      height: 14px;
    }

    .dropdown-agents {
      left: 0;
      transform: translateX(-10px) translateY(4px);
    }

    .nav-item:hover .dropdown-postiz,
    .nav-item.open .dropdown-postiz {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .nav-item.nav-item-agents:hover .dropdown-agents,
    .nav-item.nav-item-agents.open .dropdown-agents {
      transform: translateX(-10px) translateY(0);
    }

    .dropdown-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      color: #f1f5f9;
      font-size: 13.5px;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.15s ease, color 0.15s ease;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .dropdown-item-icon {
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .dropdown-item-icon svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    /* Nav Actions */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      border: none;
      white-space: nowrap;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-primary {
      background: var(--gradient-main);
      color: #fff;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(236, 72, 153, 0.45);
    }

    .btn-lg {
      padding: 14px 32px;
      font-size: 16px;
    }

    .mobile-toggle {
      display: none;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: #fff;
      padding: 8px 10px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    /* Hero Section */
    .hero {
      padding: 85px 0 60px;
      text-align: center;
      position: relative;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.3);
      color: #c4b5fd;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
      box-shadow: 0 0 20px -5px rgba(139, 92, 246, 0.3);
    }

    .badge-pill-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }

    .hero-title {
      font-family: var(--font-heading);
      font-size: clamp(34px, 5.5vw, 68px);
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -1.5px;
      max-width: 960px;
      margin: 0 auto 24px;
    }

    .hero-title span.glow-gradient {
      background: var(--gradient-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .hero-desc {
      font-size: clamp(16px, 1.8vw, 19px);
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto 40px;
      line-height: 1.65;
    }

    .hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 70px;
    }

    /* Live Calendar & Dashboard Mockup */
    .mockup-container {
      background: var(--bg-surface);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg), 0 0 60px -20px var(--primary-glow);
      overflow: hidden;
      margin-bottom: 90px;
    }

    .mockup-header {
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid var(--border);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mockup-dots {
      display: flex;
      gap: 8px;
    }

    .mockup-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot-red { background: #ef4444; }
    .dot-yellow { background: #eab308; }
    .dot-green { background: #22c55e; }

    .mockup-title {
      font-size: 13px;
      color: var(--text-dim);
      font-family: monospace;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mockup-body {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 480px;
    }

    .mockup-sidebar {
      background: rgba(0, 0, 0, 0.25);
      border-right: 1px solid var(--border);
      padding: 20px 16px;
    }

    .mockup-sidebar-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }

    .mockup-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .mockup-channel-item.active {
      background: rgba(139, 92, 246, 0.15);
      color: #fff;
      border: 1px solid rgba(139, 92, 246, 0.3);
    }

    .mockup-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-x: auto;
    }

    .mockup-content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      min-width: 580px;
    }

    .cal-day-col {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 12px;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cal-day-header {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-dim);
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }

    .post-card {
      background: var(--bg-card);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-sm);
      padding: 10px;
      font-size: 12.5px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border-left: 3px solid var(--primary);
    }

    .post-card.card-tiktok { border-left-color: #fe0979; }
    .post-card.card-fb { border-left-color: #1877f2; }
    .post-card.card-yt { border-left-color: #ff0000; }
    .post-card.card-threads { border-left-color: #ffffff; }

    .post-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-dim);
      font-size: 11px;
    }

    .post-card-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      font-size: 10.5px;
      font-weight: 600;
      color: #fff;
    }

    /* All 30 Channels Section */
    .section-channels {
      padding: 80px 0 100px;
      position: relative;
    }

    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-tag {
      color: var(--primary);
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
      display: block;
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 16px;
    }

    .section-desc {
      color: var(--text-muted);
      font-size: 17px;
      max-width: 650px;
      margin: 0 auto;
    }

    .channel-filters {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }

    .filter-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn:hover, .filter-btn.active {
      background: rgba(139, 92, 246, 0.18);
      border-color: var(--primary);
      color: #fff;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .channel-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .channel-card:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-focus);
      transform: translateY(-2px);
      box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.6);
    }

    .channel-card-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .channel-card-icon {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .channel-card-name {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }

    .channel-card-tag {
      font-size: 12px;
      color: var(--text-dim);
    }

    .channel-card-arrow {
      color: var(--text-dim);
      transition: transform 0.2s, color 0.2s;
    }

    .channel-card:hover .channel-card-arrow {
      color: var(--primary);
      transform: translateX(4px);
    }

    /* Architecture / Specifications Section */
    .section-arch {
      padding: 80px 0;
      border-top: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.01);
    }

    .arch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }

    .arch-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
    }

    .arch-card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      margin-bottom: 18px;
    }

    .arch-card-title {
      font-family: var(--font-heading);
      font-size: 19px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #fff;
    }

    .arch-card-desc {
      color: var(--text-muted);
      font-size: 14.5px;
      line-height: 1.6;
    }

    /* FAQ Section */
    .section-faq {
      padding: 80px 0 100px;
      border-top: 1px solid var(--border);
    }

    .faq-list {
      max-width: 800px;
      margin: 40px auto 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .faq-item {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: border-color 0.2s;
    }

    .faq-item.active {
      border-color: var(--border-focus);
    }

    .faq-question {
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }

    .faq-answer {
      padding: 0 24px 20px;
      color: var(--text-muted);
      font-size: 14.5px;
      line-height: 1.65;
      display: none;
    }

    .faq-item.active .faq-answer {
      display: block;
    }

    /* Final CTA */
    .section-cta {
      padding: 80px 0 100px;
      text-align: center;
      position: relative;
    }

    .cta-box {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: var(--radius-lg);
      padding: 60px 30px;
      position: relative;
      overflow: hidden;
    }

    .cta-title { font-family: var(--font-heading); font-size: clamp(26px, 3.5vw, 38px); font-weight: 800; margin-bottom: 14px; }
    .cta-desc { color: var(--text-muted); max-width: 600px; margin: 0 auto 30px; font-size: 16px; }

    /* Footer */
    footer {
      background: #050608;
      border-top: 1px solid var(--border);
      padding: 65px 0 32px;
      margin-top: auto;
      font-size: 14px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 36px;
      margin-bottom: 40px;
    }

    .footer-col-title { font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 18px; }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 11px; }
    .footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
    .footer-link:hover { color: var(--primary); }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--text-dim);
      font-size: 13px;
      flex-wrap: wrap;
      gap: 16px;
    }

    /* Mobile Drawer */
    .mobile-drawer {
      display: none;
      position: fixed;
      top: 74px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(9, 10, 15, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 24px;
      z-index: 999;
      overflow-y: auto;
      flex-direction: column;
      gap: 14px;
    }

    .mobile-drawer.active { display: flex; }
    .mobile-nav-link { font-size: 16px; font-weight: 600; color: #fff; text-decoration: none; padding: 12px 0; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }

    /* Comprehensive Mobile & Responsive Media Queries */
    @media (max-width: 992px) {
      .mockup-body { grid-template-columns: 1fr; }
      .mockup-sidebar { display: none; }
      .nav-menu { display: none; }
      .mobile-toggle { display: flex; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .hero-title { font-size: 42px; }
      .calendar-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      header .btn-secondary { display: none; }
      .nav-inner { height: 64px; }
      .mobile-drawer { top: 64px; }
      .hero { padding: 50px 0 40px; }
      .hero-title { font-size: 32px; letter-spacing: -0.8px; }
      .hero-desc { font-size: 15px; margin-bottom: 28px; }
      .hero-cta { flex-direction: column; width: 100%; }
      .hero-cta .btn { width: 100%; }
      .footer-grid { grid-template-columns: 1fr; }
      .calendar-grid { grid-template-columns: 1fr; min-width: 100%; }
      .cta-box { padding: 40px 20px; }
      .channels-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- Ambient Glow Effect -->
  <div class="ambient-glow"></div>

  <!-- Header -->
  <header>
    <div class="container nav-inner">
      <a href="/home" class="brand">
        <img src="/assets/amana-flow-logo-clean.png" alt="Amana Flow" class="brand-logo-img" />
        <div>
          <div class="brand-text">Post<span class="gradient-text">Flow</span></div>
          <div class="brand-sub"><span class="brand-sub-dot"></span>by Amana Flow</div>
        </div>
      </a>

      <!-- Desktop Nav with Postiz-exact 3-column Dropdowns -->
      <nav>
        <ul class="nav-menu">
          <!-- 1. AI Agents Dropdown (Matching Screenshot 3) -->
          <li class="nav-item nav-item-agents">
            <a class="nav-link">
              AI Agents 
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="dropdown-postiz dropdown-agents" style="width: 580px;">
              <div class="dropdown-col">
                ${col1Agents.map(a => `<a href="#ai-agents" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                ${col2Agents.map(a => `<a href="#ai-agents" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                ${col3Agents.map(a => `<a href="#ai-agents" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
            </div>
          </li>

          <!-- 2. Dev Docs Link -->
          <li class="nav-item">
            <a href="https://docs.postiz.com" class="nav-link" target="_blank">Dev Docs</a>
          </li>

          <!-- 3. Channels Dropdown (Matching Screenshot 1) -->
          <li class="nav-item">
            <a class="nav-link">
              Channels 
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="dropdown-postiz" style="width: 610px;">
              <div class="dropdown-col">
                ${col1Channels.map(c => `<a href="/channels/${c.slug}" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                ${col2Channels.map(c => `<a href="/channels/${c.slug}" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                ${col3Channels.map(c => `<a href="/channels/${c.slug}" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
            </div>
          </li>

          <!-- 4. Architecture / Specs -->
          <li class="nav-item">
            <a href="#architecture" class="nav-link">Platform</a>
          </li>

          <!-- 5. Legal Links -->
          <li class="nav-item">
            <a href="/terms" class="nav-link">Terms</a>
          </li>
          <li class="nav-item">
            <a href="/privacy" class="nav-link">Privacy</a>
          </li>
        </ul>
      </nav>

      <!-- Nav Actions -->
      <div class="nav-actions">
        <a href="/auth" class="btn btn-secondary">Log In</a>
        <a href="/launches" class="btn btn-primary">Open Dashboard &rarr;</a>
        <button class="mobile-toggle" aria-label="Toggle navigation">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-drawer">
    <a href="/home" class="mobile-nav-link"><span>Home</span> &rarr;</a>
    <a href="/channels/facebook" class="mobile-nav-link"><span>Facebook Publishing</span> &rarr;</a>
    <a href="/channels/tiktok" class="mobile-nav-link"><span>TikTok Video Publishing</span> &rarr;</a>
    <a href="/channels/youtube" class="mobile-nav-link"><span>YouTube & Shorts</span> &rarr;</a>
    <a href="/channels/threads" class="mobile-nav-link"><span>Threads Publishing</span> &rarr;</a>
    <a href="/channels/instagram" class="mobile-nav-link"><span>Instagram Feed & Reels</span> &rarr;</a>
    <a href="/channels/linkedin" class="mobile-nav-link"><span>LinkedIn Company Pages</span> &rarr;</a>
    <a href="#channels" class="mobile-nav-link"><span>View All 30+ Channels</span> &rarr;</a>
    <a href="#architecture" class="mobile-nav-link"><span>Architecture Specs</span> &rarr;</a>
    <a href="/terms" class="mobile-nav-link"><span>Terms of Service</span> &rarr;</a>
    <a href="/privacy" class="mobile-nav-link"><span>Privacy Policy</span> &rarr;</a>
    <a href="/data-deletion" class="mobile-nav-link"><span>User Data Deletion</span> &rarr;</a>
    <div style="display:flex;gap:12px;margin-top:16px;">
      <a href="/auth" class="btn btn-secondary" style="flex:1;">Log In</a>
      <a href="/launches" class="btn btn-primary" style="flex:1;">Dashboard</a>
    </div>
  </div>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="badge-pill">
        <span class="badge-pill-dot"></span>
        Self-Hosted Social Media Orchestration Engine
      </div>
      
      <h1 class="hero-title">
        Schedule, Automate & Publish to <br />
        <span class="glow-gradient">30+ Social Networks</span> from One Place
      </h1>

      <p class="hero-desc">
        PostFlow empowers Amana Flow brand initiatives to schedule multi-platform posts, orchestrate viral campaigns, and automate publishing with AI precision on private VPS infrastructure.
      </p>

      <div class="hero-cta">
        <a href="/launches" class="btn btn-primary btn-lg">Launch Workspace &rarr;</a>
        <a href="#channels" class="btn btn-secondary btn-lg">Explore 30+ Channels</a>
      </div>

      <!-- Live Interactive Calendar Preview Mockup -->
      <div class="mockup-container">
        <div class="mockup-header">
          <div class="mockup-dots">
            <span class="mockup-dot dot-red"></span>
            <span class="mockup-dot dot-yellow"></span>
            <span class="mockup-dot dot-green"></span>
          </div>
          <div class="mockup-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Server: 148.230.98.190 &bull; Temporal Engine Active
          </div>
          <div style="font-size: 12px; color: var(--emerald); font-weight: 600;">● Online</div>
        </div>

        <div class="mockup-body">
          <!-- Sidebar -->
          <div class="mockup-sidebar">
            <div class="mockup-sidebar-title">Connected Brand Channels</div>
            <div class="mockup-channel-item active">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
              Amana Mart
            </div>
            <div class="mockup-channel-item">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #1877f2;"></span>
              Amana Fashion
            </div>
            <div class="mockup-channel-item">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #06b6d4;"></span>
              Amana Express
            </div>
            <div class="mockup-channel-item">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #ec4899;"></span>
              Amana Suite
            </div>
            <div class="mockup-channel-item">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6;"></span>
              Amana Group Global
            </div>
          </div>

          <!-- Calendar View -->
          <div class="mockup-content">
            <div class="mockup-content-top">
              <div style="font-weight: 700; font-size: 16px;">Content Calendar &mdash; October 2026</div>
              <div style="display:flex;gap:8px;">
                <span class="post-card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">Bulk Queue</span>
                <span class="post-card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">AI Assisted</span>
              </div>
            </div>

            <div class="calendar-grid">
              <!-- Day 1 -->
              <div class="cal-day-col">
                <div class="cal-day-header">Today &bull; 10:00 AM</div>
                <div class="post-card card-tiktok">
                  <div class="post-card-header">
                    <span>TikTok Video</span>
                    <span class="post-card-badge">Scheduled</span>
                  </div>
                  <div>Uttara Branch Winter Collection Teaser #AmanaMart</div>
                </div>
                <div class="post-card card-fb">
                  <div class="post-card-header">
                    <span>Facebook Post</span>
                    <span class="post-card-badge">Published</span>
                  </div>
                  <div>Daily Grocery Flash Deal - 20% Off Farm Fresh Apples</div>
                </div>
              </div>

              <!-- Day 2 -->
              <div class="cal-day-col">
                <div class="cal-day-header">Tomorrow &bull; 02:30 PM</div>
                <div class="post-card card-yt">
                  <div class="post-card-header">
                    <span>YouTube Shorts</span>
                    <span class="post-card-badge">Queued</span>
                  </div>
                  <div>Behind the scenes: Quality checking organic produce</div>
                </div>
              </div>

              <!-- Day 3 -->
              <div class="cal-day-col">
                <div class="cal-day-header">Friday &bull; 06:00 PM</div>
                <div class="post-card card-threads">
                  <div class="post-card-header">
                    <span>Threads</span>
                    <span class="post-card-badge">AI Draft</span>
                  </div>
                  <div>What is your essential grocery checklist for weekends?</div>
                </div>
              </div>

              <!-- Day 4 -->
              <div class="cal-day-col">
                <div class="cal-day-header">Saturday &bull; 11:00 AM</div>
                <div class="post-card card-fb">
                  <div class="post-card-header">
                    <span>Facebook Reel</span>
                    <span class="post-card-badge">Queued</span>
                  </div>
                  <div>Weekend Market opening hours across all outlets!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Channels Directory Section -->
  <section class="section-channels" id="channels">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Cross-Platform Reach</span>
        <h2 class="section-title">Support for 30+ Social Networks & CMS</h2>
        <p class="section-desc">
          Every social channel is powered by native, high-performance OAuth2 integrations compliant with official developer guidelines.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="channel-filters">
        <button class="filter-btn active" data-filter="all">All Channels (30)</button>
        <button class="filter-btn" data-filter="social">Social Networks</button>
        <button class="filter-btn" data-filter="video">Video & Shorts</button>
        <button class="filter-btn" data-filter="pro">Business & Pro</button>
        <button class="filter-btn" data-filter="community">Communities</button>
        <button class="filter-btn" data-filter="cms">Publishing & CMS</button>
      </div>

      <!-- Channel Grid Linking to Detail Pages -->
      <div class="channels-grid">
        ${allChannels.map(c => `
          <a href="/channels/${c.slug}" class="channel-card" data-category="${c.cat}">
            <div class="channel-card-left">
              <div class="channel-card-icon">
                ${c.icon}
              </div>
              <div>
                <div class="channel-card-name">${c.name}</div>
                <div class="channel-card-tag">${c.cat.toUpperCase()}</div>
              </div>
            </div>
            <div class="channel-card-arrow">&rarr;</div>
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Architecture Specs -->
  <section class="section-arch" id="architecture">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Production Infrastructure</span>
        <h2 class="section-title">Engineered for Sovereign Performance</h2>
        <p class="section-desc">
          Hosted entirely on private European Cloud VPS infrastructure with dedicated hardware allocation and zero telemetry.
        </p>
      </div>

      <div class="arch-grid">
        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
          <h3 class="arch-card-title">NVMe Cloud VPS Instance</h3>
          <p class="arch-card-desc">
            Hosted at <strong>148.230.98.190</strong> with enterprise KVM virtualization, high clock-frequency vCPUs, and ultra-low latency connection pipelines.
          </p>
        </div>

        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="arch-card-title">Zero-Shared Architecture</h3>
          <p class="arch-card-desc">
            Your brand assets, scheduling data, OAuth tokens, and analytics are isolated inside private encrypted PostgreSQL and Redis containers.
          </p>
        </div>

        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="arch-card-title">Temporal Queue Precision</h3>
          <p class="arch-card-desc">
            Powered by Temporal orchestration framework ensuring exactly-once execution for all scheduled posts, even through network restarts.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="section-faq">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Frequently Asked Questions</span>
        <h2 class="section-title">Everything You Need to Know</h2>
      </div>

      <div class="faq-list">
        <div class="faq-item active">
          <div class="faq-question">
            <span>What is PostFlow by Amana Flow?</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="faq-answer">
            PostFlow is our private, high-performance social media scheduling, automation, and content orchestration engine. It connects directly to 30+ official social network APIs, allowing Amana Flow subsidiaries and brand accounts to coordinate omnichannel social publishing from a single visual dashboard.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>How does PostFlow protect OAuth tokens and brand data?</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="faq-answer">
            All API client keys, secrets, and user access tokens are encrypted with AES-256-GCM before storage on our private VPS. PostFlow never shares credentials with third-party aggregators, ensuring total sovereign control.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>Can I schedule video posts and reels directly?</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="faq-answer">
            Yes! Our Nginx reverse proxy supports media uploads up to 500MB, allowing you to schedule vertical videos directly to TikTok, Facebook Reels, Instagram Reels, and YouTube Shorts with custom cover frames.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final Call to Action -->
  <section class="section-cta">
    <div class="container">
      <div class="cta-box">
        <h2 class="cta-title">Ready to Automate Your Brand Distribution?</h2>
        <p class="cta-desc">
          Access the PostFlow workspace now to manage all 30+ social media channels from one unified calendar.
        </p>
        <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
          <a href="/launches" class="btn btn-primary btn-lg">Open Dashboard &rarr;</a>
          <a href="/auth" class="btn btn-secondary btn-lg">Log In with SSO</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom: 16px;">
            <img src="/assets/amana-flow-logo-clean.png" alt="Amana Flow" class="brand-logo-img" />
            <div>
              <div class="brand-text">Post<span class="gradient-text">Flow</span></div>
              <div class="brand-sub"><span class="brand-sub-dot"></span>by Amana Flow</div>
            </div>
          </div>
          <p style="color: var(--text-muted); font-size: 13.5px; max-width: 320px; line-height: 1.6; margin-bottom: 20px;">
            Enterprise-grade social media scheduling, automation, and campaign management engine on private VPS infrastructure.
          </p>
        </div>

        <div>
          <h4 class="footer-col-title">Channels</h4>
          <ul class="footer-links">
            <li><a href="/channels/facebook" class="footer-link">Facebook</a></li>
            <li><a href="/channels/instagram" class="footer-link">Instagram</a></li>
            <li><a href="/channels/tiktok" class="footer-link">TikTok</a></li>
            <li><a href="/channels/threads" class="footer-link">Threads</a></li>
            <li><a href="/channels/youtube" class="footer-link">YouTube</a></li>
            <li><a href="/channels/linkedin" class="footer-link">LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Platform</h4>
          <ul class="footer-links">
            <li><a href="#architecture" class="footer-link">Architecture</a></li>
            <li><a href="https://docs.postiz.com" class="footer-link" target="_blank">Dev Docs</a></li>
            <li><a href="/launches" class="footer-link">Workspace</a></li>
            <li><a href="/auth" class="footer-link">Account Access</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Legal & Security</h4>
          <ul class="footer-links">
            <li><a href="/terms" class="footer-link">Terms of Service</a></li>
            <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
            <li><a href="/data-deletion" class="footer-link">User Data Deletion</a></li>
            <li><a href="https://developers.tiktok.com" class="footer-link" target="_blank">TikTok Compliance</a></li>
            <li><a href="https://developers.facebook.com" class="footer-link" target="_blank">Meta Compliance</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; 2026 Amana Flow Ltd. All rights reserved. PostFlow is self-hosted on private VPS infrastructure.
        </div>
        <div style="display:flex;gap:18px;">
          <a href="/terms" class="footer-link">Terms</a>
          <a href="/privacy" class="footer-link">Privacy</a>
          <a href="/data-deletion" class="footer-link">Data Deletion</a>
          <a href="https://amanaflow.com" class="footer-link" target="_blank">amanaflow.com</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Navigation Dropdown Click & Touch Toggle
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-postiz');
      if (link && dropdown) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      }
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Mobile nav toggle
    const toggle = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    if (toggle && drawer) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.toggle('active');
      });
    }

    // Channel Category Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const channelCards = document.querySelectorAll('.channel-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        channelCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else {
            const cat = card.getAttribute('data-category') || '';
            if (cat.includes(filter)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully wrote index.html with PostFlow branding, authentic AI icons, and responsive design!');
