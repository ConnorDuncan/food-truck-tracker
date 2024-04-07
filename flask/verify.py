from flask import Flask, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

@app.route('/flask/verify')
def verify():
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

    return (response.choices[0] in list)