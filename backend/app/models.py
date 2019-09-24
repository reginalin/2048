"""
Defines database Score model and helper functions
"""
from typing import List
from flask_sqlalchemy import BaseQuery
from app import DB

class Score(DB.Model):
    """ 
    Model for a user and corresponding score value.
    
    keyword 
    """
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(30), nullable=False)
    scoreValue = DB.Column(DB.String(30), nullable=False)

    def __repr__(self) -> str:
        return "<Name: {}>".format(self.name)

def top_scores(num_scores: int) -> BaseQuery:
    """ 
    Returns top scores 
    where scores are ordered in ascending time value.

    Keyword arguments:
    num_scores -- the total number of score values to return
    """
    return Score.query.order_by(Score.scoreValue.asc()).limit(num_scores)

def add_to_db(username: str, score: str) -> None:
    """
    Adds a Score item to database

    Keyword arguments: 
    username -- the name to add   
    score -- the corresponding score to add 
    """
    DB.session.add(Score(name=username, scoreValue=score))
    DB.session.commit()

def query_as_json(scores: BaseQuery) -> List:
    """
    Returns queried scores as array of json objects.

    Keyword arguments:
    scores -- query value to be converted to json
    """
    scores_array = [{
        "id": score.id,
        "name": score.name,
        "scoreValue": score.scoreValue} for score in scores]
    return scores_array
