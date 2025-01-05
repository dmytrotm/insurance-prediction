from django.shortcuts import render
import pickle
import pandas as pd
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import HealthDataSerializerIndia, HealthDataSerializerAmerica

# Create your views here.
def home(request):
    return render(request, 'home.html')

@api_view(["POST"])
def result(request):  
    country = request.GET.get('country', None)  # Defaults to None if not provided

    if country == "india":
        serializer = HealthDataSerializerIndia(data=request.data)
        with open('india_model.pkl', 'rb') as f:
            loaded_pipeline = pickle.load(f)
    elif country == "america":
        serializer = HealthDataSerializerAmerica(data=request.data)
        with open('stacking_pipeline (1).pkl', 'rb') as f:
            loaded_pipeline = pickle.load(f)
    else:
        # If country is not recognized, return an error response
        return Response({"error": "Invalid or unsupported country"}, status=400)

    if serializer.is_valid():
        validated_data = serializer.validated_data
        input_df = pd.DataFrame([validated_data])
        print(validated_data)
        try:
            prediction = loaded_pipeline.predict(input_df)
            print(f"Prediction: {prediction}")
            return Response({"prediction": prediction[0]}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    else:
        return Response(serializer.errors, status=400)


@api_view(["GET"])
def get_questions(request):
    country = request.query_params.get('country', '').lower()

    # Define questions for each region
    questions = {
        "india": [
            {"text": "How old are you?", "type": "number", "min": 18, "max": 116},
            {"text": "What is your height (cm)?", "type": "number", "min": 55, "max": 255},
            {"text": "What is your weight (kg)?", "type": "number", "key": "weight"},
            {"text": "Do you have diabetes?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "Do you have any allergies?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "Do you have any blood pressure problems?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "Do you have any major organ transplants?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "Do you have any chronic diseases?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {
                "text": "Has any of your blood relatives had any form of cancer?",
                "type": "option", 
                "options": ["yes", "no"], 
                "values": ["1", "0"]
            },
            {"text": "Do you have any major surgeries?", "type": "option", "options": ["yes", "no"]},
            {
                "text": "How many major surgeries have you had?",
                "type": "number",
                "min": 1,
                "max": 5,
            },
        ],

        "america": [
            {"text": "What is your age?", "type": "number", "min": 18, "max": 116},
            {"text": "What is your height (cm)?", "type": "number", "min": 55, "max": 255},
            {"text": "What is your weight (kg)?", "type": "number", "key": "weight"},
            {"text": "Your sex:", "type": "option", "options": ["male", "female"], "values": ["male", "female"]},
            {"text": "Do you smoke?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "What region are you from?", "type": "option", "options": ["southwest", "southeast", "northwest", "northeast"], "values": ["southwest", "southeast", "northwest", "northeast"]},
            {"text": "Do you have any children?", "type": "option", "options": ["yes", "no"], "values": ["1", "0"]},
            {"text": "How many children do ou have?", "type": "number", "min": 0, "max": 5}
        ],
    }

    # Return the corresponding questions based on the country
    if country in questions:
        return Response({"country": country, "questions": questions[country]}, status=200)
    else:
        return Response({"error": "Invalid or unsupported country"}, status=400)
