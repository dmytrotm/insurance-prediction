from rest_framework import serializers

class HealthDataSerializer(serializers.Serializer):
    Age = serializers.IntegerField()
    Diabetes = serializers.IntegerField()
    BloodPressureProblems = serializers.IntegerField()
    AnyTransplants = serializers.IntegerField()
    AnyChronicDiseases = serializers.IntegerField()
    KnownAllergies = serializers.IntegerField()
    HistoryOfCancerInFamily = serializers.IntegerField()
    NumberOfMajorSurgeries = serializers.IntegerField()
    BMI = serializers.FloatField()
