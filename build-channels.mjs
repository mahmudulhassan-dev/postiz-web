import fs from 'fs';
import path from 'path';

const channelsDir = path.resolve('channels');
if (!fs.existsSync(channelsDir)) {
  fs.mkdirSync(channelsDir, { recursive: true });
}

// Brand Logo SVG for PostFlow
const postFlowLogoSvg = `
<svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pf-bg-grad-ch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181528" />
      <stop offset="100%" stop-color="#0d0f17" />
    </linearGradient>
    <linearGradient id="pf-stroke-grad-ch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <linearGradient id="pf-flow-grad-ch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#00f2fe" />
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#pf-bg-grad-ch)" stroke="url(#pf-stroke-grad-ch)" stroke-width="1.8" />
  <path d="M12 28V12C12 10.8954 12.8954 10 14 10H21.5C25.6421 10 29 13.3579 29 17.5C29 21.6421 25.6421 25 21.5 25H17.5V28C17.5 28.5523 17.0523 29 16.5 29H13C12.4477 29 12 28.5523 12 28Z" fill="url(#pf-flow-grad-ch)" />
  <path d="M17.5 14.5H21.5C23.1569 14.5 24.5 15.8431 24.5 17.5C24.5 19.1569 23.1569 20.5 21.5 20.5H17.5V14.5Z" fill="#0d0f17" />
  <circle cx="28" cy="27" r="3.2" fill="#00f2fe" />
</svg>
`;

