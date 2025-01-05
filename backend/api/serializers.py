from rest_framework import serializers

class HealthDataSerializerIndia(serializers.Serializer):
    Age = serializers.IntegerField()
    Diabetes = serializers.IntegerField()
    BloodPressureProblems = serializers.IntegerField()
    AnyTransplants = serializers.IntegerField()
    AnyChronicDiseases = serializers.IntegerField()
    KnownAllergies = serializers.IntegerField()
    HistoryOfCancerInFamily = serializers.IntegerField()
    NumberOfMajorSurgeries = serializers.IntegerField()
    BMI = serializers.FloatField()

class HealthDataSerializerAmerica(serializers.Serializer):
    age = serializers.IntegerField()
    sex = serializers.CharField()
    bmi = serializers.FloatField()    
    children = serializers.IntegerField()
    smoker = serializers.CharField()
    region = serializers.CharField()
    