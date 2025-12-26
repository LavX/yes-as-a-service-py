# ❌ No-as-a-Service (Python)

<p align="center">
  <img src="https://raw.githubusercontent.com/hotheadhacker/no-as-a-service/main/assets/imgs/naas-with-no-logo-bunny.png" width="800" alt="No-as-a-Service Banner" width="70%"/>
</p>


Ever needed a graceful way to say "no"?  
This tiny API returns random, generic, creative, and sometimes hilarious rejection reasons ,  perfectly suited for any scenario: personal, professional, student life, dev life, or just because.

Built for humans, excuses, and humor.

**This is a Python port of the original [no-as-a-service](https://github.com/hotheadhacker/no-as-a-service) project.**

---

## 🚀 API Usage

**Base URL**
```
http://localhost:3000/no
```

**Method:** `GET`  
**Rate Limit:** `120 requests per minute per IP`

### 🔄 Example Request
```http
GET /no
```

### ✅ Example Response
```json
{
  "reason": "This feels like something Future Me would yell at Present Me for agreeing to."
}
```

Use it in apps, bots, landing pages, Slack integrations, rejection letters, or wherever you need a polite (or witty) no.

---

## 🛠️ Self-Hosting

Want to run it yourself? It's lightweight and simple.

### 1. Clone this repository
```bash
git clone https://github.com/LavX/no-as-a-service-py.git
cd no-as-a-service-py
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Start the server
```bash
python main.py
```

The API will be live at:
```
http://localhost:3000/no
```

You can also change the port using an environment variable:
```bash
PORT=5000 python main.py
```

---

## 🐳 Docker

### Using Pre-built Image from GHCR

The Docker image is automatically built and pushed to GitHub Container Registry on every push to main branch.

```bash
docker pull ghcr.io/lavx/no-as-a-service-py:latest
docker run -p 3000:3000 -e PORT=3000 ghcr.io/lavx/no-as-a-service-py:latest
```

### Building Locally

```bash
docker build -t no-as-a-service-py .
docker run -p 3000:3000 -e PORT=3000 no-as-a-service-py
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  naas:
    image: ghcr.io/lavx/no-as-a-service-py:latest
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

---

## 📁 Project Structure

```
no-as-service-py/
├── main.py                      # FastAPI application
├── reasons.json                 # 1000+ universal rejection reasons
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Docker image definition
├── .devcontainer.json           # VS Code / Github devcontainer setup
├── .github/
│   └── workflows/
│       └── docker-release.yml    # GitHub Actions workflow for GHCR
└── README.md
```

---

## 📦 requirements.txt

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
slowapi==0.1.9
```

---

## ⚓ Devcontainer

If you open this repo in Github Codespaces, it will automatically use `.devcontainer.json` to set up your environment. If you open it in VSCode, it will ask you if you want to reopen it in a container.

---

## 🛠️ Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **Uvicorn** - ASGI server for running FastAPI
- **Slowapi** - Rate limiting for FastAPI

---

## 👤 Original Author

Original Node.js version created with creative stubbornness by [hotheadhacker](https://github.com/hotheadhacker)

---

## 🌐 About the Maintainer

This fork is maintained by **LavX**. Explore more of my projects and services:

### 🚀 Services
- **[LavX Managed Systems](https://lavx.hu)** – Enterprise AI solutions, RAG systems, and LLMOps.
- **[LavX News](https://news.lavx.hu)** – Latest insights on AI, Open Source, and emerging tech.
- **[LMS Tools](https://tools.lavx.hu)** – 140+ free, privacy-focused online tools for developers and researchers.

### 🛠️ Open Source Projects
- **[AI Subtitle Translator](https://github.com/LavX/ai-subtitle-translator)** – LLM-powered subtitle translator using OpenRouter API.
- **[OpenSubtitles Scraper](https://github.com/LavX/opensubtitles-scraper)** – Web scraper for OpenSubtitles.org (no VIP required).
- **[Bazarr (LavX Fork)](https://github.com/LavX/bazarr)** – Automated subtitle management with OpenSubtitles.org scraper & AI translation.
- **[JFrog to Nexus OSS](https://github.com/LavX/jfrogtonexusoss)** – Automated migration tool for repository managers.
- **[WeatherFlow](https://github.com/LavX/weatherflow)** – Multi-platform weather data forwarding (WU to Windy/Idokep).
- **[Like4Like Suite](https://github.com/LavX/Like4Like-Suite)** – Social media automation and engagement toolkit.

---
## 📄 License

MIT ,  do whatever, just don't say yes when you should say no.
