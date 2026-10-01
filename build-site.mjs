import fs from 'fs';
import path from 'path';

// Official Amana Flow Master Monogram Brand Logo
const postizLogoSvg = `
<img src="/assets/logo.png" alt="Amana Flow" style="width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 2px 8px rgba(0,163,255,0.45));display:block;" />
`;

// Amana Flow Icon Badge
const amanaFlowBadge = `
<span style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:0.5px;color:#10b981;background:rgba(16,185,129,0.12);padding:2px 8px;border-radius:999px;border:1px solid rgba(16,185,129,0.25);">
  <span style="width:5px;height:5px;border-radius:50%;background:#10b981;"></span>
  AMANA FLOW
</span>
`;

// ============================================================================
// 2. CHANNELS DATA (30 Platforms with authentic official brand vector SVGs and Categories)
// ============================================================================

const col1Channels = [
  { 
    name: 'Facebook', 
    slug: 'facebook', 
    cat: 'social video', 
    color: '#1877f2', 
    desc: 'Pages & Groups automatic scheduling, Reels and Stories distribution', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path d="M15.5 12h-2.5v8h-3.3v-8h-1.6V9.4h1.6V7.5c0-2.2 1.3-3.5 3.4-3.5 1 0 1.9.1 2.1.1v2.5h-1.4c-1.1 0-1.3.5-1.3 1.3v1.5h2.7l-.4 2.6z" fill="#fff"/></svg>` 
  },
  { 
    name: 'LinkedIn', 
    slug: 'linkedin', 
    cat: 'pro', 
    color: '#0a66c2', 
    desc: 'B2B company pages, employee advocacy & executive articles', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0A66C2"/><path d="M7.8 17.5H5.4V9.8h2.4v7.7zM6.6 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm11.9 8.8h-2.4v-4.1c0-1.1-.4-1.8-1.4-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.4-.1.7v4.2H10.8s.03-7 0-7.7h2.4v1.1c.3-.5 1-1.3 2.3-1.3 1.7 0 2.9 1.1 2.9 3.5v4.4z" fill="#fff"/></svg>` 
  },
  { 
    name: 'TikTok', 
    slug: 'tiktok', 
    cat: 'video', 
    color: '#00f2fe', 
    desc: 'Direct video posting API, trending hashtags, caption customization', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M16.6 6.8c1 .8 2.2 1.2 3.4 1.2v2.5c-1.3 0-2.5-.4-3.4-1.1v6.2c0 3-2.4 5.4-5.4 5.4-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c.5 0 1 .1 1.5.2v2.7c-.5-.2-1-.3-1.5-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V3.5h2.6c0 1.3.7 2.5 1.8 3.3z" fill="#00F2FE"/><path d="M15.8 6c1 .8 2.2 1.2 3.4 1.2v2.5c-1.3 0-2.5-.4-3.4-1.1v6.2c0 3-2.4 5.4-5.4 5.4-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c.5 0 1 .1 1.5.2v2.7c-.5-.2-1-.3-1.5-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V2.7h2.6c0 1.3.7 2.5 1.8 3.3z" fill="#FE2C55" style="mix-blend-mode:screen;"/><path d="M16.2 6.4c1 .8 2.2 1.2 3.4 1.2v2.5c-1.3 0-2.5-.4-3.4-1.1v6.2c0 3-2.4 5.4-5.4 5.4-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c.5 0 1 .1 1.5.2v2.7c-.5-.2-1-.3-1.5-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V3.1h2.6c0 1.3.7 2.5 1.8 3.3z" fill="#fff" style="mix-blend-mode:screen;"/></svg>` 
  },
  { 
    name: 'Reddit', 
    slug: 'reddit', 
    cat: 'community', 
    color: '#ff4500', 
    desc: 'Subreddit marketing, scheduled discussion threads & flair management', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF4500"/><path d="M18.5 12c0-.7-.6-1.3-1.3-1.3-.4 0-.7.2-.9.4-1.1-.8-2.7-1.3-4.4-1.4l.8-3.6 2.5.5c.1.6.6 1 1.2 1 .7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3c-.5 0-1 .3-1.2.8l-2.8-.6c-.2 0-.3.1-.4.3l-.9 4.2c-1.8.1-3.4.6-4.5 1.4-.2-.3-.6-.5-1-.5-.7 0-1.3.6-1.3 1.3 0 .5.3.9.7 1.1-.1.3-.1.6-.1.9 0 2.5 2.8 4.5 6.3 4.5s6.3-2 6.3-4.5c0-.3 0-.6-.1-.9.5-.2.8-.6.8-1.1zm-8.8.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.6 3.2c-.7.7-2 .7-2.7 0-.1-.1-.1-.3 0-.4.1-.1.3-.1.4 0 .5.5 1.4.5 1.9 0 .1-.1.3-.1.4 0 .1.1.1.3 0 .4zm-.2-2.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Slack', 
    slug: 'slack', 
    cat: 'community', 
    color: '#e01e5a', 
    desc: 'Internal team notifications, campaign broadcast channels', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A1D21"/><path d="M6 14.5a1.5 1.5 0 1 1-1.5-1.5H6v1.5zm.8 0a1.5 1.5 0 0 1 3 0v3.8a1.5 1.5 0 1 1-3 0v-3.8z" fill="#E01E5A"/><path d="M9.5 6a1.5 1.5 0 1 1 1.5-1.5V6H9.5zm0 .8a1.5 1.5 0 0 1 0 3H5.8a1.5 1.5 0 1 1 0-3h3.7z" fill="#36C5F0"/><path d="M18 9.5a1.5 1.5 0 1 1 1.5 1.5H18V9.5zm-.8 0a1.5 1.5 0 0 1-3 0V5.8a1.5 1.5 0 1 1 3 0v3.7z" fill="#2EB67D"/><path d="M14.5 18a1.5 1.5 0 1 1-1.5 1.5V18h1.5zm0-.8a1.5 1.5 0 0 1 0-3h3.8a1.5 1.5 0 1 1 0 3h-3.8z" fill="#ECB22E"/></svg>` 
  },
  { 
    name: 'Mastodon', 
    slug: 'mastodon', 
    cat: 'social', 
    color: '#6364ff', 
    desc: 'Decentralized Fediverse microblogging across sovereign instances', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#6364FF"/><path d="M18.8 7.2c-.3-2.1-2.1-3.7-4.3-4-1.7-.2-3.5-.2-5.2 0-2.2.3-4 1.9-4.3 4C4.7 9.4 4.6 12 4.6 14.3c.1 2.6 1.3 5.1 3.5 6.1 1.7.8 3.5.7 5.2.4v-1.8c-1.7.3-3.4.3-5-.2-1-.3-1.6-1-1.7-2 1.4.3 2.8.5 4.3.5 1.4 0 2.8-.2 4.1-.5 2.4-.6 4.4-2.2 4.7-4.7.3-2.9.2-5.8-.1-8.7zm-2.8 7.8h-2V9.9c0-1.1-.5-1.7-1.4-1.7-1 0-1.5.7-1.5 2v2.9h-2V10.2c0-1.3-.5-2-1.5-2-.9 0-1.4.6-1.4 1.7V15H4.2V9.6c0-1.1.3-2 .9-2.7.6-.7 1.4-1 2.3-1 1.1 0 2 .4 2.5 1.3l.9 1.5.9-1.5c.6-.9 1.4-1.3 2.5-1.3 1 0 1.7.3 2.3 1 .6.7.9 1.6.9 2.7v5.4z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Skool', 
    slug: 'skool', 
    cat: 'community', 
    color: '#f59e0b', 
    desc: 'Private community post scheduling and educational announcements', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#18181B"/><path d="M12 4.5l-7.5 4 7.5 4 7.5-4-7.5-4zm-5.5 6.8v3.5c0 1.8 2.5 3.2 5.5 3.2s5.5-1.4 5.5-3.2v-3.5l-5.5 3-5.5-3z" fill="#F59E0B"/><path d="M19.5 9.5v5h-1v-4.5l1-.5z" fill="#F59E0B"/></svg>` 
  },
  { 
    name: 'VK', 
    slug: 'vk', 
    cat: 'social', 
    color: '#0077ff', 
    desc: 'VKontakte wall posts, rich media attachments and community feeds', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0077FF"/><path d="M13.2 16.5h1.5s.5-.1.7-.3c.2-.3.2-.8.2-.8s-.1-2 .9-2.3c1-.3 2.2 1.9 3.5 2.7.9.6 1.7.5 1.7.5l3.5-.1s1.8-.1 1-.1.5-1.5-.7-2.7c-1-1-2.4-2.3-2.6-2.5-.2-.3-.2-.5 0-.7.1-.3 2.1-3 2.3-4.1.1-.6-.2-1-.9-1h-3.3c-.4 0-.6.2-.8.6-.1.1-.6 1.6-1.5 3-1.7 2.9-2.4 3.1-2.7 2.9-.6-.4-.5-1.7-.5-2.6v-4c0-.9-.3-1.3-.9-1.4-.2 0-.4 0-.7.1-.6.2-.8.5-.8.5s-.6.7-.6 1.7c0 .4 0 1 .1 1.7.1.8.2 1.3-.2 1.4-.3.1-.7-.2-1.4-1.3-1-1.6-1.7-3.4-1.8-3.6-.1-.3-.4-.5-.8-.5H5.4c-.5 0-.7.2-.7.5 0 .2.3 1.3 1.9 3.5 2.1 3 4.5 5.8 8.6 5.8z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Nostr', 
    slug: 'nostr', 
    cat: 'cms', 
    color: '#8b5cf6', 
    desc: 'Cryptographically signed decentralized notes & censorship-resistant feeds', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#8B5CF6"/><path d="M15.5 8c-.8-1.2-2-1.8-3.5-1.8s-2.7.6-3.5 1.8c-.8 1.2-.9 2.8-.2 4.1l2.7 4.9c.4.7 1.4.7 1.8 0l2.7-4.9c.9-1.3.8-2.9 0-4.1zm-3.5 4.5c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Medium', 
    slug: 'medium', 
    cat: 'cms', 
    color: '#ffffff', 
    desc: 'Long-form editorial articles, canonical SEO syndication', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><circle cx="7" cy="12" r="4.5" fill="#fff"/><ellipse cx="14.5" cy="12" rx="2.4" ry="4.5" fill="#fff"/><ellipse cx="19" cy="12" rx="0.9" ry="4.3" fill="#fff"/></svg>` 
  }
];

const col2Channels = [
  { 
    name: 'Instagram', 
    slug: 'instagram', 
    cat: 'social video', 
    color: '#d800b9', 
    desc: 'Feed photos, Carousels, and Instagram Reels scheduled automatically', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><defs><linearGradient id="ig-grad-c2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffd600"/><stop offset="25%" stop-color="#ff0100"/><stop offset="50%" stop-color="#d800b9"/><stop offset="100%" stop-color="#7000ff"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig-grad-c2)"/><rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="15.8" cy="8.2" r="0.9" fill="#fff"/></svg>` 
  },
  { 
    name: 'Bluesky', 
    slug: 'bluesky', 
    cat: 'social', 
    color: '#0284c7', 
    desc: 'AT Protocol microblogging with automated media embeds', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1185FE"/><path d="M12 11.2c-1.1-2.1-4-6.1-6.8-8-2.6-1.8-3.6-1.5-4.3-1.2C.1 2.3 0 3.5 0 4.2c0 .7.4 5.7.6 6.5.8 2.7 3.7 3.7 6.4 3.4.1 0 .3 0 .4-.1-.1 0-.3 0-.4.1-3.9.6-7.4 2-2.8 7.1 5 5.2 6.9-1.1 7.8-4.3.9 3.2 2.8 9.5 7.8 4.3 4.6-5.1 1.1-6.5-2.8-7.1-.1 0-.3 0-.4-.1.1 0 .3 0 .4.1 2.7.3 5.6-.7 6.4-3.4.2-.8.6-5.8.6-6.5 0-.7-.1-1.9-.9-2.2-.7-.3-1.7-.6-4.3 1.2-2.8 1.9-5.7 5.9-6.8 8z" fill="#fff"/></svg>` 
  },
  { 
    name: 'YouTube', 
    slug: 'youtube', 
    cat: 'video', 
    color: '#ff0000', 
    desc: 'YouTube Shorts, long-form 4K videos, automated thumbnails & SEO tags', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF0000"/><path d="M18.8 8.2c-.2-.8-.8-1.4-1.6-1.6C15.8 6.2 12 6.2 12 6.2s-3.8 0-5.2.4c-.8.2-1.4.8-1.6 1.6-.4 1.4-.4 4.3-.4 4.3s0 2.9.4 4.3c.2.8.8 1.4 1.6 1.6 1.4.4 5.2.4 5.2.4s3.8 0 5.2-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.3.4-4.3s0-2.9-.4-4.3z" fill="#fff"/><polygon points="10.5,14.5 14.5,12.5 10.5,10.5" fill="#FF0000"/></svg>` 
  },
  { 
    name: 'Telegram', 
    slug: 'telegram', 
    cat: 'community', 
    color: '#229ed9', 
    desc: 'Instant broadcast channels, rich media formatting, interactive buttons', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#24A1DE"/><path d="M5.5 11.8l11.4-4.7c.5-.2 1 .1.8.8l-2 9.5c-.1.7-.5.8-1.1.5l-3-2.2-1.5 1.4c-.2.2-.3.3-.6.3l.2-3.1 5.7-5.1c.2-.2-.1-.3-.4-.1l-7 4.4-3-1c-.6-.2-.6-.6.1-.9z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Pinterest', 
    slug: 'pinterest', 
    cat: 'pro', 
    color: '#bd081c', 
    desc: 'High-res image pins, board targeting, rich outbound referral links', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#BD081C"/><path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5 0 3.2 2 5.9 4.9 7-.1-.6-.1-1.5.02-2.1l1.1-4.7s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2 1 .5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.1 0 .8.3 1.7.7 2.2.1.1.1.2.1.3-.1.3-.3 1.1-.3 1.3 0 .2-.1.3-.3.2-1.4-.7-2.3-2.8-2.3-4.5 0-3.7 2.7-7.1 7.8-7.1 4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.3-6.1 7.3-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-.9 2.3-1.4 3.1 1.1.3 2.2.5 3.4.5 4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Whop', 
    slug: 'whop', 
    cat: 'community', 
    color: '#ff6200', 
    desc: 'Membership announcement updates and digital product feeds', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF6200"/><path d="M12 4.5L4 8.5l8 4 8-4-8-4zm-8 7.5l8 4 8-4M4 16l8 4 8-4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` 
  },
  { 
    name: 'Kick', 
    slug: 'kick', 
    cat: 'video community', 
    color: '#53fc18', 
    desc: 'Stream announcements and community updates', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M6 5h3.5v5.5l4.5-5.5h4.5l-5.5 6.5 6 7.5h-4.5L9.5 13.5V19H6V5z" fill="#53FC18"/></svg>` 
  },
  { 
    name: 'Lemmy', 
    slug: 'lemmy', 
    cat: 'community', 
    color: '#00bc8c', 
    desc: 'Federated Reddit-alternative community posting', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#00BC8C"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#fff" stroke-width="2"/><rect x="10" y="9" width="1.5" height="6" rx="0.75" fill="#fff"/><rect x="12.5" y="9" width="1.5" height="6" rx="0.75" fill="#fff"/></svg>` 
  },
  { 
    name: 'Listmonk', 
    slug: 'listmonk', 
    cat: 'cms', 
    color: '#0052cc', 
    desc: 'High-speed newsletter campaign broadcasting & email lists', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0052CC"/><path d="M5 7h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm0 2l7 4.5L19 9H5zm14 8V11l-7 4.5L5 11v6h14z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Hashnode', 
    slug: 'hashnode', 
    cat: 'cms', 
    color: '#2962ff', 
    desc: 'Developer blog syndication with Markdown & code highlighting', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#2962FF"/><path d="M19.5 8.5l-5-5a2.1 2.1 0 0 0-3 0l-5 5a2.1 2.1 0 0 0 0 3l5 5a2.1 2.1 0 0 0 3 0l5-5a2.1 2.1 0 0 0 0-3zm-6.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#fff"/></svg>` 
  }
];

