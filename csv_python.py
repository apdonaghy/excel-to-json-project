import csv, json

csvFilePath = 'beijing.csv'
jsonFilePath = 'output.json'

data = {}
with open(csvFilePath, encoding='utf-8') as csvf:
	csvReader = csv.DictReader(csvf)
	for rows in csvReader:
		item = rows['ID']
		data[item] = rows

with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))
		
