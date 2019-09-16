"""
Contains backend logic for 2048
"""
import json
from flask import Flask
from flask import request
from flask import json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

app = Flask(__name__)
app.config.from_object(config)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy(app)

class Score(db.Model):
    """
    sqlite model for a user and corresponding score value
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    scoreValue = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

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

def query_as_json(scores):
    """
    converts scores into array of json objects
    """
    scores_array = [{
        "id": score.id,
        "name": score.name,
        "scoreValue": score.scoreValue} for score in scores]
    return scores_array

def top_scores(num_scores):
    """
    Gets top num_scores scores
    """
    return Score.query.order_by(Score.scoreValue.asc()).limit(num_scores)

if __name__ == "__main__":
    app.run(debug=True)
