from flask import Flask, request, session, make_response, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_bcrypt import check_password_hash
from dotenv import load_dotenv
from datetime import timedelta
import os
import ipdb

from models import User, Aquarium
from extensions import db, migrate

load_dotenv()


def create_app():
    app = Flask(__name__)

    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.json.compact = False
    app.secret_key = os.getenv("SECRET_KEY")

    db.init_app(app)
    migrate.init_app(app, db)

    return app


app = create_app()
api = Api(app)


class UserResource(Resource):
    def get(self):
        return "Hello, World!"

    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        city = data.get("city")
        state = data.get("state")

        new_user = User(
            email=email,
            password=password,
            city=city.title(),
            state=state.upper(),
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        return make_response(jsonify(new_user.to_dict()), 201)


api.add_resource(UserResource, "/api/users")


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session["user_id"] = user.id
            return make_response(jsonify(user.to_dict()), 200)
        return make_response(jsonify({"error": "Invalid email or password"}), 401)


api.add_resource(Login, "/api/login")


class Logout(Resource):
    def delete(self):
        session.clear()
        return make_response(jsonify({"message": "Logged out"}), 200)


api.add_resource(Logout, "/api/logout")


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.get(session["user_id"])
            return make_response(jsonify(user.to_dict()), 200)
        return make_response(jsonify({"message": "No user logged in."}), 401)


api.add_resource(CheckSession, "/api/check-session")

# Aquarium routes


class AquariumResource(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()
        owner_id = data.get("owner_id")
        brand = data.get("brand")
        model = data.get("model")
        volume = data.get("volume")

        new_aquarium = Aquarium(
            owner_id=owner_id, brand=brand, model=model, volume=volume
        )

        db.session.add(new_aquarium)
        db.session.commit()
        return make_response(jsonify(new_aquarium.to_dict()), 201)


api.add_resource(AquariumResource, "/api/aquariums")


if __name__ == "__main__":
    with app.app_context():
        app.run(port=5555, debug=True)
