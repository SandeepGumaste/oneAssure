from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
import json
from bson import ObjectId


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://oneAssure:Wzj7qPt3D2rSaW4T@mycluster.rtfdotp.mongodb.net/?retryWrites=true&w=majority'
mongo = PyMongo(app)
CORS(app)
database_name = 'oneAssure'
mongo_uri = app.config['MONGO_URI']
client = MongoClient(mongo_uri)
collection_name = 'insuranceDataNew'

database = client[database_name]


@app.route('/')
def index():
    return 'Hello, World'


@app.route('/data', methods=['GET'])
def get_all_data():
    try:

        data_from_mongo = database[collection_name].find()

        data_list = list(data_from_mongo)

        if not data_list:
            return jsonify({"error": "No data found in MongoDB"}), 404

        return jsonify({"data": data_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/find_records', methods=['GET'])
def find_record():
    try:
        member_csv = request.args.get('member_csv')
        age_ranges = request.args.getlist('age_range')

        query = {"member_csv": member_csv, "age_range": {"$in": age_ranges}}

        data_from_mongo = database[collection_name].find(query)
        print([member_csv], age_ranges)
        data_list = list(data_from_mongo)

        if not data_list:
            return jsonify({"error": "No data found in MongoDB"}), 404

        return jsonify({"data": data_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/options', methods=['GET'])
def get_first_object():

    try:
        options = database['insuranceOptions'].find_one()

        if not options:
            return jsonify({"error": "No data found in MongoDB"}), 404

        options['_id'] = str(options['_id'])

        return jsonify({"options": options}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
