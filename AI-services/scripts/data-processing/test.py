import json

# Load the input JSON file
with open("train_data2.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Initialize list to store the converted entries
converted_entries = []

for item in data:
    # Extract the "content" and "annotation" fields from each item
    content = item["content"]
    annotations = item["annotation"]

    # Convert annotations to entities format
    entities = []
    for annotation in annotations:
        if annotation["label"]:  # Check if label list is not empty
            label = annotation["label"][0]  # Assuming only one label per annotation
            for point in annotation["points"]:
                start = point["start"]
                end = point["end"]
                entities.append([start, end, label])

    # Append the transformed entry to the list
    converted_entries.append([content, {"entities": entities}])

# Save the converted entries to a JSON file
with open("output.json", "w", encoding="utf-8") as file:
    json.dump(converted_entries, file, ensure_ascii=False,)

print("Data conversion complete. The output is saved in 'output.json'.")