const col3Channels = [
  { 
    name: 'Threads', 
    slug: 'threads', 
    cat: 'social', 
    color: '#ffffff', 
    desc: 'Direct Meta Threads publishing with image attachments & text limits', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c2.4 0 4.5-1.1 5.9-2.9l-1.6-1.2c-1 1.3-2.6 2.1-4.3 2.1-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5c2.8 0 5.1 2.1 5.4 4.8h-5.4v2h7.4c-.1 4.5-3.3 8.2-7.4 8.2-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5c2.5 0 4.8 1.2 6.2 3.1l1.6-1.2C17.8 5.9 15 4.5 12 4.5z" fill="#fff"/></svg>` 
  },
  { 
    name: 'X', 
    slug: 'x', 
    cat: 'social', 
    color: '#ffffff', 
    desc: 'Automated threads, media cards, poll scheduling via official API', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M17.3 5.5h2.1l-4.6 5.3 5.4 7.2h-4.2l-3.3-4.3-3.8 4.3H6.8l4.9-5.6-5.2-6.9h4.3l3 4 3.5-4zm-.7 11.2h1.2L9.4 6.7H8.1l8.5 10z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Google Business', 
    slug: 'google-my-business', 
    cat: 'pro', 
    color: '#22c55e', 
    desc: 'Local business updates, promotional offers and event announcements', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff"/><path d="M6 18.5V11l6-4.5 6 4.5v7.5H6z" fill="#4285F4"/><path d="M6 11l6-4.5 6 4.5h-12z" fill="#1967D2"/><path d="M8 11.5v7h3v-4.5h2v4.5h3v-7L12 8.5 8 11.5z" fill="#fff"/><rect x="5.5" y="9.5" width="13" height="2.5" rx="0.5" fill="#34A853"/><path d="M5.5 12h2.5v1.5H5.5z" fill="#EA4335"/><path d="M8 12h2.5v1.5H8z" fill="#FBBC04"/><path d="M10.5 12h2.5v1.5h-2.5z" fill="#4285F4"/><path d="M13 12h2.5v1.5H13z" fill="#34A853"/><path d="M15.5 12h3v1.5h-3z" fill="#EA4335"/></svg>` 
  },
  { 
    name: 'Discord', 
    slug: 'discord', 
    cat: 'community', 
    color: '#5865f2', 
    desc: 'Automated community webhook broadcasts, embed previews', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#5865F2"/><path d="M17.8 7.3c-1.1-.5-2.2-.8-3.4-1 0 0-.1.2-.2.4 1.3.4 1.9.9 2.5 1.5-1.1-.5-2.2-.8-3.4-1-.5-.1-1-.1-1.5-.1-.5 0-1 0-1.5.1-1.2.2-2.3.5-3.4 1 .6-.6 1.2-1.1 2.5-1.5-.1-.2-.2-.4-.2-.4-1.2.2-2.3.5-3.4 1C4.3 9.8 3.8 12.3 4 14.7c1.3 1 2.6 1.6 3.9 1.6.3-.4.6-.9.8-1.3-.5-.2-.9-.4-1.3-.7.1-.1.2-.1.3-.2 2.5 1.2 5.3 1.2 7.8 0 .1.1.2.1.3.2-.4.3-.8.5-1.3.7.2.4.5.9.8 1.3 1.3 0 2.6-.6 3.9-1.6.3-2.8-.5-5.3-1.4-7.4zM9.5 13.5c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm5 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Dribbble', 
    slug: 'dribbble', 
    cat: 'pro', 
    color: '#ea4c89', 
    desc: 'Design portfolio showcase, shot publishing with tags', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#EA4C89"/><path d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5 8.5 8.5 0 0 0 8.5 8.5 8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 12 3.5zm6.5 4.8c.8 1 1.3 2.2 1.4 3.5-1-.2-2.8-.2-4.8.4-.2-.5-.4-1-.7-1.5 2.5-1.1 3.8-2 4.1-2.4zm-5.6 1.3c.3.5.5 1 .7 1.5-2.6.8-5.3.8-5.8.8.6-1.1 2.7-2 5.1-2.3zM4.7 12c0-.3 0-.6.1-.9.6 0 3.7.1 6.6-.7.2.4.4.9.5 1.3-3.6 1.1-5.1 3.5-5.2 3.7-1.2-1-2-2.3-2-3.4zm3.1 4.9c.2-.3 1.6-2.2 5.2-3.3.6 1.5 1 3.1 1.2 4-2 .8-4.4.6-6.4-.7zm8.4.8c-.2-.8-.6-2.3-1.1-3.7 1.9-.6 3.6-.2 3.9-.1-.3 1.6-1.3 3-2.8 3.8zm1.5-4.8c-.4-.1-1.8-.4-3.6.1-1.4-1.4-2.8-2.6-3.8-3.4 2.2-.4 4.5 1.1 7.4 3.3z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Twitch', 
    slug: 'twitch', 
    cat: 'video community', 
    color: '#9146ff', 
    desc: 'Go-live announcements and schedule integration', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#9146FF"/><path d="M5 4.5L4 7v11h3.5V20.5l2.5-2.5h3l5-5V4.5H5zm11 8l-2.5 2.5h-3L8 17.5V15H6.5V6H16v6.5z" fill="#fff"/><rect x="13.5" y="8" width="1.5" height="4" fill="#9146FF"/><rect x="9.5" y="8" width="1.5" height="4" fill="#9146FF"/></svg>` 
  },
  { 
    name: 'Warpcast', 
    slug: 'warpcast', 
    cat: 'social', 
    color: '#472a84', 
    desc: 'Farcaster protocol cast scheduling & decentralized frames', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#472A84"/><path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c2.4 0 4.5-1.1 5.9-2.9l-1.6-1.2c-1 1.3-2.6 2.1-4.3 2.1-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5c2.8 0 5.1 2.1 5.4 4.8h-5.4v2h7.4c-.1 4.5-3.3 8.2-7.4 8.2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.5" fill="#fff"/></svg>` 
  },
  { 
    name: 'MeWe', 
    slug: 'mewe', 
    cat: 'social', 
    color: '#008287', 
    desc: 'Privacy-focused social networking feeds & group posts', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#008287"/><path d="M6 8l4 6 3-4 3 4 4-6v8h-2.5v-4l-3.5 4.5-3.5-4.5v4H6V8z" fill="#fff"/></svg>` 
  },
  { 
    name: 'WordPress', 
    slug: 'wordpress', 
    cat: 'cms', 
    color: '#21759b', 
    desc: 'WordPress standalone & WP.com automated blog publishing via REST API', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#21759B"/><path d="M3.5 12c0 3.6 2.2 6.6 5.3 7.9L5.4 9.1C4.2 9.9 3.5 10.9 3.5 12zm14.5-.5c0-1.7-.6-2.9-1.1-3.8-.7-1.2-1.4-2.2-1.4-3.4 0-1.3 1-2.5 2.4-2.5.1 0 .2 0 .3 0C16.5 2.7 14.3 2 12 2c-3.6 0-6.8 1.9-8.7 4.7l6.3 17.2 1.8-5.5-2.6-7.2c.8 0 1.5-.1 1.5-.1.7-.1.8-1.1.1-1.1 0 0-2.1.2-3.5.2-1.3 0-3.4-.2-3.4-.2-.7 0-.6 1 .1 1.1 0 0 .7.1 1.4.1l2.2 5.9-3 9.1c3.1-.1 5.9-1.5 7.8-3.7l-5.4-15.8c1.8.1 3.3 1.5 3.3 4.7zm-5.5 2.1l-2.4 7c.8.3 1.6.4 2.4.4.7 0 1.4-.1 2.1-.3l-2.1-7.1zM20.5 12c0-1.7-.3-3.3-.9-4.8l-3.8 11.2c2.9-1.4 4.7-4.2 4.7-6.4z" fill="#fff"/></svg>` 
  },
  { 
    name: 'Dev.to', 
    slug: 'devto', 
    cat: 'cms', 
    color: '#ffffff', 
    desc: 'Forem technical publishing with automated tags & canonical links', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#000"/><path d="M7 16h-2V8h2c1.7 0 2.5 1.1 2.5 3.5S8.7 16 7 16zm-.8-1.2h.8c1 0 1.3-.7 1.3-2.3 0-1.6-.3-2.3-1.3-2.3h-.8v4.6zm5.8 1.2h-3V8h3v1.2h-1.8v1.4h1.6v1.2h-1.6v1.8h1.8v1.4zm3.8 0l-1.5-7h1.3l.9 4.6.9-4.6h1.3l-1.5 7h-1.4z" fill="#fff"/></svg>` 
  }
];

