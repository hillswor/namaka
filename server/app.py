from flask import Flask
from configuration import app
from routes.user_routes import user_routes

app.register_blueprint(user_routes)

if __name__ == "__main__":
    app.run(port=5555, debug=True)
