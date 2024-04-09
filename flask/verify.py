from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import random

app = Flask(__name__)
CORS(app)

@app.route('/flask/verify')
def verify():
    img = request.args.get('img')
    list = []
    client = OpenAI(
        api_key='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'
    )

    response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
        "role": "user",
        "content": [
            {"type": "text", "text": "What is the license number of this food license?"},
            {
            "type": "image_url",
            "image_url": {
                "url": "https://www.upmenu.com/wp-content/uploads/2023/01/food-service-license-example.jpeg",
            },
            },
        ],
        }
    ],
    max_tokens=50,
    )

    return jsonify({'test': response.choices[0]})