const allChannels = [...col1Channels, ...col2Channels, ...col3Channels];

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


  /* Interactive Mockup Tabs & Panes */
    .app-icon-item {
      cursor: pointer;
      user-select: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .app-icon-item:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    .app-icon-item.active {
      background: rgba(0, 163, 255, 0.15);
      border-color: rgba(0, 163, 255, 0.4);
      color: #00a3ff;
      box-shadow: 0 0 16px rgba(0, 163, 255, 0.2);
    }
    .mockup-view-pane {
      display: none;
      animation: mockFadeIn 0.25s ease-out forwards;
    }
    .mockup-view-pane.active {
      display: flex;
    }
    @keyframes mockFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Channel Cards Modern Styling */
    .channel-cat-pill {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-dim);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .channel-card-arrow {
      color: var(--text-dim);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }
    .channel-card:hover .channel-card-arrow {
      color: #00a3ff;
      background: rgba(0, 163, 255, 0.12);
      border-color: rgba(0, 163, 255, 0.3);
      transform: translateX(3px);
    }

    /* Modern Pricing Controls */
    .pricing-controls-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      margin: 28px 0 40px;
    }
    .billing-pill {
      display: inline-flex;
      align-items: center;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 4px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .billing-btn {
      border: none;
      background: transparent;
      color: var(--text-muted);
      padding: 8px 22px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .billing-btn.active {
      background: var(--primary);
      color: #fff;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }
    .save-badge {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      margin-left: 6px;
    }
    .cur-dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .cur-dropdown-item:hover {
      background: rgba(255, 255, 255, 0.06);
    }
    .cur-dropdown-item.active {
      background: rgba(0, 163, 255, 0.12);
      border: 1px solid rgba(0, 163, 255, 0.25);
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
        <div class="brand-logo-wrap" style="background:transparent;border:none;box-shadow:none;padding:0;">
          <img src="/assets/logo.png" alt="Amana Flow" style="width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 2px 10px rgba(0,163,255,0.45));" />
        </div>
        <div class="brand-text-wrap">
          <div class="brand-title-row">
            <span class="brand-name">Amana Flow</span>
            <span class="brand-badge-postiz">POSTIZ</span>
          </div>
          <span class="brand-sub">Sovereign Social Media & AI Orchestration</span>
        </div>
      </a>

      <!-- Desktop Nav Menu (Strictly: Features, Channels, Agents, Pricing - Flat Sleek Horizontal Row) -->
      <nav class="nav-menu" style="display:flex;align-items:center;gap:6px;list-style:none;margin:0;padding:0;">
        <a href="/#features" class="nav-link ${activePage === 'features' ? 'active' : ''}">Features</a>
        <a href="/#channels" class="nav-link ${activePage === 'channels' ? 'active' : ''}">Channels</a>
        <a href="/agents.html" class="nav-link ${activePage === 'agents' ? 'active' : ''}">Agents</a>
        <a href="/#pricing" class="nav-link ${activePage === 'pricing' ? 'active' : ''}">Pricing</a>
      </nav>

      <!-- Action Buttons with Dynamic Auth Detection & All 15 Languages -->
      <div class="nav-actions">
        <!-- Theme Mode Switcher (Dark / Light / System) -->
        <div style="position:relative;display:inline-block;">
          <button id="themeModeBtn" onclick="toggleThemeDropdown(event)" class="btn-theme-toggle" title="Switch Theme" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;color:var(--text);cursor:pointer;transition:all 0.2s;">
            <span id="themeModeIcon" style="font-size:16px;">🌙</span>
          </button>
          <div id="themeDropdownMenu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 12px 35px rgba(0,0,0,0.5);min-width:150px;padding:6px;z-index:999999;">
            <div onclick="setAppTheme('dark')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🌙</span> Dark Mode</div>
            <div onclick="setAppTheme('light')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>☀️</span> Light Mode</div>
            <div onclick="setAppTheme('system')" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>💻</span> System Mode</div>
          </div>
        </div>

        <!-- 15-Language Switcher (Matching Postiz Backend) -->
        <div style="position:relative;display:inline-block;">
          <button id="langToggleBtn" onclick="toggleLangDropdown(event)" class="btn-lang-toggle" title="Switch Language" style="display:flex;align-items:center;gap:6px;padding:7px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;">
            <span id="langFlagIcon">🇬🇧</span> <span id="langTextLabel">EN</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="langDropdownMenu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--bg-surface);border:1px solid var(--border);border-radius:14px;box-shadow:0 15px 40px rgba(0,0,0,0.6);min-width:210px;max-height:360px;overflow-y:auto;padding:6px;z-index:999999;">
            <div style="font-size:10px;font-weight:800;color:var(--text-dim);text-transform:uppercase;padding:6px 10px;letter-spacing:0.5px;">Supported Languages (15)</div>
            <div onclick="setAppLanguage('en')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇬🇧 English</span><span style="font-size:11px;color:var(--text-dim);">EN</span></div>
            <div onclick="setAppLanguage('bn')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇧🇩 বাংলা</span><span style="font-size:11px;color:var(--text-dim);">BN</span></div>
            <div onclick="setAppLanguage('es')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇪🇸 Español</span><span style="font-size:11px;color:var(--text-dim);">ES</span></div>
            <div onclick="setAppLanguage('fr')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇫🇷 Français</span><span style="font-size:11px;color:var(--text-dim);">FR</span></div>
            <div onclick="setAppLanguage('de')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇩🇪 Deutsch</span><span style="font-size:11px;color:var(--text-dim);">DE</span></div>
            <div onclick="setAppLanguage('it')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇮🇹 Italiano</span><span style="font-size:11px;color:var(--text-dim);">IT</span></div>
            <div onclick="setAppLanguage('pt')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇵🇹 Português</span><span style="font-size:11px;color:var(--text-dim);">PT</span></div>
            <div onclick="setAppLanguage('ru')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇷🇺 Русский</span><span style="font-size:11px;color:var(--text-dim);">RU</span></div>
            <div onclick="setAppLanguage('zh')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇨🇳 中文</span><span style="font-size:11px;color:var(--text-dim);">ZH</span></div>
            <div onclick="setAppLanguage('ja')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇯🇵 日本語</span><span style="font-size:11px;color:var(--text-dim);">JA</span></div>
            <div onclick="setAppLanguage('ko')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇰🇷 한국어</span><span style="font-size:11px;color:var(--text-dim);">KO</span></div>
            <div onclick="setAppLanguage('ar')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇸🇦 العربية</span><span style="font-size:11px;color:var(--text-dim);">AR</span></div>
            <div onclick="setAppLanguage('tr')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇹🇷 Türkçe</span><span style="font-size:11px;color:var(--text-dim);">TR</span></div>
            <div onclick="setAppLanguage('vi')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇻🇳 Tiếng Việt</span><span style="font-size:11px;color:var(--text-dim);">VI</span></div>
            <div onclick="setAppLanguage('he')" class="lang-opt" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);font-weight:600;"><span>🇮🇱 עברית</span><span style="font-size:11px;color:var(--text-dim);">HE</span></div>
          </div>
        </div>

        <!-- Direct Login / Dashboard Button -->
        <a href="/auth/login" class="btn btn-secondary" id="navLoginBtn" data-i18n="nav_login">Log In</a>
        <a href="/launches" class="btn btn-primary" id="navDashboardBtn" style="display:none;" data-i18n="nav_dashboard">Dashboard &rarr;</a>
        <button class="mobile-toggle" aria-label="Toggle navigation" onclick="document.querySelector('.mobile-drawer').classList.toggle('open')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu (Clean UTF-8 & No Mojibake) -->
  <div class="mobile-drawer">
    <a href="/#features" class="mobile-nav-link" onclick="document.querySelector('.mobile-drawer').classList.remove('open')"><span>Features & Capabilities</span> &rarr;</a>
    <a href="/#channels" class="mobile-nav-link" onclick="document.querySelector('.mobile-drawer').classList.remove('open')"><span>30+ Social Networks</span> &rarr;</a>
    <a href="/agents.html" class="mobile-nav-link"><span>AI Agent Studio & MCP</span> &rarr;</a>
    <a href="/#pricing" class="mobile-nav-link" onclick="document.querySelector('.mobile-drawer').classList.remove('open')"><span>Pricing & Plans</span> &rarr;</a>
    
    <!-- Mobile Language Selector Row -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--bg-surface);border-radius:10px;margin-top:12px;border:1px solid var(--border);">
      <span style="font-size:13px;font-weight:700;color:var(--text);">Select Language</span>
      <select onchange="setAppLanguage(this.value)" style="background:transparent;color:var(--text);border:none;font-size:13px;font-weight:700;cursor:pointer;">
        <option value="en">🇬🇧 English</option>
        <option value="bn">🇧🇩 বাংলা (BN)</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="de">🇩🇪 Deutsch</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="pt">🇵🇹 Português</option>
        <option value="ru">🇷🇺 Русский</option>
        <option value="zh">🇨🇳 中文</option>
        <option value="ja">🇯🇵 日本語</option>
        <option value="ko">🇰🇷 한국어</option>
        <option value="ar">🇸🇦 العربية</option>
        <option value="tr">🇹🇷 Türkçe</option>
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="he">🇮🇱 עברית</option>
      </select>
    </div>

    <div style="display:flex;gap:12px;margin-top:20px;">
      <a href="/auth/login" class="btn btn-secondary" style="flex:1;text-align:center;">Log In</a>
      <a href="/launches" class="btn btn-primary" style="flex:1;text-align:center;">Dashboard</a>
    </div>
  </div>
  `;
}

function renderMasterFooter() {
  return `
  <!-- Master Global Navigation Footer -->
  <footer class="master-footer">
    <div class="container footer-grid">
      <!-- Brand Column -->
      <div class="footer-brand">
        <a href="/" class="brand" style="margin-bottom:14px;display:inline-flex;">
          <div class="brand-logo-wrap">
            ${postizLogoSvg}
          </div>
          <div class="brand-text-wrap">
            <span class="brand-name" style="font-size:18px;">Amana Flow</span>
            <span class="brand-sub">Sovereign Social Automation</span>
          </div>
        </a>
        <p class="footer-brand-desc">
          Official enterprise social media management, auto-scheduling, and AI multi-agent orchestration suite for Amana Mart & sovereign brands. Hosted on private dedicated NVMe infrastructure.
        </p>
        <div style="display:flex;align-items:center;gap:10px;margin-top:16px;">
          ${amanaFlowBadge}
          <span style="font-size:11px;color:var(--text-dim);">&bull; Temporal 1.28 Active</span>
        </div>
      </div>

      <!-- Channels Column -->
      <div class="footer-col">
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

      <!-- Developer & Resources Column (Housing Developer Docs & MCP) -->
      <div class="footer-col">
        <div class="footer-col-title">Developers & AI</div>
        <ul class="footer-links">
          <li><a href="/docs.html">Developer Docs & REST API</a></li>
          <li><a href="/agents.html">AI Agents Studio</a></li>
          <li><a href="/agents.html#postiz-mcp">Postiz MCP Server</a></li>
          <li><a href="/#architecture">VPS Node Specs</a></li>
          <li><a href="/auth/login">Login Portal</a></li>
        </ul>
      </div>

      <!-- Compliance & Legal Column -->
      <div class="footer-col">
        <div class="footer-col-title">Trust & Security</div>
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

    <!-- Bottom Copyright -->
    <div class="container footer-bottom">
      <div>&copy; ${new Date().getFullYear()} Amana Flow Postiz. All rights reserved. Operating under official platform partner developer policies.</div>
      <div style="display:flex;gap:20px;align-items:center;">
        <a href="/terms.html">Terms</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/data-deletion.html">Data Deletion</a>
        <a href="/docs.html">API Docs</a>
      </div>
    </div>
  </footer>
`;
}

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
       AUTHENTIC POSTIZ CALENDAR MOCKUP (Amana Flow Precision UI)
       ========================================================== */
    .mockup-wrapper {
      max-width: 1060px;
      margin: 0 auto 60px;
      background: #090b12;
      border: 1px solid rgba(0, 163, 255, 0.28);
      border-radius: 16px;
      box-shadow: 0 25px 65px -15px rgba(0, 0, 0, 0.85), 0 0 35px -8px rgba(0, 163, 255, 0.25);
      overflow: hidden;
      text-align: left;
    }

    .mockup-window-header {
      background: #06080d;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      font-size: 11.5px;
      color: var(--text-dim);
    }

    .mockup-window-dots {
      display: flex;
      gap: 6px;
    }

    .mockup-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }

    /* Mockup Layout: 3 Columns (Narrow Nav + Channels Sidebar + Calendar Main) */
    .mockup-app-layout {
      display: grid;
      grid-template-columns: 52px 230px 1fr;
      height: 500px;
      max-height: 500px;
      background: #090b12;
      overflow: hidden;
    }

    /* 1. Narrow Leftmost Icon Bar */
    .app-icon-bar {
      background: #05070a;
      border-right: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      gap: 16px;
      user-select: none;
    }

    .app-icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      color: var(--text-dim);
      font-size: 8.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
      position: relative;
      width: 100%;
      padding: 4px 0;
    }

    .app-icon-item.active, .app-icon-item:hover {
      color: #00FF9D;
    }

    .app-icon-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      border-radius: 0 3px 3px 0;
      background: linear-gradient(180deg, #00A3FF, #00FF9D);
      box-shadow: 0 0 10px #00FF9D;
    }

    .app-icon-item svg {
      width: 18px;
      height: 18px;
    }

    /* 2. Channels Panel */
    .app-channels-panel {
      background: #080a10;
      border-right: 1px solid rgba(255, 255, 255, 0.07);
      padding: 14px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .channels-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-weight: 700;
      font-size: 13px;
    }

    .channels-action-row {
      display: flex;
      gap: 6px;
    }

    .btn-add-channel {
      flex: 1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      color: #cbd5e1;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-add-channel:hover {
      background: rgba(0, 163, 255, 0.1);
      border-color: rgba(0, 163, 255, 0.3);
      color: #00A3FF;
    }

    .btn-create-post {
      background: linear-gradient(135deg, #00A3FF, #00FF9D);
      color: #0B0F19;
      border: none;
      border-radius: 6px;
      font-weight: 800;
      font-size: 11.5px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 3px 12px rgba(0, 163, 255, 0.35);
      transition: all 0.15s;
    }

    .btn-create-post:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    .channel-list-scroll {
      display: flex;
      flex-direction: column;
      gap: 5px;
      overflow-y: auto;
      flex: 1;
      padding-right: 2px;
    }

    .real-channel-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
    }

    .real-channel-item:hover, .real-channel-item.active {
      background: rgba(0, 163, 255, 0.08);
      border-color: rgba(0, 163, 255, 0.25);
    }

    .real-channel-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .channel-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: #fff;
      position: relative;
      flex-shrink: 0;
    }

    .real-channel-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .real-channel-name {
      font-size: 11.5px;
      font-weight: 600;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 125px;
      line-height: 1.2;
    }

    .real-channel-sub {
      font-size: 9.5px;
      color: var(--text-dim);
      line-height: 1.2;
    }

    /* 3. Calendar Main View */
    .app-calendar-main {
      display: flex;
      flex-direction: column;
      background: #090b12;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .calendar-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      background: #080a10;
    }

    .cal-title-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cal-main-heading {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .cal-date-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      padding: 3px 8px;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
    }

    .cal-view-selector {
      display: flex;
      align-items: center;
      gap: 2px;
      background: rgba(255, 255, 255, 0.03);
      padding: 2px;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.07);
    }

    .cal-view-btn {
      padding: 3px 9px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 4px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.15s;
    }

    .cal-view-btn.active {
      background: linear-gradient(135deg, rgba(0, 163, 255, 0.2), rgba(0, 255, 157, 0.2));
      border: 1px solid rgba(0, 255, 157, 0.4);
      color: #00FF9D;
    }

    /* Week Columns Grid (7 Equal Days) */
    .week-columns-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      background: #07090e;
    }

    .week-day-header {
      padding: 8px 4px;
      text-align: center;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 10.5px;
    }

    .week-day-header:last-child {
      border-right: none;
    }

    .week-day-header.today {
      background: rgba(0, 163, 255, 0.08);
      border-bottom: 2px solid #00FF9D;
    }

    .week-day-name {
      color: var(--text-dim);
      font-size: 9.5px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .week-day-header.today .week-day-name {
      color: #00FF9D;
    }

    .week-day-date {
      color: #fff;
      font-weight: 700;
      font-size: 11.5px;
      margin-top: 1px;
    }

    /* Calendar Events Body Grid */
    .cal-time-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 8px 0;
      height: 400px;
      overflow-y: auto;
      background: #090b12;
    }

    .cal-col {
      border-right: 1px solid rgba(255, 255, 255, 0.04);
      padding: 6px 4px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cal-col:last-child {
      border-right: none;
    }

    .cal-col.today-col {
      background: rgba(0, 163, 255, 0.03);
    }

    .cal-post-card {
      background: #0f131f;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      overflow: hidden;
      font-size: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: all 0.15s;
      cursor: pointer;
    }

    .cal-post-card:hover {
      border-color: rgba(0, 163, 255, 0.4);
      transform: translateY(-1px);
    }

    .cal-post-top {
      height: 3px;
      width: 100%;
    }

    .cal-post-inner {
      padding: 6px 7px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cal-post-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .cal-platform-tag {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 9px;
      font-weight: 700;
    }

    .cal-post-title {
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 10px;
    }

    .cal-post-thumb-box {
      width: 100%;
      height: 38px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      color: var(--text-dim);
      margin-top: 2px;
      gap: 4px;
    }

    .cal-post-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-dim);
      font-size: 9px;
      margin-top: 2px;
    }

    .status-pill {
      font-size: 8px;
      font-weight: 700;
      padding: 1.5px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .status-pill.published {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .status-pill.scheduled {
      background: rgba(0, 163, 255, 0.15);
      color: #00a3ff;
      border: 1px solid rgba(0, 163, 255, 0.3);
    }

    .status-pill.queued {
      background: rgba(245, 158, 11, 0.15);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }

    .status-pill.live {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
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
  <script>
    (function() {
      try {
        var p = new URLSearchParams(window.location.search);
        if (p.has('org')) {
          window.location.replace('/auth?org=' + encodeURIComponent(p.get('org')));
        } else if (p.has('added')) {
          window.location.replace('/launches');
        }
      } catch(e) {}
    })();
  </script>
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
  <section id="features" class="hero">
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

      <!-- Live Authentic Calendar Mockup (Amana Flow Precision UI) -->
      <div class="mockup-wrapper">
        <div class="mockup-window-header">
          <div class="mockup-window-dots">
            <span class="mockup-dot dot-red"></span>
            <span class="mockup-dot dot-yellow"></span>
            <span class="mockup-dot dot-green"></span>
          </div>
          <div style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>Amana Flow Postiz</span>
            <span style="opacity:0.4;">&bull;</span>
            <span style="color:#94a3b8;">VPS Node 148.230.98.190</span>
            <span style="opacity:0.4;">&bull;</span>
            <span style="color:#00A3FF;">Temporal 1.28 Active</span>
          </div>
          <div style="color:#00FF9D;font-weight:700;display:flex;align-items:center;gap:4px;">
            <span style="width:6px;height:6px;border-radius:50%;background:#00FF9D;box-shadow:0 0 8px #00FF9D;display:inline-block;"></span>
            Online
          </div>
        </div>

        <div class="mockup-app-layout">
          <!-- 1. Leftmost Icon Bar with Official AF Monogram at Top -->
          <div class="app-icon-bar">
            <!-- Official Brand Logo Monogram -->
            <div style="padding:4px 0 10px;display:flex;justify-content:center;width:100%;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:4px;" title="Amana Flow Social Orchestrator">
              <img src="/assets/logo.png" alt="Amana Flow" style="width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,163,255,0.45));cursor:pointer;" onclick="switchMockupTab('calendar', document.getElementById('mockTab_calendar'))" />
            </div>

            <div class="app-icon-item active" onclick="switchMockupTab('calendar', this)" id="mockTab_calendar" title="Calendar Launches">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Calendar</span>
            </div>
            <div class="app-icon-item" onclick="switchMockupTab('agent', this)" id="mockTab_agent" title="Autonomous AI Agent & Copilot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><rect x="4" y="10" width="16" height="12" rx="4"/></svg>
              <span>Agent</span>
            </div>
            <div class="app-icon-item" onclick="switchMockupTab('analytics', this)" id="mockTab_analytics" title="Cross-Platform Analytics">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <span>Analytics</span>
            </div>
            <div class="app-icon-item" onclick="switchMockupTab('media', this)" id="mockTab_media" title="Cloud Digital Media Hub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Media</span>
            </div>
            <div class="app-icon-item" onclick="switchMockupTab('plugs', this)" id="mockTab_plugs" title="OAuth2 Connected Channels">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
              <span>Channels</span>
            </div>
            <div class="app-icon-item" onclick="switchMockupTab('settings', this)" id="mockTab_settings" title="Workspace & Brand Customization">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span>Settings</span>
            </div>
          </div>

          <!-- Dynamic Mockup View Panes Container -->
          <div class="mockup-content-area" style="flex:1;display:flex;min-width:0;position:relative;overflow:hidden;background:#090b12;">
            
            <!-- PANE 1: CALENDAR VIEW (Active Default) -->
            <div id="mockView_calendar" class="mockup-view-pane active" style="width:100%;height:100%;display:flex;">
              
              <!-- Left: Connected Channels Panel -->
              <div class="app-channels-panel">
                <div class="channels-panel-header">
                  <span>Channels</span>
                  <span style="font-size:10px;background:rgba(0,255,157,0.12);color:#00FF9D;border:1px solid rgba(0,255,157,0.25);padding:1px 6px;border-radius:999px;font-weight:700;">6 Connected</span>
                </div>
                
                <div class="channels-action-row">
                  <button class="btn-add-channel">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Channel
                  </button>
                  <button class="btn-add-channel" style="flex:0 0 30px;padding:0;" title="Refresh Integrations">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                  </button>
                </div>

                <button class="btn-create-post">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Schedule Post
                </button>

                <!-- Real Connected Brand Channels with Authentic Logos -->
                <div class="channel-list-scroll">
                  <!-- YouTube -->
                  <div class="real-channel-item active">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:#FF0000;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Flow Studio</div>
                        <div class="real-channel-sub">YouTube &bull; 14.8K Subs</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>

                  <!-- Facebook Page -->
                  <div class="real-channel-item">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:#1877F2;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Mart Official</div>
                        <div class="real-channel-sub">Facebook &bull; 85K Fans</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>

                  <!-- TikTok -->
                  <div class="real-channel-item">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:#000000;border:1px solid rgba(255,255,255,0.15);">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#00FF9D"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Mart Deals</div>
                        <div class="real-channel-sub">TikTok &bull; 42K Followers</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>

                  <!-- Instagram -->
                  <div class="real-channel-item">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:linear-gradient(45deg,#f09433,#dc2743,#bc1888);">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Fashion</div>
                        <div class="real-channel-sub">Instagram &bull; 28K Fans</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>

                  <!-- LinkedIn -->
                  <div class="real-channel-item">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:#0A66C2;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Flow Tech</div>
                        <div class="real-channel-sub">LinkedIn &bull; 9.2K Subs</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>

                  <!-- X (Twitter) -->
                  <div class="real-channel-item">
                    <div class="real-channel-left">
                      <div class="channel-avatar" style="background:#000000;border:1px solid rgba(255,255,255,0.2);">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </div>
                      <div class="real-channel-info">
                        <div class="real-channel-name">Amana Mart Alert</div>
                        <div class="real-channel-sub">X &bull; 11K Followers</div>
                      </div>
                    </div>
                    <span style="color:#00FF9D;font-size:10px;">●</span>
                  </div>
                </div>
              </div>

              <!-- Right: Rich 7-Day Social Calendar -->
              <div class="app-calendar-main">
                <!-- Top Header Bar -->
                <div class="calendar-top-bar">
                  <div class="cal-title-left">
                    <div class="cal-main-heading">
                      <span>📅 Launches Calendar</span>
                    </div>
                    <div class="cal-date-nav">
                      <span style="cursor:pointer;">&larr;</span>
                      <span>09/28/2026 - 10/04/2026</span>
                      <span style="cursor:pointer;">&rarr;</span>
                      <span style="color:#00FF9D;cursor:pointer;font-weight:700;margin-left:4px;">Today</span>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="font-size:10.5px;color:var(--text-dim);background:rgba(255,255,255,0.04);padding:3px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.06);">All 6 Channels</div>
                    <div class="cal-view-selector">
                      <div class="cal-view-btn">Day</div>
                      <div class="cal-view-btn active">Week</div>
                      <div class="cal-view-btn">Month</div>
                    </div>
                  </div>
                </div>

                <!-- 7-Day Week Columns Header -->
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
                    <div class="week-day-name">Fri &bull; TODAY</div>
                    <div class="week-day-date" style="color:#00FF9D;">10/02</div>
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

                <!-- 7-Day Grid Filled with Realistic Scheduled Posts -->
                <div class="cal-time-grid">
                  <!-- Mon 09/28 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:#FF0000;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#FF0000;">▶ Shorts</span>
                          <span class="status-pill published">Published</span>
                        </div>
                        <div class="cal-post-title">AmanaMart Express: 60-Min Speed Test in Dhaka 🚀</div>
                        <div class="cal-post-thumb-box">▶ 0:45 Video</div>
                        <div class="cal-post-meta">
                          <span>11:00 AM</span>
                          <span style="color:#10b981;">👁 4.2k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tue 09/29 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:#1877F2;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#1877F2;">📘 Page</span>
                          <span class="status-pill published">Published</span>
                        </div>
                        <div class="cal-post-title">সাপ্তাহিক তাজা বাজার! টাটকা মাছ ও সবজিতে ১৫% বিশেষ ছাড় 🛒</div>
                        <div class="cal-post-meta">
                          <span>02:30 PM</span>
                          <span style="color:#1877F2;">👍 1.8k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Wed 09/30 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:linear-gradient(90deg,#f09433,#dc2743,#bc1888);"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#dc2743;">📸 Carousel</span>
                          <span class="status-pill published">Published</span>
                        </div>
                        <div class="cal-post-title">Festive Collection: Premium Panjabi & Handcrafted Sarees ✨</div>
                        <div class="cal-post-thumb-box">▤ 4 Slides</div>
                        <div class="cal-post-meta">
                          <span>05:00 PM</span>
                          <span style="color:#dc2743;">❤️ 3.1k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Thu 10/01 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:#00FF9D;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#00FF9D;">🎵 TikTok</span>
                          <span class="status-pill published">Published</span>
                        </div>
                        <div class="cal-post-title">Unboxing top gadgets delivered in 30 mins in Dhanmondi ⚡</div>
                        <div class="cal-post-thumb-box">🎵 Trending Audio</div>
                        <div class="cal-post-meta">
                          <span>07:15 PM</span>
                          <span style="color:#00FF9D;">👁 18.5k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Fri 10/02 (TODAY - Highlighted) -->
                  <div class="cal-col today-col">
                    <!-- Post 1 (Today Live) -->
                    <div class="cal-post-card" style="border-color:rgba(0,255,157,0.4);background:#0d141e;">
                      <div class="cal-post-top" style="background:linear-gradient(90deg, #00A3FF, #00FF9D);"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#00FF9D;">🔴 FB Live</span>
                          <span class="status-pill live">Published</span>
                        </div>
                        <div class="cal-post-title">লাইভ ফ্রাইডে মেগা সেল: গ্যাজেট ও অ্যাপ্লায়েন্সে ৫০% ক্যাশব্যাক! 🔥</div>
                        <div class="cal-post-meta">
                          <span>02:00 PM</span>
                          <span style="color:#00FF9D;">🔥 12.4k</span>
                        </div>
                      </div>
                    </div>

                    <!-- Post 2 (Today Scheduled) -->
                    <div class="cal-post-card" style="border-color:rgba(0,163,255,0.4);">
                      <div class="cal-post-top" style="background:#00A3FF;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#00A3FF;">💼 LinkedIn</span>
                          <span class="status-pill scheduled">Scheduled</span>
                        </div>
                        <div class="cal-post-title">Scaling Sovereign Social Orchestration Across South Asia 🌐</div>
                        <div class="cal-post-meta">
                          <span>06:30 PM</span>
                          <span style="color:#00A3FF;">Auto-Post</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Sat 10/03 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:#ffffff;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#ffffff;">𝕏 Thread</span>
                          <span class="status-pill scheduled">Scheduled</span>
                        </div>
                        <div class="cal-post-title">Why decentralized multi-channel automation beats legacy SaaS 🧵</div>
                        <div class="cal-post-meta">
                          <span>10:00 AM</span>
                          <span style="color:#94a3b8;">1/5 Posts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Sun 10/04 -->
                  <div class="cal-col">
                    <div class="cal-post-card">
                      <div class="cal-post-top" style="background:#EC4899;"></div>
                      <div class="cal-post-inner">
                        <div class="cal-post-header-row">
                          <span class="cal-platform-tag" style="color:#EC4899;">📸 Reel</span>
                          <span class="status-pill queued">In Queue</span>
                        </div>
                        <div class="cal-post-title">Weekend Flash Deals: Grocery & Organic Honey Restocked 🍯</div>
                        <div class="cal-post-meta">
                          <span>04:00 PM</span>
                          <span style="color:#f59e0b;">AI Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PANE 2: AI AGENT STUDIO -->
            <div id="mockView_agent" class="mockup-view-pane" style="width:100%;height:100%;padding:22px;overflow-y:auto;flex-direction:column;gap:18px;">
              <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;">
                <div>
                  <div style="font-size:17px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                    <span>🤖 Autonomous Multi-Agent AI Studio</span>
                    <span style="font-size:11px;background:rgba(0,163,255,0.15);color:#00a3ff;border:1px solid rgba(0,163,255,0.3);padding:2px 8px;border-radius:999px;">GPT-4o &bull; Claude &bull; Gemini</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-dim);margin-top:2px;">Compose once. Agent automatically crafts tailored copy for all 30 platforms.</div>
                </div>
                <div style="display:flex;gap:6px;">
                  <button style="background:rgba(0,163,255,0.2);color:#00a3ff;border:1px solid rgba(0,163,255,0.4);padding:5px 12px;border-radius:8px;font-size:12px;font-weight:700;">Claude 3.5 Sonnet</button>
                  <button style="background:rgba(255,255,255,0.05);color:var(--text-muted);border:1px solid var(--border);padding:5px 12px;border-radius:8px;font-size:12px;font-weight:600;">GPT-4o</button>
                  <button style="background:rgba(255,255,255,0.05);color:var(--text-muted);border:1px solid var(--border);padding:5px 12px;border-radius:8px;font-size:12px;font-weight:600;">Gemini 2.0</button>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:20px;">
                <!-- Left: Prompt Generator -->
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;">
                  <div style="font-size:13px;font-weight:700;color:var(--text);">Campaign Objective / Prompt</div>
                  <div style="background:rgba(0,0,0,0.4);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:13px;color:#fff;line-height:1.5;">
                    "Amana Mart-এর আসন্ন মেগা অফার ও এক্সক্লুসিভ ফ্যাশন কালেকশনের জন্য হাই-কনভার্টিং ভাইরাল ক্যাম্পেইন তৈরি করো। Facebook, TikTok, X এবং LinkedIn-এর জন্য আলাদা উপযোগী কপি ও ট্যাগলাইন রেডি করো।"
                  </div>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <span style="font-size:11px;background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px;color:var(--text-dim);">⚡ Viral Hook</span>
                    <span style="font-size:11px;background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px;color:var(--text-dim);">🎯 Conversion Focus</span>
                    <span style="font-size:11px;background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px;color:var(--text-dim);">🇧🇩 Culturally Authentic বাংলা</span>
                  </div>
                  <button style="background:linear-gradient(135deg, #00A3FF, #00FF9D);color:#0B0F19;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer;margin-top:auto;">
                    Generate Multi-Platform Copy 🪄
                  </button>
                </div>

                <!-- Right: Platform Adaptation Preview -->
                <div style="display:flex;flex-direction:column;gap:10px;">
                  <!-- FB Preview -->
                  <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                      <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#1877F2;">
                        <circle cx="6" cy="6" r="6" fill="#1877F2"/> 📘 Facebook Page Adaptation
                      </div>
                      <span style="font-size:11px;color:#10b981;font-weight:700;">Ready &bull; 92% Match</span>
                    </div>
                    <div style="font-size:12px;color:var(--text);line-height:1.4;">
                      🌙 ঈদ ও উৎসবের সেরা ফ্যাশনে সাজুন আমানা মার্ট-এর সাথে! ✨ প্রিমিয়াম কোয়ালিটি পাঞ্জাবি ও লাইফস্টাইল কালেকশনে চলছে অবিশ্বাস্য ছাড়। আজই অর্ডার করুন: amanamart.com #AmanaMart #FestiveFashion
                    </div>
                  </div>

                  <!-- X Preview -->
                  <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                      <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#fff;">
                        🖤 X (Twitter) Thread Post
                      </div>
                      <span style="font-size:11px;color:var(--text-dim);">142 / 280 chars</span>
                    </div>
                    <div style="font-size:12px;color:var(--text);line-height:1.4;">
                      🔥 Fast, sovereign, delivered in 60 mins. The new festive collection is officially live across all Dhaka hubs. Tap below to claim yours ⬇️ #DhakaDeals
                    </div>
                  </div>

                  <!-- LinkedIn Preview -->
                  <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                      <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#0A66C2;">
                        💼 LinkedIn Corporate
                      </div>
                      <span style="font-size:11px;color:#10b981;font-weight:700;">Executive Tone</span>
                    </div>
                    <div style="font-size:12px;color:var(--text);line-height:1.4;">
                      Scaling multi-channel delivery across South Asian retail: How Amana Mart achieved 99.8% on-time logistics SLA powered by automated Temporal scheduling workflows.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PANE 3: ANALYTICS DASHBOARD -->
            <div id="mockView_analytics" class="mockup-view-pane" style="width:100%;height:100%;padding:22px;overflow-y:auto;flex-direction:column;gap:18px;">
              <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;">
                <div>
                  <div style="font-size:17px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                    <span>📊 Cross-Platform Real-Time Analytics</span>
                    <span style="font-size:11px;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3);padding:2px 8px;border-radius:999px;">Live Sync</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-dim);margin-top:2px;">Aggregated metrics across Facebook, TikTok, YouTube, Instagram & LinkedIn.</div>
                </div>
                <div style="font-size:12px;color:var(--text-dim);background:var(--bg-surface);padding:6px 12px;border-radius:8px;border:1px solid var(--border);">Last 30 Days</div>
              </div>

              <!-- 4 KPI Cards -->
              <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:14px;">
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;font-weight:700;">Total Reach</div>
                  <div style="font-size:24px;font-weight:900;color:#fff;margin:4px 0;">2,842,910</div>
                  <div style="font-size:11.5px;color:#10b981;font-weight:700;">↑ +28.4% vs last mo</div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;font-weight:700;">Engagements</div>
                  <div style="font-size:24px;font-weight:900;color:#fff;margin:4px 0;">184,320</div>
                  <div style="font-size:11.5px;color:#10b981;font-weight:700;">↑ +34.1% vs last mo</div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;font-weight:700;">Launch Success</div>
                  <div style="font-size:24px;font-weight:900;color:#fff;margin:4px 0;">99.98%</div>
                  <div style="font-size:11.5px;color:#10b981;font-weight:700;">0 dropped launches</div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;font-weight:700;">Active Channels</div>
                  <div style="font-size:24px;font-weight:900;color:#fff;margin:4px 0;">30 / 30</div>
                  <div style="font-size:11.5px;color:#00a3ff;font-weight:700;">All tokens healthy</div>
                </div>
              </div>

              <!-- SVG Area Chart -->
              <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                  <div style="font-size:13px;font-weight:700;color:#fff;">Weekly Audience Impression Curves</div>
                  <div style="display:flex;gap:12px;font-size:11px;color:var(--text-dim);">
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#00A3FF;"></span> Facebook (42%)</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#00FF9D;"></span> TikTok (30%)</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#FF0000;"></span> YouTube (18%)</span>
                  </div>
                </div>
                <svg width="100%" height="130" viewBox="0 0 600 130" preserveAspectRatio="none" style="overflow:visible;">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#00A3FF" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#00A3FF" stop-opacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,110 Q80,70 150,90 T300,45 T450,60 T600,20 L600,130 L0,130 Z" fill="url(#chartGrad)"/>
                  <path d="M0,110 Q80,70 150,90 T300,45 T450,60 T600,20" fill="none" stroke="#00A3FF" stroke-width="2.5"/>
                  <path d="M0,120 Q80,95 150,85 T300,70 T450,40 T600,35" fill="none" stroke="#00FF9D" stroke-width="2" stroke-dasharray="4 3"/>
                </svg>
                <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--text-dim);">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            <!-- PANE 4: MEDIA HUB -->
            <div id="mockView_media" class="mockup-view-pane" style="width:100%;height:100%;padding:22px;overflow-y:auto;flex-direction:column;gap:18px;">
              <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;">
                <div>
                  <div style="font-size:17px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                    <span>🎨 Cloud Media Library & Polotno Studio</span>
                    <span style="font-size:11px;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);padding:2px 8px;border-radius:999px;">100 GB NVMe Storage</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-dim);margin-top:2px;">Centralized image and video assets with automatic 1:1, 9:16 and 16:9 transcoding.</div>
                </div>
                <button style="background:var(--primary);color:#fff;border:none;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Upload Media &uarr;</button>
              </div>

              <!-- Storage Bar -->
              <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:12px;">
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text);margin-bottom:6px;">
                  <span>Dedicated NVMe Storage Allocation</span>
                  <span style="color:#00a3ff;font-weight:700;">18.4 GB / 100 GB (18.4%)</span>
                </div>
                <div style="width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:999px;overflow:hidden;">
                  <div style="width:18.4%;height:100%;background:linear-gradient(90deg, #00A3FF, #00FF9D);"></div>
                </div>
              </div>

              <!-- Media Cards Grid -->
              <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:14px;">
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
                  <div style="height:100px;background:linear-gradient(135deg, #1e293b, #0f172a);display:flex;align-items:center;justify-content:center;color:#00a3ff;font-size:28px;">🎬</div>
                  <div style="padding:10px;">
                    <div style="font-size:12px;font-weight:700;color:#fff;">Eid_Promo_Reel.mp4</div>
                    <div style="font-size:11px;color:var(--text-dim);margin-top:2px;">9:16 &bull; 4K 60fps &bull; 24.8MB</div>
                  </div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
                  <div style="height:100px;background:linear-gradient(135deg, #334155, #1e293b);display:flex;align-items:center;justify-content:center;color:#00ff9d;font-size:28px;">🖼️</div>
                  <div style="padding:10px;">
                    <div style="font-size:12px;font-weight:700;color:#fff;">Panjabi_Banner_1200x630.png</div>
                    <div style="font-size:11px;color:var(--text-dim);margin-top:2px;">1.91:1 &bull; PNG &bull; 3.2MB</div>
                  </div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
                  <div style="height:100px;background:linear-gradient(135deg, #1e1b4b, #312e81);display:flex;align-items:center;justify-content:center;color:#a78bfa;font-size:28px;">📱</div>
                  <div style="padding:10px;">
                    <div style="font-size:12px;font-weight:700;color:#fff;">Square_Offer_1080x1080.webp</div>
                    <div style="font-size:11px;color:var(--text-dim);margin-top:2px;">1:1 &bull; WebP &bull; 180KB</div>
                  </div>
                </div>
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
                  <div style="height:100px;background:linear-gradient(135deg, #3b0764, #581c87);display:flex;align-items:center;justify-content:center;color:#ec4899;font-size:28px;">▶️</div>
                  <div style="padding:10px;">
                    <div style="font-size:12px;font-weight:700;color:#fff;">YouTube_Short_Cover.jpg</div>
                    <div style="font-size:11px;color:var(--text-dim);margin-top:2px;">Vertical &bull; JPG &bull; 420KB</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PANE 5: PLUGS / CHANNELS HEALTH -->
            <div id="mockView_plugs" class="mockup-view-pane" style="width:100%;height:100%;padding:22px;overflow-y:auto;flex-direction:column;gap:18px;">
              <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;">
                <div>
                  <div style="font-size:17px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                    <span>⚡ OAuth2 Connected Platform Gateways</span>
                    <span style="font-size:11px;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3);padding:2px 8px;border-radius:999px;">Zero-Expiry Active</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-dim);margin-top:2px;">Continuous token health monitor and automatic background token rotation.</div>
                </div>
                <button style="background:var(--bg-surface);color:#fff;border:1px solid var(--border);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;">+ Connect Channel</button>
              </div>

              <!-- Integration Cards -->
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:14px;">
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">Meta Graph API v21.0</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Facebook Pages & Instagram Professional</div>
                  <div style="font-size:11px;color:#00a3ff;">Auto-refreshed via Temporal 2h ago</div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">TikTok Commercial API</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Direct Video Posting & Sound Library</div>
                  <div style="font-size:11px;color:#00a3ff;">Quota: 1,000 daily uploads allowed</div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">YouTube Data API v3</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Shorts & Video Syndication</div>
                  <div style="font-size:11px;color:#00a3ff;">Verified Partner Token Active</div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">LinkedIn B2B Company</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Organization Page & Article Publishing</div>
                  <div style="font-size:11px;color:#00a3ff;">Full Admin Access Token</div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">X (Twitter) Developer v2</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Automated Threads & Polls</div>
                  <div style="font-size:11px;color:#00a3ff;">OAuth 2.0 PKCE Active</div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:700;font-size:14px;color:#fff;">Telegram Bot Broadcast</span>
                    <span style="color:#10b981;font-size:12px;font-weight:700;">● Online</span>
                  </div>
                  <div style="font-size:11.5px;color:var(--text-dim);margin:6px 0;">Instant Push to Channel Subscribers</div>
                  <div style="font-size:11px;color:#00a3ff;">Sub-second delivery latency</div>
                </div>
              </div>
            </div>

            <!-- PANE 6: SETTINGS & GOVERNANCE -->
            <div id="mockView_settings" class="mockup-view-pane" style="width:100%;height:100%;padding:22px;overflow-y:auto;flex-direction:column;gap:18px;">
              <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;">
                <div>
                  <div style="font-size:17px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                    <span>⚙️ Organization & Team Settings</span>
                    <span style="font-size:11px;background:rgba(255,255,255,0.08);color:#fff;padding:2px 8px;border-radius:999px;">Amana Mart HQ</span>
                  </div>
                  <div style="font-size:12.5px;color:var(--text-dim);margin-top:2px;">Role-based access control, billing configuration, and Postiz MCP API endpoints.</div>
                </div>
                <a href="/settings" class="btn btn-secondary" style="padding:6px 14px;font-size:12px;">Open Full Settings &rarr;</a>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:8px;">Team Collaborators (3 Active)</div>
                  <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span>Mahmudul Hassan</span>
                      <span style="background:rgba(0,163,255,0.15);color:#00a3ff;padding:2px 6px;border-radius:4px;font-weight:700;">Owner</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span>Social Content Lead</span>
                      <span style="background:rgba(16,185,129,0.15);color:#10b981;padding:2px 6px;border-radius:4px;font-weight:700;">Admin</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span>Marketing Copywriter</span>
                      <span style="background:rgba(255,255,255,0.06);color:var(--text-dim);padding:2px 6px;border-radius:4px;">Editor</span>
                    </div>
                  </div>
                </div>

                <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;">
                  <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:8px;">PipraPay Active Subscription</div>
                  <div style="font-size:12px;color:var(--text);line-height:1.6;">
                    Plan: <strong style="color:#00FF9D;">Pro Creator Tier</strong> (All 30 Channels)<br/>
                    Payment Gateway: <strong>PipraPay (bKash / Nagad / Visa)</strong><br/>
                    Status: <span style="color:#10b981;font-weight:700;">Active &bull; Renews in 28 Days</span>
                  </div>
                </div>
              </div>
            </div>

          </div></div>
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
        <button type="button" class="filter-btn active" onclick="filterChannels('all', this)">All 30 Channels</button>
        <button type="button" class="filter-btn" onclick="filterChannels('social', this)">Social Networks</button>
        <button type="button" class="filter-btn" onclick="filterChannels('video', this)">Video & Shorts</button>
        <button type="button" class="filter-btn" onclick="filterChannels('pro', this)">Professional & CMS</button>
        <button type="button" class="filter-btn" onclick="filterChannels('community', this)">Communities</button>
      </div>

      <div class="channels-grid">
        ${allChannels.map(c => `
          <div class="channel-card" data-cat="${c.cat}" style="cursor:pointer;" onclick="openChannelModal('${c.slug}')" title="Click to view ${c.name} integration details">
            <div class="channel-card-left" style="min-width:0;flex:1;">
              <div class="channel-card-icon" style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${c.icon}
              </div>
              <div style="min-width:0;flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
                  <span class="channel-card-name" style="font-size:15px;font-weight:700;color:#fff;">${c.name}</span>
                  <span class="channel-cat-pill">${c.cat.split(' ')[0]}</span>
                </div>
                <div class="channel-card-desc" style="font-size:12px;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${c.desc}
                </div>
              </div>
            </div>
            <div class="channel-card-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

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
  <section id="pricing" class="section-pricing" style="padding:100px 0;background:radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 70%);">
    <div class="container">
      <div style="text-align:center;max-width:760px;margin:0 auto 36px;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(0, 163, 255, 0.1);border:1px solid rgba(0, 163, 255, 0.3);padding:4px 14px;border-radius:999px;font-size:12px;font-weight:700;color:#00a3ff;margin-bottom:16px;">
          <span>⚡ Transparent & Sovereign Pricing</span>
        </div>
        <h2 style="font-family:var(--font-heading);font-size:clamp(30px, 3.8vw, 44px);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:12px;">
          Simple, Predictable Plans for Brands & Creators
        </h2>
        <p style="color:var(--text-muted);font-size:15px;line-height:1.6;" data-i18n="pricing_desc">
          No per-seat penalties. Unlock enterprise multi-agent automation with instant local & global checkout.
        </p>

        <!-- Centered Unified Controls: Billing Cycle + Currency Dropdown (ONLY BDT, USD, EUR) -->
        <div class="pricing-controls-wrapper">
          <!-- Billing Cycle Pill -->
          <div class="billing-pill">
            <button type="button" id="billingMonthlyBtn" onclick="setBillingCycle('monthly')" class="billing-btn active">Monthly</button>
            <button type="button" id="billingYearlyBtn" onclick="setBillingCycle('yearly')" class="billing-btn">
              <span>Yearly</span>
              <span class="save-badge">SAVE 20%</span>
            </button>
          </div>

          <!-- Currency Selector Dropdown (Strictly BDT, USD, EUR) -->
          <div style="position:relative;display:inline-block;">
            <button type="button" id="currencyDropdownBtn" onclick="toggleCurrencyDropdown(event)" style="display:flex;align-items:center;gap:8px;padding:9px 18px;background:var(--bg-surface);border:1px solid var(--border);border-radius:999px;color:var(--text);font-size:13.5px;font-weight:700;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
              <span id="curFlag">🇧🇩</span>
              <span id="curLabel">BDT (৳)</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div id="currencyDropdownMenu" style="display:none;position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--bg-surface);border:1px solid var(--border);border-radius:14px;box-shadow:0 20px 45px rgba(0,0,0,0.6);min-width:185px;padding:6px;z-index:99999;">
              <div onclick="selectCurrency('BDT')" class="cur-dropdown-item active" id="curOpt_BDT">
                <span style="font-size:18px;">🇧🇩</span>
                <div style="flex:1;text-align:left;">
                  <div style="font-weight:700;font-size:13px;color:#fff;">BDT (৳)</div>
                  <div style="font-size:11px;color:var(--text-dim);">Bangladeshi Taka</div>
                </div>
              </div>
              <div onclick="selectCurrency('USD')" class="cur-dropdown-item" id="curOpt_USD">
                <span style="font-size:18px;">🇺🇸</span>
                <div style="flex:1;text-align:left;">
                  <div style="font-weight:700;font-size:13px;color:#fff;">USD ($)</div>
                  <div style="font-size:11px;color:var(--text-dim);">US Dollar</div>
                </div>
              </div>
              <div onclick="selectCurrency('EUR')" class="cur-dropdown-item" id="curOpt_EUR">
                <span style="font-size:18px;">🇪🇺</span>
                <div style="flex:1;text-align:left;">
                  <div style="font-weight:700;font-size:13px;color:#fff;">EUR (€)</div>
                  <div style="font-size:11px;color:var(--text-dim);">Euro</div>
                </div>
              </div>
            </div>
          </div>
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
              <span id="priceStarter" style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">৳0</span>
              <span style="color:var(--text-dim);font-size:14px;"> / forever free</span>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text-muted);">
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Connect up to 3 Social Accounts</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 30 Scheduled Posts per Month</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Core Calendar Drag-and-Drop</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Basic Media Uploader (Images/Videos)</li>
              <li style="display:flex;align-items:center;gap:10px;color:var(--text-dim);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> <span style="text-decoration:line-through;">AI Multi-Agent Generation</span></li>
              <li style="display:flex;align-items:center;gap:10px;color:var(--text-dim);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> <span style="text-decoration:line-through;">PipraPay Automated Billing</span></li>
            </ul>
          </div>
          <a href="/auth" class="btn btn-secondary" style="width:100%;text-align:center;padding:14px;font-weight:700;">Get Started Free &rarr;</a>
        </div>

        <!-- Tier 2: Pro Creator (Highlighted) -->
        <div style="background:linear-gradient(180deg, rgba(28, 20, 52, 0.9) 0%, rgba(18, 15, 32, 0.95) 100%);border:2px solid #8b5cf6;border-radius:var(--radius-lg);padding:36px 30px;display:flex;flex-direction:column;justify-content:space-between;position:relative;box-shadow:0 20px 40px -10px rgba(124, 58, 237, 0.35);transition:transform 0.25s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg, #00A3FF, #00FF9D);color:#0B0F19;border-radius:999px;padding:4px 16px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">
            MOST POPULAR
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--font-heading);margin-bottom:6px;">Pro Creator</div>
            <p style="color:var(--text-muted);font-size:13.5px;min-height:38px;">For active e-commerce brands, agencies & content teams.</p>
            <div style="margin:24px 0 28px;">
              <span id="pricePro" style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">৳1,499</span>
              <span id="cyclePro" style="color:var(--text-dim);font-size:14px;"> / month</span>
              <div id="billedPro" style="font-size:11.5px;color:#10b981;font-weight:700;margin-top:4px;">Billed monthly via PipraPay</div>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text);">
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Unlimited Social Accounts</strong> (All 30 Channels)</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Unlimited Scheduled Launches</strong> via Temporal</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Multi-Agent AI Studio</strong> (GPT-4o, Claude, Gemini)</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Full Postiz MCP Server API Connectivity</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Up to 5 Dedicated Workspace Collaborators</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Instant Checkout</strong> (bKash/Nagad/Cards)</li>
            </ul>
          </div>
          <button onclick="openPipraPayModal('pro')" class="btn btn-primary" style="width:100%;text-align:center;padding:14px;font-weight:800;font-size:15px;cursor:pointer;">
            Subscribe with bKash / Nagad / Cards &rarr;
          </button>
        </div>

        <!-- Tier 3: Enterprise & Super-App -->
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:36px 30px;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.25s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--font-heading);margin-bottom:6px;">Agency & Super-App</div>
            <p style="color:var(--text-dim);font-size:13.5px;min-height:38px;">Complete multi-tenant isolation, whitelabeling & custom nodes.</p>
            <div style="margin:24px 0 28px;">
              <span id="priceEnterprise" style="font-size:42px;font-weight:900;color:#fff;font-family:var(--font-heading);">৳4,499</span>
              <span id="cycleEnterprise" style="color:var(--text-dim);font-size:14px;"> / month</span>
              <div id="billedEnterprise" style="font-size:11.5px;color:#10b981;font-weight:700;margin-top:4px;">Billed monthly via PipraPay</div>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:13px;padding:0;margin-bottom:32px;font-size:14px;color:var(--text-muted);">
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Dedicated VPS Node & Isolated Database</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Unlimited Workspaces & Team Members</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Custom CNAME & Fully Whitelabeled Domain</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Direct PostgreSQL 17 Database Read Access</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Automated Hourly Offsite S3 Backups</li>
              <li style="display:flex;align-items:center;gap:10px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 24/7 Priority WhatsApp & Dedicated Engineer</li>
            </ul>
          </div>
          <button onclick="openPipraPayModal('enterprise')" class="btn btn-secondary" style="width:100%;text-align:center;padding:14px;font-weight:700;">
            Launch Enterprise Suite &rarr;
          </button>
        </div>

      </div>
    </div>
  </section>

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
    // Channel Specs Data Store
    const channelSpecsData = ${JSON.stringify(allChannels.reduce((acc, c) => {
      acc[c.slug] = {
        name: c.name,
        slug: c.slug,
        category: c.cat,
        color: c.color,
        desc: c.desc
      };
      return acc;
    }, {}))};

    // 1. Channel Details Modal
    function openChannelModal(slug) {
      const data = channelSpecsData[slug];
      if (!data) return;
      document.getElementById('cmTitle').textContent = data.name + ' Integration Specs';
      document.getElementById('cmCat').textContent = data.category.toUpperCase();
      document.getElementById('cmDesc').textContent = data.desc;
      document.getElementById('cmDocsLink').href = '/channels/' + data.slug + '.html';
      document.getElementById('channelModalBackdrop').style.display = 'flex';
    }

    function closeChannelModal() {
      document.getElementById('channelModalBackdrop').style.display = 'none';
    }

    // 2. Mockup Interactive Tab Switcher (Calendar, Agent, Analytics, Media, Plugs, Settings)
    function switchMockupTab(tabId, el) {
      document.querySelectorAll('.app-icon-item').forEach(item => item.classList.remove('active'));
      if (el) el.classList.add('active');
      const targetBtn = document.getElementById('mockTab_' + tabId);
      if (targetBtn) targetBtn.classList.add('active');

      document.querySelectorAll('.mockup-view-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });

      const activePane = document.getElementById('mockView_' + tabId);
      if (activePane) {
        activePane.classList.add('active');
        activePane.style.display = 'flex';
      }
    }

    // 3. Channels Category Filter
    function filterChannels(cat, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      document.querySelectorAll('.channel-card').forEach(card => {
        const cardCat = card.getAttribute('data-cat') || '';
        if (cat === 'all' || cardCat.includes(cat)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 4. Theme Mode Switcher
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
      if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (icon) icon.textContent = '☀️';
      } else if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (icon) icon.textContent = '💻';
      } else {
        root.setAttribute('data-theme', 'dark');
        if (icon) icon.textContent = '🌙';
      }
    }

    // 5. 15-Language Localization (Setting i18next cookie for Postiz compatibility)
    const siteTranslations = {
      en: {
        nav_login: 'Log In',
        nav_dashboard: 'Open Dashboard →',
        pricing_desc: 'No per-seat penalties. Unlock enterprise multi-agent automation with instant local & global checkout.',
        subscribe_pro: 'Subscribe with bKash / Nagad / Cards →',
        subscribe_ent: 'Launch Enterprise Suite →'
      },
      bn: {
        nav_login: 'লগ ইন করুন',
        nav_dashboard: 'ড্যাশবোর্ড খুলুন →',
        pricing_desc: 'কোন সিট লিমিট নেই। বিকাশ, নগদ ও কার্ড দিয়ে তাৎক্ষণিক সাবস্ক্রিপশন নিয়ে মাল্টি-এজেন্ট সোশ্যাল অটোমেশন চালু করুন।',
        subscribe_pro: 'বিকাশ / নগদ দিয়ে সাবস্ক্রাইব করুন →',
        subscribe_ent: 'এন্টারপ্রাইজ সাবস্ক্রিপশন নিন →'
      }
    };

    const langMeta = {
      en: { flag: '🇬🇧', label: 'EN' },
      bn: { flag: '🇧🇩', label: 'BN' },
      es: { flag: '🇪🇸', label: 'ES' },
      fr: { flag: '🇫🇷', label: 'FR' },
      de: { flag: '🇩🇪', label: 'DE' },
      it: { flag: '🇮🇹', label: 'IT' },
      pt: { flag: '🇵🇹', label: 'PT' },
      ru: { flag: '🇷🇺', label: 'RU' },
      zh: { flag: '🇨🇳', label: 'ZH' },
      ja: { flag: '🇯🇵', label: 'JA' },
      ko: { flag: '🇰🇷', label: 'KO' },
      ar: { flag: '🇸🇦', label: 'AR' },
      tr: { flag: '🇹🇷', label: 'TR' },
      vi: { flag: '🇻🇳', label: 'VI' },
      he: { flag: '🇮🇱', label: 'HE' }
    };

    function toggleLangDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('langDropdownMenu');
      if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      const themeMenu = document.getElementById('themeDropdownMenu');
      if (themeMenu) themeMenu.style.display = 'none';
      const curMenu = document.getElementById('currencyDropdownMenu');
      if (curMenu) curMenu.style.display = 'none';
    }

    function setAppLanguage(lang) {
      localStorage.setItem('site_lang', lang);
      document.cookie = 'i18next=' + lang + '; path=/; max-age=31536000; SameSite=Lax';
      applyLanguage(lang);
      const menu = document.getElementById('langDropdownMenu');
      if (menu) menu.style.display = 'none';
    }

    function applyLanguage(lang) {
      const meta = langMeta[lang] || langMeta.en;
      const flag = document.getElementById('langFlagIcon');
      const label = document.getElementById('langTextLabel');
      if (flag) flag.textContent = meta.flag;
      if (label) label.textContent = meta.label;

      const dict = siteTranslations[lang] || siteTranslations.en;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
    }

    // 6. Multi-Currency 3-Tier Matrix (Strictly: BDT, USD, EUR - GBP & INR Removed)
    let currentCurrency = 'BDT';
    let currentBillingCycle = 'monthly';

    const pricingMatrix = {
      BDT: {
        flag: '🇧🇩',
        label: 'BDT (৳)',
        symbol: '৳',
        starter: { monthly: '৳0', yearly: '৳0' },
        pro: { monthly: 1499, yearly: 1199, strMonthly: '৳1,499', strYearly: '৳1,199' },
        enterprise: { monthly: 4499, yearly: 3599, strMonthly: '৳4,499', strYearly: '৳3,599' }
      },
      USD: {
        flag: '🇺🇸',
        label: 'USD ($)',
        symbol: '$',
        starter: { monthly: '$0', yearly: '$0' },
        pro: { monthly: 15, yearly: 12, strMonthly: '$15', strYearly: '$12' },
        enterprise: { monthly: 45, yearly: 36, strMonthly: '$45', strYearly: '$36' }
      },
      EUR: {
        flag: '🇪🇺',
        label: 'EUR (€)',
        symbol: '€',
        starter: { monthly: '€0', yearly: '€0' },
        pro: { monthly: 14, yearly: 11, strMonthly: '€14', strYearly: '€11' },
        enterprise: { monthly: 42, yearly: 34, strMonthly: '€42', strYearly: '€34' }
      }
    };

    function toggleCurrencyDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('currencyDropdownMenu');
      if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      const langMenu = document.getElementById('langDropdownMenu');
      if (langMenu) langMenu.style.display = 'none';
      const themeMenu = document.getElementById('themeDropdownMenu');
      if (themeMenu) themeMenu.style.display = 'none';
    }

    function selectCurrency(cur) {
      currentCurrency = cur;
      const curData = pricingMatrix[cur] || pricingMatrix.BDT;
      const flagEl = document.getElementById('curFlag');
      const labelEl = document.getElementById('curLabel');
      if (flagEl) flagEl.textContent = curData.flag;
      if (labelEl) labelEl.textContent = curData.label;

      document.querySelectorAll('.cur-dropdown-item').forEach(el => el.classList.remove('active'));
      const activeOpt = document.getElementById('curOpt_' + cur);
      if (activeOpt) activeOpt.classList.add('active');

      const menu = document.getElementById('currencyDropdownMenu');
      if (menu) menu.style.display = 'none';

      renderPricingCards();
    }

    function setBillingCycle(cycle) {
      currentBillingCycle = cycle;
      const mBtn = document.getElementById('billingMonthlyBtn');
      const yBtn = document.getElementById('billingYearlyBtn');

      if (cycle === 'yearly') {
        if (mBtn) mBtn.classList.remove('active');
        if (yBtn) yBtn.classList.add('active');
      } else {
        if (mBtn) mBtn.classList.add('active');
        if (yBtn) yBtn.classList.remove('active');
      }
      renderPricingCards();
    }

    function renderPricingCards() {
      const curData = pricingMatrix[currentCurrency] || pricingMatrix.BDT;
      const isYearly = currentBillingCycle === 'yearly';

      const pPro = isYearly ? curData.pro.strYearly : curData.pro.strMonthly;
      const pEnt = isYearly ? curData.enterprise.strYearly : curData.enterprise.strMonthly;
      const period = isYearly ? ' / month (billed annually)' : ' / month';

      const elPro = document.getElementById('pricePro');
      if (elPro) elPro.textContent = pPro;

      const cyclePro = document.getElementById('cyclePro');
      if (cyclePro) cyclePro.textContent = period;

      const elEnt = document.getElementById('priceEnterprise');
      if (elEnt) elEnt.textContent = pEnt;

      const cycleEnt = document.getElementById('cycleEnterprise');
      if (cycleEnt) cycleEnt.textContent = period;

      const billedPro = document.getElementById('billedPro');
      if (billedPro) {
        billedPro.textContent = isYearly ? 'Billed annually with 20% discount' : 'Billed monthly via PipraPay';
      }

      const billedEnt = document.getElementById('billedEnterprise');
      if (billedEnt) {
        billedEnt.textContent = isYearly ? 'Billed annually with 20% discount' : 'Billed monthly via PipraPay';
      }
    }

    // 7. PipraPay Modal Integration
    let activeModalPlan = 'pro';
    function openPipraPayModal(planKey) {
      activeModalPlan = planKey;
      const curData = pricingMatrix[currentCurrency] || pricingMatrix.BDT;
      const isYearly = currentBillingCycle === 'yearly';
      const planName = planKey === 'enterprise' ? 'Agency & Super-App' : 'Pro Creator';
      const planAmount = isYearly 
        ? (planKey === 'enterprise' ? curData.enterprise.yearly * 12 : curData.pro.yearly * 12) 
        : (planKey === 'enterprise' ? curData.enterprise.monthly : curData.pro.monthly);

      document.getElementById('ppPlanName').textContent = planName + ' Plan (' + currentBillingCycle.toUpperCase() + ')';
      document.getElementById('ppPlanPrice').textContent = curData.symbol + planAmount.toLocaleString('en-US');

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
      document.querySelectorAll('#ppMfsOptions > div').forEach(d => {
        d.style.borderColor = 'var(--border)';
        d.style.background = 'rgba(255,255,255,0.02)';
      });
      elem.style.borderColor = 'var(--primary)';
      elem.style.background = 'rgba(124, 58, 237, 0.12)';
    }

    function executePipraPayRedirect() {
      const curData = pricingMatrix[currentCurrency] || pricingMatrix.BDT;
      const isYearly = currentBillingCycle === 'yearly';
      const planAmount = isYearly 
        ? (activeModalPlan === 'enterprise' ? curData.enterprise.yearly * 12 : curData.pro.yearly * 12) 
        : (activeModalPlan === 'enterprise' ? curData.enterprise.monthly : curData.pro.monthly);

      const btn = document.getElementById('ppSubmitBtn');
      if (btn) {
        btn.textContent = 'Redirecting to Gateway...';
        btn.disabled = true;
      }

      const checkoutUrl = 'https://pay.amanaflow.com/pay' +
        '?amount=' + encodeURIComponent(planAmount) +
        '&currency=' + encodeURIComponent(currentCurrency) +
        '&order_id=ORD-PF-' + Date.now() +
        '&customer_name=' + encodeURIComponent('Amana Flow Subscriber') +
        '&customer_email=' + encodeURIComponent('billing@amanaflow.com') +
        '&desc=' + encodeURIComponent('Amana Flow Postiz - ' + activeModalPlan.toUpperCase() + ' (' + currentCurrency + ')') +
        '&success_url=' + encodeURIComponent(window.location.origin + '/launches?subscribed=true&plan=' + activeModalPlan) +
        '&cancel_url=' + encodeURIComponent(window.location.origin + '/#pricing');

      window.location.href = checkoutUrl;
    }

    // Close dropdowns on outside click
    window.addEventListener('click', () => {
      const themeMenu = document.getElementById('themeDropdownMenu');
      if (themeMenu) themeMenu.style.display = 'none';
      const langMenu = document.getElementById('langDropdownMenu');
      if (langMenu) langMenu.style.display = 'none';
      const curMenu = document.getElementById('currencyDropdownMenu');
      if (curMenu) curMenu.style.display = 'none';
    });

    // 8. Dynamic Auth Detection
    (function syncAuthHeader() {
      try {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const hasAuth = cookies.some(c => c.startsWith('auth=') && c.split('=')[1].length > 10);
        const loginBtn = document.getElementById('navLoginBtn');
        const dashBtn = document.getElementById('navDashboardBtn');
        const mLogin = document.getElementById('mobileNavLogin');
        const mDash = document.getElementById('mobileNavDash');

        if (hasAuth) {
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

    // Initialize Theme and Language on load
    applyTheme(localStorage.getItem('site_theme') || 'dark');
    applyLanguage(localStorage.getItem('site_lang') || 'en');
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
          <a href="/auth/login" class="btn btn-secondary">Login Portal</a>
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
