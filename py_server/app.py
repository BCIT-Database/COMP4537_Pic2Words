from flask import request, Flask, jsonify
from flask_cors import CORS
from transformers import pipeline
from PIL import Image
from python-dotenv import load_dotenv
import os
import io
import pymysql

load_dotenv()

# get the environment variables
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = int(os.getenv("MYSQL_PORT"))
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")
MYSQL_USER = os.getenv("MYSQL_CUSTOMER_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_CUSTOMER_PASSWORD")

app = Flask(__name__)
CORS(app, resources={
     r"/*": {"origins": ["http://localhost:5173", "https://pic2words-frontend.vercel.app"]}}, supports_credentials=True)


# Database connection
db = pymysql.connect(
    host=MYSQL_HOST,
    port=MYSQL_PORT,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DATABASE,
    cursorclass=pymysql.cursors.DictCursor
)

# load the huggingface model
pipe = pipeline("image-to-text",
                model="Salesforce/blip-image-captioning-large")

API_CALL_LIMIT = 20  # Set the API call limit


def check_and_update_usage(user_id):
    """
    Check and update API usage for a specific user.
    """
    try:
        with db.cursor() as cursor:
            # Check current API usage
            cursor.execute(
                "SELECT calls FROM API_Usage WHERE user_id = %s", (user_id,))
            result = cursor.fetchone()

            if result and result["calls"] >= API_CALL_LIMIT:
                return {"success": False, "message": "API call limit exceeded (20 calls)."}

            # Update or insert usage record
            if result:
                cursor.execute(
                    "UPDATE API_Usage SET calls = calls + 1, last_call = NOW() WHERE user_id = %s", (user_id,)
                )
            else:
                cursor.execute(
                    "INSERT INTO API_Usage (user_id, calls, last_call) VALUES (%s, %s, NOW())", (
                        user_id, 1)
                )
            db.commit()
            return {"success": True}
    except Exception as e:
        print(f"Error updating API usage: {e}")
        db.rollback()
        return {"success": False, "message": "Database error while updating API usage."}


@app.route("/")
def hello():
    return "blip python server is running!"


@app.route('/generate-caption', methods=['POST'])
def generate_caption():
    if 'image' not in request.files:
        return "No image file provided", 400

    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))

    try:
        result = pipe(image)
        return jsonify({"caption": result[0]["generated_text"]})
    except Exception as e:
        return str(e), 500


@app.route('/admin/api-usage', methods=['GET'])
def admin_api_usage():
    """
    Admin route to fetch API usage details for all users.
    """
    try:
        with db.cursor() as cursor:
            cursor.execute("""
                SELECT u.user_id, u.email, a.calls, a.last_call
                FROM users u
                LEFT JOIN API_Usage a ON u.user_id = a.user_id
            """)
            usage_data = cursor.fetchall()
        return jsonify(usage_data)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch API usage: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
