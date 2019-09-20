'''
Creates app for 2048 backend
'''
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

APP = Flask(__name__)
APP.config.from_object(config)

# handle cross origin requests from frontend
CORS(APP, resources={r'/*': {'origins': '*'}})

# initialize sqlite db
DB = SQLAlchemy(APP)

from app.models import Score, top_scores, query_as_json
from app import api
