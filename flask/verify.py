from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/flask/verify')
def verify():
    return jsonify({'test': 1})