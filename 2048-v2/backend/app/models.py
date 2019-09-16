from app import db

class Score(db.Model):
    """
    sqlite model for a user and corresponding score value
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    scoreValue = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<Name: {}>".format(self.name)

def top_scores(num_scores):
    """
    Gets top num_scores scores
    """
    return Score.query.order_by(Score.scoreValue.asc()).limit(num_scores)

def query_as_json(scores):
    """
    converts scores into array of json objects
    """
    scores_array = [{
        "id": score.id,
        "name": score.name,
        "scoreValue": score.scoreValue} for score in scores]
    return scores_array