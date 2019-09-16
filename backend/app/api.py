"""
Specifies routes for 2048 backend
"""
from flask import request
from flask import json
from app import app, db
from app.models import Score, top_scores, query_as_json

@app.route("/users", methods=["GET"])
def get_users():
    """
    get top 10 users from scores db
    """
    scores = top_scores(10)
    top_scores_json = query_as_json(scores)
    return {'scores': (top_scores_json)}

@app.route("/user", methods=["POST"])
def add_user():
    """
    add user to db from http post request
    """
    response = json.loads(request.data)
    form_name = response['username']
    form_score = response['score']
    userscore = Score(name=form_name, scoreValue=form_score)
    db.session.add(userscore)
    db.session.commit()
