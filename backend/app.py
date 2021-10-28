#!flask/bin/python
import requests
from src.data_helper import *
from src.database_writer import *
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

# Returns JSON object of sales recorded for a specified model year
# Returns: sales provided if available, -1 if not found
@app.route('/api/v1/year-sales', methods=['POST'])
def get_year_sales():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("ABORTING")
        abort(400)
    data = request.get_json()
    sales_for_year = get_sales(int(data['year']), data['make'], data['model'])

    return jsonify({
        "sales": sales_for_year
    })

@app.route('/api/v1/car-makers', methods=['GET'])
def get_makers():
    makers = get_car_makers()
    return jsonify({
        "carMakes": makers
    })


@app.route('/api/v1/years', methods=['GET'])
def get_years():

    data = request.get_json()
    years = get_all_years()

    return jsonify({
        "years": years
    })

@app.route('/api/v1/models', methods=['POST'])
def get_models():

    if not request.json or 'year' not in request.json or 'make' not in request.json:
        print("ABORTING")
        abort(400)
    data = request.get_json()
    models = get_all_models(data['year'], data['make'])

    return jsonify({
        "models": models
    })

# HARD CODED
@app.route('/api/v1/complaint-categories', methods=['POST'])
def get_complaint_categories():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("ABORTING")
        abort(400)
    categories = get_complaints_type_json()
    return jsonify({
        "categories": categories
    })

"""
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

"""


@app.route('/api/v1/recharts-complaints', methods=['POST'])
def get_recharts_sales():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("ABORTING")
        abort(400)
    data = request.get_json()
    years = get_all_years()
    complaints_info = get_recharts_complaints(data["make"], data["model"])
    return jsonify({
        "data": complaints_info
    })

if __name__ == '__main__':
    app.run(debug=True)