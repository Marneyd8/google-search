from flask import Flask, request, jsonify
from googlesearch import search
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3001"])

def get_page_title(url: str) -> str:
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        return  soup.find('title').text if soup.find('title') else 'No title'
    except Exception:
        return 'Error - could not find title',

@app.route('/search', methods=['GET'])
def search_google() -> None:
    query = request.args.get('q')
    results = []
    for url in search(query, num_results=10):
        results.append({
            'link': url,
            'title': get_page_title(url),
        })
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
