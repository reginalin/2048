import os
import json
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask import json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "highscores.db"))
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
db = SQLAlchemy(app)

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    scoreValue = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

@app.route("/users", methods=["GET"])
def getUsers():
    scores = top_scores(10)
    top_scores_json = query_as_json(scores)
    return {'scores': (top_scores_json)}

@app.route("/user", methods=["POST"])
def addUser():
    response = json.loads(request.data)
    form_name = response['username']
    form_score = response['score']
    userscore = Score(name=form_name, 
            scoreValue=form_score)
    db.session.add(userscore)
    db.session.commit()

def query_as_json(scores):
    scores_array = [ {
                        "id": score.id,
                        "name": score.name, 
                        "scoreValue": score.scoreValue
                    } 
            for score in scores ]
    return scores_array

# get top 10 scores
def top_scores(n): 
    return Score.query.order_by(Score.scoreValue.asc()).limit(n)

if __name__ == "__main__":
    app.run(debug=True)
