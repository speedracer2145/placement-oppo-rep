from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import our routers
from api.intel import router as intel_router
from api.hunt import router as hunt_router
from api.profile import router as profile_router

app = FastAPI(
    title="SIGNAL AI Backend",
    description="Agentic AI placement intelligence platform backend",
    version="2.0.0"
)

# Configure CORS so the Next.js frontend can communicate with it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to SIGNAL AI Backend v2.0"}

app.include_router(intel_router, prefix="/api/intel", tags=["intel"])
app.include_router(hunt_router, prefix="/api/hunt", tags=["hunt"])
app.include_router(profile_router, prefix="/api/profile", tags=["profile"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
