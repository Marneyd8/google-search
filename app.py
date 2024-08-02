from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__, static_folder='build')
CORS(app, origins=["http://localhost:3000"])


@app.route('/search', methods=['GET'])
def search_google():
    query = request.args.get('q')
    results = []
    search_url = f"https://www.google.com/search?q={query}&gl=cz&hl=cs"

    print(f"Search URL: {search_url}")

    try:
        response = requests.get(search_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        })
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        search_results = soup.find_all("div", class_="g")

        for result in search_results:
            title_element = result.find("h3")
            link_element = result.find("a")

            if title_element and link_element:
                title = title_element.get_text()
                link = link_element['href']
                results.append({
                    'link': link,
                    'title': title,
                })

        print(results)
        return jsonify(results)

    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
