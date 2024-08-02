from flask import Flask, request, jsonify, send_from_directory
from googlesearch import search
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='build')
CORS(app, origins=["http://localhost:3000"])


@app.route('/search', methods=['GET'])
def search_google() -> None:
    query = request.args.get('q')
    results = []
    for resutl in search(query, num_results=10, lang='cz', advanced=True):
        results.append({
            'link': resutl.url,
            'title': resutl.title
        })
    print(results)
    return jsonify(results)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
