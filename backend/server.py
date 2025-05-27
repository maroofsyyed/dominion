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

@api_router.get("/products/featured", response_model=List[Product])
async def get_featured_products(limit: int = 6):
    """Get featured products (high rating, active status)"""
    products = await db.products.find({
        "status": "active", 
        "rating": {"$gte": 4.0}
    }).sort("rating", -1).limit(limit).to_list(limit)
    return [Product(**product) for product in products]

@api_router.get("/products/category/{category}", response_model=List[Product])
async def get_products_by_category(category: ProductCategory):
    """Get all products in a specific category"""
    products = await db.products.find({"category": category, "status": "active"}).to_list(1000)
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

@api_router.post("/products/seed")
async def seed_products():
    """Seed the database with sample products"""
    # Check if products already exist
    existing_count = await db.products.count_documents({})
    if existing_count > 0:
        print(f"Products collection already has {existing_count} documents. Skipping seeding.")
        return {"message": f"Products already seeded. Current count: {existing_count}"}
    
    sample_products = [
        # RESISTANCE AND SUPPORT SYSTEMS
        {
            "id": "premium-resistance-bands",
            "name": "Premium Resistance Bands Set",
            "description": "Professional resistance training tools with multiple resistance levels. Perfect for assisted training and progressive skill development.",
            "price": 39.99,
            "discount_price": 32.99,
            "category": "equipment",
            "subcategory": "resistance-systems",
            "skill_levels": ["beginner", "intermediate"],
            "stock_quantity": 85,
            "rating": 4.8,
            "review_count": 324,
            "images": [
                "https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg",
                "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg"
            ],
            "specifications": {
                "material": "100% Natural latex",
                "resistance_levels": "Light, Medium, Heavy, Extra Heavy",
                "includes": "4 bands, door anchor, handles, carry bag"
            },
            "benefits": ["Assisted muscle-ups", "Pull-up progression", "Portable training"],
            "prerequisites": [],
            "bundle_suggestions": ["wrist-wraps-performance", "liquid-chalk-pro"]
        },
        {
            "id": "elastic-bands-warmup",
            "name": "Elastic Warm-up Bands",
            "description": "Specialized warm-up solution with two resistance levels for pre-workout preparation and mobility enhancement.",
            "price": 24.99,
            "category": "equipment",
            "subcategory": "resistance-systems",
            "skill_levels": ["beginner", "intermediate", "advanced"],
            "stock_quantity": 92,
            "rating": 4.6,
            "review_count": 189,
            "images": [
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
                "https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg"
            ],
            "specifications": {
                "material": "100% Natural latex",
                "resistance": "Light (4-7kg), Medium (7-9kg)",
                "includes": "2 bands, carrying bag"
            },
            "benefits": ["Pre-workout activation", "Mobility enhancement", "Injury prevention"],
            "prerequisites": [],
            "bundle_suggestions": ["premium-resistance-bands", "workout-rings-set"]
        },
        {
            "id": "wrist-wraps-performance",
            "name": "Performance Wrist Wraps",
            "description": "Essential wrist protection and support for pushing exercises and static holds. Enables longer, safer training sessions.",
            "price": 19.99,
            "category": "equipment",
            "subcategory": "support-systems",
            "skill_levels": ["intermediate", "advanced", "elite"],
            "stock_quantity": 67,
            "rating": 4.7,
            "review_count": 156,
            "images": [
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg",
                "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWlnaHQlMjB2ZXN0fGVufDB8fHxibGFja3wxNzQ4Mzc1ODM5fDA&ixlib=rb-4.1.0&q=85"
            ],
            "specifications": {
                "material": "Neoprene with velcro closure",
                "length": "18 inches",
                "support_level": "Medium to High"
            },
            "benefits": ["Wrist strain prevention", "Enhanced stability", "Extended training sessions"],
            "prerequisites": [],
            "bundle_suggestions": ["parallettes-premium-set", "handstand-blocks"]
        },

        # PARALLETTES AND PUSH-UP EQUIPMENT
        {
            "id": "parallettes-premium-set",
            "name": "Premium Parallettes Set",
            "description": "Complete parallettes collection with Max (30cm), Pro (10cm), and Active (compact) variants for comprehensive training applications.",
            "price": 189.99,
            "discount_price": 159.99,
            "category": "equipment",
            "subcategory": "parallettes",
            "skill_levels": ["intermediate", "advanced", "elite"],
            "stock_quantity": 34,
            "rating": 4.9,
            "review_count": 87,
            "images": [
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
                "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg"
            ],
            "specifications": {
                "material": "Beech wood handles, steel base",
                "handle_diameter": "40mm",
                "weight_capacity": "500kg per pair"
            },
            "benefits": ["Handstand training", "Planche progression", "L-sit development"],
            "prerequisites": ["basic-push-ups", "hollow-body-hold"],
            "bundle_suggestions": ["wrist-wraps-performance", "grip-tape"]
        },
        {
            "id": "parallettes-max",
            "name": "Parallettes Max (30cm)",
            "description": "Maximum height parallettes offering the greatest exercise variety and progression options for advanced practitioners.",
            "price": 79.99,
            "category": "equipment",
            "subcategory": "parallettes",
            "skill_levels": ["advanced", "elite"],
            "stock_quantity": 45,
            "rating": 4.8,
            "review_count": 123,
            "images": [
                "https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg",
                "https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg"
            ],
            "specifications": {
                "height": "30cm",
                "material": "Beech wood handles",
                "base": "Non-slip rubber feet"
            },
            "benefits": ["Maximum exercise variety", "Advanced progressions", "Elevated movements"],
            "prerequisites": ["handstand-basics", "L-sit-progression"],
            "bundle_suggestions": ["parallettes-pro", "liquid-chalk-pro"]
        },
        {
            "id": "parallettes-pro",
            "name": "Parallettes Pro (10cm)",
            "description": "Professional-grade parallettes providing optimal stability for handstands, planches, and core exercises.",
            "price": 69.99,
            "category": "equipment",
            "subcategory": "parallettes",
            "skill_levels": ["intermediate", "advanced"],
            "stock_quantity": 58,
            "rating": 4.7,
            "review_count": 98,
            "images": [
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg",
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg"
            ],
            "specifications": {
                "height": "10cm",
                "material": "Beech wood handles",
                "stability": "Wide base design"
            },
            "benefits": ["Handstand stability", "Planche training", "Core strengthening"],
            "prerequisites": ["basic-handstand", "push-up-variations"],
            "bundle_suggestions": ["wrist-wraps-performance", "handstand-blocks"]
        },

        # SUSPENSION AND RING TRAINING
        {
            "id": "workout-rings-set",
            "name": "Professional Workout Rings",
            "description": "Olympic standard birch wood rings with precision straps for advanced upper body development and gymnastic movements.",
            "price": 89.99,
            "discount_price": 74.99,
            "category": "equipment",
            "subcategory": "suspension-training",
            "skill_levels": ["intermediate", "advanced", "elite"],
            "stock_quantity": 41,
            "rating": 4.9,
            "review_count": 156,
            "images": [
                "https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg",
                "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWlnaHQlMjB2ZXN0fGVufDB8fHxibGFja3wxNzQ4Mzc1ODM5fDA&ixlib=rb-4.1.0&q=85"
            ],
            "specifications": {
                "material": "Birch wood rings",
                "diameter": "18cm, thickness 2.8cm",
                "capacity": "300kg per side"
            },
            "benefits": ["Muscle-up development", "Ring dips", "Gymnastic strength"],
            "prerequisites": ["pull-ups", "dips"],
            "bundle_suggestions": ["premium-resistance-bands", "liquid-chalk-pro"]
        },

        # WEIGHTED TRAINING EQUIPMENT
        {
            "id": "premium-dip-belt",
            "name": "Premium Dip Belt",
            "description": "Laboratory-tested heavy-duty dip belt supporting up to 1000kg. Available with stainless steel chain or lightweight rope options.",
            "price": 59.99,
            "category": "equipment",
            "subcategory": "weighted-training",
            "skill_levels": ["intermediate", "advanced", "elite"],
            "stock_quantity": 29,
            "rating": 4.8,
            "review_count": 134,
            "images": [
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg",
                "https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg"
            ],
            "specifications": {
                "capacity": "1000kg tested",
                "chain": "Stainless steel, 90cm",
                "padding": "Neoprene comfort padding"
            },
            "benefits": ["Progressive overload", "Weighted dips", "Weighted pull-ups"],
            "prerequisites": ["bodyweight-dips", "pull-ups"],
            "bundle_suggestions": ["elite-weight-vest", "workout-rings-set"]
        },
        {
            "id": "elite-weight-vest-10kg",
            "name": "Elite Weight Vest (10kg)",
            "description": "Adjustable weight vest with removable 1kg iron blocks. Compact, body-hugging design prevents weight shifting during movement.",
            "price": 149.99,
            "discount_price": 129.99,
            "category": "equipment",
            "subcategory": "weighted-training",
            "skill_levels": ["intermediate", "advanced"],
            "stock_quantity": 18,
            "rating": 4.7,
            "review_count": 89,
            "images": [
                "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWlnaHQlMjB2ZXN0fGVufDB8fHxibGFja3wxNzQ4Mzc1ODM5fDA&ixlib=rb-4.1.0&q=85",
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg"
            ],
            "specifications": {
                "weight": "10kg adjustable",
                "increments": "1kg removable blocks",
                "design": "Body-hugging fit"
            },
            "benefits": ["Dynamic weighted training", "Progressive loading", "Full movement freedom"],
            "prerequisites": ["bodyweight-mastery", "endurance-base"],
            "bundle_suggestions": ["premium-dip-belt", "performance-apparel"]
        },
        {
            "id": "elite-weight-vest-20kg",
            "name": "Elite Weight Vest (20kg)",
            "description": "Professional-grade 20kg weight vest for advanced athletes. Features velcro patches for personalization and maximum load capacity.",
            "price": 199.99,
            "discount_price": 169.99,
            "category": "equipment",
            "subcategory": "weighted-training",
            "skill_levels": ["advanced", "elite"],
            "stock_quantity": 12,
            "rating": 4.9,
            "review_count": 67,
            "images": [
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
                "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg"
            ],
            "specifications": {
                "weight": "20kg adjustable",
                "increments": "1kg removable blocks",
                "customization": "Velcro patch areas"
            },
            "benefits": ["Elite training loads", "Competitive preparation", "Maximum resistance"],
            "prerequisites": ["advanced-strength", "weighted-experience"],
            "bundle_suggestions": ["premium-dip-belt", "competition-apparel"]
        },

        # GRIP ENHANCEMENT PRODUCTS
        {
            "id": "liquid-chalk-pro",
            "name": "Premium Liquid Chalk",
            "description": "Professional-grade liquid chalk with fast-drying, dust-free formula. Superior grip enhancement for all training sessions.",
            "price": 16.99,
            "category": "accessories",
            "subcategory": "grip-enhancement",
            "skill_levels": ["beginner", "intermediate", "advanced", "elite"],
            "stock_quantity": 156,
            "rating": 4.6,
            "review_count": 298,
            "images": [
                "https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg",
                "https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg"
            ],
            "specifications": {
                "volume": "200ml",
                "formula": "Fast-drying, dust-free",
                "scent": "Pleasant, non-intrusive"
            },
            "benefits": ["Enhanced grip", "Sweat resistance", "Clean application"],
            "prerequisites": [],
            "bundle_suggestions": ["workout-rings-set", "parallettes-premium-set"]
        },
        {
            "id": "grip-tape-professional",
            "name": "Professional Grip Tape",
            "description": "High-quality cotton grip tape that absorbs moisture and prevents slipping. Applies to any equipment without residue.",
            "price": 12.99,
            "category": "accessories",
            "subcategory": "grip-enhancement",
            "skill_levels": ["intermediate", "advanced", "elite"],
            "stock_quantity": 89,
            "rating": 4.5,
            "review_count": 167,
            "images": [
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg"
            ],
            "specifications": {
                "material": "100% Cotton",
                "length": "10m roll",
                "application": "No residue removal"
            },
            "benefits": ["Moisture absorption", "Custom grip zones", "Equipment protection"],
            "prerequisites": [],
            "bundle_suggestions": ["parallettes-pro", "workout-rings-set"]
        },

        # PERFORMANCE TRAINING WEAR
        {
            "id": "performance-training-tee",
            "name": "Performance Training T-Shirt",
            "description": "High-performance athletic t-shirt with raglan sleeves and moisture-wicking technology for intense training sessions.",
            "price": 34.99,
            "category": "apparel",
            "subcategory": "performance-wear",
            "skill_levels": ["beginner", "intermediate", "advanced"],
            "stock_quantity": 145,
            "rating": 4.4,
            "review_count": 189,
            "images": [
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg",
                "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg"
            ],
            "specifications": {
                "material": "90% Polyester, 10% Spandex",
                "fit": "Athletic raglan sleeves",
                "technology": "Moisture-wicking"
            },
            "benefits": ["Breathability", "Movement freedom", "Sweat management"],
            "prerequisites": [],
            "bundle_suggestions": ["performance-shorts", "wrist-wraps-performance"]
        },
        {
            "id": "competition-tank-top",
            "name": "Competition Tank Top",
            "description": "Ultralight competition-grade tank top with 100% polyester construction for maximum breathability during events.",
            "price": 29.99,
            "discount_price": 24.99,
            "category": "apparel",
            "subcategory": "competition-wear",
            "skill_levels": ["advanced", "elite"],
            "stock_quantity": 67,
            "rating": 4.7,
            "review_count": 98,
            "images": [
                "https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg",
                "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWlnaHQlMjB2ZXN0fGVufDB8fHxibGFja3wxNzQ4Mzc1ODM5fDA&ixlib=rb-4.1.0&q=85"
            ],
            "specifications": {
                "material": "100% Polyester",
                "weight": "Ultralight",
                "design": "Competition cut"
            },
            "benefits": ["Maximum breathability", "Competition ready", "Lightweight"],
            "prerequisites": [],
            "bundle_suggestions": ["competition-shorts", "elite-weight-vest-20kg"]
        },

        # LIFESTYLE AND CASUAL WEAR
        {
            "id": "premium-training-hoodie",
            "name": "Premium Training Hoodie",
            "description": "Heavy-weight premium hoodie with Japanese-inspired design elements. Perfect blend of athletic performance and street fashion.",
            "price": 79.99,
            "discount_price": 67.99,
            "category": "apparel",
            "subcategory": "lifestyle-wear",
            "skill_levels": ["beginner", "intermediate", "advanced"],
            "stock_quantity": 78,
            "rating": 4.8,
            "review_count": 156,
            "images": [
                "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg",
                "https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg"
            ],
            "specifications": {
                "material": "50% Cotton, 50% Polyester",
                "weight": "400g/m²",
                "design": "Oversized fit"
            },
            "benefits": ["Premium comfort", "Street style", "Versatile wear"],
            "prerequisites": [],
            "bundle_suggestions": ["vintage-tank-top", "training-joggers"]
        },
        {
            "id": "vintage-tank-top",
            "name": "Vintage Athletic Tank Top",
            "description": "Classic styling tank top with traditional athletic aesthetics. Comfortable cotton blend with loose fit design.",
            "price": 24.99,
            "category": "apparel",
            "subcategory": "lifestyle-wear",
            "skill_levels": ["beginner", "intermediate", "advanced"],
            "stock_quantity": 134,
            "rating": 4.3,
            "review_count": 134,
            "images": [
                "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
                "https://images.pexels.com/photos/6388357/pexels-photo-6388357.jpeg"
            ],
            "specifications": {
                "material": "60% Cotton, 40% Polyester",
                "fit": "Loose, comfortable",
                "style": "Classic athletic"
            },
            "benefits": ["Classic comfort", "Timeless style", "Versatile wear"],
            "prerequisites": [],
            "bundle_suggestions": ["premium-training-hoodie", "performance-training-tee"]
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
