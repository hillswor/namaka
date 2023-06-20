from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import re
import os
from routes.user_routes import user_routes
import ipdb

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

app.register_blueprint(user_routes)


class User(db.Model):
    __tablename__ = "users"

    US_STATE_CODES = {
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
    }

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(254))
    city = db.Column(db.String(120))
    state = db.Column(db.String(2))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    last_login = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now()
    )

    @validates("email")
    def validate_email(self, key, email):
        if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
            raise AssertionError("Provided email is not a valid email.")
        return email

    @validates("state")
    def validate_state(self, key, state):
        if state.upper() not in self.US_STATE_CODES:
            raise AssertionError("Provided state is not a valid US state code.")
        return state.upper()

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


if __name__ == "__main__":
    ipdb.set_trace()
    app.run(port=5555, debug=True)
