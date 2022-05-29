#!flask/bin/python
import requests
from src.data_helper import *
from src.database_writer import *
from flask import Flask, jsonify, request, abort
#import src.config as config
import sys

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route('/api/v1/iihs-data', methods=['POST'])
def get_iihs_data():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()

    get_iihs_slug(data['year'], data['make'], data['model'])
    return "placeholder"


# Returns JSON object of all recorded sales of a model
@app.route('/api/v1/all-sales', methods=['POST'])
def get_all_sales():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
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
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    sales_for_year = helper_get_sales_for_model(int(float(data['year'])), data['make'], data['model'])

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
    years = get_all_years()

    return jsonify({
        "years": years
    })

@app.route('/api/v1/models', methods=['POST'])
def get_models():

    if not request.json or 'year' not in request.json or 'make' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    models = get_all_models(data['year'], data['make'])

    return jsonify({
        "models": models
    })

@app.route('/api/v1/get-complaints-for-model', methods=['POST'])
def get_complaints_for_model():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    complaints = helper_get_complaints_for_model(data["year"], data["make"], data["model"])
    return jsonify({
        "numberComplaints": complaints
    })

@app.route('/api/v1/complaint-categories', methods=['POST'])
def get_complaint_categories():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    categories = get_complaints_type_json(data['year'], data['make'], data['model'])
    return jsonify({
        "categories": categories
    })

@app.route('/api/v1/all-complaint-categories', methods=['POST'])
def get_all_complaint_categories():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    categories = get_all_complaint_types_json(data['year'], data['make'], data['model'])
    return jsonify({
        "completeCategories": categories
    })


@app.route('/api/v1/recharts-complaints', methods=['POST'])
def recharts_complaints():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    complaints_info = get_recharts_complaints(data["make"], data["model"])
    return jsonify({
        "data": complaints_info
    })

@app.route('/api/v1/recharts-sales', methods=['POST'])
def recharts_sales():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    sales_info = get_recharts_sales(data["make"], data["model"])
    return jsonify({
        "data": sales_info
    })

@app.route('/api/v1/recharts', methods=['POST'])
def recharts_info():
    if not request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    car_info = get_recharts_info(data["make"], data["model"])
    return jsonify({
        "data": car_info
    })

@app.route('/api/v1/vehicle-id', methods=['POST'])
def route_vehicle_id():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    vehicle_id = get_vehicle_id(data["year"], data["make"], data["model"])
    return jsonify({
        "vehicleID": vehicle_id 
    })

@app.route('/api/v1/vehicle-picture', methods=['POST'])
def route_vehicle_picture():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    vehicle_id = get_vehicle_id(data["year"], data["make"], data["model"])
    picture_url = get_vehicle_picture(vehicle_id)

    return jsonify({
        "vehicleID": picture_url 
    })

@app.route('/api/v1/all-vehicles', methods=['GET'])
def route_all_vehicles():
    entries = get_all_entries()    

    return jsonify({
        "data": entries
    })

@app.route('/api/v1/safety-nhtsa', methods=['POST'])
def route_safety_nhtsa():
    if not request.json or 'year' not in request.json or 'make' not in request.json or 'model' not in request.json:
        print("Error: invalid request", file = sys.stderr )
        abort(400)
    data = request.get_json()
    safety_info = get_safety_ratings(data["year"], data["make"], data["model"])

    return jsonify({
        "safetyInfo": safety_info
    })


if __name__ == '__main__':
    #app.run(debug=True)
    #app.run(host='0.0.0.0')
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000, threads=6)
