import os
import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.api import *
from app.models import * 
from app import APP
from app import models

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_FILE = 'sqlite:///{}'.format(
        os.path.join(
            PROJECT_DIR, 
            'test_highscores.db')
        )

@pytest.fixture(scope='session')
def db_test(): 
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_FILE 
    db = SQLAlchemy(app)
    db.create_all()
    return db

@pytest.fixture(scope='session')
def db(): 
    db = SQLAlchemy(APP)
    db.create_all()
    return db

def test_add_to_db(db): 
    add_to_db("Regina", "00:01:00")
    score = top_scores(1)
    score_json = query_as_json(score)[0]
    assert score_json["name"] == "Regina"
    assert score_json["scoreValue"] == "00:01:00"
