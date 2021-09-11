#!flask/bin/python
import requests
from src.data_helper import get_all_sales_json
from flask import Flask, jsonify, request, abort

app = Flask(__name__)

# Returns JSON object of all recorded sales of a model
@app.route('/api/v1/all-sales', methods=['POST'])
def get_all_sales():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("ABORTING")
        abort(400)
    data = request.get_json()
    dict = get_all_sales_json(data['make'], data['model'])

    return jsonify({
        "allSales": dict
    })



if __name__ == '__main__':
    app.run(debug=True)