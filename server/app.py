from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from routes.user_routes import user_routes

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")

db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.register_blueprint(user_routes)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
