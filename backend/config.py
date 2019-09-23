import os

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_FILE = 'sqlite:///{}'.format(
        os.path.join(
            PROJECT_DIR, 
            'highscores.db')
        )

SQLALCHEMY_DATABASE_URI = DATABASE_FILE
SQLALCHEMY_TRACK_MODIFICATIONS = False
