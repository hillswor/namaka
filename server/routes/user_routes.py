from flask import Blueprint
from flask_restful import Resource, Api

user_routes = Blueprint("user_routes", __name__)
api = Api(user_routes)


class HelloWorld(Resource):
    def get(self):
        return {"hello": "world"}


api.add_resource(HelloWorld, "/")
