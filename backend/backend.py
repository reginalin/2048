import os
import json
from flask import Flask
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "highscores.db"))
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
db = SQLAlchemy(app)

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    scoreValue = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.form: 
        form_name = request.form.get("name") 
        if form_name == None:
            form_name = "someone"
        userscore = Score(name=form_name, 
                scoreValue=request.form.get("scoreValue"))
        # userscore = Score(name=request.form.get("name"), 
                # scoreValue=request.form.get("scoreValue"))
        db.session.add(userscore)
        db.session.commit()
    scores = top_scores(10)
    top_scores_json = query_as_json(scores)
    print("NOW SCORES")
    print(top_scores_json)
    return render_template("index.html", token=top_scores_json)

def query_as_json(scores):
    scores_array = [ {"name": score.name, "scoreValue": score.scoreValue} 
            for score in scores ]
    return scores_array

# get top 10 scores
def top_scores(n): 
    return Score.query.order_by(Score.scoreValue.asc()).limit(n)

if __name__ == "__main__":
    app.run(debug=True)

