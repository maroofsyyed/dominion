from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Enums
class ProductCategory(str, Enum):
    equipment = "equipment"
    supplements = "supplements"
    accessories = "accessories"
    apparel = "apparel"

class ProductStatus(str, Enum):
    active = "active"
    inactive = "inactive"
    out_of_stock = "out_of_stock"


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Product Models
class Product3DAsset(BaseModel):
    model_url: str  # URL to 3D model file (GLB/GLTF)
    texture_urls: List[str] = []  # Additional texture files
    preview_image: str  # Preview image for 3D model

class ProductSpecs(BaseModel):
    dimensions: Optional[str] = None
    weight: Optional[str] = None
    material: Optional[str] = None
    color_options: List[str] = []
    additional_specs: Dict[str, Any] = {}

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    long_description: str
    category: ProductCategory
    price: float
    discount_price: Optional[float] = None
    currency: str = "USD"
    images: List[str]  # Regular product images
    assets_3d: Product3DAsset
    specifications: ProductSpecs
    features: List[str] = []
    tags: List[str] = []
    stock_quantity: int = 0
    status: ProductStatus = ProductStatus.active
    rating: float = 0.0
    review_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    description: str
    long_description: str
    category: ProductCategory
    price: float
    discount_price: Optional[float] = None
    currency: str = "USD"
    images: List[str]
    assets_3d: Product3DAsset
    specifications: ProductSpecs
    features: List[str] = []
    tags: List[str] = []
    stock_quantity: int = 0
    status: ProductStatus = ProductStatus.active

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    long_description: Optional[str] = None
    category: Optional[ProductCategory] = None
    price: Optional[float] = None
    discount_price: Optional[float] = None
    images: Optional[List[str]] = None
    assets_3d: Optional[Product3DAsset] = None
    specifications: Optional[ProductSpecs] = None
    features: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    stock_quantity: Optional[int] = None
    status: Optional[ProductStatus] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
