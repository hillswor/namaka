from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt
import re

from extensions import db

bcrypt = Bcrypt()


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

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "city": self.city,
            "state": self.state,
            "created_at": self.created_at,
            "last_login": self.last_login,
        }

    def __repr__(self):
        return f"<User {self.id} {self.email}>"
