import spacy
import fitz  
import csv

def extract_cv_data_to_csv(pdf_path, model_path, output_csv_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()

    text = text.strip()
    text = ' '.join(text.split())

    nlp = spacy.load(model_path)
    doc = nlp(text)

    with open(output_csv_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Skills"])

        name = ""
        skills = []

        for ent in doc.ents:
            if ent.label_ == "Name":
                name = ent.text
            elif ent.label_ == "Skills":
                skills.append(ent.text)

        writer.writerow([name, ", ".join(skills)])

    print(f"Data has been saved to {output_csv_path}")
