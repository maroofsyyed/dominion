import requests
import sys
import json
from datetime import datetime

class DominionAPITester:
    def __init__(self, base_url="https://19329494-2c40-42f6-8316-b23dad7119e8.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

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

    def test_get_exercise_categories(self):
        """Test getting all exercise categories"""
        return self.run_test(
            "Get Exercise Categories",
            "GET",
            "categories",
            200
        )

    def test_get_exercises_by_category(self, category_id):
        """Test getting exercises by category"""
        return self.run_test(
            f"Get Exercises for Category {category_id}",
            "GET",
            f"categories/{category_id}/exercises",
            200
        )

    def test_get_exercise_details(self, exercise_id):
        """Test getting exercise details"""
        return self.run_test(
            f"Get Exercise Details for {exercise_id}",
            "GET",
            f"exercises/{exercise_id}",
            200
        )

    def test_get_user_progress(self, user_id="current"):
        """Test getting user progress"""
        return self.run_test(
            "Get User Progress",
            "GET",
            f"users/{user_id}/progress",
            200
        )

    def test_update_exercise_progress(self, exercise_id, progress_data):
        """Test updating exercise progress"""
        return self.run_test(
            f"Update Progress for Exercise {exercise_id}",
            "PUT",
            f"exercises/{exercise_id}/progress",
            200,
            data=progress_data
        )

    def test_get_leaderboard(self):
        """Test getting leaderboard data"""
        return self.run_test(
            "Get Leaderboard",
            "GET",
            "leaderboard",
            200
        )

    def test_get_community_stats(self):
        """Test getting community stats"""
        return self.run_test(
            "Get Community Stats",
            "GET",
            "community/stats",
            200
        )

    def test_user_signup(self, user_data):
        """Test user signup"""
        return self.run_test(
            "User Signup",
            "POST",
            "users/signup",
            201,
            data=user_data
        )

def main():
    # Setup
    tester = DominionAPITester()
    
    # Run tests
    print("\n===== Testing Dominion Calisthenics API =====\n")
    
    # Test getting exercise categories
    success, categories_data = tester.test_get_exercise_categories()
    
    # Test getting exercises for a specific category
    if success and categories_data:
        # Use the first category from the response if available
        category_id = None
        if isinstance(categories_data, list) and len(categories_data) > 0:
            category_id = categories_data[0].get('id', 'horizontal-pull')
        else:
            # Fallback to a known category ID
            category_id = 'horizontal-pull'
        
        success, exercises_data = tester.test_get_exercises_by_category(category_id)
        
        # Test getting details for a specific exercise
        if success and exercises_data and isinstance(exercises_data, list) and len(exercises_data) > 0:
            exercise_id = exercises_data[0].get('id', 'german-hang')
            tester.test_get_exercise_details(exercise_id)
    
    # Test user progress
    tester.test_get_user_progress()
    
    # Test updating exercise progress
    progress_data = {
        "progress": 75,
        "status": "current"
    }
    tester.test_update_exercise_progress("german-hang", progress_data)
    
    # Test leaderboard
    tester.test_get_leaderboard()
    
    # Test community stats
    tester.test_get_community_stats()
    
    # Test user signup
    user_data = {
        "firstName": "Test",
        "lastName": "User",
        "email": f"test.user.{datetime.now().strftime('%H%M%S')}@example.com",
        "age": 25,
        "gender": "prefer-not-to-say",
        "university": "Test University",
        "city": "Test City",
        "fitnessLevel": "beginner",
        "goals": ["Master Pull-ups", "Learn Handstand"]
    }
    tester.test_user_signup(user_data)
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())