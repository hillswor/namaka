from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
from routes.user_routes import user_routes

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

app.register_blueprint(user_routes)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))
    city = db.Column(db.String(120))
    state = db.Column(db.String(120))

    def __init__(self, username, email, city, state):
        self.username = username
        self.email = email
        self.city = city
        self.state = state


if __name__ == "__main__":
    app.run(port=5555, debug=True)
