from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    print('Hello, World!')
    return jsonify({'message': 'Hello, World!'})

@app.route('/question', methods=['POST'])
def question():
    data = request.get_json()
    question = data.get('message')
    movie = data.get('movie')
    print(f'La pregunta sobre {movie} es: {question}')

    return jsonify({'message': f'Ufff que buena película. {movie} es una de mis favoritas'})





if __name__ == '__main__':
    app.run(debug=True)