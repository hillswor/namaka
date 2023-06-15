from flask import Flask
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

from models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
api = Api(app)


class HelloWorld(Resource):
    def get(self):
        return {"hello": "world"}


api.add_resource(HelloWorld, "/")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
