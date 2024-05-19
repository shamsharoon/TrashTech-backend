# yourappname/views.py
from django.shortcuts import render
from django.http import JsonResponse
import json

from .backend.recyclable import recyclable


def home(request):
    return render(request, "pwa/home.html")


def analyze_picture(request):
    if request.method == "POST":
        # Parse the JSON data from the request body
        data = json.loads(request.body.decode("utf-8"))

        # Access the image_data from the parsed data
        image_data = data.get("image_data", None)

        # Do something with the image_data, for example, pass it to recyclable function
        result = recyclable(image_data)

        # Return the result as a JSON response
        return JsonResponse({"result": result})

    # Handle other HTTP methods if needed
    return JsonResponse({"error": "Invalid request method"})
