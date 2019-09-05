import os
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
        userscore = Score(name=request.form.get("name"), scoreValue=request.form.get("scoreValue"))
        db.session.add(userscore)
        db.session.commit()
    # scores = Score.query.order_by(Score.scoreValue.desc())
    scores = topScores(10)
    return render_template("index.html", scores=scores)

# get top 10 scores
def topScores(n): 
    return Score.query.order_by(Score.scoreValue.desc()).limit(n)

if __name__ == "__main__":
    app.run(debug=True)

