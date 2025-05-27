import requests
import sys
import json
from datetime import datetime

class CalisthenicsProductTester:
    def __init__(self, base_url="https://d10517c8-a2cc-43ed-8798-fb61a8d9c86e.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.product_id = None  # Will store a product ID for individual product tests
        
        # Expected subcategories based on the review request
        self.expected_subcategories = [
            'resistance-systems', 'parallettes', 'suspension-training', 
            'weighted-training', 'grip-enhancement', 'performance-wear', 
            'competition-wear', 'lifestyle-wear', 'support-systems'
        ]
        
        # Key products to verify
        self.key_products = [
            'Premium Resistance Bands Set',
            'Premium Parallettes Set',
            'Professional Workout Rings',
            'Elite Weight Vest (10kg)',
            'Elite Weight Vest (20kg)',
            'Premium Liquid Chalk',
            'Performance Training T-Shirt',
            'Competition Tank Top',
            'Premium Training Hoodie'
        ]

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json() if response.text else {}
                except json.JSONDecodeError:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, data = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        if success:
            print(f"Response: {data}")
            if data.get("message") == "Hello World":
                print("✅ Root endpoint returns 'Hello World'")
            else:
                print("❌ Root endpoint does not return 'Hello World'")
                success = False
                self.tests_passed -= 1
        return success, data

    def test_create_status_check(self):
        """Test creating a status check"""
        data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=data
        )

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
    def test_seed_products(self):
        """Test seeding products into the database"""
        success, data = self.run_test(
            "Seed Products",
            "POST",
            "products/seed",
            200
        )
        
        # If seeding fails with a 500 error, it's likely due to validation errors
        # Let's try to manually seed a valid product
        if not success:
            print("⚠️ Product seeding failed. Attempting to manually seed a valid product...")
            
            # Create a valid product with all required fields
            valid_product = {
                "name": "Test Resistance Bands",
                "description": "High-quality resistance bands for training",
                "long_description": "These premium resistance bands are perfect for all your training needs. They provide variable resistance for different exercises.",
                "category": "equipment",
                "price": 29.99,
                "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
                "assets_3d": {
                    "model_url": "https://example.com/model.glb",
                    "texture_urls": ["https://example.com/texture.jpg"],
                    "preview_image": "https://example.com/preview.jpg"
                },
                "specifications": {
                    "material": "Natural latex",
                    "resistance_levels": "Light, Medium, Heavy"
                },
                "features": ["Durable", "Multiple resistance levels"],
                "tags": ["resistance", "training"],
                "stock_quantity": 50,
                "status": "active"
            }
            
            success, data = self.run_test(
                "Create Single Product",
                "POST",
                "products",
                200,
                data=valid_product
            )
            
            if success:
                print("✅ Successfully created a single product manually")
                print(f"Product: {data['name']}")
            else:
                print("❌ Failed to create a product manually")
        else:
            print(f"Response: {data}")
            if "message" in data and "products" in data:
                print(f"✅ Successfully seeded {len(data['products'])} products")
                print(f"Products: {', '.join(data['products'])}")
            else:
                print("❌ Unexpected response format from product seeding")
        
        return success, data
        
    def test_get_all_products(self):
        """Test getting all products and validate the comprehensive catalog"""
        success, data = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        if success:
            if isinstance(data, list):
                print(f"✅ Retrieved {len(data)} products")
                
                # Check if we have at least 15 products as required
                if len(data) >= 15:
                    print(f"✅ Product catalog has {len(data)} products (requirement: at least 15)")
                else:
                    print(f"❌ Product catalog has only {len(data)} products (requirement: at least 15)")
                    success = False
                    self.tests_passed -= 1
                
                if len(data) > 0:
                    # Store a product ID for later tests
                    self.product_id = data[0]["id"]
                    print(f"Sample product: {data[0]['name']} (ID: {self.product_id})")
                    
                    # Validate product structure
                    self._validate_product_structure(data[0])
                    
                    # Check for key products
                    self._check_key_products(data)
                    
                    # Check for subcategories
                    self._check_subcategories(data)
                    
                    # Check for pricing, ratings, and specifications
                    self._validate_product_data(data)
                    
                    # Check for bundle suggestions
                    self._check_bundle_suggestions(data)
                    
                    # Check for image URLs
                    self._check_image_urls(data)
                else:
                    print("⚠️ No products found. Make sure to run seed_products first.")
            else:
                print("❌ Expected a list of products")
                success = False
                self.tests_passed -= 1
        return success, data
        
    def test_get_featured_products(self):
        """Test getting featured products (rating >= 4.0)"""
        success, data = self.run_test(
            "Get Featured Products",
            "GET",
            "products/featured",
            200
        )
        if success:
            if isinstance(data, list):
                print(f"✅ Retrieved {len(data)} featured products")
                if len(data) > 0:
                    # Verify all products have rating >= 4.0
                    all_featured = all(product["rating"] >= 4.0 for product in data)
                    if all_featured:
                        print("✅ All featured products have rating >= 4.0")
                    else:
                        print("❌ Some featured products have rating < 4.0")
                        success = False
                        self.tests_passed -= 1
                else:
                    print("⚠️ No featured products found")
            else:
                print("❌ Expected a list of products")
                success = False
                self.tests_passed -= 1
        return success, data
        
    def test_get_products_by_category(self, category):
        """Test getting products by main category"""
        success, data = self.run_test(
            f"Get Products by Category: {category}",
            "GET",
            f"products/category/{category}",
            200
        )
        if success:
            if isinstance(data, list):
                print(f"✅ Retrieved {len(data)} products in category '{category}'")
                if len(data) > 0:
                    # Verify all products have the correct category
                    all_correct_category = all(product["category"] == category for product in data)
                    if all_correct_category:
                        print(f"✅ All products have category '{category}'")
                    else:
                        print(f"❌ Some products do not have category '{category}'")
                        success = False
                        self.tests_passed -= 1
                else:
                    print(f"⚠️ No products found in category '{category}'")
            else:
                print("❌ Expected a list of products")
                success = False
                self.tests_passed -= 1
        return success, data
        
    def test_get_product_by_id(self):
        """Test getting a specific product by ID and validate detailed attributes"""
        if not self.product_id:
            print("⚠️ No product ID available. Run test_get_all_products first.")
            return False, {}
            
        success, data = self.run_test(
            f"Get Product by ID: {self.product_id}",
            "GET",
            f"products/{self.product_id}",
            200
        )
        if success:
            print(f"✅ Retrieved product: {data['name']}")
            
            # Validate basic product structure
            self._validate_product_structure(data)
            
            # Check for skill levels, prerequisites, and benefits
            self._validate_product_details(data)
        return success, data
        
    def test_get_nonexistent_product(self):
        """Test getting a non-existent product (should return 404)"""
        fake_id = "00000000-0000-0000-0000-000000000000"
        success, data = self.run_test(
            f"Get Non-existent Product (ID: {fake_id})",
            "GET",
            f"products/{fake_id}",
            404
        )
        return success, data
        
    def test_invalid_category(self):
        """Test with an invalid category (should return 422 Unprocessable Entity)"""
        invalid_category = "invalid_category"
        success, data = self.run_test(
            f"Get Products with Invalid Category: {invalid_category}",
            "GET",
            f"products/category/{invalid_category}",
            422
        )
        return success, data
        
    def _validate_product_structure(self, product):
        """Validate that a product has all required fields"""
        required_fields = [
            "id", "name", "description", "category", 
            "price", "images", "specifications", 
            "stock_quantity", "status", "rating", "review_count"
        ]
        
        missing_fields = [field for field in required_fields if field not in product]
        
        if not missing_fields:
            print("✅ Product has all required fields")
        else:
            print(f"❌ Product is missing fields: {', '.join(missing_fields)}")
            
        # Check specifications
        if "specifications" in product:
            specs = product["specifications"]
            if isinstance(specs, dict) and len(specs) > 0:
                print("✅ Product has specifications")
            else:
                print("❌ Product has incomplete specifications")
    
    def _check_key_products(self, products):
        """Check if all key products exist in the catalog"""
        product_names = [p["name"] for p in products]
        found_products = []
        missing_products = []
        
        for key_product in self.key_products:
            found = False
            for name in product_names:
                if key_product in name:  # Partial match to handle variations
                    found_products.append(key_product)
                    found = True
                    break
            if not found:
                missing_products.append(key_product)
        
        if not missing_products:
            print(f"✅ All key products found: {', '.join(found_products)}")
        else:
            print(f"❌ Missing key products: {', '.join(missing_products)}")
            print(f"✅ Found key products: {', '.join(found_products)}")
    
    def _check_subcategories(self, products):
        """Check if products include all expected subcategories"""
        found_subcategories = set()
        
        for product in products:
            if "subcategory" in product:
                found_subcategories.add(product["subcategory"])
        
        missing_subcategories = [sc for sc in self.expected_subcategories if sc not in found_subcategories]
        
        if not missing_subcategories:
            print(f"✅ All expected subcategories found: {', '.join(found_subcategories)}")
        else:
            print(f"❌ Missing subcategories: {', '.join(missing_subcategories)}")
            print(f"✅ Found subcategories: {', '.join(found_subcategories)}")
    
    def _validate_product_data(self, products):
        """Validate that products have proper pricing, ratings, and specifications"""
        valid_pricing = all(p.get("price", 0) > 0 for p in products)
        valid_ratings = all(0 <= p.get("rating", 0) <= 5 for p in products)
        valid_specs = all("specifications" in p and isinstance(p["specifications"], dict) for p in products)
        
        if valid_pricing:
            print("✅ All products have valid pricing")
        else:
            print("❌ Some products have invalid pricing")
            
        if valid_ratings:
            print("✅ All products have valid ratings (0-5)")
        else:
            print("❌ Some products have invalid ratings")
            
        if valid_specs:
            print("✅ All products have specifications")
        else:
            print("❌ Some products are missing specifications")
    
    def _check_bundle_suggestions(self, products):
        """Check if products have bundle suggestions"""
        products_with_bundles = [p for p in products if "bundle_suggestions" in p and p["bundle_suggestions"]]
        
        if products_with_bundles:
            print(f"✅ {len(products_with_bundles)} products have bundle suggestions")
            
            # Verify that bundle suggestions reference valid product IDs
            all_product_ids = [p["id"] for p in products]
            valid_bundles = True
            
            for product in products_with_bundles:
                for bundle_id in product["bundle_suggestions"]:
                    if bundle_id not in all_product_ids:
                        valid_bundles = False
                        print(f"❌ Product '{product['name']}' has invalid bundle suggestion: {bundle_id}")
            
            if valid_bundles:
                print("✅ All bundle suggestions reference valid product IDs")
        else:
            print("❌ No products have bundle suggestions")
    
    def _check_image_urls(self, products):
        """Check if all products have image URLs"""
        products_with_images = [p for p in products if "images" in p and p["images"]]
        
        if len(products_with_images) == len(products):
            print("✅ All products have image URLs")
        else:
            print(f"❌ {len(products) - len(products_with_images)} products are missing image URLs")
    
    def _validate_product_details(self, product):
        """Validate that a product has skill levels, prerequisites, and benefits"""
        has_skill_levels = "skill_levels" in product and isinstance(product["skill_levels"], list)
        has_prerequisites = "prerequisites" in product and isinstance(product["prerequisites"], list)
        has_benefits = "benefits" in product and isinstance(product["benefits"], list)
        
        if has_skill_levels:
            print(f"✅ Product has skill levels: {', '.join(product['skill_levels'])}")
        else:
            print("❌ Product is missing skill levels")
            
        if has_prerequisites:
            if product["prerequisites"]:
                print(f"✅ Product has prerequisites: {', '.join(product['prerequisites'])}")
            else:
                print("✅ Product has no prerequisites (empty list)")
        else:
            print("❌ Product is missing prerequisites field")
            
        if has_benefits:
            print(f"✅ Product has benefits: {', '.join(product['benefits'])}")
        else:
            print("❌ Product is missing benefits")

def main():
    # Setup
    tester = CalisthenicsProductTester()
    
    # Run tests
    print("\n===== Testing Calisthenics Product Catalog API =====\n")
    
    # 1. Test basic status endpoints
    print("\n=== Testing Basic Status Endpoints ===")
    tester.test_root_endpoint()
    tester.test_get_status_checks()
    
    # 2. Test product seeding
    print("\n=== Testing Product Seeding ===")
    tester.test_seed_products()
    
    # 3. Test product retrieval endpoints
    print("\n=== Testing Product Retrieval Endpoints ===")
    tester.test_get_all_products()
    tester.test_get_featured_products()
    
    # 4. Test category filtering
    print("\n=== Testing Category Filtering ===")
    tester.test_get_products_by_category("equipment")
    tester.test_get_products_by_category("accessories")
    tester.test_get_products_by_category("apparel")
    
    # 5. Test product details
    print("\n=== Testing Product Details ===")
    if tester.product_id:
        tester.test_get_product_by_id()
    
    # 6. Test edge cases
    print("\n=== Testing Edge Cases ===")
    tester.test_get_nonexistent_product()
    tester.test_invalid_category()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())