from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os
import bcrypt
from bson import ObjectId
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = './uploads'

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["family_tree"]
users_collection = db["users"]
members_collection = db["members"]

# Ensure upload directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Custom JSON encoder to handle ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

# Utility function to hash passwords
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Utility function to check password
def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode("utf-8"), stored_password.encode("utf-8"))

# Utility function to save a photo
def save_photo(photo):
    if photo:
        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], photo.filename)
        photo.save(photo_path)
        return photo.filename
    return None

# User Registration
@app.route("/signup", methods=["POST"])
def register():
    try:
        data = request.form
        family_id = data.get("familyId")
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")

        if not (family_id and email and username and password):
            return jsonify({"message": "❌ Missing required fields!"}), 400

        # Check for duplicates
        if users_collection.find_one({"familyId": family_id}):
            return jsonify({"message": "❌ Family ID already exists!"}), 400
        if users_collection.find_one({"email": email}):
            return jsonify({"message": "❌ Email already registered!"}), 400
        if users_collection.find_one({"username": username}):
            return jsonify({"message": "❌ Username already taken!"}), 400

        # Hash the password and save the photo
        hashed_password = hash_password(password)
        photo_filename = save_photo(request.files.get("photo"))

        user_data = {
            "familyId": family_id,
            "name": data.get("name"),
            "contact": data.get("contact"),
            "age": data.get("age"),
            "email": email,
            "dob": data.get("dob"),
            "gender": data.get("gender"),
            "address": data.get("address"),
            "username": username,
            "password": hashed_password,
            "photo": photo_filename,
        }

        users_collection.insert_one(user_data)
        return jsonify({"message": "✅ Registration successful!"}), 200

    except Exception as e:
        return jsonify({"message": f"❌ Error: {str(e)}"}), 500

# User Login
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not (email and password):
            return jsonify({"message": "❌ Email and password are required."}), 400

        user = users_collection.find_one({"email": email})
        if not user or not check_password(user["password"], password):
            return jsonify({"message": "❌ Invalid email or password!"}), 401

        return jsonify({"message": "✅ Login successful!", "username": user["username"]}), 200

    except Exception as e:
        return jsonify({"message": f"❌ Error: {str(e)}"}), 500

# Family Stats (Member Count)
@app.route("/api/family-stats", methods=["GET"])
def get_family_stats():
    try:
        member_count = members_collection.count_documents({})
        return jsonify({"memberCount": member_count}), 200
    except Exception as e:
        return jsonify({"message": f"❌ Error: {str(e)}"}), 500



# Route to add a family member
@app.route("/api/add-member", methods=["POST"])
def add_member():
    # Check if the request contains 'multipart/form-data'
    if 'photo' not in request.files:
        return jsonify({"message": "No photo part in the request"}), 400

    name = request.form.get('name')
    age = request.form.get('age')
    dob = request.form.get('dob')
    relation = request.form.get('relation')
    family_id = request.form.get('familyId')
    photo = request.files.get('photo')

    if not (name and age and dob and relation and family_id):
        return jsonify({"message": "⚠️ All fields are required"}), 400

    # Handle photo upload
    if photo:
        photo_filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], photo_filename))

    # Save member details to the database
    new_member = {
        "name": name,
        "age": age,
        "dob": dob,
        "relation": relation,
        "family_id": family_id,
        "photo": photo_filename if photo else None,
    }

    # You need to insert this data into your database (MongoDB or SQL)
    db.members.insert_one(new_member)

    return jsonify({"message": "Member added successfully!"})


# Route to get the family members for the family tree
@app.route("/api/get-family-tree", methods=["GET"])
def get_family_tree():
    try:
        # Fetch all family members from the database (no need for familyId)
        members = list(members_collection.find())
        
        if not members:
            return jsonify({"message": "❌ No family members found!"}), 404

        # Create a simple family tree data structure
        family_tree = []
        for member in members:
            family_tree.append({
                "name": member.get("name"),
                "relation": member.get("relation")
            })

        return jsonify({"family_tree": family_tree}), 200

    except Exception as e:
        return jsonify({"message": f"❌ Error: {str(e)}"}), 500



if __name__ == "__main__":
    app.run(debug=True)
