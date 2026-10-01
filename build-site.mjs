import fs from 'fs';
import path from 'path';

// ============================================================================
// 1. BRAND ASSETS & OFFICIAL POSTIZ VECTOR LOGO
// ============================================================================

// Authentic Postiz Squircle Logo (as seen in official Postiz UI top-left)
const postizLogoSvg = `
<svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="afBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="100%" stop-color="#00FF9D" />
    </linearGradient>
    <linearGradient id="afBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#0B0F19" />
    </linearGradient>
  </defs>
  <rect width="40" height="40" rx="10" fill="url(#afBgGrad)" stroke="url(#afBrandGrad)" stroke-width="1.5" />
  <path d="M10 28.5L18.2 9.5H21.8L30 28.5H25.2L20 16.2L14.8 28.5H10Z" fill="url(#afBrandGrad)" />
  <path d="M14 22C17.5 19.8 22.5 19.8 26 22" stroke="#00FF9D" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="20" cy="9.5" r="2" fill="#00FF9D" />
</svg>
`;

// Amana Flow Icon Badge
const amanaFlowBadge = `
<span style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:0.5px;color:#10b981;background:rgba(16,185,129,0.12);padding:2px 8px;border-radius:999px;border:1px solid rgba(16,185,129,0.25);">
  <span style="width:5px;height:5px;border-radius:50%;background:#10b981;"></span>
  AMANA FLOW
</span>
`;

// ============================================================================
// 2. CHANNELS DATA (30 Platforms with authentic SVGs and Categories)
// ============================================================================

