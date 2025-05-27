import requests
import sys
import json
from datetime import datetime

class DominionAPITester:
    def __init__(self, base_url="https://fb43bf25-ca2e-499e-aef6-6b0c6c96504b.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.product_id = None  # Will store a product ID for individual product tests

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
        if success:
            print(f"Response: {data}")
            if "message" in data and "products" in data:
                print(f"✅ Successfully seeded {len(data['products'])} products")
                print(f"Products: {', '.join(data['products'])}")
            else:
                print("❌ Unexpected response format from product seeding")
        return success, data
        
    def test_get_all_products(self):
        """Test getting all products"""
        success, data = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        if success:
            if isinstance(data, list):
                print(f"✅ Retrieved {len(data)} products")
                if len(data) > 0:
                    # Store a product ID for later tests
                    self.product_id = data[0]["id"]
                    print(f"Sample product: {data[0]['name']} (ID: {self.product_id})")
                    
                    # Validate product structure
                    self._validate_product_structure(data[0])
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
        """Test getting products by category"""
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
        """Test getting a specific product by ID"""
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
            self._validate_product_structure(data)
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
            "id", "name", "description", "long_description", "category", 
            "price", "images", "assets_3d", "specifications", "features", 
            "tags", "stock_quantity", "status", "rating", "review_count"
        ]
        
        missing_fields = [field for field in required_fields if field not in product]
        
        if not missing_fields:
            print("✅ Product has all required fields")
        else:
            print(f"❌ Product is missing fields: {', '.join(missing_fields)}")
            
        # Check 3D assets
        if "assets_3d" in product:
            assets_3d = product["assets_3d"]
            if "model_url" in assets_3d and "preview_image" in assets_3d:
                print("✅ Product has 3D asset URLs")
            else:
                print("❌ Product is missing 3D asset URLs")
                
        # Check specifications
        if "specifications" in product:
            specs = product["specifications"]
            if "dimensions" in specs and "material" in specs:
                print("✅ Product has specifications")
            else:
                print("❌ Product has incomplete specifications")

def main():
    # Setup
    tester = DominionAPITester()
    
    # Run tests
    print("\n===== Testing Dominion Calisthenics Shop API =====\n")
    
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
    tester.test_get_products_by_category("equipment")
    
    # Test getting a specific product by ID
    if tester.product_id:
        tester.test_get_product_by_id()
    
    # 4. Test edge cases
    print("\n=== Testing Edge Cases ===")
    tester.test_get_nonexistent_product()
    tester.test_invalid_category()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())