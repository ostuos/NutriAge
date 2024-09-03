from flask import Flask, send_from_directory, request, Response
from replit import db
import os
import json
import traceback

app = Flask(__name__)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'to_dict'):
            return obj.to_dict()
        elif hasattr(obj, 'value') and isinstance(obj.value, dict):
            return obj.value
        return super().default(obj)

def custom_jsonify(data):
    try:
        return Response(json.dumps(data, cls=CustomJSONEncoder), mimetype='application/json')
    except Exception as e:
        print(f"Error in custom_jsonify: {e}")
        print(traceback.format_exc())
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('public', path)):
        return send_from_directory('public', path)
    else:
        return "File not found", 404

@app.route('/api/profile', methods=['GET', 'POST'])
def profile():
    try:
        if request.method == 'GET':
            user_id = request.args.get('user_id', '1234')
            profile_data = db.get(f"profile_{user_id}", {})
            return custom_jsonify(profile_data)
        elif request.method == 'POST':
            user_id = request.json.get('user_id', '1234')
            profile_data = request.json.get('profile', {})
            db[f"profile_{user_id}"] = profile_data
            return custom_jsonify({"message": "הפרופיל עודכן בהצלחה"})
    except Exception as e:
        print(f"Error in profile: {e}")
        print(traceback.format_exc())
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

@app.route('/api/meal-plan', methods=['GET', 'POST'])
def meal_plan():
    try:
        if request.method == 'GET':
            user_id = request.args.get('user_id', '1234')
            meal_plan_data = db.get(f"meal_plan_{user_id}", {})
            return custom_jsonify(meal_plan_data)
        elif request.method == 'POST':
            user_id = request.json.get('user_id', '1234')
            meal_plan_data = request.json.get('meal_plan', {})
            db[f"meal_plan_{user_id}"] = meal_plan_data
            return custom_jsonify({"message": "תוכנית התזונה עודכנה בהצלחה"})
    except Exception as e:
        print(f"Error in meal_plan: {e}")
        print(traceback.format_exc())
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

@app.route('/api/nutrient-tracking', methods=['GET', 'POST'])
def nutrient_tracking():
    try:
        user_id = request.args.get('user_id', '1234')
        if request.method == 'GET':
            tracking_data = db.get(f"nutrient_tracking_{user_id}", {})
            return custom_jsonify(tracking_data)
        elif request.method == 'POST':
            tracking_data = request.json.get('tracking', {})
            db[f"nutrient_tracking_{user_id}"] = tracking_data
            return custom_jsonify({"message": "נתוני המעקב התזונתי עודכנו בהצלחה"})
    except Exception as e:
        print(f"Error in nutrient_tracking: {e}")
        print(traceback.format_exc())
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

@app.route('/api/health-metrics', methods=['GET', 'POST'])
def health_metrics():
    try:
        user_id = request.args.get('user_id', '1234')
        if request.method == 'GET':
            metrics_data = db.get(f"health_metrics_{user_id}", {})
            return custom_jsonify(metrics_data)
        elif request.method == 'POST':
            metrics_data = request.json.get('metrics', {})
            db[f"health_metrics_{user_id}"] = metrics_data
            return custom_jsonify({"message": "מדדי הבריאות עודכנו בהצלחה"})
    except Exception as e:
        print(f"Error in health_metrics: {e}")
        print(traceback.format_exc())
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)