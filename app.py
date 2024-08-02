from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from googlesearch import search
import os

app = Flask(__name__, static_folder='build')
CORS(app)


@app.route('/search', methods=['GET'])
def search_google():
    query = request.args.get('q')
    results = []
    print(query)
    for result in search(query, num_results=10, lang='cs', advanced=True):
        results.append({
            'link': result.url,
            'title': result.title,
            'description': result.description
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
