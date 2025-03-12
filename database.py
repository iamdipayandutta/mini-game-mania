# database.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(50), nullable=False)
    game = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
