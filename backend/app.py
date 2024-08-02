from flask import Flask, request, jsonify, send_from_directory
from googlesearch import search
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/build')
CORS(app, origins=["http://localhost:3000"])

def get_page_title(url: str) -> str:
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup.find('title').text if soup.find('title') else 'No title'
    except Exception:
        return 'Error - could not find title'

@app.route('/search', methods=['GET'])
def search_google() -> None:
    query = request.args.get('q')
    results = []
    for url in search(query, num_results=10):
        results.append({
            'link': url,
            'title': get_page_title(url),
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