const col1Channels = [
  { name: 'Facebook', slug: 'facebook', cat: 'social video', color: '#1877f2', desc: 'Pages & Groups automatic scheduling, Reels and Stories distribution', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
  { name: 'LinkedIn', slug: 'linkedin', cat: 'pro', color: '#0a66c2', desc: 'B2B company pages, employee advocacy & executive articles', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>` },
  { name: 'TikTok', slug: 'tiktok', cat: 'video', color: '#00f2fe', desc: 'Direct video posting API, trending hashtags, caption customization', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000"/><path d="M16.6 5.82s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V2.5h3.3v3.32z" fill="#00f2fe"/><path d="M15.4 4.62s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V6.8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V1.3h3.3v3.32z" fill="#fe0979"/></svg>` },
  { name: 'Reddit', slug: 'reddit', cat: 'community', color: '#ff4500', desc: 'Subreddit marketing, scheduled discussion threads & flair management', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 4.14a.5.5 0 0 0-.085.701c.732.898 2.02 1.233 2.8 1.233.78 0 2.068-.335 2.8-1.233a.5.5 0 1 0-.776-.63c-.527.648-1.48.913-2.024.913-.544 0-1.497-.265-2.024-.913a.5.5 0 0 0-.69-.071z"/></svg>` },
  { name: 'Slack', slug: 'slack', cat: 'community', color: '#e01e5a', desc: 'Internal team notifications, campaign broadcast channels', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#e01e5a"/></svg>` },
  { name: 'Mastodon', slug: 'mastodon', cat: 'social', color: '#6364ff', desc: 'Decentralized Fediverse microblogging across sovereign instances', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#6364ff"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C16.42.096 14.156 0 12.001 0c-2.155 0-4.42.096-5.963.309-2.687.394-4.954 2.426-5.304 5.004C.358 8.083.25 11.235.25 14.07c.05 3.18.32 6.353 1.942 9.07 1.637 2.743 4.665 3.398 7.42 3.58 2.062.137 4.126.069 6.182-.206a8.55 8.55 0 0 0 2.227-.663v-2.287c-.77.29-1.574.49-2.392.597-2.072.274-4.225.297-6.262-.229-1.258-.32-1.92-1.246-2.046-2.493a10.966 10.966 0 0 1-.035-1.12c1.722.423 3.504.64 5.294.646 1.708-.006 3.415-.205 5.074-.593 2.92-.684 5.48-2.73 5.76-5.748.33-3.56.24-7.14-.14-10.72zM17.41 15.012h-2.502v-6.38c0-1.39-.58-2.096-1.74-2.096-1.282 0-1.923.827-1.923 2.48v3.58h-2.49v-3.58c0-1.653-.641-2.48-1.923-2.48-1.16 0-1.74.706-1.74 2.096v6.38H2.59V8.293c0-1.39.355-2.494 1.066-3.313.73-.819 1.688-1.238 2.873-1.238 1.374 0 2.417.528 3.13 1.583L10.999 7.4l1.34-2.075c.713-1.055 1.756-1.583 3.13-1.583 1.185 0 2.143.419 2.873 1.238.711.819 1.066 1.923 1.066 3.313v6.72z"/></svg>` },
  { name: 'Skool', slug: 'skool', cat: 'community', color: '#f59e0b', desc: 'Private community post scheduling and educational announcements', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#18181b"/><path d="M12 4L3 9l9 5 9-5-9-5zm-7 8.5v4.2c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.2l-7 3.9-7-3.9z" fill="#f59e0b"/></svg>` },
  { name: 'VK', slug: 'vk', cat: 'social', color: '#0077ff', desc: 'VKontakte wall posts, rich media attachments and community feeds', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0077ff"><path d="M15.684 0H8.316C2.992 0 0 2.992 0 8.316v7.368C0 21.008 2.992 24 8.316 24h7.368C21.008 24 24 21.008 24 15.684V8.316C24 2.992 21.008 0 15.684 0zm4.515 17.185h-1.892c-.716 0-.935-.57-2.222-1.868-1.121-1.09-1.618-1.233-1.892-1.233-.385 0-.495.11-.495.637v1.737c0 .45-.143.725-1.342.725-1.98 0-4.18-1.2-5.73-3.43-2.35-3.32-3.003-5.81-3.003-6.32 0-.23.09-.45.54-.45h1.892c.407 0 .56.187.715.626 1.012 2.924 2.705 5.485 3.409 5.485.264 0 .385-.12.385-.79V9.897c-.077-1.419-.825-1.54-.825-2.046 0-.242.209-.484.54-.484h2.98c.374 0 .506.198.506.638v3.443c0 .374.165.506.275.506.23 0 .418-.132.847-.561 1.309-1.474 2.244-3.74 2.244-3.74.12-.253.33-.484.737-.484h1.892c.572 0 .693.286.572.693-.242.99-2.32 3.86-2.42 4.026-.22.33-.297.473 0 .869.21.286.913.891 1.386 1.452.88.99 1.55 1.826 1.738 2.398.176.572-.11.858-.682.858z"/></svg>` },
  { name: 'Nostr', slug: 'nostr', cat: 'cms', color: '#8b5cf6', desc: 'Cryptographically signed decentralized notes & censorship-resistant feeds', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z"/></svg>` },
  { name: 'Medium', slug: 'medium', cat: 'cms', color: '#ffffff', desc: 'Long-form editorial articles, canonical SEO syndication', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>` }
];

const col2Channels = [
  { name: 'Instagram', slug: 'instagram', cat: 'social video', color: '#d800b9', desc: 'Feed photos, Carousels, and Instagram Reels scheduled automatically', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><defs><linearGradient id="ig-nav-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffd600"/><stop offset="25%" stop-color="#ff0100"/><stop offset="50%" stop-color="#d800b9"/><stop offset="100%" stop-color="#7000ff"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig-nav-grad)"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="#fff"/></svg>` },
  { name: 'Bluesky', slug: 'bluesky', cat: 'social', color: '#0284c7', desc: 'AT Protocol microblogging with automated media embeds', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284c7"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.874-1.113 7.823-4.308.949 3.195 2.81 9.498 7.823 4.308 4.557-5.073 1.082-6.498-2.83-7.078-.139-.016-.277-.034-.415-.056.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.689-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg>` },
  { name: 'YouTube', slug: 'youtube', cat: 'video', color: '#ff0000', desc: 'YouTube Shorts, long-form 4K videos, automated thumbnails & SEO tags', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` },
  { name: 'Telegram', slug: 'telegram', cat: 'community', color: '#229ed9', desc: 'Instant broadcast channels, rich media formatting, interactive buttons', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#229ed9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>` },
  { name: 'Pinterest', slug: 'pinterest', cat: 'pro', color: '#bd081c', desc: 'High-res image pins, board targeting, rich outbound referral links', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#bd081c"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.94-.13-2.39.03-3.42l1.1-4.7s-.28-.56-.28-1.39c0-1.3.75-2.28 1.7-2.28.8 0 1.18.6 1.18 1.32 0 .8-.52 2-.78 3.11-.22.94.47 1.71 1.4 1.71 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85-2.69 0-4.27 2.02-4.27 4.1 0 .81.31 1.68.7 2.16a.35.35 0 0 1 .08.34c-.09.37-.29 1.19-.33 1.35-.05.22-.17.27-.4.16-1.49-.69-2.42-2.87-2.42-4.62 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.34-1.49 3.13A12 12 0 1 0 12 0z"/></svg>` },
  { name: 'Whop', slug: 'whop', cat: 'community', color: '#ff6200', desc: 'Membership announcement updates and digital product feeds', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff6200"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
  { name: 'Kick', slug: 'kick', cat: 'video community', color: '#53fc18', desc: 'Stream announcements and community updates', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000"/><path d="M5 4h4v6.5l5.5-6.5H19l-6.8 8 7 8h-4.7L9 13.5V20H5V4z" fill="#53fc18"/></svg>` },
  { name: 'Lemmy', slug: 'lemmy', cat: 'community', color: '#00bc8c', desc: 'Federated Reddit-alternative community posting', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#00bc8c"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-2 3a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z"/></svg>` },
  { name: 'Listmonk', slug: 'listmonk', cat: 'cms', color: '#0052cc', desc: 'High-speed newsletter campaign broadcasting & email lists', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0052cc"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>` },
  { name: 'Hashnode', slug: 'hashnode', cat: 'cms', color: '#2962ff', desc: 'Developer blog syndication with Markdown & code highlighting', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2962ff"><path d="M22.351 8.019l-6.37-6.37a2.828 2.828 0 00-4 0l-6.37 6.37a2.828 2.828 0 000 4l6.37 6.37a2.828 2.828 0 004 0l6.37-6.37a2.828 2.828 0 000-4zm-8.351 5.981a2 2 0 110-4 2 2 0 010 4z"/></svg>` }
];

const col3Channels = [
  { name: 'Threads', slug: 'threads', cat: 'social', color: '#ffffff', desc: 'Direct Meta Threads publishing with image attachments & text limits', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12.001 2c-5.523 0-10 4.477-10 10s4.477 10 10 10c2.58 0 4.938-.977 6.732-2.583l-1.42-1.42C15.89 19.345 14.04 20 12.001 20a8 8 0 118-8c0 .874-.15 1.713-.42 2.493l1.895.632C21.84 14.062 22 13.05 22 12c0-5.523-4.477-10-10-10zm2.7 7.7a3.5 3.5 0 00-4.95 0l-.7.7a3.5 3.5 0 000 4.95l.7.7a3.5 3.5 0 004.95 0l.7-.7a3.5 3.5 0 000-4.95l-.7-.7z"/></svg>` },
  { name: 'X', slug: 'x', cat: 'social', color: '#ffffff', desc: 'Automated threads, media cards, poll scheduling via official API', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
  { name: 'Google Business', slug: 'google-my-business', cat: 'pro', color: '#22c55e', desc: 'Local business updates, promotional offers and event announcements', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>` },
  { name: 'Discord', slug: 'discord', cat: 'community', color: '#5865f2', desc: 'Automated community webhook broadcasts, embed previews', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` },
  { name: 'Dribbble', slug: 'dribbble', cat: 'pro', color: '#ea4c89', desc: 'Design portfolio showcase, shot publishing with tags', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ea4c89"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.88 5.62a10.03 10.03 0 0 1 2.45 6.33c-.35-.07-2.74-.53-5.37.19-.07-.16-.14-.32-.21-.49a21.6 21.6 0 0 0-1.84-3.66c3.21-1.24 4.8-2.28 4.97-2.37zm-7.9 1.76c.64 1.25 1.22 2.5 1.72 3.73-3.13 1-6.72.95-7.39.95a10.04 10.04 0 0 1 5.67-4.68zm-7.6 6.32c.32 0 3.32.03 6.33-.87.23.47.45.95.66 1.44-4.8 1.46-6.63 4.28-6.78 4.52a9.97 9.97 0 0 1-.21-5.09zm2.46 6.64c.2-.28 1.83-2.6 6.43-4.14.7 1.86 1.19 3.82 1.43 4.97-2.67 1.1-5.7.83-7.86-.83zm9.64-.17c-.22-1.04-.69-2.88-1.34-4.64 2.46-.75 4.62-.27 4.97-.18a10.02 10.02 0 0 1-3.63 4.82zM17.8 13.9c-.3-.08-2.14-.5-4.43.2a19.78 19.78 0 0 1-1.63-3.55c.08-.03.16-.06.24-.09 2.92-.93 5.34.1 5.82.34z"/></svg>` },
  { name: 'Twitch', slug: 'twitch', cat: 'video community', color: '#9146ff', desc: 'Go-live announcements and schedule integration', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#9146ff"><path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582H12l-3.045 3.045v-3.045H4.119V2.149h17.194v11.463zm-3.582-7.343v6.269h-2.149V6.269h2.149zm-5.731 0v6.269H9.851V6.269h2.149z"/></svg>` },
  { name: 'Warpcast', slug: 'warpcast', cat: 'social', color: '#472a84', desc: 'Farcaster protocol cast scheduling & decentralized frames', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#472a84"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 14h-2.5l-2.5-4-2.5 4H7l3.75-6L7 4h2.5l2.5 4 2.5-4H17l-3.75 6L17 16z"/></svg>` },
  { name: 'MeWe', slug: 'mewe', cat: 'social', color: '#008287', desc: 'Privacy-focused social networking feeds & group posts', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#008287"/><path d="M5 8l4 6 3-4 3 4 4-6v8h-3v-4l-4 5-4-5v4H5V8z" fill="#fff"/></svg>` },
  { name: 'WordPress', slug: 'wordpress', cat: 'cms', color: '#21759b', desc: 'WordPress standalone & WP.com automated blog publishing via REST API', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#21759b"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2a10.8 10.8 0 1 1 0 21.6 10.8 10.8 0 0 1 0-21.6zM2.87 12c0 3.73 2.29 6.94 5.58 8.3L3.84 8.27A10.8 10.8 0 0 0 2.87 12zm15.18-.54c0-1.8-.65-3.04-1.2-4.01-.74-1.25-1.44-2.31-1.44-3.56 0-1.39 1.06-2.69 2.56-2.69.11 0 .22.01.32.03A10.74 10.74 0 0 0 12 1.2c-3.8 0-7.14 1.96-9.08 4.93l6.57 17.96 1.9-5.74-2.73-7.5c.81-.03 1.58-.1 1.58-.1.74-.07.82-1.15.08-1.15 0 0-2.22.18-3.66.18-1.37 0-3.6-.18-3.6-.18-.74 0-.66 1.08.08 1.15 0 0 .74.07 1.5.11l2.25 6.18-3.18 9.54A10.74 10.74 0 0 0 12 22.8c3.27 0 6.22-1.45 8.24-3.76l-5.69-16.5c1.9.15 3.5 1.57 3.5 4.92z"/></svg>` },
  { name: 'Dev.to', slug: 'devto', cat: 'cms', color: '#ffffff', desc: 'Forem technical publishing with automated tags & canonical links', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><rect width="24" height="24" rx="3" fill="#000"/><path d="M7.5 15.5h-2V8.5h2c1.7 0 2.5 1.1 2.5 3.5s-.8 3.5-2.5 3.5zm-.8-1.2h.8c1 0 1.3-.7 1.3-2.3 0-1.6-.3-2.3-1.3-2.3h-.8v4.6zm5.8 1.2h-3V8.5h3v1.2h-1.8v1.4h1.6v1.2h-1.6v1.8h1.8v1.4zm3.8 0l-1.5-7h1.3l.9 4.6.9-4.6h1.3l-1.5 7h-1.4z"/></svg>` }
];

const allChannels = [...col1Channels, ...col2Channels, ...col3Channels];

// ============================================================================
// 3. AI AGENTS DATA (With authentic SVGs)
// ============================================================================

const col1Agents = [
  { name: 'ChatGPT', slug: 'chatgpt', desc: 'OpenAI GPT-4o / o1 automated content generation', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#10a37f"/><path d="M19.15 10.34a4.8 4.8 0 0 0-.41-3.69 4.9 4.9 0 0 0-4.43-2.45c-.4 0-.8.06-1.18.17A4.86 4.86 0 0 0 9.2 2.8a4.91 4.91 0 0 0-4.69 3.4 4.84 4.84 0 0 0-2.3 2.18 4.9 4.9 0 0 0 .28 5.09 4.84 4.84 0 0 0 .41 3.69 4.9 4.9 0 0 0 4.43 2.45c.4 0 .8-.06 1.18-.17a4.86 4.86 0 0 0 3.93 1.57 4.91 4.91 0 0 0 4.69-3.4 4.84 4.84 0 0 0 2.3-2.18 4.9 4.9 0 0 0-.28-5.09zm-6.62 9.53a3.52 3.52 0 0 1-2.2-.77l.1-.06 3.6-2.08a.72.72 0 0 0 .36-.62v-4.9l1.49.86v4.11a3.54 3.54 0 0 1-3.35 3.46zm-6.73-3.08a3.5 3.5 0 0 1-.48-2.28v-4.22l3.6 2.08a.71.71 0 0 0 .72 0l4.24-2.45v1.73l-3.56 2.06a3.53 3.53 0 0 1-4.52-.92zm-1.07-7.85a3.5 3.5 0 0 1 1.72-1.5l3.6 2.08a.73.73 0 0 0 .72 0l4.24-2.45-1.49-.86-3.56 2.06a3.54 3.54 0 0 1-5.23.67zm12.38 3.86l-3.6-2.08a.71.71 0 0 0-.72 0L8.5 13.17V11.44l3.56-2.06a3.54 3.54 0 0 1 5.23 2.79v1.63zm1.55 3.73a3.5 3.5 0 0 1-1.72 1.5l-3.6-2.08a.73.73 0 0 0-.72 0l-4.24 2.45 1.49.86 3.56-2.06a3.54 3.54 0 0 1 5.23-.67z" fill="#fff"/></svg>` },
  { name: 'Claude Cowork', slug: 'claude-cowork', desc: 'Anthropic collaborative editor & multi-platform writer', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#3b2314"/><path d="M12 4.5l1.6 5.2 5.4 1.6-5.4 1.6L12 18.1l-1.6-5.2-5.4-1.6 5.4-1.6z" fill="#f59e0b"/></svg>` },
  { name: 'Cursor', slug: 'cursor', desc: 'IDE AI agent for scheduled script & campaign generation', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M12 5l6 3.5v7L12 19l-6-3.5v-7z" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M12 5v7m0 0l6 3.5M12 12L6 15.5" stroke="#fff" stroke-width="1.6"/></svg>` },
  { name: 'Hermes Agent', slug: 'hermes-agent', desc: 'Local agentic orchestration via function calling', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M12 5c-3.5 0-6 2.5-6 6 0 2 .8 3.8 2.2 5.1L12 19l3.8-2.9C17.2 14.8 18 13 18 11c0-3.5-2.5-6-6-6zm-1 4h2v4h-2zm0 5h2v1.5h-2z" fill="#a78bfa"/></svg>` },
  { name: 'DeepSeek', slug: 'deepseek', desc: 'Cost-efficient reasoning model for editorial workflows', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0284c7"/><path d="M17 9c-1.5-1.5-3.5-2-6-1.5C8 8.2 6 10.5 6 13c0 2 1.5 4 3.5 4.5 2 .5 4-.5 5.5-2l3 1.5c-1-1.5-1.5-3-1-4.5z" fill="#fff"/></svg>` },
  { name: 'Manus', slug: 'manus', desc: 'Autonomous general agent execution engine', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><path d="M7 14l5-9v6h5l-6 9v-6H7z" fill="#f43f5e"/></svg>` },
  { name: 'nanoclaw', slug: 'nanoclaw', desc: 'Lightweight agentic crawler & news aggregator', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0f766e"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="10" cy="11" r="1.5" fill="#0f766e"/><circle cx="14" cy="11" r="1.5" fill="#0f766e"/></svg>` }
];

const col2Agents = [
  { name: 'OpenAI dots', slug: 'openai-dots', desc: 'Native OpenAI structured outputs and API dispatchers', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#18181b"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="12" cy="12" r="2.5" fill="#18181b"/></svg>` },
  { name: 'Claude Code', slug: 'claude-code', desc: 'Terminal CLI assistant with direct MCP connectivity', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#ea580c"/><rect x="5" y="6" width="14" height="12" rx="2" fill="#fff"/><path d="M8 10l2 2-2 2M12 14h4" stroke="#ea580c" stroke-width="2" stroke-linecap="round"/></svg>` },
  { name: 'Gemini', slug: 'gemini', desc: 'Google Gemini 1.5 Pro / Flash multi-modal video analysis', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1e1b4b"/><path d="M12 3C12 7.97 7.97 12 3 12c4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z" fill="#60a5fa"/></svg>` },
  { name: 'Grok Bot', slug: 'grok-bot', desc: 'Real-time X trend discovery and viral post generation', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#000"/><path d="M7 17L17 7M10 7h7v7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { name: 'Kimi K3', slug: 'kimi-k3', desc: 'Long-context document analysis and carousel script writer', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#18181b"/><path d="M8 6v12h2.5V13l3.5 5h3L13 12l3.5-6h-3L10.5 11V6H8z" fill="#c084fc"/></svg>` },
  { name: 'Cue', slug: 'cue', desc: 'Event-driven social triggers and webhook dispatcher', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181b"/><circle cx="9" cy="11" r="2" fill="#ec4899"/><circle cx="15" cy="11" r="2" fill="#ec4899"/><path d="M9 16c1.5 1 4.5 1 6 0" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/></svg>` },
  { name: 'Paperclip', slug: 'paperclip', desc: 'Multi-modal document and image processing worker', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#334155"/><path d="M16.5 6.5L8.5 14.5a3 3 0 0 0 4.24 4.24l8-8a5 5 0 0 0-7.07-7.07l-8.5 8.5" fill="none" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/></svg>` }
];

const col3Agents = [
  { name: 'Claude', slug: 'claude', desc: 'Direct Sonnet 3.7 integration with human-level writing', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#cc785c"/><path d="M13.8 6.5l-3.6 11h2.5l3.6-11h-2.5zm-5.6 2.8l2.1 6.5h2.1l-2.1-6.5h-2.1zm8 2.2l-2.1 4.3h2.1l2.1-4.3h-2.1z" fill="#fff"/></svg>` },
  { name: 'Codex', slug: 'codex', desc: 'Automated code snippets, tutorials, and dev tweets', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1e293b"/><path d="M7 9l3 3-3 3M12 15h5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/></svg>` },
  { name: 'OpenClaw', slug: 'openclaw', desc: 'Open-source distributed scraper & sentiment collector', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#dc2626"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="10" cy="11" r="1.2" fill="#dc2626"/><circle cx="14" cy="11" r="1.2" fill="#dc2626"/><path d="M6 10c0-2 2-3 3-3M18 10c0-2-2-3-3-3" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>` },
  { name: 'Grok Build', slug: 'grok-build', desc: 'Technical compiler and automated release notes poster', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#27272a"/><circle cx="12" cy="12" r="7" stroke="#fff" stroke-width="1.8" fill="none"/><line x1="7" y1="17" x2="17" y2="7" stroke="#fff" stroke-width="1.8"/></svg>` },
  { name: 'Muse', slug: 'muse', desc: 'Creative audio & video narrative script writer', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0891b2"/><path d="M6 16V8l6 7 6-7v8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>` },
  { name: 'Perplexity Computer', slug: 'perplexity-computer', desc: 'Live research agent with verified citations & facts', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#134e4a"/><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round"/></svg>` },
  { name: 'Postiz MCP Server', slug: 'postiz-mcp', desc: 'Official Model Context Protocol server for native AI control', icon: `<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#6d28d9"/><circle cx="7" cy="12" r="2.5" fill="#fff"/><circle cx="17" cy="7" r="2.5" fill="#fff"/><circle cx="17" cy="17" r="2.5" fill="#fff"/><line x1="9" y1="12" x2="15" y2="8" stroke="#fff" stroke-width="1.8"/><line x1="9" y1="12" x2="15" y2="16" stroke="#fff" stroke-width="1.8"/></svg>` }
];

const allAgents = [...col1Agents, ...col2Agents, ...col3Agents];

// ============================================================================
// 4. SHARED CSS SYSTEM (Modern Dark Glassmorphism, Responsive)
// ============================================================================

const sharedStyles = `
  
  /* Theme Support: Dark / Light / System */
  [data-theme="light"] {
    --bg: #f8fafc;
    --bg-surface: #ffffff;
    --bg-card: rgba(255, 255, 255, 0.95);
    --bg-card-hover: #f1f5f9;
    --border: rgba(15, 23, 42, 0.12);
    --border-focus: rgba(0, 163, 255, 0.5);
    --text: #0f172a;
    --text-muted: #475569;
    --text-dim: #64748b;
    --primary: #0284c7;
    --primary-glow: rgba(2, 132, 199, 0.25);
    --secondary: #059669;
    --gradient-glow: radial-gradient(circle at 50% 0%, rgba(0, 163, 255, 0.1) 0%, transparent 60%);
  }

  [data-theme="light"] .master-header {
    background: rgba(255, 255, 255, 0.92) !important;
    border-bottom: 1px solid var(--border) !important;
  }

  [data-theme="light"] .brand-text {
    color: #0f172a !important;
  }

  [data-theme="light"] h1, [data-theme="light"] h2, [data-theme="light"] h3, [data-theme="light"] .section-title {
    color: #0f172a !important;
  }

  [data-theme="light"] .pricing-card {
    background: #ffffff !important;
    border-color: rgba(15, 23, 42, 0.12) !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06) !important;
  }

  [data-theme="light"] .dropdown-postiz {
    background: #ffffff !important;
    border-color: rgba(15, 23, 42, 0.12) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
  }

  [data-theme="light"] .btn-secondary {
    background: #f1f5f9 !important;
    color: #0f172a !important;
    border-color: rgba(15, 23, 42, 0.15) !important;
  }

  /* Currency Buttons */
  .btn-cur {
    padding: 6px 14px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-cur.active {
    background: linear-gradient(135deg, #00A3FF 0%, #00FF9D 100%);
    color: #0b0f19;
    box-shadow: 0 2px 10px rgba(0, 163, 255, 0.3);
  }

  :root {
    --bg: #090a0f;
    --bg-surface: #12151e;
    --bg-card: rgba(18, 22, 34, 0.75);
    --bg-card-hover: rgba(28, 34, 52, 0.9);
    --border: rgba(255, 255, 255, 0.08);
    --border-focus: rgba(124, 58, 237, 0.5);
    --text: #f3f4f6;
    --text-muted: #94a3b8;
    --text-dim: #64748b;
    --primary: #7c3aed;
    --primary-glow: rgba(124, 58, 237, 0.35);
    --secondary: #10b981;
    --gradient-brand: linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #06b6d4 100%);
    --gradient-purple: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-full: 9999px;
    --font-heading: 'Plus Jakarta Sans', -apple-system, sans-serif;
    --font-body: 'Inter', -apple-system, sans-serif;
    --shadow-lg: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    line-height: 1.65;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .ambient-glow {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1200px;
    height: 600px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%);
    filter: blur(110px);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* Global Master Header */
  header.master-header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(9, 10, 15, 0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
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

  .brand-logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 16px rgba(124, 58, 237, 0.5));
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .brand:hover .brand-logo-wrap {
    transform: scale(1.06);
  }

  .brand-text {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.1;
  }

  .brand-text span.brand-postiz {
    background: var(--gradient-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .brand-sub {
    font-size: 11px;
    color: var(--text-dim);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 2px;
  }

  .brand-sub-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    display: inline-block;
  }

  /* Desktop Nav Menu & Mega Menus */
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .nav-link:hover, .nav-item:hover > .nav-link, .nav-link.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link svg.arrow {
    width: 12px;
    height: 12px;
    transition: transform 0.2s;
  }

  .nav-item:hover > .nav-link svg.arrow {
    transform: rotate(180deg);
  }

  /* Mega Dropdowns */
  .dropdown-postiz {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #0f121b;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 40px -10px var(--primary-glow);
    padding: 18px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1001;
  }

  .nav-item:hover .dropdown-postiz {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
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
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text-muted);
    font-size: 13.5px;
    font-weight: 500;
    transition: all 0.15s;
    white-space: nowrap;
  }

  .dropdown-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.07);
    transform: translateX(3px);
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
    font-size: 13.5px;
    font-weight: 600;
    padding: 9px 18px;
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    border: none;
    white-space: nowrap;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border: 1px solid var(--border);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .btn-primary {
    background: var(--gradient-brand);
    color: #fff;
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(236, 72, 153, 0.45);
  }

  .btn-lg {
    padding: 13px 28px;
    font-size: 15px;
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

  /* Mobile Drawer */
  .mobile-drawer {
    display: none;
    position: fixed;
    top: 74px;
    left: 0;
    width: 100%;
    height: calc(100vh - 74px);
    background: #090a0f;
    padding: 24px;
    overflow-y: auto;
    z-index: 999;
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    gap: 12px;
  }

  .mobile-drawer.open {
    display: flex;
  }

  .mobile-nav-link {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Global Master Footer */
  footer.master-footer {
    background: #050608;
    border-top: 1px solid var(--border);
    padding: 80px 0 40px;
    margin-top: auto;
    position: relative;
    z-index: 1;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }

  .footer-brand-desc {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.65;
    max-width: 340px;
    margin: 18px 0 20px;
  }

  .footer-server-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: var(--radius-full);
    font-size: 12px;
    color: #10b981;
    font-weight: 600;
  }

  .footer-col-title {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .footer-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 13.5px;
    transition: color 0.15s;
  }

  .footer-links a:hover {
    color: #fff;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    border-top: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-dim);
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-legal-links {
    display: flex;
    gap: 20px;
  }

  .footer-legal-links a {
    color: var(--text-dim);
    text-decoration: none;
    transition: color 0.15s;
  }

  .footer-legal-links a:hover {
    color: #fff;
  }

  @media (max-width: 992px) {
    .nav-menu { display: none; }
    .mobile-toggle { display: flex; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 640px) {
    header.master-header .btn-secondary { display: none; }
    .nav-inner { height: 64px; }
    .mobile-drawer { top: 64px; }
    .footer-grid { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; text-align: center; }
  }
`;

// ============================================================================
// 5. MASTER TEMPLATE GENERATORS
// ============================================================================

function renderMasterHeader(activePage = '') {
  return `
  <!-- Master Global Navigation Header -->
  <header class="master-header">
    <div class="container nav-inner">
      <a href="/" class="brand" title="Amana Flow Postiz">
        <div class="brand-logo-wrap">
          ${postizLogoSvg}
        </div>
        <div>
          <div class="brand-text">Amana Flow <span class="brand-postiz">Postiz</span></div>
          <div class="brand-sub"><span class="brand-sub-dot"></span>Unified Social Media Suite</div>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav>
        <ul class="nav-menu">
          <!-- 1. AI Agents Mega Menu -->
          <li class="nav-item">
            <a class="nav-link ${activePage === 'agents' ? 'active' : ''}" href="/agents.html">
              AI Agents
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="dropdown-postiz" style="width: 620px;">
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Core Agents</div>
                ${col1Agents.map(a => `<a href="/agents.html#${a.slug}" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Reasoning & IDE</div>
                ${col2Agents.map(a => `<a href="/agents.html#${a.slug}" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Automation & MCP</div>
                ${col3Agents.map(a => `<a href="/agents.html#${a.slug}" class="dropdown-item"><span class="dropdown-item-icon">${a.icon}</span> ${a.name}</a>`).join('')}
              </div>
            </div>
          </li>

          <!-- 2. Documentation Hub -->
          <li class="nav-item">
            <a href="/docs.html" class="nav-link ${activePage === 'docs' ? 'active' : ''}">Dev Docs</a>
          </li>

          <!-- 3. Channels Mega Menu -->
          <li class="nav-item">
            <a class="nav-link ${activePage === 'channels' ? 'active' : ''}" href="/#channels">
              Channels
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="dropdown-postiz" style="width: 640px;">
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Social & Video</div>
                ${col1Channels.map(c => `<a href="/channels/${c.slug}.html" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Community & Media</div>
                ${col2Channels.map(c => `<a href="/channels/${c.slug}.html" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
              <div class="dropdown-col">
                <div style="font-size:11px;font-weight:700;color:var(--text-dim);padding:4px 10px;text-transform:uppercase;">Professional & CMS</div>
                ${col3Channels.map(c => `<a href="/channels/${c.slug}.html" class="dropdown-item"><span class="dropdown-item-icon">${c.icon}</span> ${c.name}</a>`).join('')}
              </div>
            </div>
          </li>

          <!-- Platform Specs -->
          <li class="nav-item">
            <a href="/#architecture" class="nav-link">Platform</a>
          </li>

          <!-- 4. Pricing & Plans -->
          <li class="nav-item">
            <a href="/#pricing" class="nav-link ${activePage === 'pricing' ? 'active' : ''}">Pricing</a>
          </li>

          <!-- 5. Customer Directory -->
          <li class="nav-item">
                      </li>
        </ul>
      </nav>

      <!-- Action Buttons with Dynamic Auth Detection -->
      <div class="nav-actions">
        <!-- Theme Mode Switcher (Dark / Light / System) -->
        <div style="position:relative;display:inline-block;">
          <button id="themeModeBtn" onclick="toggleThemeDropdown(event)" class="btn-theme-toggle" title="Switch Theme" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;color:var(--text);cursor:pointer;transition:all 0.2s;">
            <span id="themeModeIcon" style="font-size:16px;">🌙</span>
          </button>
          <div id="themeDropdownMenu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 15px 35px rgba(0,0,0,0.5);min-width:145px;padding:6px;z-index:99999;">
            <div onclick="setAppTheme('dark')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🌙</span> Dark Mode</div>
            <div onclick="setAppTheme('light')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>☀️</span> Light Mode</div>
            <div onclick="setAppTheme('system')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>💻</span> System Mode</div>
          </div>
        </div>

        <!-- Language Switcher (EN / বাংলা) -->
        <div style="position:relative;display:inline-block;">
          <button id="langToggleBtn" onclick="toggleLangDropdown(event)" class="btn-lang-toggle" title="Switch Language" style="display:flex;align-items:center;gap:6px;padding:7px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;">
            <span id="langFlagIcon">🇬🇧</span> <span id="langTextLabel">EN</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="langDropdownMenu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 15px 35px rgba(0,0,0,0.5);min-width:145px;padding:6px;z-index:99999;">
            <div onclick="setAppLanguage('en')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇬🇧</span> English</div>
            <div onclick="setAppLanguage('bn')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇧🇩</span> বাংলা (BN)</div>
          </div>
        </div>

        <a href="/auth" class="btn btn-secondary" id="navLoginBtn" data-i18n="nav_login">Log In</a>
        <a href="/launches" class="btn btn-primary" id="navDashboardBtn" style="display:none;" data-i18n="nav_dashboard">Open Dashboard &rarr;</a>
        <button class="mobile-toggle" aria-label="Toggle navigation" onclick="document.querySelector('.mobile-drawer').classList.toggle('open')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <div class="mobile-drawer">
    <a href="/" class="mobile-nav-link"><span>🏠 Home Showcase</span> &rarr;</a>
    <a href="/docs.html" class="mobile-nav-link"><span>📖 Developer Docs</span> &rarr;</a>
    <a href="/agents.html" class="mobile-nav-link"><span>🤖 AI Agent Guides & MCP</span> &rarr;</a>
    <a href="/channels/facebook.html" class="mobile-nav-link"><span>📘 Facebook & Meta Graph</span> &rarr;</a>
    <a href="/channels/tiktok.html" class="mobile-nav-link"><span>🎵 TikTok Video API</span> &rarr;</a>
    <a href="/channels/youtube.html" class="mobile-nav-link"><span>▶️ YouTube Shorts & Data v3</span> &rarr;</a>
    <a href="/channels/instagram.html" class="mobile-nav-link"><span>📸 Instagram Reels & Feed</span> &rarr;</a>
    <a href="/channels/linkedin.html" class="mobile-nav-link"><span>💼 LinkedIn Company Pages</span> &rarr;</a>
    <a href="/#channels" class="mobile-nav-link"><span>🌐 View All 30+ Channels</span> &rarr;</a>
    <a href="/#pricing" class="mobile-nav-link"><span>💎 Pricing & Plans</span> &rarr;</a>
        <div style="display:flex;gap:10px;margin-top:16px;">
      <a href="/auth" class="btn btn-secondary" id="mobileNavLogin" style="flex:1;">Log In</a>
      <a href="/launches" class="btn btn-primary" id="mobileNavDash" style="flex:1;display:none;">Dashboard</a>
    </div>
  </div>
  `;
}

function renderMasterFooter() {
  return `
  <!-- Master Global Footer -->
  <footer class="master-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Summary -->
        <div>
          <a href="/" class="brand">
            <div class="brand-logo-wrap">
              ${postizLogoSvg}
            </div>
            <div>
              <div class="brand-text">Amana Flow <span class="brand-postiz">Postiz</span></div>
            </div>
          </a>
          <p class="footer-brand-desc">
            Enterprise-grade social media orchestration, automated publishing, and AI agent integration suite powered by dedicated high-performance cloud infrastructure.
          </p>
          <div class="footer-server-status">
            <span style="width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
            VPS Node: 148.230.98.190 &bull; Temporal Active
          </div>
        </div>

        <!-- Channels Column -->
        <div>
          <div class="footer-col-title">Channels</div>
          <ul class="footer-links">
            <li><a href="/channels/facebook.html">Facebook Pages</a></li>
            <li><a href="/channels/instagram.html">Instagram Reels</a></li>
            <li><a href="/channels/tiktok.html">TikTok Video Posting</a></li>
            <li><a href="/channels/youtube.html">YouTube & Shorts</a></li>
            <li><a href="/channels/linkedin.html">LinkedIn B2B</a></li>
            <li><a href="/channels/threads.html">Threads</a></li>
            <li><a href="/channels/x.html">X (Twitter)</a></li>
            <li><a href="/#channels">View All 30 Channels &rarr;</a></li>
          </ul>
        </div>

        <!-- Platform & Docs Column -->
        <div>
          <div class="footer-col-title">Platform</div>
          <ul class="footer-links">
            <li><a href="/docs.html">Documentation Hub</a></li>
            <li><a href="/agents.html">AI Agent Setup</a></li>
            <li><a href="/agents.html#postiz-mcp">Postiz MCP Server</a></li>
            <li><a href="/#architecture">Platform Infrastructure</a></li>
            <li><a href="/auth">Auth Portal</a></li>
            <li><a href="/launches">Workspace Dashboard</a></li>
          </ul>
        </div>

        <!-- Legal & Compliance Column -->
        <div>
          <div class="footer-col-title">Legal & Trust</div>
          <ul class="footer-links">
            <li><a href="/terms.html">Terms of Service</a></li>
            <li><a href="/privacy.html">Privacy Policy</a></li>
            <li><a href="/data-deletion.html">User Data Deletion</a></li>
            <li><a href="/channels/tiktok.html#compliance">TikTok API Review</a></li>
            <li><a href="/channels/facebook.html#compliance">Meta App Review</a></li>
            <li><a href="/channels/youtube.html#compliance">Google Security</a></li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>&copy; 2026 Amana Flow. All Rights Reserved. Powered by sovereign Postiz architecture.</div>
        <div class="footer-legal-links">
          <a href="/terms.html">Terms</a>
          <a href="/privacy.html">Privacy</a>
          <a href="/data-deletion.html">Data Deletion</a>
          <a href="https://amanaflow.com" target="_blank" rel="noopener">amanaflow.com</a>
        </div>
      </div>
    </div>
  </footer>
  `;
}

// ============================================================================
// 6. BUILD INDEX.HTML (HOMEPAGE WITH AUTHENTIC CALENDAR MOCKUP)
// ============================================================================

function generateIndexHtml() {
  const indexCustomStyles = `
    .hero {
      padding: 70px 0 50px;
      text-align: center;
      position: relative;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      background: rgba(124, 58, 237, 0.12);
      border: 1px solid rgba(124, 58, 237, 0.3);
      color: #c4b5fd;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
      box-shadow: 0 0 20px -5px rgba(124, 58, 237, 0.3);
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
      font-size: clamp(34px, 5.2vw, 64px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -1.5px;
      max-width: 980px;
      margin: 0 auto 22px;
    }

    .hero-title span.glow-gradient {
      background: var(--gradient-brand);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .hero-desc {
      font-size: clamp(16px, 1.8vw, 19px);
      color: var(--text-muted);
      max-width: 720px;
      margin: 0 auto 36px;
      line-height: 1.65;
    }

    .hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 60px;
    }

    /* ==========================================================
       AUTHENTIC POSTIZ CALENDAR MOCKUP (Matching Real User UI)
       ========================================================== */
    .mockup-wrapper {
      background: #0f121d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg), 0 0 60px -15px var(--primary-glow);
      overflow: hidden;
      margin-bottom: 90px;
      text-align: left;
    }

    .mockup-window-header {
      background: #090b12;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      color: var(--text-dim);
    }

    .mockup-window-dots {
      display: flex;
      gap: 7px;
    }

    .mockup-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }

    /* Mockup Layout: 3 Columns (Narrow Nav + Channels Sidebar + Calendar Main) */
    .mockup-app-layout {
      display: grid;
      grid-template-columns: 56px 260px 1fr;
      min-height: 580px;
      background: #090a0f;
    }

    /* 1. Narrow Leftmost Icon Bar */
    .app-icon-bar {
      background: #07080d;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
      gap: 20px;
    }

    .app-icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: var(--text-dim);
      font-size: 9px;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.15s;
      text-decoration: none;
    }

    .app-icon-item.active, .app-icon-item:hover {
      color: #a78bfa;
    }

    .app-icon-item svg {
      width: 20px;
      height: 20px;
    }

    /* 2. Channels Panel */
    .app-channels-panel {
      background: #0d0f18;
      border-right: 1px solid var(--border);
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .channels-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-weight: 700;
      font-size: 15px;
    }

    .channels-action-row {
      display: flex;
      gap: 8px;
    }

    .btn-add-channel {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
    }

    .btn-create-post {
      background: #7c3aed;
      color: #fff;
      border: none;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 13px;
      padding: 9px 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
    }

    .channel-list-scroll {
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      max-height: 420px;
    }

    .real-channel-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
    }

    .real-channel-item:hover, .real-channel-item.active {
      background: rgba(124, 58, 237, 0.12);
      border-color: rgba(124, 58, 237, 0.3);
    }

    .real-channel-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .channel-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      position: relative;
    }

    .channel-avatar-badge {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #1877f2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .channel-avatar-badge svg {
      width: 8px;
      height: 8px;
      fill: #fff;
    }

    .real-channel-name {
      font-size: 12.5px;
      font-weight: 600;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 140px;
    }

    /* 3. Calendar Main View */
    .app-calendar-main {
      display: flex;
      flex-direction: column;
      background: #090a0f;
    }

    .calendar-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border);
      background: #0d0f18;
    }

    .cal-title-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .cal-main-heading {
      font-size: 17px;
      font-weight: 700;
      color: #fff;
    }

    .cal-date-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: #cbd5e1;
    }

    .cal-view-selector {
      display: flex;
      align-items: center;
      gap: 3px;
      background: rgba(255, 255, 255, 0.04);
      padding: 3px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
    }

    .cal-view-btn {
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 4px;
      color: var(--text-dim);
      cursor: pointer;
    }

    .cal-view-btn.active {
      background: #7c3aed;
      color: #fff;
    }

    /* Week Columns Grid */
    .week-columns-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-bottom: 1px solid var(--border);
      background: #0b0d14;
    }

    .week-day-header {
      padding: 10px 8px;
      text-align: center;
      border-right: 1px solid var(--border);
      font-size: 11.5px;
    }

    .week-day-header.today {
      background: rgba(124, 58, 237, 0.1);
      color: #c084fc;
      font-weight: 700;
    }

    .week-day-name {
      color: var(--text-dim);
      font-size: 10.5px;
      text-transform: uppercase;
    }

    .week-day-date {
      color: #fff;
      font-weight: 600;
      margin-top: 2px;
    }

    /* Calendar Events Body */
    .cal-time-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 14px 0;
      min-height: 380px;
      position: relative;
    }

    .cal-col {
      border-right: 1px dashed rgba(255, 255, 255, 0.04);
      padding: 8px 6px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cal-col.today-col {
      background: rgba(124, 58, 237, 0.03);
    }

    .cal-post-card {
      background: #141824;
      border: 1px solid rgba(124, 58, 237, 0.35);
      border-radius: 6px;
      overflow: hidden;
      font-size: 11px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .cal-post-top {
      background: #7c3aed;
      height: 4px;
      width: 100%;
    }

    .cal-post-inner {
      padding: 7px 8px;
    }

    .cal-post-title {
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cal-post-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-dim);
      font-size: 9.5px;
    }

    /* Channels Grid Section */
    .section-channels {
      padding: 80px 0;
      border-top: 1px solid var(--border);
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800;
      text-align: center;
      margin-bottom: 14px;
      letter-spacing: -1px;
    }

    .section-desc {
      text-align: center;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto 40px;
      font-size: 16px;
    }

    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 34px;
    }

    .filter-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 7px 18px;
      border-radius: var(--radius-full);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn:hover, .filter-btn.active {
      background: #7c3aed;
      border-color: #7c3aed;
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
      padding: 18px 20px;
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

    .channel-card-desc {
      font-size: 12px;
      color: var(--text-dim);
      margin-top: 2px;
      max-width: 190px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Architecture Section */
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
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: rgba(124, 58, 237, 0.14);
      border: 1px solid rgba(124, 58, 237, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a78bfa;
      margin-bottom: 18px;
    }

    .arch-card-title {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #fff;
    }

    .arch-card-desc {
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.6;
    }

    /* CTA Section */
    .section-cta {
      padding: 80px 0 100px;
      text-align: center;
    }

    .cta-box {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(236, 72, 153, 0.12) 50%, rgba(6, 182, 212, 0.1) 100%);
      border: 1px solid rgba(124, 58, 237, 0.35);
      border-radius: var(--radius-lg);
      padding: 60px 30px;
    }

    .cta-title { font-family: var(--font-heading); font-size: clamp(26px, 3.5vw, 38px); font-weight: 800; margin-bottom: 14px; }
    .cta-desc { color: var(--text-muted); max-width: 600px; margin: 0 auto 30px; font-size: 16px; }

    @media (max-width: 992px) {
      .mockup-app-layout { grid-template-columns: 1fr; }
      .app-icon-bar, .app-channels-panel { display: none; }
      .week-columns-grid { grid-template-columns: repeat(3, 1fr); }
      .cal-time-grid { grid-template-columns: repeat(3, 1fr); }
    }
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Amana Flow Postiz — Sovereign Social Media Orchestration Platform</title>
  <meta name="description" content="Schedule, automate, and publish to 30+ social media channels and connect AI agents from one visual calendar on our high-speed private VPS." />
  <link rel="canonical" href="https://post.amanaflow.com/" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}
    ${indexCustomStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>

  ${renderMasterHeader('home')}

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="badge-pill">
        <span class="badge-pill-dot"></span>
        Enterprise Unified Social Media Orchestration Engine
      </div>
      
      <h1 class="hero-title">
        Schedule, Automate & Publish to <br />
        <span class="glow-gradient">30+ Social Networks</span> from One Place
      </h1>

      <p class="hero-desc">
        Amana Flow Postiz empowers media teams and managed brands to schedule multi-platform posts, orchestrate viral campaigns, and automate publishing with AI precision on private sovereign VPS infrastructure.
      </p>

      <div class="hero-cta">
        <a href="/launches" class="btn btn-primary btn-lg">Launch Workspace &rarr;</a>
        <a href="#channels" class="btn btn-secondary btn-lg">Explore 30+ Channels</a>
      </div>

      <!-- Live Authentic Calendar Mockup (Matching Screenshot) -->
      <div class="mockup-wrapper">
        <div class="mockup-window-header">
          <div class="mockup-window-dots">
            <span class="mockup-dot dot-red"></span>
            <span class="mockup-dot dot-yellow"></span>
            <span class="mockup-dot dot-green"></span>
          </div>
          <div>Postiz Orchestrator &bull; VPS Node 148.230.98.190 &bull; Temporal 1.28 Active</div>
          <div style="color:#10b981;font-weight:700;">● Online</div>
        </div>

        <div class="mockup-app-layout">
          <!-- 1. Leftmost Icon Bar -->
          <div class="app-icon-bar">
            <div class="app-icon-item active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Calendar</span>
            </div>
            <div class="app-icon-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><rect x="4" y="10" width="16" height="12" rx="4"/></svg>
              <span>Agent</span>
            </div>
            <div class="app-icon-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <span>Analytics</span>
            </div>
            <div class="app-icon-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Media</span>
            </div>
            <div class="app-icon-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
              <span>Plugs</span>
            </div>
            <div class="app-icon-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span>Settings</span>
            </div>
          </div>

          <!-- 2. Channels Panel (Real Brand Accounts) -->
          <div class="app-channels-panel">
            <div class="channels-panel-header">
              <span>Channels</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
            
            <div class="channels-action-row">
              <button class="btn-add-channel">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Channel
              </button>
              <button class="btn-add-channel" style="flex:0 0 34px;padding:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>

            <button class="btn-create-post">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Post
            </button>

            <!-- Real Brand Channels from screenshot -->
            <div class="channel-list-scroll">
              <div class="real-channel-item active">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#84cc16;">
                    A
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Amana Suite</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#06b6d4;">
                    A
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Amana Mart Latifpur</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#0284c7;">
                    A
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Amana Mart</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#e11d48;">
                    A
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Amana Fashion</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#3b82f6;">
                    M
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Mahmudul Hasan</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#2563eb;">
                    A
                    <div class="channel-avatar-badge"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                  </div>
                  <div class="real-channel-name">Amana Express</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:linear-gradient(45deg,#f09433,#dc2743,#bc1888);">
                    A
                  </div>
                  <div class="real-channel-name">Amana Mart (Instagram)</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>

              <div class="real-channel-item">
                <div class="real-channel-left">
                  <div class="channel-avatar" style="background:#0a66c2;">
                    AF
                  </div>
                  <div class="real-channel-name">Amana Flow (LinkedIn)</div>
                </div>
                <span style="color:var(--text-dim);font-size:12px;">&bull;&bull;&bull;</span>
              </div>
            </div>
          </div>

          <!-- 3. Calendar View -->
          <div class="app-calendar-main">
            <!-- Top Controls -->
            <div class="calendar-top-bar">
              <div class="cal-title-left">
                <div class="cal-main-heading">Calendar</div>
                <div class="cal-date-nav">
                  <span>&larr;</span>
                  <span>09/28/2026 - 10/04/2026</span>
                  <span>&rarr;</span>
                  <span style="color:#a78bfa;cursor:pointer;">Today</span>
                </div>
              </div>

              <div class="cal-view-selector">
                <div class="cal-view-btn">Day</div>
                <div class="cal-view-btn active">Week</div>
                <div class="cal-view-btn">Month</div>
              </div>
            </div>

            <!-- Week Header Columns -->
            <div class="week-columns-grid">
              <div class="week-day-header">
                <div class="week-day-name">Mon</div>
                <div class="week-day-date">09/28</div>
              </div>
              <div class="week-day-header">
                <div class="week-day-name">Tue</div>
                <div class="week-day-date">09/29</div>
              </div>
              <div class="week-day-header">
                <div class="week-day-name">Wed</div>
                <div class="week-day-date">09/30</div>
              </div>
              <div class="week-day-header">
                <div class="week-day-name">Thu</div>
                <div class="week-day-date">10/01</div>
              </div>
              <div class="week-day-header today">
                <div class="week-day-name" style="color:#c084fc;">Fri &bull; Today</div>
                <div class="week-day-date">10/02</div>
              </div>
              <div class="week-day-header">
                <div class="week-day-name">Sat</div>
                <div class="week-day-date">10/03</div>
              </div>
              <div class="week-day-header">
                <div class="week-day-name">Sun</div>
                <div class="week-day-date">10/04</div>
              </div>
            </div>

            <!-- Time Grid with Real Scheduled Posts -->
            <div class="cal-time-grid">
              <div class="cal-col"></div>
              <div class="cal-col"></div>
              <div class="cal-col"></div>

              <!-- Thursday Column -->
              <div class="cal-col">
                <div class="cal-post-card">
                  <div class="cal-post-top"></div>
                  <div class="cal-post-inner">
                    <div class="cal-post-title">Welcome to the new era of automated publishing</div>
                    <div class="cal-post-meta">
                      <span>06:00 AM</span>
                      <span style="color:#1877f2;">Facebook</span>
                    </div>
                  </div>
                </div>

                <div class="cal-post-card" style="margin-top:10px;">
                  <div class="cal-post-top" style="background:#0a66c2;"></div>
                  <div class="cal-post-inner">
                    <div class="cal-post-title">Welcome to the new era of automated publishing</div>
                    <div class="cal-post-meta">
                      <span>07:00 AM</span>
                      <span style="color:#0a66c2;">LinkedIn</span>
                    </div>
                  </div>
                </div>

                <div class="cal-post-card" style="margin-top:20px;">
                  <div class="cal-post-top" style="background:#10b981;"></div>
                  <div class="cal-post-inner">
                    <div class="cal-post-title">✨ আধুনিক ডিজিটাল মার্কেটিং এবং কন্টেন্ট অটোমেশন কৌশল</div>
                    <div class="cal-post-meta">
                      <span>10:00 AM</span>
                      <span style="color:#10b981;">Amana Flow</span>
                    </div>
                  </div>
                </div>

                <div class="cal-post-card">
                  <div class="cal-post-top" style="background:#ec4899;"></div>
                  <div class="cal-post-inner">
                    <div class="cal-post-title">🚀 জীবন সহজ করার এক্সক্লুসিভ টিপস ও ট্রিকস</div>
                    <div class="cal-post-meta">
                      <span>10:30 AM</span>
                      <span style="color:#ec4899;">Instagram</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Friday (Today) Column -->
              <div class="cal-col today-col">
                <div class="cal-post-card" style="border-color:#10b981;">
                  <div class="cal-post-top" style="background:#10b981;"></div>
                  <div class="cal-post-inner">
                    <div class="cal-post-title">🌟 ফ্রাইডে মেগা সেল ও সাপ্তাহিক ধামাকা অফার</div>
                    <div class="cal-post-meta">
                      <span>02:00 PM</span>
                      <span style="color:#10b981;">Amana Mart</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="cal-col"></div>
              <div class="cal-col"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 30+ Social Networks Grid -->
  <section id="channels" class="section-channels">
    <div class="container">
      <h2 class="section-title">Support for 30+ Social Networks & CMS</h2>
      <p class="section-desc">
        Every social channel is powered by native, high-performance OAuth2 integrations compliant with official platform policies.
      </p>

      <div class="filter-tabs">
        <button class="filter-btn active">All 30 Channels</button>
        <button class="filter-btn">Social Networks</button>
        <button class="filter-btn">Video & Shorts</button>
        <button class="filter-btn">Business & Pro</button>
        <button class="filter-btn">Communities</button>
        <button class="filter-btn">Publishing & CMS</button>
      </div>

      <div class="channels-grid">
        ${allChannels.map(c => `
          <div class="channel-card" style="cursor:pointer;" onclick="openChannelModal('${c.slug}')" title="Click to view ${c.name} specs & options">
            <div class="channel-card-left">
              <div class="channel-card-icon">${c.icon}</div>
              <div>
                <div class="channel-card-name">${c.name}</div>
                <div class="channel-card-desc">${c.desc}</div>
              </div>
            </div>
            <div class="channel-quick-btn" style="color:#a78bfa;font-size:12px;font-weight:700;display:flex;align-items:center;gap:4px;">
              Details &rarr;
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Architecture & Specifications -->
  <section id="architecture" class="section-arch">
    <div class="container">
      <h2 class="section-title">Engineered for Sovereign Performance</h2>
      <p class="section-desc">Hosted entirely on private dedicated VPS infrastructure with dedicated NVMe allocation and zero third-party telemetry.</p>
      
      <div class="arch-grid">
        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
          <div class="arch-card-title">NVMe Cloud VPS Instance</div>
          <div class="arch-card-desc">Hosted on dedicated node 148.230.98.190 with enterprise KVM virtualization, high clock-frequency vCPUs, and ultra-low latency connection.</div>
        </div>

        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div class="arch-card-title">Zero-Shared Architecture</div>
          <div class="arch-card-desc">Your brand assets, scheduling data, OAuth tokens, and analytics are housed inside private encrypted PostgreSQL 17 and Redis containers.</div>
        </div>

        <div class="arch-card">
          <div class="arch-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="arch-card-title">Temporal Queue Precision</div>
          <div class="arch-card-desc">Powered by Temporal orchestration framework ensuring exactly-once execution for all scheduled posts, even through network restarts.</div>
        </div>
      </div>
    </div>
  </section>


  <!-- ========================================================================= -->
  <!-- ðŸ’Ž OPEN DESIGN PRICING & PIPRAPAY AUTOMATED BILLING SECTION -->
  <!-- ========================================================================= -->
  <section id="pricing" class="section-pricing" style="padding:100px 0;background:radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 60%);border-top:1px solid var(--border);">
    <div class="container">
      <div style="text-align:center;max-width:760px;margin:0 auto 48px;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124, 58, 237, 0.15);border:1px solid rgba(124, 58, 237, 0.4);padding:6px 18px;border-radius:999px;font-size:12.5px;font-weight:700;color:#c084fc;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">
          <span>âš¡ Transparent & Sovereign Pricing</span>
        </div>
        <h2 style="font-family:var(--font-heading);font-size:clamp(32px, 4vw, 46px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px;" data-i18n="pricing_title">
          Simple, Predictable Plans for Brands & Creators
        </h2>
        <p style="color:var(--text-muted);font-size:16px;line-height:1.65;" data-i18n="pricing_sub">
          No per-seat penalties. Unlock enterprise multi-agent automation with instant local payments via <strong>PipraPay (bKash, Nagad, Rocket)</strong> and international cards.
        </p>

        <!-- Top 5 Currency Selector (BDT, USD, EUR, GBP, INR) -->
        <div style="display:flex;align-items:center;justify-content:center;margin-top:24px;flex-wrap:wrap;gap:12px;">
          <span style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;" data-i18n="select_currency">Currency:</span>
          <div style="display:inline-flex;align-items:center;background:var(--bg-surface);border:1px solid var(--border);border-radius:999px;padding:4px;gap:4px;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
            <button type="button" onclick="changePricingCurrency('BDT')" id="curBtn_BDT" class="btn-cur active">🇧🇩 BDT (&#2547;)</button>
            <button type="button" onclick="changePricingCurrency('USD')" id="curBtn_USD" class="btn-cur">🇺🇸 USD ($)</button>
            <button type="button" onclick="changePricingCurrency('EUR')" id="curBtn_EUR" class="btn-cur">🇪🇺 EUR (€)</button>
            <button type="button" onclick="changePricingCurrency('GBP')" id="curBtn_GBP" class="btn-cur">🇬🇧 GBP (£)</button>
            <button type="button" onclick="changePricingCurrency('INR')" id="curBtn_INR" class="btn-cur">🇮🇳 INR (₹)</button>
          </div>
        </div>

        <!-- Billing Switcher (Open Design Pill) -->
        <div style="display:inline-flex;align-items:center;gap:12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:999px;padding:6px 8px;margin-top:24px;">
          <button id="billingMonthlyBtn" onclick="setBillingCycle('monthly')" style="background:var(--primary);color:#fff;border:none;padding:8px 22px;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;">Monthly</button>
          <button id="billingYearlyBtn" onclick="setBillingCycle('yearly')" style="background:transparent;color:var(--text-muted);border:none;padding:8px 22px;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;">
            <span>Yearly</span>
            <span style="background:rgba(16, 185, 129, 0.2);color:#10b981;border:1px solid rgba(16, 185, 129, 0.4);border-radius:999px;padding:2px 8px;font-size:11px;font-weight:800;">SAVE 20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:28px;max-width:1160px;margin:0 auto 60px;">
        
        <!-- Tier 1: Starter -->
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:36px 30px;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.25s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--font-heading);margin-bottom:6px;">Starter Suite</div>
            <p style="color:var(--text-dim);font-size:13.5px;min-height:38px;">Ideal for personal creators and single brand operations.</p>
            <div style="margin:24px 0 28px;">
              <span style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">&#2547;0</span>
              <span style="color:var(--text-dim);font-size:14px;"> / forever free</span>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text-muted);">
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Connect up to 3 Social Accounts</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> 30 Scheduled Posts per Month</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Core Calendar Drag-and-Drop</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Basic Media Uploader (Images/Videos)</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:var(--text-dim);">âœ–</span> <span style="color:var(--text-dim);text-decoration:line-through;">AI Multi-Agent Generation</span></li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:var(--text-dim);">âœ–</span> <span style="color:var(--text-dim);text-decoration:line-through;">PipraPay Automated Billing</span></li>
            </ul>
          </div>
          <a href="/auth" class="btn btn-secondary" style="width:100%;text-align:center;padding:14px;font-weight:700;">Get Started Free &rarr;</a>
        </div>

        <!-- Tier 2: Pro Creator (Highlighted) -->
        <div style="background:linear-gradient(180deg, rgba(28, 20, 52, 0.9) 0%, rgba(18, 15, 32, 0.95) 100%);border:2px solid #8b5cf6;border-radius:var(--radius-lg);padding:36px 30px;display:flex;flex-direction:column;justify-content:space-between;position:relative;box-shadow:0 20px 40px -10px rgba(124, 58, 237, 0.35);transition:transform 0.25s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg, #8b5cf6, #ec4899);color:#fff;border-radius:999px;padding:4px 16px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">
            MOST POPULAR
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--font-heading);margin-bottom:6px;">Pro Creator</div>
            <p style="color:var(--text-muted);font-size:13.5px;min-height:38px;">For active e-commerce brands, agencies & content teams.</p>
            <div style="margin:24px 0 28px;">
              <span id="pricePro" style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">&#2547;1,499</span>
              <span id="cyclePro" style="color:var(--text-dim);font-size:14px;"> / month</span>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text);">
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> <strong>Unlimited Social Accounts</strong> (All 30 Channels)</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> <strong>Unlimited Scheduled Launches</strong> via Temporal</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> <strong>Multi-Agent AI Studio</strong> (GPT-4o, Claude, Gemini)</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Full Postiz MCP Server API Connectivity</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Up to 5 Dedicated Workspace Collaborators</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> <strong>Instant PipraPay Checkout</strong> (bKash/Nagad/Rocket)</li>
            </ul>
          </div>
          <button onclick="openPipraPayModal('pro')" class="btn btn-primary" style="width:100%;text-align:center;padding:14px;font-weight:800;font-size:15px;cursor:pointer;">
            Subscribe with bKash / Nagad &rarr;
          </button>
        </div>

        <!-- Tier 3: Enterprise & Super-App -->
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:36px 30px;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.25s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--font-heading);margin-bottom:6px;">Agency & Super-App</div>
            <p style="color:var(--text-dim);font-size:13.5px;min-height:38px;">White-labeled corporate solution for unlimited organizations.</p>
            <div style="margin:24px 0 28px;">
              <span id="priceEnt" style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">&#2547;4,499</span>
              <span id="cycleEnt" style="color:var(--text-dim);font-size:14px;"> / month</span>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text-muted);">
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> <strong>100% Full White-Labeling</strong> (Custom Domain & Logo)</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Unlimited Client Workspaces & Sub-teams</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Dedicated NVMe VPS Priority Isolation</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Automated Local Webhooks & Custom Gateway</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> 24/7 Dedicated Technical & WhatsApp Support</li>
              <li style="display:flex;align-items:center;gap:10px;"><span style="color:#10b981;">âœ”</span> Multi-Year Data Storage & Automated Backups</li>
            </ul>
          </div>
          <button onclick="openPipraPayModal('enterprise')" class="btn btn-secondary" style="width:100%;text-align:center;padding:14px;font-weight:700;cursor:pointer;">
            Get Enterprise Access &rarr;
          </button>
        </div>

      </div>

      <!-- PipraPay Payment Method Trust Banner -->
      <div style="background:rgba(18, 22, 34, 0.85);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px 32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="background:#fff;border-radius:10px;padding:6px 12px;display:flex;align-items:center;justify-content:center;">
            <span style="font-weight:900;font-size:16px;color:#0b0f19;letter-spacing:-0.5px;">ðŸœ PipraPay</span>
          </div>
          <div>
            <div style="font-size:14.5px;font-weight:700;color:#fff;">Automated Payment Gateway Powered by PipraPay</div>
            <div style="font-size:12.5px;color:var(--text-dim);">Instant automated verification for bKash, Nagad, Rocket, Upay & Credit Cards</div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <span style="background:#e2136e;color:#fff;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:6px;">bKash à¦¬à¦¿à¦•à¦¾à¦¶</span>
          <span style="background:#f7941d;color:#fff;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:6px;">Nagad à¦¨à¦—à¦¦</span>
          <span style="background:#8c3494;color:#fff;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:6px;">Rocket à¦°à¦•à§‡à¦Ÿ</span>
          <span style="background:#025492;color:#fff;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:6px;">Upay à¦‰à¦ªà¦¾à§Ÿ</span>
          <span style="background:#1e293b;color:#fff;font-size:11.5px;font-weight:700;padding:5px 12px;border-radius:6px;border:1px solid var(--border);">Visa / Master</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- ðŸ” INTERACTIVE CHANNEL INTELLIGENCE MODAL -->
  <!-- ========================================================================= -->
  <div id="channelModalBackdrop" style="display:none;position:fixed;inset:0;background:rgba(5, 7, 12, 0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:9999;align-items:center;justify-content:center;padding:20px;">
    <div style="background:#0e111a;border:1px solid rgba(255,255,255,0.12);border-radius:20px;max-width:560px;width:100%;box-shadow:0 25px 60px rgba(0,0,0,0.8);overflow:hidden;position:relative;" onclick="event.stopPropagation()">
      <div style="padding:24px 28px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div id="cmIcon" style="width:40px;height:40px;border-radius:10px;background:var(--bg-surface);display:flex;align-items:center;justify-content:center;"></div>
          <div>
            <div id="cmName" style="font-family:var(--font-heading);font-size:18px;font-weight:800;color:#fff;"></div>
            <div style="font-size:12px;color:#10b981;font-weight:600;">â— Official API Verified & Supported</div>
          </div>
        </div>
        <button onclick="closeChannelModal()" style="background:transparent;border:none;color:var(--text-muted);font-size:22px;cursor:pointer;padding:4px 8px;">âœ•</button>
      </div>

      <div style="padding:28px;display:flex;flex-direction:column;gap:20px;font-size:14px;">
        <p id="cmDesc" style="color:var(--text-muted);line-height:1.6;margin:0;"></p>

        <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;">Platform Capabilities</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;" id="cmTags">
            <span style="background:rgba(124, 58, 237, 0.2);color:#c084fc;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Reels & Video</span>
            <span style="background:rgba(16, 185, 129, 0.2);color:#10b981;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Image Posts</span>
            <span style="background:rgba(6, 182, 212, 0.2);color:#22d3ee;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Scheduled Launches</span>
            <span style="background:rgba(244, 63, 94, 0.2);color:#fb7185;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Full Analytics</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px;">
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:12px;">
            <div style="color:var(--text-dim);font-size:11px;font-weight:700;text-transform:uppercase;">Aspect Ratios</div>
            <div style="color:#fff;font-weight:600;margin-top:4px;">1:1 (Square), 9:16 (Vertical), 16:9</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:12px;">
            <div style="color:var(--text-dim);font-size:11px;font-weight:700;text-transform:uppercase;">OAuth Compliance</div>
            <div style="color:#10b981;font-weight:600;margin-top:4px;">Token Refresh & Granular Scopes</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:8px;">
          <a href="/launches" class="btn btn-primary" style="flex:1;text-align:center;padding:12px;font-weight:700;">Connect Channel &rarr;</a>
          <a id="cmDocsLink" href="#" class="btn btn-secondary" style="flex:1;text-align:center;padding:12px;font-weight:700;">Full Specs Guide</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- ðŸœ PIPRAPAY CHECKOUT MODAL -->
  <!-- ========================================================================= -->
  <div id="piprapayModalBackdrop" style="display:none;position:fixed;inset:0;background:rgba(5, 7, 12, 0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:9999;align-items:center;justify-content:center;padding:20px;">
    <div style="background:#0e111a;border:1px solid rgba(124, 58, 237, 0.4);border-radius:20px;max-width:500px;width:100%;box-shadow:0 25px 60px rgba(0,0,0,0.85);overflow:hidden;" onclick="event.stopPropagation()">
      <div style="padding:22px 26px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:rgba(124, 58, 237, 0.08);">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:20px;">ðŸœ</span>
          <div>
            <div style="font-family:var(--font-heading);font-size:16.5px;font-weight:800;color:#fff;">PipraPay Automated Checkout</div>
            <div style="font-size:11.5px;color:#10b981;">bKash â€¢ Nagad â€¢ Rocket â€¢ Instant Activation</div>
          </div>
        </div>
        <button onclick="closePipraPayModal()" style="background:transparent;border:none;color:var(--text-muted);font-size:22px;cursor:pointer;padding:4px 8px;">âœ•</button>
      </div>

      <div style="padding:26px;display:flex;flex-direction:column;gap:18px;">
        <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div id="ppPlanName" style="color:#fff;font-weight:700;font-size:15px;">Pro Creator Plan</div>
            <div style="color:var(--text-dim);font-size:12.5px;">Billed Monthly via PipraPay</div>
          </div>
          <div id="ppPlanPrice" style="font-size:24px;font-weight:900;color:#a78bfa;font-family:var(--font-heading);">&#2547;1,499</div>
        </div>

        <div>
          <label style="display:block;font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Your Account Email</label>
          <input type="email" id="ppEmail" placeholder="admin@yourbrand.com" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:#fff;font-size:14px;outline:none;" />
        </div>

        <div>
          <label style="display:block;font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px;">Choose Payment Method</label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div onclick="selectPaymentMethod(this)" class="pay-method-opt active" style="background:rgba(226,19,110,0.15);border:2px solid #e2136e;border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;">
              <div style="color:#e2136e;font-weight:800;font-size:14px;">bKash</div>
              <div style="font-size:11px;color:var(--text-dim);">à¦¬à¦¿à¦•à¦¾à¦¶ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ</div>
            </div>
            <div onclick="selectPaymentMethod(this)" class="pay-method-opt" style="background:rgba(247,148,29,0.08);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;">
              <div style="color:#f7941d;font-weight:800;font-size:14px;">Nagad</div>
              <div style="font-size:11px;color:var(--text-dim);">à¦¨à¦—à¦¦ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ</div>
            </div>
            <div onclick="selectPaymentMethod(this)" class="pay-method-opt" style="background:rgba(140,52,148,0.08);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;">
              <div style="color:#a855f7;font-weight:800;font-size:14px;">Rocket</div>
              <div style="font-size:11px;color:var(--text-dim);">à¦°à¦•à§‡à¦Ÿ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ</div>
            </div>
          </div>
        </div>

        <button onclick="executePipraPayRedirect()" class="btn btn-primary" style="width:100%;padding:14px;font-weight:800;font-size:15px;margin-top:6px;cursor:pointer;">
          Pay with PipraPay (Secure Gateway) &rarr;
        </button>

        <p style="font-size:11.5px;color:var(--text-dim);text-align:center;margin:0;">
          ðŸ”’ Powered by PipraPay Payment Automation Engine (AGPL-3.0) &bull; Instant Webhook Verification
        </p>
      </div>
    </div>
  </div>

  <!-- Client-side script for Billing, Modals, and Auth sync -->
  <script>
    const CHANNELS_MAP = ${JSON.stringify(allChannels.reduce((acc, c) => {
      acc[c.slug] = { name: c.name, desc: c.desc, icon: c.icon, slug: c.slug };
      return acc;
    }, {}))};

    function openChannelModal(slug) {
      const data = CHANNELS_MAP[slug];
      if (!data) return;
      document.getElementById('cmName').textContent = data.name;
      document.getElementById('cmDesc').textContent = data.desc;
      document.getElementById('cmIcon').innerHTML = data.icon;
      document.getElementById('cmDocsLink').href = '/channels/' + data.slug + '.html';
      const modal = document.getElementById('channelModalBackdrop');
      modal.style.display = 'flex';
    }

    function closeChannelModal() {
      document.getElementById('channelModalBackdrop').style.display = 'none';
    }

    // =========================================================================
    // 🎨 THEME, LANGUAGE & MULTI-CURRENCY ENGINE
    // =========================================================================

    // 1. Theme Management (Dark / Light / System)
    function toggleThemeDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('themeDropdownMenu');
      if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      const langMenu = document.getElementById('langDropdownMenu');
      if (langMenu) langMenu.style.display = 'none';
    }

    function setAppTheme(theme) {
      localStorage.setItem('site_theme', theme);
      applyTheme(theme);
      const menu = document.getElementById('themeDropdownMenu');
      if (menu) menu.style.display = 'none';
    }

    function applyTheme(theme) {
      const root = document.documentElement;
      const icon = document.getElementById('themeModeIcon');
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (icon) icon.textContent = '💻';
      } else {
        root.setAttribute('data-theme', theme);
        if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
      }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('site_theme') === 'system') {
        applyTheme('system');
      }
    });

    // 2. Language Management (EN / বাংলা)
    const siteTranslations = {
      en: {
        nav_login: 'Log In',
        nav_dashboard: 'Open Dashboard →',
        brand_sub: 'Enterprise Unified Suite',
        pricing_title: 'Simple, Predictable Plans for Brands & Creators',
        pricing_sub: 'No per-seat penalties. Unlock enterprise multi-agent automation with instant local payments via PipraPay (bKash, Nagad, Rocket) and international cards.',
        select_currency: 'Currency:',
        starter_billed: 'Free forever • No credit card required',
        subscribe_pro: 'Subscribe with PipraPay →',
        subscribe_ent: 'Get Enterprise Access →'
      },
      bn: {
        nav_login: 'লগইন',
        nav_dashboard: 'ড্যাশবোর্ড খুলুন →',
        brand_sub: 'এন্টারপ্রাইজ সেলফ-হোস্টেড স্যুইট',
        pricing_title: 'ব্র্যান্ড ও ক্রিয়েটরদের জন্য লাভজনক ও ফ্লেক্সিবল প্ল্যান',
        pricing_sub: 'কোনো হিডেন ফি নেই। সেলফ-হোস্টেড চালান অথবা পিপড়াপে (বিকাশ, নগদ, রকেট) এবং আন্তর্জাতিক কার্ড দিয়ে অটোমেটেড এআই এজেন্ট সাবস্ক্রিপশন নিন।',
        select_currency: 'কারেন্সি:',
        starter_billed: 'চিরতরে সম্পূর্ণ ফ্রি • কোনো কার্ড লাগবে না',
        subscribe_pro: 'পিপড়াপে দিয়ে সাবস্ক্রাইব করুন →',
        subscribe_ent: 'এন্টারপ্রাইজ সাবস্ক্রিপশন নিন →'
      }
    };

    function toggleLangDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('langDropdownMenu');
      if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      const themeMenu = document.getElementById('themeDropdownMenu');
      if (themeMenu) themeMenu.style.display = 'none';
    }

    function setAppLanguage(lang) {
      localStorage.setItem('site_lang', lang);
      applyLanguage(lang);
      const menu = document.getElementById('langDropdownMenu');
      if (menu) menu.style.display = 'none';
    }

    function applyLanguage(lang) {
      const flag = document.getElementById('langFlagIcon');
      const label = document.getElementById('langTextLabel');
      if (flag) flag.textContent = lang === 'bn' ? '🇧🇩' : '🇬🇧';
      if (label) label.textContent = lang === 'bn' ? 'BN' : 'EN';

      const dict = siteTranslations[lang] || siteTranslations.en;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
    }

    // Close dropdowns on outside click
    window.addEventListener('click', () => {
      const themeMenu = document.getElementById('themeDropdownMenu');
      if (themeMenu) themeMenu.style.display = 'none';
      const langMenu = document.getElementById('langDropdownMenu');
      if (langMenu) langMenu.style.display = 'none';
    });

    // 3. Multi-Currency 5-Tier Pricing Matrix (BDT, USD, EUR, GBP, INR)
    let currentCurrency = 'BDT';
    let currentBillingCycle = 'monthly';

    const pricingMatrix = {
      BDT: {
        symbol: '&#2547;',
        starter: { monthly: '&#2547;0', yearly: '&#2547;0', desc: 'চিরতরে ফ্রি' },
        pro: { monthly: 1499, yearly: 1199, strMonthly: '&#2547;1,499', strYearly: '&#2547;1,199' },
        enterprise: { monthly: 4499, yearly: 3599, strMonthly: '&#2547;4,499', strYearly: '&#2547;3,599' }
      },
      USD: {
        symbol: '$',
        starter: { monthly: '$0', yearly: '$0', desc: 'Free Forever' },
        pro: { monthly: 15, yearly: 12, strMonthly: '$15', strYearly: '$12' },
        enterprise: { monthly: 45, yearly: 36, strMonthly: '$45', strYearly: '$36' }
      },
      EUR: {
        symbol: '€',
        starter: { monthly: '€0', yearly: '€0', desc: 'Kostenlos' },
        pro: { monthly: 14, yearly: 11, strMonthly: '€14', strYearly: '€11' },
        enterprise: { monthly: 42, yearly: 34, strMonthly: '€42', strYearly: '€34' }
      },
      GBP: {
        symbol: '£',
        starter: { monthly: '£0', yearly: '£0', desc: 'Free Forever' },
        pro: { monthly: 12, yearly: 10, strMonthly: '£12', strYearly: '£10' },
        enterprise: { monthly: 36, yearly: 29, strMonthly: '£36', strYearly: '£29' }
      },
      INR: {
        symbol: '₹',
        starter: { monthly: '₹0', yearly: '₹0', desc: 'मुफ़्त' },
        pro: { monthly: 1250, yearly: 999, strMonthly: '₹1,250', strYearly: '₹999' },
        enterprise: { monthly: 3750, yearly: 2999, strMonthly: '₹3,750', strYearly: '₹2,999' }
      }
    };

    function changePricingCurrency(cur) {
      currentCurrency = cur;
      document.querySelectorAll('.btn-cur').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById('curBtn_' + cur);
      if (activeBtn) activeBtn.classList.add('active');
      renderPricingCards();
    }

    function setBillingCycle(cycle) {
      currentBillingCycle = cycle;
      const mBtn = document.getElementById('billingMonthlyBtn');
      const yBtn = document.getElementById('billingYearlyBtn');

      if (cycle === 'yearly') {
        if (mBtn) { mBtn.style.background = 'transparent'; mBtn.style.color = 'var(--text-muted)'; }
        if (yBtn) { yBtn.style.background = 'var(--primary)'; yBtn.style.color = '#fff'; }
      } else {
        if (mBtn) { mBtn.style.background = 'var(--primary)'; mBtn.style.color = '#fff'; }
        if (yBtn) { yBtn.style.background = 'transparent'; yBtn.style.color = 'var(--text-muted)'; }
      }
      renderPricingCards();
    }

    function renderPricingCards() {
      const curData = pricingMatrix[currentCurrency] || pricingMatrix.BDT;
      const isYearly = currentBillingCycle === 'yearly';

      const pPro = isYearly ? curData.pro.strYearly : curData.pro.strMonthly;
      const pEnt = isYearly ? curData.enterprise.strYearly : curData.enterprise.strMonthly;
      const period = isYearly ? '/month (billed annually)' : '/month';

      const elPro = document.getElementById('pricePro');
      if (elPro) elPro.innerHTML = pPro + '<span style="font-size:15px;color:var(--text-dim);font-weight:600;">' + period + '</span>';

      const elEnt = document.getElementById('priceEnterprise');
      if (elEnt) elEnt.innerHTML = pEnt + '<span style="font-size:15px;color:var(--text-dim);font-weight:600;">' + period + '</span>';

      const billedPro = document.getElementById('billedPro');
      if (billedPro) {
        billedPro.textContent = isYearly ? 'Billed annually with 20% discount' : 'Billed monthly via PipraPay';
      }

      const billedEnt = document.getElementById('billedEnterprise');
      if (billedEnt) {
        billedEnt.textContent = isYearly ? 'Billed annually with 20% discount' : 'Billed monthly via PipraPay';
      }
    }

    let activeModalPlan = 'pro';
    function openPipraPayModal(planKey) {
      activeModalPlan = planKey;
      const curData = pricingMatrix[currentCurrency] || pricingMatrix.BDT;
      const isYearly = currentBillingCycle === 'yearly';
      const planName = planKey === 'enterprise' ? 'Agency & Super-App' : 'Pro Creator';
      const planAmount = isYearly ? (planKey === 'enterprise' ? curData.enterprise.yearly * 12 : curData.pro.yearly * 12) : (planKey === 'enterprise' ? curData.enterprise.monthly : curData.pro.monthly);

      document.getElementById('ppPlanName').textContent = planName + ' Plan (' + currentBillingCycle.toUpperCase() + ')';
      document.getElementById('ppPlanPrice').innerHTML = curData.symbol + planAmount.toLocaleString('en-US');
      
      // Update modal payment method pills based on currency
      const mfsBox = document.getElementById('ppMfsOptions');
      if (mfsBox) {
        if (currentCurrency === 'BDT') {
          mfsBox.style.display = 'grid';
        } else {
          mfsBox.style.display = 'none';
        }
      }

      document.getElementById('piprapayModalBackdrop').style.display = 'flex';
    }

    function closePipraPayModal() {
      document.getElementById('piprapayModalBackdrop').style.display = 'none';
    }

    function selectPaymentMethod(elem) {
      document.querySelectorAll('.pay-method-opt').forEach(el => {
        el.style.border = '1px solid var(--border)';
      });
      elem.style.border = '2px solid #00A3FF';
    }

    function executePipraPayRedirect() {
      const email = document.getElementById('ppEmail').value.trim();
      if (!email) {
        alert('Please enter your account email to proceed with PipraPay.');
        return;
      }
      alert('Connecting to PipraPay payment automation gateway (' + currentCurrency + ')... Redirecting for ' + email);
      window.location.href = 'https://piprapay.com/checkout?app=amanaflow&email=' + encodeURIComponent(email) + '&currency=' + currentCurrency + '&plan=' + activeModalPlan + '&cycle=' + currentBillingCycle;
    }

    // Initialize Theme & Language on Page Load
    document.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('site_theme') || 'dark';
      applyTheme(savedTheme);

      const savedLang = localStorage.getItem('site_lang') || 'en';
      applyLanguage(savedLang);

      renderPricingCards();
    });
      alert('Connecting to PipraPay payment gateway API... Redirecting to secure checkout for ' + email);
      window.location.href = 'https://piprapay.com/checkout?app=amanaflow&email=' + encodeURIComponent(email);
    }

    // Close modals on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeChannelModal();
        closePipraPayModal();
      }
    });

    // Client-side authentication detector for Header buttons
    (function syncAuthHeader() {
      try {
        const c = document.cookie;
        const loggedIn = c.includes('jwt=') || c.includes('token=') || c.includes('auth=') || localStorage.getItem('isLoggedIn') === 'true';
        const loginBtn = document.getElementById('navLoginBtn');
        const dashBtn = document.getElementById('navDashboardBtn');
        const mLogin = document.getElementById('mobileNavLogin');
        const mDash = document.getElementById('mobileNavDash');

        if (loggedIn) {
          if (loginBtn) loginBtn.style.display = 'none';
          if (dashBtn) dashBtn.style.display = 'inline-flex';
          if (mLogin) mLogin.style.display = 'none';
          if (mDash) mDash.style.display = 'block';
        } else {
          if (loginBtn) loginBtn.style.display = 'inline-flex';
          if (dashBtn) dashBtn.style.display = 'none';
          if (mLogin) mLogin.style.display = 'block';
          if (mDash) mDash.style.display = 'none';
        }
      } catch (err) {}
    })();
  </script>

  <!-- Ready to Automate CTA -->
  <section class="section-cta">
    <div class="container">
      <div class="cta-box">
        <h2 class="cta-title">Ready to Automate Your Brand Distribution?</h2>
        <p class="cta-desc">Access the Amana Flow Postiz workspace now to manage all 30+ social media channels from one unified calendar.</p>
        <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
          <a href="/launches" class="btn btn-primary btn-lg">Open Dashboard &rarr;</a>
          <a href="/docs.html" class="btn btn-secondary btn-lg">Read Dev Docs</a>
        </div>
      </div>
    </div>
  </section>

  ${renderMasterFooter()}
</body>
</html>`;
}

// ============================================================================
// 7. BUILD COMPLIANCE PAGES (TERMS, PRIVACY, DATA DELETION)
// ============================================================================

function generateTermsHtml() {
  const content = `
    <div class="container" style="max-width:920px;padding:60px 24px 100px;">
      <div style="margin-bottom:40px;border-bottom:1px solid var(--border);padding-bottom:24px;">
        <span style="font-size:12px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;">Legal & Developer Compliance</span>
        <h1 style="font-family:var(--font-heading);font-size:clamp(32px,4vw,44px);font-weight:800;color:#fff;margin:8px 0 10px;">Terms of Service</h1>
        <div style="color:var(--text-dim);font-size:13.5px;">Effective Date: October 01, 2026 &bull; Last Updated: October 02, 2026</div>
      </div>

      <div style="color:var(--text-muted);font-size:15px;line-height:1.75;display:flex;flex-direction:column;gap:30px;">
        <p>Welcome to <strong>Amana Flow Postiz</strong> ("Platform," "Service," "we," "us," or "our"), operated by Amana Flow and accessible at <a href="https://post.amanaflow.com" style="color:#a78bfa;">https://post.amanaflow.com</a>. By creating an account, accessing, or using this social media management and scheduling application, you agree to comply with and be bound by the following Terms of Service.</p>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">1. Service Overview & Dedicated VPS Architecture</h2>
          <p>Amana Flow Postiz is an enterprise social media management, calendar scheduling, content orchestration, and analytics platform powered by open-source Postiz architecture. The Service allows authorized users to plan, draft, generate, and schedule posts across multiple connected social networks (including TikTok, Facebook, Instagram, YouTube, LinkedIn, Threads, X, Pinterest, and others) via official APIs.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">2. Eligibility & Account Security</h2>
          <p>You must be at least 18 years of age or the legal age of majority in your jurisdiction to use this Service. You are responsible for safeguarding your login credentials and for any activities or actions conducted under your account. You agree to notify us immediately of any unauthorized access or breach of security.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">3. Social Media Platform Compliance & API Requirements</h2>
          <p>When connecting third-party social media accounts, you acknowledge that our Service acts as an authorized tool to post on your behalf. You agree to strictly abide by the respective developer agreements and community guidelines of each connected platform:</p>
          <ul style="margin:12px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li><strong>TikTok:</strong> You agree to comply with the <a href="https://developers.tiktok.com/terms" target="_blank" rel="noopener" style="color:#a78bfa;">TikTok Developer Terms of Service</a> and Community Guidelines. Content published must strictly conform to TikTok's copyright, safety, and media format policies.</li>
            <li><strong>YouTube & Google:</strong> By connecting YouTube channels or Google Business Profiles, you agree to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener" style="color:#a78bfa;">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style="color:#a78bfa;">Google Privacy Policy</a>.</li>
            <li><strong>Meta (Facebook & Instagram):</strong> You agree to comply with Meta Platform Terms, Instagram Community Guidelines, and Commercial Terms.</li>
            <li><strong>LinkedIn:</strong> You agree to adhere to the LinkedIn User Agreement, Community Policies, and API Usage Agreements.</li>
          </ul>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">4. Content Rights & Intellectual Property</h2>
          <p>You retain 100% ownership and all intellectual property rights to the copy, images, audio, and videos you submit, schedule, or publish through Amana Flow Postiz. You represent and warrant that you hold all necessary rights, licenses, and permissions to publish the content you submit and that your content does not infringe on any third party's intellectual property or privacy rights.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">5. Prohibited Conduct</h2>
          <p>You agree that you will NOT use the Service to:</p>
          <ul style="margin:12px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li>Distribute hate speech, violence, harassment, spam, deceptive marketing, malware, or unlawful content.</li>
            <li>Bypass or attempt to exploit rate limits or authentication tokens of any connected social media platform.</li>
            <li>Engage in coordinated inauthentic behavior, automated scraping, or unauthorized access to other users' workspaces.</li>
          </ul>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">6. Termination & Disconnection</h2>
          <p>You may disconnect any connected social account or stop using the Service at any time. Disconnecting an integration immediately revokes and removes all stored OAuth access tokens. We reserve the right to suspend or terminate accounts that violate these Terms or threaten platform security.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">7. Contact & Corporate Information</h2>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px 24px;margin-top:12px;">
            <div style="color:#fff;font-weight:700;margin-bottom:6px;">Amana Flow Corporate Inquiries</div>
            <div>Website: <a href="https://amanaflow.com" style="color:#a78bfa;">https://amanaflow.com</a></div>
            <div>Web App: <a href="https://post.amanaflow.com" style="color:#a78bfa;">https://post.amanaflow.com</a></div>
            <div>Compliance Email: <a href="mailto:privacy@amanaflow.com" style="color:#a78bfa;">privacy@amanaflow.com</a></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Terms of Service — Amana Flow Postiz</title>
  <meta name="description" content="Official Terms of Service for Amana Flow Postiz social media orchestration suite." />
  <link rel="canonical" href="https://post.amanaflow.com/terms" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('terms')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

function generatePrivacyHtml() {
  const content = `
    <div class="container" style="max-width:920px;padding:60px 24px 100px;">
      <div style="margin-bottom:40px;border-bottom:1px solid var(--border);padding-bottom:24px;">
        <span style="font-size:12px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;">Privacy & Data Protection</span>
        <h1 style="font-family:var(--font-heading);font-size:clamp(32px,4vw,44px);font-weight:800;color:#fff;margin:8px 0 10px;">Privacy Policy</h1>
        <div style="color:var(--text-dim);font-size:13.5px;">Effective Date: October 01, 2026 &bull; Last Updated: October 02, 2026</div>
      </div>

      <div style="color:var(--text-muted);font-size:15px;line-height:1.75;display:flex;flex-direction:column;gap:30px;">
        <p>Amana Flow ("we," "our," or "us") operates <strong>Amana Flow Postiz</strong> (<a href="https://post.amanaflow.com" style="color:#a78bfa;">https://post.amanaflow.com</a>). This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of personal data and OAuth credentials when you use our enterprise social media management suite.</p>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">1. Information We Collect</h2>
          <ul style="margin:8px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li><strong>Account Credentials:</strong> Email address, encrypted password hash (bcrypt), organization affiliation, and user display name.</li>
            <li><strong>Connected Social Media Identifiers:</strong> Account IDs, channel usernames, profile avatars, and granular OAuth2 access/refresh tokens needed to publish content.</li>
            <li><strong>User-Generated Content:</strong> Post drafts, captions, scheduled publishing timestamps, uploaded media (images, video files), and delivery logs.</li>
            <li><strong>System & Server Logs:</strong> IP address, browser user-agent, error logs, and audit logs recorded strictly for security, rate-limiting, and diagnostic purposes.</li>
          </ul>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">2. How We Use Social Media API Data</h2>
          <p>We use your connected social media API tokens strictly and exclusively for the following purposes:</p>
          <ul style="margin:8px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li><strong>TikTok:</strong> Using TikTok Login Kit and Content Posting API solely to upload user-selected videos, captions, and cover images to your creator account upon your explicit scheduling command.</li>
            <li><strong>YouTube & Google:</strong> Using YouTube Data API v3 and Google Business Profile APIs to publish requested videos, community updates, and retrieve post analytics.</li>
            <li><strong>Meta (Facebook & Instagram):</strong> Managing Pages, publishing photo/video/Reel content, and checking scheduled delivery status.</li>
            <li><strong>LinkedIn:</strong> Publishing UGC post updates and company articles on authorized organization profiles.</li>
          </ul>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">3. No Sale or Commercial Exploitation of Data</h2>
          <p><strong>We do NOT sell, rent, monetize, or lease your personal information or connected account tokens to third parties or data brokers.</strong> We do not use your private content or social credentials to train publicly accessible machine learning models without your explicit consent.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">4. Data Security & Storage Architecture</h2>
          <p>All data is hosted on our private dedicated VPS node (IP: <code>148.230.98.190</code>). All data transmitted between your browser and our server is encrypted in transit using Transport Layer Security (TLS 1.3/HTTP2). OAuth tokens are stored securely in an isolated, private PostgreSQL database protected behind Docker networks and Linux firewalls.</p>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">5. User Rights & Data Deletion</h2>
          <p>You have full sovereign control over your data. You may disconnect any channel at any time from your Postiz Settings, which immediately deletes the respective OAuth tokens from our database. To delete your entire account and all associated scheduled media, please follow our <a href="/data-deletion.html" style="color:#10b981;font-weight:600;">Data Deletion Instructions</a> or email <a href="mailto:privacy@amanaflow.com" style="color:#a78bfa;">privacy@amanaflow.com</a>.</p>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy — Amana Flow Postiz</title>
  <meta name="description" content="Privacy Policy and Developer API compliance documentation for Amana Flow Postiz." />
  <link rel="canonical" href="https://post.amanaflow.com/privacy" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('privacy')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

function generateDataDeletionHtml() {
  const content = `
    <div class="container" style="max-width:920px;padding:60px 24px 100px;">
      <div style="margin-bottom:40px;border-bottom:1px solid var(--border);padding-bottom:24px;">
        <span style="font-size:12px;font-weight:700;color:#ef4444;text-transform:uppercase;letter-spacing:1px;">Account & Data Control</span>
        <h1 style="font-family:var(--font-heading);font-size:clamp(32px,4vw,44px);font-weight:800;color:#fff;margin:8px 0 10px;">User Data Deletion Instructions</h1>
        <div style="color:var(--text-dim);font-size:13.5px;">Developer Policy Compliance for TikTok, Meta, Google, and LinkedIn</div>
      </div>

      <div style="color:var(--text-muted);font-size:15px;line-height:1.75;display:flex;flex-direction:column;gap:30px;">
        <p>In accordance with GDPR, CCPA, and official developer platform policies (including Meta Platform Terms and TikTok Developer Review Rules), Amana Flow Postiz provides three transparent methods for users to request and verify the immediate deletion of their data and connected social credentials.</p>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">Method 1: Instant In-App Channel Disconnection (Self-Service)</h2>
          <p>You can instantly delete all OAuth credentials, channel associations, and access tokens from our database:</p>
          <ol style="margin:8px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li>Log into your Postiz dashboard at <a href="https://post.amanaflow.com/launches" style="color:#a78bfa;">https://post.amanaflow.com/launches</a>.</li>
            <li>Click on <strong>Settings</strong> or navigate to <strong>Integrations</strong> on the sidebar.</li>
            <li>Locate the channel you wish to disconnect (e.g., TikTok, Facebook, YouTube, LinkedIn).</li>
            <li>Click <strong>Disconnect</strong> / <strong>Remove Channel</strong>.</li>
            <li><em>Result:</em> All active access tokens and refresh tokens for that channel are immediately and permanently erased from our PostgreSQL database.</li>
          </ol>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">Method 2: Revoking Access Directly from Social Platforms</h2>
          <p>You can revoke Amana Flow Postiz permissions from your native account settings at any time:</p>
          <ul style="margin:8px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li><strong>TikTok:</strong> Settings and Privacy &rarr; Security &amp; Permissions &rarr; Apps and Services Permissions &rarr; Amana Flow Postiz &rarr; Remove Access.</li>
            <li><strong>Facebook &amp; Instagram:</strong> Settings &amp; Privacy &rarr; Settings &rarr; Business Integrations &rarr; Amana Flow Postiz &rarr; Remove.</li>
            <li><strong>Google &amp; YouTube:</strong> Google Account Settings &rarr; Security &rarr; Third-party apps with account access &rarr; Remove Access.</li>
            <li><strong>LinkedIn:</strong> Settings &amp; Privacy &rarr; Data Privacy &rarr; Other Applications &rarr; Permitted Services &rarr; Revoke.</li>
          </ul>
        </div>

        <div>
          <h2 style="color:#fff;font-size:20px;font-family:var(--font-heading);margin-bottom:12px;">Method 3: Direct Manual Deletion Request</h2>
          <p>To request a complete purge of your user account, media storage files, draft posts, and analytics logs:</p>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px 24px;margin-top:12px;">
            <div>Email our Data Protection Officer at: <a href="mailto:privacy@amanaflow.com" style="color:#10b981;font-weight:700;">privacy@amanaflow.com</a></div>
            <div style="margin-top:8px;">Subject: <code>Data Deletion Request - [Your Registered Email]</code></div>
            <div style="margin-top:8px;font-size:13.5px;color:var(--text-dim);">Requests are processed within 24–48 hours, and a formal confirmation receipt will be emailed back to you.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Data Deletion Instructions — Amana Flow Postiz</title>
  <meta name="description" content="Step-by-step user data deletion instructions for Amana Flow Postiz." />
  <link rel="canonical" href="https://post.amanaflow.com/data-deletion" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('data-deletion')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

// ============================================================================
// 8. BUILD DOCUMENTATION HUB (DOCS.HTML) & AI AGENT GUIDES (AGENTS.HTML)
// ============================================================================

function generateDocsHtml() {
  const content = `
    <div class="container" style="max-width:1040px;padding:60px 24px 100px;">
      <div style="margin-bottom:40px;border-bottom:1px solid var(--border);padding-bottom:24px;">
        <span style="font-size:12px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Postiz Sovereign Architecture</span>
        <h1 style="font-family:var(--font-heading);font-size:clamp(32px,4vw,46px);font-weight:800;color:#fff;margin:8px 0 10px;">Documentation Hub</h1>
        <p style="color:var(--text-muted);font-size:16px;">Comprehensive guide to configuring, orchestrating, and automating social channels on private VPS infrastructure.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:24px;margin-bottom:50px;">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">🚀 Quickstart Guide</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">How to access the dashboard, connect brand channels via OAuth, configure default posting time slots, and schedule your first multi-platform launch.</p>
          <a href="#quickstart" style="color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;margin-top:12px;">Read Quickstart &rarr;</a>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">🔑 Provider API Keys</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">Configuration guide for Meta (Facebook & Instagram), TikTok Content Posting API, Google / YouTube Data v3, and LinkedIn Developer App IDs.</p>
          <a href="#api-keys" style="color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;margin-top:12px;">Configure Keys &rarr;</a>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">🤖 AI Agents & MCP</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">Connect Cursor, Claude Code, ChatGPT, and n8n directly to your Postiz workspace via Model Context Protocol (MCP) server endpoints.</p>
          <a href="/agents.html" style="color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;margin-top:12px;">Explore Agent Setup &rarr;</a>
        </div>
      </div>

      <!-- Section: Quickstart -->
      <div id="quickstart" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:32px;margin-bottom:40px;">
        <h2 style="color:#fff;font-family:var(--font-heading);font-size:22px;margin-bottom:14px;">1. Workspace Access & First Launch</h2>
        <div style="color:var(--text-muted);font-size:15px;line-height:1.7;display:flex;flex-direction:column;gap:12px;">
          <p>Access your private workspace by visiting <a href="/launches" style="color:#a78bfa;font-weight:600;">https://post.amanaflow.com/launches</a>. After authenticating with your administrator account, you will land on the interactive Calendar view.</p>
          <p><strong>Step 1: Connect Brand Channels:</strong> Click on <em>Add Channel</em> in the left panel. Select the target platform (e.g. Facebook, Instagram, YouTube, TikTok). You will be redirected to the platform's official OAuth authorization screen. Approve permissions to authorize your VPS container.</p>
          <p><strong>Step 2: Create a Post:</strong> Click the purple <em>Create Post</em> button. Write your copy, add media assets (videos up to 500MB, high-res photos), choose which channels to broadcast to, and pick an exact publishing timestamp.</p>
          <p><strong>Step 3: Verification:</strong> The Temporal engine will track the execution queue and dispatches the post to all platforms at the requested minute.</p>
        </div>
      </div>

      <!-- Section: API Keys -->
      <div id="api-keys" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:32px;margin-bottom:40px;">
        <h2 style="color:#fff;font-family:var(--font-heading);font-size:22px;margin-bottom:14px;">2. Provider API Credentials Reference</h2>
        <p style="color:var(--text-muted);font-size:14.5px;margin-bottom:18px;">Below are the configured environment variable references maintained in <code>docker-compose.yaml</code> on the VPS:</p>
        
        <div style="background:#06080d;border:1px solid var(--border);border-radius:var(--radius-sm);padding:18px;font-family:monospace;font-size:13px;color:#a78bfa;overflow-x:auto;line-height:1.6;">
# Facebook / Meta Graph API<br/>
FACEBOOK_APP_ID: '1881259305819713'<br/>
FACEBOOK_APP_SECRET: '****************'<br/><br/>
# TikTok Content Posting API & Login Kit<br/>
TIKTOK_CLIENT_ID: 'aw2rokuo8juy0ilv'<br/>
TIKTOK_CLIENT_SECRET: '****************'<br/><br/>
# Google / YouTube Data API v3 & Business Profiles<br/>
YOUTUBE_CLIENT_ID: '372048527056-659nnd8lc8a1l1fop2cce6f6d8i13ibo...'<br/>
YOUTUBE_CLIENT_SECRET: 'GOCSPX-****************'<br/><br/>
# LinkedIn API<br/>
LINKEDIN_CLIENT_ID: '864fpdxe4q9xjq'<br/>
LINKEDIN_CLIENT_SECRET: '****************'
        </div>
      </div>

      <!-- Section: Self-Hosting & VPS Architecture -->
      <div id="self-hosting" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:32px;">
        <h2 style="color:#fff;font-family:var(--font-heading);font-size:22px;margin-bottom:14px;">3. Cloud Infrastructure & Security Isolation</h2>
        <div style="color:var(--text-muted);font-size:15px;line-height:1.7;display:flex;flex-direction:column;gap:12px;">
          <p>Amana Flow Postiz is deployed using a decoupled architecture on Ubuntu VPS (<code>148.230.98.190</code>):</p>
          <ul style="margin:6px 0 0 20px;display:flex;flex-direction:column;gap:8px;">
            <li><strong>Presentation & Compliance Webroot:</strong> <code>/www/wwwroot/post.amanaflow.com/</code> served directly by Nginx for sub-millisecond response speeds.</li>
            <li><strong>Core Docker Stack:</strong> <code>/opt/postiz-docker-compose/</code> running Postiz App (:4007), PostgreSQL 17 (:5432), Redis 7.2 (:6379), and Temporal (:7233).</li>
            <li><strong>Reverse Proxy:</strong> Nginx routes <code>/home</code>, <code>/terms</code>, <code>/privacy</code>, <code>/docs</code>, and <code>/channels/*</code> to static files, while reverse-proxying <code>/auth</code>, <code>/launches</code>, <code>/api</code>, and <code>/.well-known/oauth-protected-resource</code> to Postiz.</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Documentation Hub — Amana Flow Postiz</title>
  <meta name="description" content="Technical documentation and self-hosting guides for Amana Flow Postiz." />
  <link rel="canonical" href="https://post.amanaflow.com/docs" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('docs')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

function generateAgentsHtml() {
  const content = `
    <div class="container" style="max-width:1040px;padding:60px 24px 100px;">
      <div style="margin-bottom:40px;border-bottom:1px solid var(--border);padding-bottom:24px;">
        <span style="font-size:12px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;">AI Agentic Orchestration</span>
        <h1 style="font-family:var(--font-heading);font-size:clamp(32px,4vw,46px);font-weight:800;color:#fff;margin:8px 0 10px;">AI Agent Setup Guides & MCP</h1>
        <p style="color:var(--text-muted);font-size:16px;">Automate your social media scheduling by connecting AI coding assistants and autonomous agents via Model Context Protocol (MCP).</p>
      </div>

      <!-- Featured: Postiz MCP Server -->
      <div id="postiz-mcp" style="background:linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);border:1px solid rgba(124, 58, 237, 0.4);border-radius:var(--radius-lg);padding:32px;margin-bottom:50px;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
          <div style="width:44px;height:44px;border-radius:10px;background:#7c3aed;display:flex;align-items:center;justify-content:center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><circle cx="7" cy="12" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><line x1="9" y1="12" x2="15" y2="8" stroke="#fff" stroke-width="1.8"/><line x1="9" y1="12" x2="15" y2="16" stroke="#fff" stroke-width="1.8"/></svg>
          </div>
          <div>
            <h2 style="color:#fff;font-family:var(--font-heading);font-size:22px;">Native Postiz MCP Server Configuration</h2>
            <div style="color:#a78bfa;font-size:13px;font-weight:600;">Connect Claude Code, Cursor, Windsurf, or Antigravity to your Postiz instance</div>
          </div>
        </div>

        <p style="color:var(--text-muted);font-size:14.5px;line-height:1.65;margin-bottom:20px;">
          Postiz exposes a native Model Context Protocol (MCP) endpoint that enables AI tools to list connected channels, draft multi-platform posts, upload media assets, and trigger scheduled campaigns without human browser interaction.
        </p>

        <div style="background:#07090e;border:1px solid var(--border);border-radius:var(--radius-sm);padding:18px;font-family:monospace;font-size:13px;color:#cbd5e1;overflow-x:auto;line-height:1.6;">
// Add to your Claude Desktop or Cursor mcp_config.json:<br/>
{<br/>
&nbsp;&nbsp;"mcpServers": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"postiz": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"url": "https://post.amanaflow.com/api/mcp",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"headers": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Authorization": "Bearer YOUR_POSTIZ_API_KEY"<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
}
        </div>
      </div>

      <!-- Agent Cards Grid -->
      <h3 style="color:#fff;font-family:var(--font-heading);font-size:20px;margin-bottom:20px;">Supported AI Agents & IDE Integrations</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(310px, 1fr));gap:20px;">
        ${allAgents.map(a => `
          <div id="${a.slug}" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:22px;transition:border-color 0.2s;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;">
                ${a.icon}
              </div>
              <div style="color:#fff;font-family:var(--font-heading);font-size:17px;font-weight:700;">${a.name}</div>
            </div>
            <p style="color:var(--text-muted);font-size:13.5px;line-height:1.6;margin-bottom:14px;">${a.desc}</p>
            <div style="font-size:12px;color:#a78bfa;font-weight:600;display:flex;align-items:center;gap:6px;">
              <span>Protocol:</span>
              <span style="color:#fff;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;">REST / MCP Ready</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Agent Setup Guides — Amana Flow Postiz</title>
  <meta name="description" content="Connect AI Agents, Claude Code, Cursor, and ChatGPT to Amana Flow Postiz." />
  <link rel="canonical" href="https://post.amanaflow.com/agents" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('agents')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

// ============================================================================
// 9. BUILD ALL 30 CHANNEL DETAIL PAGES (CHANNELS/*.HTML)
// ============================================================================

function generateChannelHtml(channel) {
  const content = `
    <div class="container" style="max-width:960px;padding:60px 24px 100px;">
      <!-- Hero -->
      <div style="text-align:center;margin-bottom:50px;">
        <div style="display:inline-flex;align-items:center;gap:10px;padding:6px 18px;border-radius:var(--radius-full);background:rgba(255,255,255,0.05);border:1px solid var(--border);color:#fff;font-size:13px;font-weight:600;margin-bottom:20px;">
          <span style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;">${channel.icon}</span>
          <span>Official ${channel.name} Integration</span>
        </div>

        <h1 style="font-family:var(--font-heading);color:#fff;font-size:clamp(32px,5vw,50px);font-weight:800;letter-spacing:-1.2px;margin-bottom:18px;">
          ${channel.name} Automation & Scheduling
        </h1>

        <p style="font-size:17px;max-width:700px;margin:0 auto 30px;color:var(--text-muted);line-height:1.65;">
          ${channel.desc}. Seamlessly connect your ${channel.name} profile, automate post publishing, and schedule campaigns from Amana Flow Postiz.
        </p>

        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <a href="/launches" class="btn btn-primary btn-lg">Connect ${channel.name} &rarr;</a>
          <a href="/docs.html" class="btn btn-secondary btn-lg">Integration Guide</a>
        </div>
      </div>

      <!-- Feature Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin:50px 0;">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">Native OAuth2 Security</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">Granular permission scopes ensure your ${channel.name} password is never stored or seen by our servers. Access tokens are encrypted in dedicated PostgreSQL storage.</p>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">Media Optimization</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">Automated video transcode handling, aspect ratio formatting, thumbnail generation, and compliance checks according to ${channel.name} developer requirements.</p>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <h3 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:10px;">Precision Temporal Queue</h3>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.6;">Posts are queued via Temporal workflows ensuring exactly-once publication without duplicates, rate limit violations, or network dropouts.</p>
        </div>
      </div>

      <!-- Compliance Box -->
      <div id="compliance" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:30px;margin-top:40px;">
        <h4 style="color:#fff;font-family:var(--font-heading);font-size:18px;margin-bottom:12px;">🛡️ Developer App Review & Policy Compliance</h4>
        <p style="color:var(--text-muted);font-size:14px;line-height:1.65;margin-bottom:16px;">
          Amana Flow Postiz strictly adheres to official ${channel.name} Developer Policies and Terms of Service. We do not engage in automated scraping, inauthentic engagements, or non-consensual posting. User data can be purged at any moment via our self-service deletion tools.
        </p>
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <a href="/terms.html" style="color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;">View Terms &rarr;</a>
          <a href="/privacy.html" style="color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;">View Privacy Policy &rarr;</a>
          <a href="/data-deletion.html" style="color:#ef4444;font-size:13px;font-weight:600;text-decoration:none;">Data Deletion Guide &rarr;</a>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${channel.name} Scheduling & Management — Amana Flow Postiz</title>
  <meta name="description" content="Official ${channel.name} post scheduler and automation on Amana Flow Postiz." />
  <link rel="canonical" href="https://post.amanaflow.com/channels/${channel.slug}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('channels')}
  ${content}
  ${renderMasterFooter()}
</body>
</html>`;
}

// ============================================================================

// ============================================================================
// 9. BUILD ADMIN CUSTOMER DIRECTORY PAGE
// ============================================================================

function generateAdminCustomersHtml() {
  const content = `
    <div class="container" style="max-width:1160px;padding:60px 24px 100px;">
      <div style="margin-bottom:36px;border-bottom:1px solid var(--border);padding-bottom:24px;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(16, 185, 129, 0.15);border:1px solid rgba(16, 185, 129, 0.4);padding:4px 14px;border-radius:999px;font-size:12px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
            <span>● Live PostgreSQL 17 Console</span>
          </div>
          <h1 style="font-family:var(--font-heading);font-size:clamp(30px,4vw,42px);font-weight:800;color:#fff;margin:0 0 10px;">Customer & Organization Directory</h1>
          <div style="color:var(--text-dim);font-size:14px;">Centralized view of all registered brands, team collaborators, and assigned roles.</div>
        </div>
        <div style="display:flex;gap:12px;">
          <a href="/launches" class="btn btn-primary">Open Postiz Console &rarr;</a>
          <a href="/auth" class="btn btn-secondary">Login Portal</a>
        </div>
      </div>

      <!-- Live KPI Stat Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:20px;margin-bottom:36px;">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <div style="font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;">Registered Customers</div>
          <div style="font-size:32px;font-weight:900;color:#fff;font-family:var(--font-heading);margin-top:6px;">Multi-Tenant</div>
          <div style="font-size:12px;color:#10b981;margin-top:4px;">● Database Connected</div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <div style="font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;">Connected Channels</div>
          <div style="font-size:32px;font-weight:900;color:#a78bfa;font-family:var(--font-heading);margin-top:6px;">30 Platforms</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">OAuth 2.0 & Meta Graph</div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <div style="font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;">Billing Gateway</div>
          <div style="font-size:32px;font-weight:900;color:#f59e0b;font-family:var(--font-heading);margin-top:6px;">PipraPay Live</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">bKash, Nagad & Rocket</div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;">
          <div style="font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;">Server Node</div>
          <div style="font-size:32px;font-weight:900;color:#10b981;font-family:var(--font-heading);margin-top:6px;">148.230.98.190</div>
          <div style="font-size:12px;color:#10b981;margin-top:4px;">Temporal Engine Active</div>
        </div>
      </div>

      <!-- Customer Directory Table -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:40px;">
        <div style="padding:20px 28px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="font-weight:800;color:#fff;font-size:16px;">Registered Customer & Brand Accounts</div>
          <div style="font-size:13px;color:var(--text-dim);">Live Sync from postiz-postgres</div>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;">
            <thead>
              <tr style="border-bottom:1px solid var(--border);background:rgba(255,255,255,0.02);color:var(--text-dim);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
                <th style="padding:16px 28px;">Customer / Brand</th>
                <th style="padding:16px 20px;">Role & Permissions</th>
                <th style="padding:16px 20px;">Workspace Domain</th>
                <th style="padding:16px 20px;">Status</th>
                <th style="padding:16px 28px;text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:18px 28px;font-weight:600;color:#fff;">
                  <div>Mahmudul Hasan (Super Admin)</div>
                  <div style="font-size:12.5px;color:var(--text-dim);font-weight:400;">admin@amanaflow.com</div>
                </td>
                <td style="padding:18px 20px;"><span style="background:rgba(124, 58, 237, 0.2);color:#c084fc;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">SUPERADMIN</span></td>
                <td style="padding:18px 20px;color:var(--text-muted);">Amana Flow Master</td>
                <td style="padding:18px 20px;"><span style="color:#10b981;font-weight:600;">● Active</span></td>
                <td style="padding:18px 28px;text-align:right;"><a href="/launches" class="btn btn-secondary" style="padding:6px 14px;font-size:12px;">Manage &rarr;</a></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:18px 28px;font-weight:600;color:#fff;">
                  <div>Amana Mart Retail Team</div>
                  <div style="font-size:12.5px;color:var(--text-dim);font-weight:400;">mart@amanamart.com</div>
                </td>
                <td style="padding:18px 20px;"><span style="background:rgba(16, 185, 129, 0.2);color:#10b981;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">ORG_OWNER</span></td>
                <td style="padding:18px 20px;color:var(--text-muted);">Amana Mart Super-App</td>
                <td style="padding:18px 20px;"><span style="color:#10b981;font-weight:600;">● Active</span></td>
                <td style="padding:18px 28px;text-align:right;"><a href="/launches" class="btn btn-secondary" style="padding:6px 14px;font-size:12px;">Manage &rarr;</a></td>
              </tr>
              <tr>
                <td style="padding:18px 28px;font-weight:600;color:#fff;">
                  <div>Amana Fashion & Apparel</div>
                  <div style="font-size:12.5px;color:var(--text-dim);font-weight:400;">fashion@amanaflow.com</div>
                </td>
                <td style="padding:18px 20px;"><span style="background:rgba(6, 182, 212, 0.2);color:#22d3ee;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">MEMBER</span></td>
                <td style="padding:18px 20px;color:var(--text-muted);">Amana Fashion Brand</td>
                <td style="padding:18px 20px;"><span style="color:#10b981;font-weight:600;">● Active</span></td>
                <td style="padding:18px 28px;text-align:right;"><a href="/launches" class="btn btn-secondary" style="padding:6px 14px;font-size:12px;">Manage &rarr;</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- VPS CLI Command Guide -->
      <div style="background:rgba(15, 23, 42, 0.6);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px 28px;">
        <h3 style="color:#fff;font-family:var(--font-heading);font-size:16px;margin-bottom:10px;">⚡ Server Command-Line Customer Operations</h3>
        <p style="color:var(--text-muted);font-size:14px;line-height:1.6;margin-bottom:14px;">Administrators can execute customer account commands directly on the VPS via SSH:</p>
        <pre style="background:#090a0f;border:1px solid var(--border);border-radius:8px;padding:14px 18px;color:#a78bfa;font-size:13px;overflow-x:auto;">
# View all registered customers & workspaces
python3 /opt/postiz-docker-compose/manage_users.py list

# Grant Superadmin role to a customer
python3 /opt/postiz-docker-compose/manage_users.py make-superadmin &lt;email&gt;
        </pre>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Customer & User Directory &bull; Amana Flow Postiz</title>
  <meta name="description" content="View registered customer accounts, organizations, and team roles on Amana Flow Postiz.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <style>${sharedStyles}</style>
</head>
<body>
  <div class="ambient-glow"></div>
  ${renderMasterHeader('customers')}
  <main>${content}</main>
  ${renderMasterFooter()}
</body>
</html>`;
}

// 10. COMPILER & RUNNER
// ============================================================================

function main() {
  const baseDir = path.resolve('f:/work/vps/postiz-web');
  const channelsDir = path.join(baseDir, 'channels');

  if (!fs.existsSync(channelsDir)) {
    fs.mkdirSync(channelsDir, { recursive: true });
  }

  console.log('Generating Amana Flow Postiz Unified Suite...');

  // 1. Generate index.html
  fs.writeFileSync(path.join(baseDir, 'index.html'), generateIndexHtml(), 'utf-8');
  console.log('✔ Generated index.html');

  // 2. Generate Compliance Suite
  fs.writeFileSync(path.join(baseDir, 'terms.html'), generateTermsHtml(), 'utf-8');
  console.log('✔ Generated terms.html');

  fs.writeFileSync(path.join(baseDir, 'privacy.html'), generatePrivacyHtml(), 'utf-8');
  console.log('✔ Generated privacy.html');

  fs.writeFileSync(path.join(baseDir, 'data-deletion.html'), generateDataDeletionHtml(), 'utf-8');
  console.log('✔ Generated data-deletion.html');

  // 3. Generate Docs & Agents
  fs.writeFileSync(path.join(baseDir, 'docs.html'), generateDocsHtml(), 'utf-8');
  console.log('✔ Generated docs.html');

  fs.writeFileSync(path.join(baseDir, 'agents.html'), generateAgentsHtml(), 'utf-8');
  console.log('✔ Generated agents.html');
  // admin-customers removed from public landing

  // 4. Generate all 30 channel pages
  for (const ch of allChannels) {
    fs.writeFileSync(path.join(channelsDir, `${ch.slug}.html`), generateChannelHtml(ch), 'utf-8');
  }
  console.log(`✔ Generated ${allChannels.length} channel detail pages in channels/*.html`);

  console.log('\nAll 35+ pages successfully compiled with identical Master Header and Master Footer!');
}

main();
