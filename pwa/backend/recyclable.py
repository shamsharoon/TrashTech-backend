# backend/Recyclable.py

# Import the detectObject function from the objectSaved module
from ..functions.objectSaved import detectObject
import json


def recyclable(image_data):
    # Define a dictionary containing recyclable objects tags
    recyclable_objects_tags = {
        "recyclable": [
            "plastic",
            "bottle",
            "spoon",
            "glass",
            "cup",
            "kitchen utensil",
            "drinkware",
            "container",
            "waterbottle",
            "plastic bottle",
            "plate",
            "platter",
            "dish",
            "tableware",
            "cylinder",
        ]
    }

    # Use the detectObject function to retrieve tags from the provided image_data
    tags_retrieved = detectObject(image_data)

    # Check if any of the retrieved tags match recyclable objects
    for tag in tags_retrieved:
        if tag in recyclable_objects_tags["recyclable"]:
            # If a recyclable tag is found, return True
            return True

    # If no recyclable tag is found, return False
    return False
