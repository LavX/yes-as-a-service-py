import json
import os
import random
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load reasons from JSON file
def load_reasons():
    with open('reasons.json', 'r', encoding='utf-8') as f:
        return json.load(f)

reasons = load_reasons()

# Rate limiter: 120 requests per minute per IP
def get_client_ip(request: Request) -> str:
    """Get client IP, checking for Cloudflare header first."""
    cf_ip = request.headers.get('cf-connecting-ip')
    if cf_ip:
        return cf_ip
    return get_remote_address(request)

limiter = Limiter(key_func=get_client_ip)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get('/no')
@limiter.limit("120/minute")
async def get_random_reason(request: Request):
    """Return a random rejection reason."""
    reason = random.choice(reasons)
    return {"reason": reason}

@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """Handle rate limit exceeded errors."""
    return JSONResponse(
        status_code=429,
        content={"error": "Too many requests, please try again later. (120 reqs/min/IP)"}
    )

# Mount static files for UI (must be after API routes)
app.mount("/", StaticFiles(directory="./ui", html=True), name="ui")

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 3000))
    print(f"No-as-a-Service is running on port {port}")
    uvicorn.run(app, host='0.0.0.0', port=port)
