import json

with open("cv1.json", "r", encoding="utf-8") as f:
    data = json.load(f)

output = []
for record in data:
    text = record["text"]
    entities = []

    for label_info in record["label"]:
        for label in label_info["labels"]:
            entities.append([label_info["start"], label_info["end"], label])

    output.append([text, {"entities": entities}])

with open("cv1parsed.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False)

print("Chuyển đổi hoàn tất. File 'output.json' đã được tạo.")
