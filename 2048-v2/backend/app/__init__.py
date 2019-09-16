"""
Contains backend logic for 2048
"""
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

app = Flask(__name__)
app.config.from_object(config)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy(app)

from app.models import Score
from app import api

if __name__ == "__main__":
    app.run(debug=True)
