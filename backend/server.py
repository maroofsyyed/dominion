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

# Product API Endpoints

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate):
    """Create a new product"""
    product_dict = product_data.dict()
    product_obj = Product(**product_dict)
    result = await db.products.insert_one(product_obj.dict())
    return product_obj

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[ProductCategory] = None,
    status: Optional[ProductStatus] = None,
    skip: int = 0,
    limit: int = 100
):
    """Get all products with optional filtering"""
    filter_dict = {}
    if category:
        filter_dict["category"] = category
    if status:
        filter_dict["status"] = status
    
    products = await db.products.find(filter_dict).skip(skip).limit(limit).to_list(limit)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a specific product by ID"""
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductUpdate):
    """Update a product"""
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_dict = {k: v for k, v in product_update.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.products.update_one({"id": product_id}, {"$set": update_dict})
    
    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """Delete a product"""
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@api_router.get("/products/category/{category}", response_model=List[Product])
async def get_products_by_category(category: ProductCategory):
    """Get all products in a specific category"""
    products = await db.products.find({"category": category, "status": "active"}).to_list(1000)
    return [Product(**product) for product in products]

@api_router.get("/products/featured", response_model=List[Product])
async def get_featured_products(limit: int = 6):
    """Get featured products (high rating, active status)"""
    products = await db.products.find({
        "status": "active", 
        "rating": {"$gte": 4.0}
    }).sort("rating", -1).limit(limit).to_list(limit)
    return [Product(**product) for product in products]

@api_router.post("/products/seed")
async def seed_products():
    """Seed the database with sample products"""
    # Check if products already exist
    existing_count = await db.products.count_documents({})
    if existing_count > 0:
        return {"message": f"Products already exist ({existing_count} products). Skipping seed."}
    
    sample_products = [
        {
            "name": "Professional Gymnastic Rings",
            "description": "Premium wooden gymnastic rings with adjustable straps",
            "long_description": "Professional-grade wooden gymnastic rings crafted from high-quality birch wood. Perfect for building upper body strength, developing core stability, and mastering advanced calisthenics movements. Includes heavy-duty cam buckle straps rated for 2000 lbs.",
            "category": "equipment",
            "price": 89.99,
            "discount_price": 69.99,
            "images": [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
                "https://images.unsplash.com/photo-1544384425-4bdeeb9fe3a0",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/gymnastic-rings.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/wood-rings.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            },
            "specifications": {
                "dimensions": "9.5\" diameter rings",
                "weight": "3.2 lbs total",
                "material": "Birch wood rings, nylon straps",
                "color_options": ["Natural Wood", "Black Stained"],
                "additional_specs": {
                    "strap_length": "15 feet each",
                    "weight_capacity": "2000 lbs",
                    "ring_thickness": "1.25 inches"
                }
            },
            "features": [
                "Premium birch wood construction",
                "Heavy-duty cam buckle straps",
                "2000 lb weight capacity",
                "15 ft adjustable straps",
                "Non-slip grip surface",
                "Professional competition grade"
            ],
            "tags": ["rings", "calisthenics", "upper-body", "professional"],
            "stock_quantity": 50,
            "status": "active",
            "rating": 4.8,
            "review_count": 342
        },
        {
            "name": "Parallette Bars Set",
            "description": "Sturdy steel parallette bars for L-sits, handstands, and push-ups",
            "long_description": "Heavy-duty steel parallette bars designed for serious calisthenics training. Perfect for L-sits, handstand progressions, push-up variations, and core exercises. Non-slip foam grips and rubber feet provide stability and comfort during intense training sessions.",
            "category": "equipment",
            "price": 124.99,
            "images": [
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
                "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/parallette-bars.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/steel-foam.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
            },
            "specifications": {
                "dimensions": "12\" H x 24\" L x 6\" W",
                "weight": "8 lbs per bar",
                "material": "Steel frame, foam grips",
                "color_options": ["Black", "Red", "Blue"],
                "additional_specs": {
                    "weight_capacity": "300 lbs per bar",
                    "grip_diameter": "1.5 inches",
                    "base_width": "24 inches"
                }
            },
            "features": [
                "Heavy-duty steel construction",
                "Non-slip foam grips",
                "Rubber feet for stability",
                "300 lb weight capacity per bar",
                "Perfect height for L-sits",
                "Powder-coated finish"
            ],
            "tags": ["parallettes", "handstand", "l-sit", "push-ups"],
            "stock_quantity": 25,
            "status": "active",
            "rating": 4.7,
            "review_count": 156
        },
        {
            "name": "Resistance Bands Set",
            "description": "Complete set of resistance bands for strength training",
            "long_description": "Professional resistance band set with 5 different resistance levels. Perfect for assisted pull-ups, stretching, rehabilitation, and strength training. Includes door anchor, ankle straps, and exercise guide with 30+ exercises.",
            "category": "equipment",
            "price": 49.99,
            "discount_price": 34.99,
            "images": [
                "https://images.unsplash.com/photo-1544384425-4b80e5ca2dd4",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
                "https://images.unsplash.com/photo-1544384425-4b80e5ca2dd4"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/resistance-bands.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/rubber-bands.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1544384425-4b80e5ca2dd4"
            },
            "specifications": {
                "dimensions": "48\" length bands",
                "weight": "2.5 lbs total",
                "material": "Natural latex rubber",
                "color_options": ["Multi-color set"],
                "additional_specs": {
                    "resistance_levels": "10-50 lbs per band",
                    "band_count": "5 bands",
                    "max_resistance": "150 lbs combined"
                }
            },
            "features": [
                "5 resistance levels (10-50 lbs)",
                "Natural latex construction",
                "Door anchor included",
                "Ankle straps and handles",
                "Exercise guide with 30+ workouts",
                "Portable and lightweight"
            ],
            "tags": ["resistance", "bands", "assisted", "stretching"],
            "stock_quantity": 100,
            "status": "active",
            "rating": 4.5,
            "review_count": 89
        },
        {
            "name": "Creatine Monohydrate",
            "description": "Pure creatine monohydrate for strength and power",
            "long_description": "Pharmaceutical-grade creatine monohydrate powder to enhance strength, power, and muscle growth. Helps increase ATP production for explosive movements and faster recovery between sets. Unflavored, pure powder that mixes easily with any beverage.",
            "category": "supplements",
            "price": 29.99,
            "images": [
                "https://images.unsplash.com/photo-1593095948071-474c5cc2989d",
                "https://images.unsplash.com/photo-1556909610-f3e23370c71f",
                "https://images.unsplash.com/photo-1593095948071-474c5cc2989d"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/supplement-bottle.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/white-bottle.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d"
            },
            "specifications": {
                "dimensions": "4\" H x 3\" diameter",
                "weight": "1.2 lbs",
                "material": "HDPE plastic bottle",
                "color_options": ["White"],
                "additional_specs": {
                    "serving_size": "5g",
                    "servings_per_container": "60",
                    "total_weight": "300g"
                }
            },
            "features": [
                "Pharmaceutical-grade purity",
                "Unflavored powder",
                "60 servings per container",
                "Micronized for better absorption",
                "Third-party tested",
                "No artificial additives"
            ],
            "tags": ["creatine", "strength", "power", "supplement"],
            "stock_quantity": 75,
            "status": "active",
            "rating": 4.6,
            "review_count": 234
        },
        {
            "name": "Workout Grip Gloves",
            "description": "Premium leather grip gloves for calisthenics training",
            "long_description": "Professional-grade leather grip gloves designed specifically for calisthenics and gymnastic training. Features reinforced palm protection, wrist support, and breathable mesh backing. Perfect for pull-ups, muscle-ups, and ring work.",
            "category": "accessories",
            "price": 39.99,
            "images": [
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/workout-gloves.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/leather-mesh.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e"
            },
            "specifications": {
                "dimensions": "Various sizes (S-XL)",
                "weight": "0.3 lbs per pair",
                "material": "Leather palm, mesh backing",
                "color_options": ["Black", "Brown"],
                "additional_specs": {
                    "palm_thickness": "3mm",
                    "wrist_strap": "Adjustable velcro",
                    "finger_style": "Half-finger design"
                }
            },
            "features": [
                "Premium leather palm protection",
                "Breathable mesh backing",
                "Adjustable wrist support",
                "Half-finger design for grip",
                "Reinforced stress points",
                "Machine washable"
            ],
            "tags": ["gloves", "grip", "protection", "calisthenics"],
            "stock_quantity": 40,
            "status": "active",
            "rating": 4.4,
            "review_count": 67
        },
        {
            "name": "Calisthenics Training Shirt",
            "description": "Moisture-wicking performance shirt for intense workouts",
            "long_description": "Premium athletic shirt designed for calisthenics training. Features moisture-wicking fabric technology, 4-way stretch for full range of motion, and motivational calisthenics graphics. Comfortable fit that moves with your body during the most challenging workouts.",
            "category": "apparel",
            "price": 34.99,
            "images": [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
            ],
            "assets_3d": {
                "model_url": "https://cdn.shopify.com/s/files/1/models/workout-shirt.glb",
                "texture_urls": ["https://cdn.shopify.com/textures/athletic-fabric.jpg"],
                "preview_image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
            },
            "specifications": {
                "dimensions": "Various sizes (XS-XXL)",
                "weight": "0.4 lbs",
                "material": "Polyester-spandex blend",
                "color_options": ["Black", "Grey", "Navy", "Forest Green"],
                "additional_specs": {
                    "fabric_blend": "88% polyester, 12% spandex",
                    "fit_type": "Athletic fit",
                    "sleeve_type": "Short sleeve"
                }
            },
            "features": [
                "Moisture-wicking technology",
                "4-way stretch fabric",
                "Motivational calisthenics design",
                "Tagless comfort",
                "Anti-odor treatment",
                "Machine washable"
            ],
            "tags": ["shirt", "apparel", "moisture-wicking", "training"],
            "stock_quantity": 60,
            "status": "active",
            "rating": 4.3,
            "review_count": 45
        }
    ]
    
    # Insert sample products
    inserted_products = []
    for product_data in sample_products:
        product_obj = Product(**product_data)
        await db.products.insert_one(product_obj.dict())
        inserted_products.append(product_obj.name)
    
    return {
        "message": f"Successfully seeded {len(inserted_products)} products",
        "products": inserted_products
    }

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
