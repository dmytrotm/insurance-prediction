from django.shortcuts import render
import pickle
import pandas as pd
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import HealthDataSerializer

# Create your views here.
def home(request):
    return render(request, 'home.html')

@api_view(["POST"])
def result(request):  
    # Deserialize the incoming data using the serializer
    serializer = HealthDataSerializer(data=request.data)

    if serializer.is_valid():
        # Extract the validated data from the serializer
        validated_data = serializer.validated_data

        # Load the model
        with open('india_model.pkl', 'rb') as f:
            loaded_pipeline = pickle.load(f)

        # Create DataFrame from the validated data
        input_df = pd.DataFrame([validated_data])  # Make sure it's a list of dicts for DataFrame

        # Prediction
        try:
            prediction = loaded_pipeline.predict(input_df)
            print(f"Prediction: {prediction}")
            return Response({"prediction": prediction[0]}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    else:
        return Response(serializer.errors, status=400)

