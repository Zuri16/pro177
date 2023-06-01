from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

words = [
    {
        "inputs": 7,
        "category": "Deportes",
        "word": "Ajedrez"
    },
    {
        "inputs": 7,
        "category": "Nombre de países europeos",
        "word": "Francia"
    },
    {
        "inputs": 4,
        "category": "Familia",
        "word": "hijo"
    },
    {
        "inputs": 6,
        "category": "comida",
        "word": "cereal"
    },
    {
        "inputs": 6,
        "category": "mascotas",
        "word": "conejo"
    }

]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_template")
def get_template():
    return jsonify({
        "status":"success",
        "word":random.choice(words)
    })

if __name__ == "__main__":
    app.run(debug=True)