"""
Creates app for 2048 backend
"""
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

# create app
APP = Flask(__name__)
APP.config.from_object(config)

# handle cross origin requests from frontend
CORS(APP, resources={r'/*': {'origins': '*'}})

# initialize database
DB = SQLAlchemy(APP)

from app.models import Score, top_scores, query_as_json, add_to_db
from app import api
