'''
Specifies routes for 2048 backend
'''
from typing import Any, Dict
from flask import request
from flask import json
from app import APP, DB 
from app import Score, top_scores, query_as_json

@APP.route('/users', methods=['GET'])
def get_users() -> Dict[str, Any]:
    '''
    get top 10 users from scores DB
    '''
    scores = top_scores(10)
    top_scores_json = query_as_json(scores)
    return {'scores': (top_scores_json)}

@APP.route('/user', methods=['POST'])
def add_user() -> None:
    '''
    add user to DB from http post request
    '''
    response = json.loads(request.data)
    form_name = response['username']
    form_score = response['score']
    userscore = Score(name=form_name, scoreValue=form_score)
    DB.session.add(userscore)
    DB.session.commit()
