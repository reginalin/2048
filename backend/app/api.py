"""
Specifies routes for 2048 backend
"""
from typing import Any, Dict
from flask import request
from flask import json
from app import APP, DB 
from app import top_scores, query_as_json, add_to_db

@APP.route('/users', methods=['GET'])
def get_users() -> Dict[str, Any]:
    """
    Return top 10 users from scores DB.
    """
    top_scores_json = query_as_json(top_scores(10))
    return {"scores": (top_scores_json)}

@APP.route('/user', methods=['POST'])
def add_user() -> None:
    """
    Add user to DB from http post request.
    """
    response = json.loads(request.data)
    form_name = response["username"]
    form_score = response["score"]
    add_to_db(form_name, form_score)