// 30 Channels data with real SVG brand icons and individual copy
const channels = [
  {
    slug: 'facebook',
    name: 'Facebook',
    tagline: 'Schedule Facebook Posts, Reels & Stories in Bulk',
    badge: 'Official Meta Graph API Integration',
    accent: '#1877f2',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    desc: 'Automate content distribution across all Amana Flow Facebook brand pages, local retail branches, and private community groups from one visual calendar.',
    features: [
      { title: 'Multi-Page Bulk Queue', desc: 'Schedule 100+ updates in advance for Amana Mart Uttara, Lakshmipur, Fashion, and Express pages simultaneously.' },
      { title: 'Facebook Reels & Video', desc: 'Auto-publish 1080x1920 vertical videos with custom thumbnails and optimal posting schedules.' },
      { title: 'Unified Comment Inbox', desc: 'Read and reply to comments across all brand pages from one unified dashboard.' },
      { title: 'Meta Platform Compliance', desc: 'Compliant with Meta Developer Terms. Tokens are stored encrypted on our private VPS.' }
    ]
  },
  {
    slug: 'instagram',
    name: 'Instagram',
    tagline: 'Visual Feed, Reels & Multi-Image Carousel Planner',
    badge: 'Official Instagram Graph API Integration',
    accent: '#e4405f',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffd600"/><stop offset="25%" stop-color="#ff0100"/><stop offset="50%" stop-color="#d800b9"/><stop offset="100%" stop-color="#7000ff"/></linearGradient></defs><radialGradient id="ig-rad" cx="20%" cy="110%" r="90%"><stop offset="0%" stop-color="#ffd600"/><stop offset="10%" stop-color="#ffd600"/><stop offset="50%" stop-color="#ff0100"/><stop offset="100%" stop-color="#d800b9"/></radialGradient><rect width="24" height="24" rx="6" fill="url(#ig-grad)"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="#fff"/></svg>`,
    desc: 'Curate aesthetic 9-grid layouts, queue viral Reels, and schedule product carousels for @amanamartbd with zero manual push alerts.',
    features: [
      { title: 'Direct Reels Publishing', desc: 'Upload vertical reels up to 500MB directly to your Instagram Business account.' },
      { title: 'Visual 9-Grid Preview', desc: 'Plan your profile grid visually to maintain an impeccable brand look.' },
      { title: 'Auto-First Comment', desc: 'Keep your caption clean by scheduling targeted hashtags in the first comment.' },
      { title: 'Multi-Slide Carousels', desc: 'Upload up to 10 product images or lookbook cards in a single seamless carousel.' }
    ]
  },
  {
    slug: 'threads',
    name: 'Threads',
    tagline: 'Microblogging & Conversational Publishing by Meta',
    badge: 'Official Threads API Integration',
    accent: '#000000',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12.001 2c-5.523 0-10 4.477-10 10s4.477 10 10 10c2.58 0 4.938-.977 6.732-2.583l-1.42-1.42C15.89 19.345 14.04 20 12.001 20a8 8 0 118-8c0 .874-.15 1.713-.42 2.493l1.895.632C21.84 14.062 22 13.05 22 12c0-5.523-4.477-10-10-10zm2.7 7.7a3.5 3.5 0 00-4.95 0l-.7.7a3.5 3.5 0 000 4.95l.7.7a3.5 3.5 0 004.95 0l.7-.7a3.5 3.5 0 000-4.95l-.7-.7z"/></svg>`,
    desc: 'Share short-form text insights, brand announcements, and conversation starters directly into the Meta Threads ecosystem.',
    features: [
      { title: 'Cross-Post from X', desc: 'Write once and publish instantly to both Threads and X with platform-adapted formatting.' },
      { title: 'Thread Chaining', desc: 'Queue multi-part storytelling posts with automatic linking.' },
      { title: 'Image & Video Posts', desc: 'Support for rich media attachments and high-resolution photography.' },
      { title: 'Conversation Starter Queue', desc: 'Schedule engaging community prompts at optimal active hours.' }
    ]
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn',
    tagline: 'B2B Thought Leadership & Company Page Distribution',
    badge: 'Official LinkedIn Community Management API',
    accent: '#0a66c2',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    desc: 'Publish high-authority industry perspectives, PDF slide documents, and corporate milestones to Amana Suite and Amana Flow LinkedIn pages.',
    features: [
      { title: 'Company & Personal Profiles', desc: 'Manage official organization pages and executive profiles from one compose box.' },
      { title: 'PDF Carousel Decks', desc: 'Upload document slides that maximize algorithmic dwell time and engagement.' },
      { title: 'B2B Engagement Analytics', desc: 'Measure impressions, click-through rates, and industry demographic reach.' },
      { title: 'Enterprise Token Security', desc: 'Encrypted token storage adhering strictly to LinkedIn developer policies.' }
    ]
  },
  {
    slug: 'bluesky',
    name: 'Bluesky',
    tagline: 'Decentralized Social Networking via the AT Protocol',
    badge: 'Official AT Protocol Integration',
    accent: '#0284c7',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0284c7"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.874-1.113 7.823-4.308.949 3.195 2.81 9.498 7.823 4.308 4.557-5.073 1.082-6.498-2.83-7.078-.139-.016-.277-.034-.415-.056.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.689-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg>`,
    desc: 'Connect to the open federated web. Broadcast brand announcements to custom algorithmic feeds on Bluesky with custom facets and alt text.',
    features: [
      { title: 'AT Protocol Native', desc: 'Direct protocol publishing with app passwords and decentralized domain handles.' },
      { title: 'Rich Facets & Links', desc: 'Automatic link card generation and mention parsing for open social feeds.' },
      { title: 'Alt-Text Accessibility', desc: 'Enforce accessibility with rich descriptive image tags before queueing.' },
      { title: 'No Algorithmic Throttling', desc: 'Reach your audience without closed-garden algorithmic suppression.' }
    ]
  },
  {
    slug: 'x',
    name: 'X (Twitter)',
    tagline: 'Real-Time Updates, Polls & Long-Form Threads',
    badge: 'Official X API Integration',
    accent: '#000000',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    desc: 'Schedule fast-paced viral announcements, multi-tweet threads, and market updates with automatic character count validation.',
    features: [
      { title: 'Thread Scheduler', desc: 'Draft multi-tweet threads with auto-numbering and scheduled spacing.' },
      { title: 'Media & Video Upload', desc: 'Publish MP4 videos, GIFs, and image sets optimized for the X timeline.' },
      { title: 'Optimal Post Timing', desc: 'Publish at peak engagement hours calculated by audience analytics.' },
      { title: 'Rate-Limit Guard', desc: 'Temporal-backed queue ensures you never exceed platform tier limits.' }
    ]
  },
  {
    slug: 'tiktok',
    name: 'TikTok',
    tagline: 'Official TikTok Content Posting API & Video Publishing',
    badge: 'Official TikTok Content Posting API',
    accent: '#00f2fe',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><rect width="24" height="24" rx="6" fill="#000"/><path d="M16.6 5.82s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V2.5h3.3v3.32z" fill="#00f2fe"/><path d="M15.4 4.62s.51.5 1.45.54a5.3 5.3 0 003.95-1.57V6.8a8.2 8.2 0 01-5.4-2.18v8.68a5.5 5.5 0 11-4.7-5.44v3.3a2.3 2.3 0 101.4 2.14V1.3h3.3v3.32z" fill="#fe0979"/></svg>`,
    desc: 'Publish high-converting TikTok videos directly from your content calendar. Verified permissions for user.info.basic and video.publish.',
    features: [
      { title: 'Direct Video Publishing', desc: 'Upload vertical 1080x1920 MP4/MOV videos up to 500MB directly to TikTok.' },
      { title: 'Privacy & Interaction Settings', desc: 'Set Public, Friends, or Private visibility and configure Duet/Stitch permissions.' },
      { title: 'Automated Queue Execution', desc: 'Temporal engine uploads and schedules video assets reliably at exact hours.' },
      { title: 'Developer Review Compliant', desc: 'Adheres strictly to TikTok Developer Terms with secure token encryption.' }
    ]
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    tagline: 'Automate YouTube Shorts & Long-Form Video Releases',
    badge: 'Official YouTube Data API v3 Integration',
    accent: '#ff0000',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    desc: 'Manage video publishing for @amanaflow and @amana-academy. Upload webinars, course modules, and viral shorts on a schedule.',
    features: [
      { title: 'YouTube Shorts Auto-Publish', desc: 'Queue 9:16 vertical videos with titles, descriptions, and hashtags.' },
      { title: 'Long-Form Video Uploads', desc: 'Chunked multi-gigabyte video upload pipeline with privacy toggles.' },
      { title: 'Google Limited Use Compliant', desc: 'Strict adherence to Google API Services User Data Policy.' },
      { title: 'Multi-Channel Management', desc: 'Switch between educational and corporate channels in one click.' }
    ]
  },
  {
    slug: 'google-my-business',
    name: 'Google My Business',
    tagline: 'Local Search & Google Maps Post Automation',
    badge: 'Official Google Business Profile API',
    accent: '#22c55e',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    desc: 'Keep local branch listings for Amana Mart updated with seasonal discounts, store hours, and product launches on Google Search & Maps.',
    features: [
      { title: 'Local Promotional Posts', desc: 'Broadcast retail offers directly to local shoppers browsing Google Maps.' },
      { title: 'Branch Location Sync', desc: 'Push store updates across multiple retail branch profiles simultaneously.' },
      { title: 'Call-to-Action Buttons', desc: 'Include Buy Now, Learn More, and Call buttons on scheduled Google posts.' },
      { title: 'Search Engine Visibility', desc: 'Boost organic local SEO with recurring, fresh content updates.' }
    ]
  },
  {
    slug: 'reddit',
    name: 'Reddit',
    tagline: 'Targeted Subreddit Discussions & Community Marketing',
    badge: 'Official Reddit OAuth API',
    accent: '#ff4500',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ff4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 4.14a.5.5 0 0 0-.085.701c.732.898 2.02 1.233 2.8 1.233.78 0 2.068-.335 2.8-1.233a.5.5 0 1 0-.776-.63c-.527.648-1.48.913-2.024.913-.544 0-1.497-.265-2.024-.913a.5.5 0 0 0-.69-.071z"/></svg>`,
    desc: 'Share open-source tutorials, technical case studies, and product discussions to relevant developer subreddits with markdown formatting.',
    features: [
      { title: 'Subreddit Flair Support', desc: 'Select appropriate post tags and flairs required by community moderators.' },
      { title: 'Markdown Syntax Rendering', desc: 'Full markdown support for code blocks, bullet points, and link formatting.' },
      { title: 'Karma-Safe Throttling', desc: 'Smart rate-limiting prevents spam filters and preserves domain reputation.' },
      { title: 'Multi-Community Queues', desc: 'Schedule posts across complementary subreddits over staggered days.' }
    ]
  },
  {
    slug: 'telegram',
    name: 'Telegram',
    tagline: 'Broadcast Channel Publishing & Automated Bot Feeds',
    badge: 'Official Telegram Bot API',
    accent: '#229ed9',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#229ed9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>`,
    desc: 'Deliver real-time corporate updates, system announcements, and blog posts straight to your Telegram subscribers with instant push delivery.',
    features: [
      { title: 'Channel & Group Broadcasts', desc: 'Push rich media messages to private groups or public broadcast channels.' },
      { title: 'HTML & Markdown Tags', desc: 'Format messages with bold headlines, inline buttons, and spoiler tags.' },
      { title: 'Instant Media Preview', desc: 'Send high-resolution photos and video files directly without link unfurling delays.' },
      { title: 'Zero Rate-Limit Delays', desc: 'Fast, asynchronous delivery executed through our self-hosted message queue.' }
    ]
  },
  {
    slug: 'discord',
    name: 'Discord',
    tagline: 'Community Server Webhooks & Announcement Channels',
    badge: 'Official Discord Webhook & Bot API',
    accent: '#5865f2',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
    desc: 'Keep developers, students, and community members engaged by broadcasting blog alerts and release notes to Discord announcement channels.',
    features: [
      { title: 'Rich Embed Cards', desc: 'Craft styled embeds with custom colors, thumbnail images, and clickable author fields.' },
      { title: 'Multi-Server Webhooks', desc: 'Post to dozens of Discord community servers using secure incoming webhooks.' },
      { title: 'Role Mention Support', desc: 'Optionally notify specific roles (@everyone, @subscribers) on major milestones.' },
      { title: 'Automated Event Reminders', desc: 'Schedule countdown alerts leading up to webinars and product demos.' }
    ]
  },
  {
    slug: 'slack',
    name: 'Slack',
    tagline: 'Internal Team Notifications & Enterprise Workspaces',
    badge: 'Official Slack API Integration',
    accent: '#4a154b',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#e01e5a"/></svg>`,
    desc: 'Align marketing, sales, and executive teams by streaming published social posts and marketing calendar updates directly to internal Slack channels.',
    features: [
      { title: 'Marketing Team Alerts', desc: 'Notify stakeholders the moment a campaign post goes live across social networks.' },
      { title: 'Block Kit Formatting', desc: 'Visually rich message layouts with direct links to live social URLs.' },
      { title: 'Approval Workflows', desc: 'Stream post approval requests to managers for fast 1-click sign-off.' },
      { title: 'Multi-Workspace Routing', desc: 'Route retail alerts to Amana Mart channels and corporate updates to Amana Suite.' }
    ]
  },
  {
    slug: 'pinterest',
    name: 'Pinterest',
    tagline: 'Visual Search Discovery & Product Pin Boards',
    badge: 'Official Pinterest API Integration',
    accent: '#bd081c',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#bd081c"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.94-.13-2.39.03-3.42l1.1-4.7s-.28-.56-.28-1.39c0-1.3.75-2.28 1.7-2.28.8 0 1.18.6 1.18 1.32 0 .8-.52 2-.78 3.11-.22.94.47 1.71 1.4 1.71 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85-2.69 0-4.27 2.02-4.27 4.1 0 .81.31 1.68.7 2.16a.35.35 0 0 1 .08.34c-.09.37-.29 1.19-.33 1.35-.05.22-.17.27-.4.16-1.49-.69-2.42-2.87-2.42-4.62 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.34-1.49 3.13A12 12 0 1 0 12 0z"/></svg>`,
    desc: 'Drive visual e-commerce traffic to Amana Mart products. Schedule high-resolution vertical pins to targeted boards with direct shop links.',
    features: [
      { title: 'Product Board Pinning', desc: 'Organize apparel, electronics, and lifestyle products into structured boards.' },
      { title: 'Direct Product URLs', desc: 'Attach high-intent outbound e-commerce links to every scheduled pin.' },
      { title: 'Rich Pin Optimization', desc: 'Format metadata to trigger Pinterest search recommendations and keywords.' },
      { title: 'High-DPI Image Storage', desc: 'Retain crisp image clarity without pixel degradation or compression.' }
    ]
  },
  {
    slug: 'dribbble',
    name: 'Dribbble',
    tagline: 'Design Portfolio Showcase & Creative Shots',
    badge: 'Official Dribbble API Integration',
    accent: '#ea4c89',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ea4c89"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.88 5.62a10.03 10.03 0 0 1 2.45 6.33c-.35-.07-2.74-.53-5.37.19-.07-.16-.14-.32-.21-.49a21.6 21.6 0 0 0-1.84-3.66c3.21-1.24 4.8-2.28 4.97-2.37zm-7.9 1.76c.64 1.25 1.22 2.5 1.72 3.73-3.13 1-6.72.95-7.39.95a10.04 10.04 0 0 1 5.67-4.68zm-7.6 6.32c.32 0 3.32.03 6.33-.87.23.47.45.95.66 1.44-4.8 1.46-6.63 4.28-6.78 4.52a9.97 9.97 0 0 1-.21-5.09zm2.46 6.64c.2-.28 1.83-2.6 6.43-4.14.7 1.86 1.19 3.82 1.43 4.97-2.67 1.1-5.7.83-7.86-.83zm9.64-.17c-.22-1.04-.69-2.88-1.34-4.64 2.46-.75 4.62-.27 4.97-.18a10.02 10.02 0 0 1-3.63 4.82zM17.8 13.9c-.3-.08-2.14-.5-4.43.2a19.78 19.78 0 0 1-1.63-3.55c.08-.03.16-.06.24-.09 2.92-.93 5.34.1 5.82.34z"/></svg>`,
    desc: 'Showcase design systems, UI/UX mockups, and mobile app graphics from the Amana Flow product team to the global creative community.',
    features: [
      { title: 'High-Res Shot Uploads', desc: 'Schedule 1600x1200 creative shots and animated GIF previews effortlessly.' },
      { title: 'Project Tagging', desc: 'Categorize shots by branding, web design, mobile UI, and 3D illustration.' },
      { title: 'Portfolio Consistency', desc: 'Maintain an active agency presence without daily manual portfolio uploads.' },
      { title: 'Engagement Metrics', desc: 'Track views, saves, and likes from design directors and talent recruiters.' }
    ]
  },
  {
    slug: 'mastodon',
    name: 'Mastodon',
    tagline: 'Fediverse Decentralized Social Publishing',
    badge: 'Official Mastodon ActivityPub API',
    accent: '#6364ff',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#6364ff"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C16.42.096 14.156 0 12.001 0c-2.155 0-4.42.096-5.963.309-2.687.394-4.954 2.426-5.304 5.004C.358 8.083.25 11.235.25 14.07c.05 3.18.32 6.353 1.942 9.07 1.637 2.743 4.665 3.398 7.42 3.58 2.062.137 4.126.069 6.182-.206a8.55 8.55 0 0 0 2.227-.663v-2.287c-.77.29-1.574.49-2.392.597-2.072.274-4.225.297-6.262-.229-1.258-.32-1.92-1.246-2.046-2.493a10.966 10.966 0 0 1-.035-1.12c1.722.423 3.504.64 5.294.646 1.708-.006 3.415-.205 5.074-.593 2.92-.684 5.48-2.73 5.76-5.748.33-3.56.24-7.14-.14-10.72zM17.41 15.012h-2.502v-6.38c0-1.39-.58-2.096-1.74-2.096-1.282 0-1.923.827-1.923 2.48v3.58h-2.49v-3.58c0-1.653-.641-2.48-1.923-2.48-1.16 0-1.74.706-1.74 2.096v6.38H2.59V8.293c0-1.39.355-2.494 1.066-3.313.73-.819 1.688-1.238 2.873-1.238 1.374 0 2.417.528 3.13 1.583L10.999 7.4l1.34-2.075c.713-1.055 1.756-1.583 3.13-1.583 1.185 0 2.143.419 2.873 1.238.711.819 1.066 1.923 1.066 3.313v6.72z"/></svg>`,
    desc: 'Publish open posts to any federated Mastodon instance. Reach censorship-resistant tech communities across the ActivityPub network.',
    features: [
      { title: 'Custom Instance Support', desc: 'Connect to mastodon.social or your private corporate Fediverse instance.' },
      { title: 'Content Warnings (CW)', desc: 'Add sensitive content flags and collapse teasers on technical spoilers.' },
      { title: 'Open Protocol Freedom', desc: 'No algorithm manipulation — every follower sees your posts chronologically.' },
      { title: 'Rich Media Attachments', desc: 'Attach photos, audio, and videos with custom focal points.' }
    ]
  },
  {
    slug: 'whop',
    name: 'Whop',
    tagline: 'Monetized Digital Community & Software Marketplace',
    badge: 'Official Whop API Integration',
    accent: '#ff6200',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ff6200"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    desc: 'Schedule digital product drops, software updates, and exclusive membership announcements directly to paying subscribers on Whop.',
    features: [
      { title: 'Gated Membership Posts', desc: 'Broadcast announcements to verified tier members and software buyers.' },
      { title: 'Product Launch Timers', desc: 'Coordinate discount code drops across social channels and Whop feeds.' },
      { title: 'Developer Changelogs', desc: 'Push API and software release notes to developer community hubs.' },
      { title: 'Direct Checkout Links', desc: 'Drive high-converting traffic directly into Whop marketplace checkout flows.' }
    ]
  },
  {
    slug: 'twitch',
    name: 'Twitch',
    tagline: 'Live Stream Announcements & Creator Feeds',
    badge: 'Official Twitch API Integration',
    accent: '#9146ff',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#9146ff"><path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582H12l-3.045 3.045v-3.045H4.119V2.149h17.194v11.463zm-3.582-7.343v6.269h-2.149V6.269h2.149zm-5.731 0v6.269H9.851V6.269h2.149z"/></svg>`,
    desc: 'Schedule broadcast alerts, stream schedules, and video highlights to keep gaming and live-coding audiences notified before you go live.',
    features: [
      { title: 'Go-Live Scheduling', desc: 'Automatically blast Twitter, Discord, and Telegram 15 minutes before airtime.' },
      { title: 'Channel Feed Updates', desc: 'Post upcoming weekly broadcast schedules directly to your Twitch channel.' },
      { title: 'VOD & Highlight Alerts', desc: 'Share clips and key webinar timestamps with follower communities.' },
      { title: 'Audience Growth Sync', desc: 'Cross-promote your stream across YouTube Shorts and TikTok simultaneously.' }
    ]
  },
  {
    slug: 'skool',
    name: 'Skool',
    tagline: 'Course Community Engagement & Educational Feeds',
    badge: 'Official Skool Community Integration',
    accent: '#000000',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><rect width="24" height="24" rx="6" fill="#000"/><path d="M12 4L3 9l9 5 9-5-9-5zm-7 8.5v4.2c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.2l-7 3.9-7-3.9z" fill="#f59e0b"/></svg>`,
    desc: 'Publish educational assignments, student discussions, and webinar recaps to Amana Academy cohorts on Skool without daily manual posting.',
    features: [
      { title: 'Cohort Discussion Prompts', desc: 'Schedule daily learning exercises and discussion starters for students.' },
      { title: 'Course Module Drops', desc: 'Notify students when new video lectures and resource PDFs become available.' },
      { title: 'Community Gamification', desc: 'Encourage student point milestones with scheduled shoutouts and recognition.' },
      { title: 'Academy Calendar Sync', desc: 'Maintain perfect alignment between YouTube tutorials and Skool community tasks.' }
    ]
  },
  {
    slug: 'kick',
    name: 'Kick',
    tagline: 'Next-Gen Live Streaming Alerts & Creator Feeds',
    badge: 'Official Kick API Integration',
    accent: '#53fc18',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><rect width="24" height="24" rx="6" fill="#000"/><path d="M5 4h4v6.5l5.5-6.5H19l-6.8 8 7 8h-4.7L9 13.5V20H5V4z" fill="#53fc18"/></svg>`,
    desc: 'Promote live creator streams on Kick with automated pre-stream alerts across social networks and targeted community channels.',
    features: [
      { title: 'Stream Notification Push', desc: 'Notify fans across social channels the second you launch a live Kick broadcast.' },
      { title: 'Category & Game Tagging', desc: 'Set stream titles and categories in advance directly from the PostFlow calendar.' },
      { title: 'Highlight Clip Syndication', desc: 'Repurpose stream highlights into TikTok and YouTube Shorts in minutes.' },
      { title: 'Creator Revenue Growth', desc: 'Maximize live viewership during sponsored partner broadcasts.' }
    ]
  },
  {
    slug: 'warpcast',
    name: 'Warpcast',
    tagline: 'Farcaster Protocol Web3 Social Networking',
    badge: 'Official Farcaster Protocol Integration',
    accent: '#472a84',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#472a84"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 14h-2.5l-2.5-4-2.5 4H7l3.75-6L7 4h2.5l2.5 4 2.5-4H17l-3.75 6L17 16z"/></svg>`,
    desc: 'Cast decentralized updates directly to the Farcaster protocol via Warpcast. Engage Web3 developers and tech innovators.',
    features: [
      { title: 'Decentralized Casts', desc: 'Sign messages with cryptographic private keys for censorship-resistant publishing.' },
      { title: 'Farcaster Frames Ready', desc: 'Schedule interactive web3 mini-apps and frame URLs in your posts.' },
      { title: 'Channel Targeting', desc: 'Cast into curated topic channels (/dev, /ai, /founders) to reach niche audiences.' },
      { title: 'Web3 Identity Verified', desc: 'Connect with Ethereum ENS domains and verified on-chain credentials.' }
    ]
  },
  {
    slug: 'vk',
    name: 'VK (VKontakte)',
    tagline: 'Eastern European & Regional Community Outreach',
    badge: 'Official VK API Integration',
    accent: '#0077ff',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0077ff"><path d="M15.684 0H8.316C2.992 0 0 2.992 0 8.316v7.368C0 21.008 2.992 24 8.316 24h7.368C21.008 24 24 21.008 24 15.684V8.316C24 2.992 21.008 0 15.684 0zm4.515 17.185h-1.892c-.716 0-.935-.57-2.222-1.868-1.121-1.09-1.618-1.233-1.892-1.233-.385 0-.495.11-.495.637v1.737c0 .45-.143.725-1.342.725-1.98 0-4.18-1.2-5.73-3.43-2.35-3.32-3.003-5.81-3.003-6.32 0-.23.09-.45.54-.45h1.892c.407 0 .56.187.715.626 1.012 2.924 2.705 5.485 3.409 5.485.264 0 .385-.12.385-.79V9.897c-.077-1.419-.825-1.54-.825-2.046 0-.242.209-.484.54-.484h2.98c.374 0 .506.198.506.638v3.443c0 .374.165.506.275.506.23 0 .418-.132.847-.561 1.309-1.474 2.244-3.74 2.244-3.74.12-.253.33-.484.737-.484h1.892c.572 0 .693.286.572.693-.242.99-2.32 3.86-2.42 4.026-.22.33-.297.473 0 .869.21.286.913.891 1.386 1.452.88.99 1.55 1.826 1.738 2.398.176.572-.11.858-.682.858z"/></svg>`,
    desc: 'Reach international audiences across Eastern Europe and Central Asia with native Russian language translation and VK group scheduling.',
    features: [
      { title: 'VK Community Walls', desc: 'Publish announcements directly to public brand communities and corporate pages.' },
      { title: 'VK Clips & Stories', desc: 'Distribute short videos and image carousels optimized for the VK mobile app.' },
      { title: 'Multilingual Character Limits', desc: 'Support for Cyrillic typography and extended character post length.' },
      { title: 'Secure OAuth Authorizations', desc: 'Store access keys with AES-256 encryption on our private VPS.' }
    ]
  },
  {
    slug: 'lemmy',
    name: 'Lemmy',
    tagline: 'Open-Source Federated Reddit Alternative',
    badge: 'Official Lemmy API Integration',
    accent: '#00bc8c',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#00bc8c"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-2 3a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z"/></svg>`,
    desc: 'Engage with open-source enthusiasts, Linux developers, and self-hosting communities across federated Lemmy link-aggregator instances.',
    features: [
      { title: 'Instance Independent', desc: 'Post to lemmy.world, lemmy.ml, or any self-hosted private community.' },
      { title: 'Markdown Technical Posts', desc: 'Native formatting for code snippets, markdown tables, and external links.' },
      { title: 'Upvote & Comment Tracking', desc: 'Monitor community feedback and discussions from your centralized dashboard.' },
      { title: 'No Tracker Policy', desc: 'Complies 100% with privacy-first Fediverse protocols.' }
    ]
  },
  {
    slug: 'mewe',
    name: 'MeWe',
    tagline: 'Privacy-First Social Network Groups & Pages',
    badge: 'Official MeWe API Integration',
    accent: '#008287',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#008287"><rect width="24" height="24" rx="6" fill="#008287"/><path d="M5 8l4 6 3-4 3 4 4-6v8h-3v-4l-4 5-4-5v4H5V8z" fill="#fff"/></svg>`,
    desc: 'Share brand content on MeWe without intrusive targeted advertising or algorithmic shadowbanning.',
    features: [
      { title: 'Chronological Feed Reach', desc: 'Deliver updates to 100% of your followers without paying for boosted visibility.' },
      { title: 'Group Discussion Publishing', desc: 'Target specialized customer groups with focused product announcements.' },
      { title: 'High-Fidelity Media', desc: 'Upload uncompressed graphics and full-resolution video assets.' },
      { title: 'Zero Data Broker Sharing', desc: 'Respects customer data integrity with complete privacy preservation.' }
    ]
  },
  {
    slug: 'nostr',
    name: 'Nostr',
    tagline: 'Decentralized Cryptographic Social Protocol',
    badge: 'Official Nostr NIP-01 Protocol',
    accent: '#8b5cf6',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z"/></svg>`,
    desc: 'Broadcast cryptographically signed notes across decentralized Nostr relays. Support for Bitcoin Lightning zaps and public keys.',
    features: [
      { title: 'NIP-01 Cryptographic Signing', desc: 'Sign every note with your private secp256k1 key generated securely on your VPS.' },
      { title: 'Multi-Relay Broadcasting', desc: 'Publish to dozens of independent global relays simultaneously.' },
      { title: 'Lightning Network Zaps', desc: 'Receive micropayments and tips directly to your linked Lightning address.' },
      { title: 'Uncensorable Brand Identity', desc: 'Your audience belongs entirely to you — impossible for third parties to ban.' }
    ]
  },
  {
    slug: 'listmonk',
    name: 'Listmonk',
    tagline: 'High-Performance Self-Hosted Email Newsletter Queue',
    badge: 'Official Listmonk REST API',
    accent: '#0052cc',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0052cc"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    desc: 'Orchestrate email marketing campaigns alongside social posts. Push blog digests and retail offers directly to subscriber inboxes.',
    features: [
      { title: 'Unified Content Syndication', desc: 'Turn weekly top social posts into a consolidated email newsletter digest.' },
      { title: 'Self-Hosted Privacy', desc: 'Zero per-subscriber fees — deployed on your private PostgreSQL database.' },
      { title: 'Automated List Segmentation', desc: 'Send targeted emails to Amana Mart retail buyers or Amana Suite enterprise users.' },
      { title: 'High-Throughput Delivery', desc: 'Send tens of thousands of emails per hour via your configured SMTP/SES relay.' }
    ]
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    tagline: 'Automated Blog Article Publishing & CMS Sync',
    badge: 'Official WordPress REST API',
    accent: '#21759b',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#21759b"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2a10.8 10.8 0 1 1 0 21.6 10.8 10.8 0 0 1 0-21.6zM2.87 12c0 3.73 2.29 6.94 5.58 8.3L3.84 8.27A10.8 10.8 0 0 0 2.87 12zm15.18-.54c0-1.8-.65-3.04-1.2-4.01-.74-1.25-1.44-2.31-1.44-3.56 0-1.39 1.06-2.69 2.56-2.69.11 0 .22.01.32.03A10.74 10.74 0 0 0 12 1.2c-3.8 0-7.14 1.96-9.08 4.93l6.57 17.96 1.9-5.74-2.73-7.5c.81-.03 1.58-.1 1.58-.1.74-.07.82-1.15.08-1.15 0 0-2.22.18-3.66.18-1.37 0-3.6-.18-3.6-.18-.74 0-.66 1.08.08 1.15 0 0 .74.07 1.5.11l2.25 6.18-3.18 9.54A10.74 10.74 0 0 0 12 22.8c3.27 0 6.22-1.45 8.24-3.76l-5.69-16.5c1.9.15 3.5 1.57 3.5 4.92z"/></svg>`,
    desc: 'Draft and publish long-form technical blogs and product catalogues directly into WordPress sites with custom categories, tags, and featured images.',
    features: [
      { title: 'Gutenberg Blocks Support', desc: 'PostFlow formats clean HTML blocks, code snippets, and structured headings.' },
      { title: 'Featured Image Integration', desc: 'Auto-upload hero graphics and assign them directly to the WordPress media library.' },
      { title: 'Draft & Publish Modes', desc: 'Schedule posts directly or save as review drafts for editorial approval.' },
      { title: 'SEO Tag & Category Assignment', desc: 'Set meta titles, descriptions, and taxonomy terms from the PostFlow compose box.' }
    ]
  },
  {
    slug: 'medium',
    name: 'Medium',
    tagline: 'Thought Leadership & Technical Publication Publishing',
    badge: 'Official Medium API Integration',
    accent: '#000000',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
    desc: 'Syndicate your engineering insights, architectural whitepapers, and company announcements to Medium publications with canonical link protection.',
    features: [
      { title: 'Canonical URL SEO Protection', desc: 'Add canonical links pointing back to amanaflow.com to protect original search ranking.' },
      { title: 'Publication Distribution', desc: 'Submit articles directly to team-managed or third-party Medium publications.' },
      { title: 'Markdown Syntax Rendering', desc: 'Seamlessly convert technical markdown into Medium rich-text formats.' },
      { title: 'Topic Tag Curation', desc: 'Assign up to 5 strategic topic tags to maximize distribution in member feeds.' }
    ]
  },
  {
    slug: 'hashnode',
    name: 'Hashnode',
    tagline: 'Developer Community Blogging on Custom Domains',
    badge: 'Official Hashnode GraphQL API',
    accent: '#2962ff',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#2962ff"><path d="M22.351 8.019l-6.37-6.37a2.828 2.828 0 00-4 0l-6.37 6.37a2.828 2.828 0 000 4l6.37 6.37a2.828 2.828 0 004 0l6.37-6.37a2.828 2.828 0 000-4zm-8.351 5.981a2 2 0 110-4 2 2 0 010 4z"/></svg>`,
    desc: 'Publish engineering case studies and technical tutorials to developer blogs powered by Hashnode on custom domain names.',
    features: [
      { title: 'Headless Developer Blog Sync', desc: 'Post directly to your engineering publication via Hashnode GraphQL APIs.' },
      { title: 'Code Syntax Highlighting', desc: 'Supports syntax highlighting for 100+ programming languages.' },
      { title: 'Web3 & Dev Community Feed', desc: 'Broadcast to thousands of active software engineers and CTOs.' },
      { title: 'Series & Chapter Organization', desc: 'Queue multi-part educational coding series with automatic chapter links.' }
    ]
  },
  {
    slug: 'devto',
    name: 'Dev.to',
    tagline: 'Developer Community Articles & Open Source Discussions',
    badge: 'Official Forem / DEV API',
    accent: '#0a0a0a',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><rect width="24" height="24" rx="4" fill="#000"/><path d="M7.5 15.5h-2V8.5h2c1.7 0 2.5 1.1 2.5 3.5s-.8 3.5-2.5 3.5zm-.8-1.2h.8c1 0 1.3-.7 1.3-2.3 0-1.6-.3-2.3-1.3-2.3h-.8v4.6zm5.8 1.2h-3V8.5h3v1.2h-1.8v1.4h1.6v1.2h-1.6v1.8h1.8v1.4zm3.8 0l-1.5-7h1.3l.9 4.6.9-4.6h1.3l-1.5 7h-1.4z"/></svg>`,
    desc: 'Share code snippets, software release announcements, and system architecture deep-dives with the global DEV developer community.',
    features: [
      { title: 'Frontmatter Customization', desc: 'Configure title, published state, cover image, and tags directly from compose.' },
      { title: 'Canonical Tag Support', desc: 'Cross-post without SEO penalties by referencing your primary domain source.' },
      { title: 'Liquid Tags & Code Sandboxes', desc: 'Embed GitHub gists, CodePen sandboxes, and interactive widgets easily.' },
      { title: 'Developer Engagement Tracking', desc: 'Monitor unicorns, reactions, and technical comment threads centrally.' }
    ]
  }
];

function generateChannelHtml(channel) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${channel.name} Post Scheduler & Management — PostFlow</title>
  <meta name="description" content="${channel.tagline}. Automate, schedule, and orchestrate ${channel.name} marketing with PostFlow by Amana Flow." />
  <link rel="canonical" href="https://post.amanaflow.com/channels/${channel.slug}" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b5cf6'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090a0f;
      --bg-surface: #12151e;
      --bg-card: rgba(18, 22, 34, 0.7);
      --border: rgba(255, 255, 255, 0.08);
      --border-focus: rgba(139, 92, 246, 0.4);
      --text: #f3f4f6;
      --text-muted: #94a3b8;
      --primary: #8b5cf6;
      --accent: ${channel.accent || '#8b5cf6'};
      --gradient: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-muted);
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
      overflow-x: hidden;
    }
    header {
      border-bottom: 1px solid var(--border);
      padding: 16px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(9, 10, 15, 0.9);
      position: sticky;
      top: 0;
      backdrop-filter: blur(16px);
      z-index: 100;
    }
    .brand {
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 20px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand span {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-actions { display: flex; align-items: center; gap: 14px; }
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 9px 20px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-secondary { color: #fff; border: 1px solid var(--border); background: rgba(255, 255, 255, 0.04); }
    .btn-secondary:hover { border-color: var(--primary); background: rgba(255, 255, 255, 0.08); }
    .btn-primary { background: var(--gradient); color: #fff; box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3); }
    .btn-primary:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 6px 25px rgba(236, 72, 153, 0.4); }

    .container { max-width: 1020px; margin: 0 auto; padding: 60px 24px 90px; }
    .channel-hero { text-align: center; margin-bottom: 60px; }
    .channel-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 7px 18px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: #fff;
      font-size: 13.5px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .badge-icon {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #fff;
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 800;
      letter-spacing: -1.2px;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    .hero-p { font-size: 18px; max-width: 720px; margin: 0 auto 34px; color: var(--text-muted); }
    .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin: 44px 0;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 30px;
      transition: all 0.2s;
    }
    .card:hover {
      border-color: var(--border-focus);
      transform: translateY(-3px);
    }
    .card h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #fff;
      font-size: 19px;
      margin-bottom: 12px;
    }
    .card p { font-size: 14.5px; margin-bottom: 0; line-height: 1.6; }

    .compliance-box {
      background: rgba(18, 22, 34, 0.85);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin: 40px 0;
    }
    .compliance-box h4 {
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 18px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    footer {
      border-top: 1px solid var(--border);
      padding: 40px 24px;
      text-align: center;
      font-size: 13.5px;
      color: #64748b;
      background: #06070a;
    }
    footer a { color: var(--text-muted); text-decoration: none; margin: 0 12px; }
    footer a:hover { color: #fff; }
  </style>
</head>
<body>
  <header>
    <a href="/home" class="brand">
      ${postFlowLogoSvg}
      Post<span>Flow</span>
    </a>
    <div class="nav-actions">
      <a href="/home" class="btn btn-secondary">&larr; Back to Home</a>
      <a href="/auth" class="btn btn-primary">Connect ${channel.name} &rarr;</a>
    </div>
  </header>

  <div class="container">
    <div class="channel-hero">
      <div class="channel-badge">
        <span class="badge-icon">${channel.iconSvg}</span>
        ${channel.badge}
      </div>
      <h1>${channel.tagline}</h1>
      <p class="hero-p">${channel.desc}</p>
      <div class="hero-actions">
        <a href="/auth" class="btn btn-primary" style="padding:14px 32px;font-size:15px;">Launch PostFlow & Connect</a>
        <a href="/data-deletion" class="btn btn-secondary" style="padding:14px 26px;font-size:15px;">Data Deletion Policy</a>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid-2">
      ${channel.features.map(f => `
      <div class="card">
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
      `).join('')}
    </div>

    <!-- Security & Reviewer Compliance Notice -->
    <div class="compliance-box">
      <h4>🛡️ Developer Policy & Data Security Compliance</h4>
      <p style="font-size:14px;color:#cbd5e1;margin-bottom:12px;">
        PostFlow connects to <strong>${channel.name}</strong> strictly via official developer APIs with explicit user authorization. All authentication tokens are encrypted at rest using industry-grade AES-256 encryption on our private PostgreSQL cluster (VPS 148.230.98.190).
      </p>
      <p style="font-size:13.5px;color:#94a3b8;margin-bottom:0;">
        We do not sell, transfer, or monetize user data. Access can be immediately revoked at any time via our <a href="/data-deletion" style="color:#8b5cf6;">User Data Deletion Instructions</a> or directly within your ${channel.name} account security settings.
      </p>
    </div>
  </div>

  <footer>
    &copy; 2026 PostFlow by Amana Flow. All Rights Reserved. &bull;
    <a href="/terms">Terms of Service</a> &bull;
    <a href="/privacy">Privacy Policy</a> &bull;
    <a href="/data-deletion">Data Deletion Instructions</a> &bull;
    <a href="https://amanaflow.com" target="_blank">Amana Flow Hub</a>
  </footer>
</body>
</html>`;
}

// Generate all 30 HTML files
for (const ch of channels) {
  const filePath = path.join(channelsDir, `${ch.slug}.html`);
  fs.writeFileSync(filePath, generateChannelHtml(ch), 'utf8');
  console.log(`Generated: channels/${ch.slug}.html`);
}

console.log(`Successfully generated all ${channels.length} channel detail pages!`);
