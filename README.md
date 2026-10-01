# Amana Flow Postiz — Dedicated Web & Legal Presentation Suite

Official public-facing presentation website and compliance portal for **Amana Flow Postiz** (`post.amanaflow.com`), self-hosted on our dedicated VPS (`148.230.98.190`).

---

## 📁 Repository & Directory Locations

| Environment | Absolute Path | Description |
| :--- | :--- | :--- |
| **Local Workspace** | `f:\work\vps\postiz-web\` | Local Git repository for edits, testing, and version control. |
| **Production VPS** | `/www/wwwroot/post.amanaflow.com/` | Webroot served by Nginx on the live production server. |
| **Postiz Containers** | `/opt/postiz-docker-compose/` | Docker Compose stack (Postiz backend/frontend, PostgreSQL 17, Redis 7.2, Temporal). |
| **Nginx VHost Config** | `/www/server/panel/vhost/nginx/post.amanaflow.com.conf` | Production Nginx reverse proxy routing rules. |

---

## 📑 File Structure

```text
postiz-web/
├── index.html                  # Public home page with interactive Mega Menus, search, filters & architecture specs
├── terms.html                  # Comprehensive Terms of Service (TikTok, YouTube, Meta, LinkedIn compliant)
├── privacy.html                # Full Privacy Policy with explicit API developer compliance clauses
├── data-deletion.html          # User Data Deletion Instructions (self-service, platform-native, manual email)
├── channels/                   # Dedicated Channel Detail Pages
│   ├── tiktok.html             # TikTok Content Posting API & Login Kit review compliance page
│   ├── facebook.html           # Meta Graph API & Amana Mart brand pages showcase
│   ├── youtube.html            # YouTube Data API v3 & Shorts scheduling showcase
│   ├── instagram.html          # Instagram Feed, Reels, and Carousel scheduling showcase
│   └── linkedin.html           # LinkedIn B2B Thought Leadership & Company Pages showcase
├── .gitignore                  # Git ignore rules for node_modules, temp files, and caches
└── README.md                   # This documentation & disaster recovery guide
```

---

## 🚀 How Changes are Deployed to VPS

### Option 1: Automated Sync Script (PowerShell)
From the local workspace `f:\work\vps\postiz-web`, run:
```powershell
# Copy all updated files to VPS
scp -r * vps:/www/wwwroot/post.amanaflow.com/

# Test Nginx and reload
ssh vps "nginx -t && nginx -s reload"
```

### Option 2: Git Synchronization
Both directories are initialized as Git repositories.
To push changes via Git:
```bash
git add .
git commit -m "feat: update public presentation site"
git push origin master
```
On the VPS:
```bash
cd /www/wwwroot/post.amanaflow.com
git pull origin master
```

---

## 🌐 Live URLs & Routing

All routes are served securely over HTTPS with HTTP/2 and TLS 1.3:

| URL | Target File / Destination | Notes |
| :--- | :--- | :--- |
| `https://post.amanaflow.com/` | `index.html` | Public landing page (Mega Menus, Mockup, Features) |
| `https://post.amanaflow.com/home` | `index.html` | Alternate canonical route for home |
| `https://post.amanaflow.com/terms` | `terms.html` | TikTok & Meta compliant Terms of Service |
| `https://post.amanaflow.com/privacy` | `privacy.html` | Google & TikTok compliant Privacy Policy |
| `https://post.amanaflow.com/data-deletion`| `data-deletion.html` | Developer policy mandated deletion guide |
| `https://post.amanaflow.com/channels/tiktok` | `channels/tiktok.html` | TikTok developer review landing page |
| `https://post.amanaflow.com/channels/facebook` | `channels/facebook.html` | Facebook & Meta developer review landing page |
| `https://post.amanaflow.com/channels/youtube` | `channels/youtube.html` | Google & YouTube developer review landing page |
| `https://post.amanaflow.com/channels/instagram` | `channels/instagram.html` | Instagram review landing page |
| `https://post.amanaflow.com/channels/linkedin` | `channels/linkedin.html` | LinkedIn review landing page |
| `https://post.amanaflow.com/auth` | Postiz Container (`:4007`) | User and admin authentication portal |
| `https://post.amanaflow.com/launches` | Postiz Container (`:4007`) | Logged-in Postiz content calendar & compose |
| `https://post.amanaflow.com/api/*` | Postiz Container (`:4007`) | Backend REST API & Webhooks |

---

## 🛡️ Developer App Review Guidelines (TikTok, Meta, Google)

When submitting applications to Developer Portals for approval:

1. **Terms of Service URL:** `https://post.amanaflow.com/terms` (or `https://amanaflow.com/terms-of-service/`)
2. **Privacy Policy URL:** `https://post.amanaflow.com/privacy` (or `https://amanaflow.com/privacy-policy/`)
3. **Data Deletion Instructions URL:** `https://post.amanaflow.com/data-deletion`
4. **App Website / Landing URL:** `https://post.amanaflow.com/` or `https://post.amanaflow.com/home`
5. **App Category:** Social Media Management / Marketing Automation tool.
6. **Apply Reason / Submission Description:**
   > "Amana Flow Postiz (https://post.amanaflow.com) is an enterprise self-hosted social media management tool used exclusively by our internal media team and managed brand accounts (Amana Flow, Amana Mart, Amana Suite, Amana Academy) to schedule, curate, and distribute verified video marketing content and promotional updates. We use the Content Posting API and Login Kit strictly to upload approved videos to our official creator accounts with user consent. We adhere strictly to Developer Terms and do not share user data."

---

## 💾 Backup & Disaster Recovery

If the VPS is ever migrated, reinstalled, or modified:
1. All static site code is safely versioned in this Git repository (`f:\work\vps\postiz-web`).
2. To restore to a new server:
   ```bash
   mkdir -p /www/wwwroot/post.amanaflow.com
   scp -r f:\work\vps\postiz-web\* root@<NEW_VPS_IP>:/www/wwwroot/post.amanaflow.com/
   chown -R www:www /www/wwwroot/post.amanaflow.com
   ```
3. Re-apply the Nginx configuration snippet provided in `post.amanaflow.com.conf`.

---
&copy; 2026 Amana Flow. All Rights Reserved.
