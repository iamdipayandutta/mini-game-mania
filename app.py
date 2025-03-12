from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scores.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ✅ Define the Score Model
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(50), nullable=False)
    game = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)

# ✅ Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/tic-tac-toe')
def tic_tac_toe():
    return render_template('games/tic_tac_toe.html')

@app.route('/rock-paper-scissors')
def rock_paper_scissors():
    return render_template('games/rock_paper_scissors.html')

@app.route('/number-guess')
def number_guess():
    return render_template('games/number_guess.html')


# ✅ API for storing scores
@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.json
    new_score = Score(player=data['player'], game=data['game'], score=data['score'])
    db.session.add(new_score)
    db.session.commit()
    return jsonify({"message": "Score submitted!"}), 200

@app.route('/get-scores', methods=['GET'])
def get_scores():
    scores = Score.query.all()
    return jsonify([{ "player": s.player, "game": s.game, "score": s.score } for s in scores])

if __name__ == '__main__':
    app.run(debug=True)
