# import csv, json

# csvFilePath = 'onHand.csv'
# jsonFilePath = 'onHand2.json'

# data = {}
# with open(csvFilePath, encoding='utf-8') as csvf:
# 	csvReader = csv.DictReader(csvf)
# 	for rows in csvReader:
# 		item = rows['Item']
# 		data[item] = rows

# with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
# 		jsonf.write(json.dumps(data, indent=4))
		

import csv, json 

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
      
    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
            #add this python dict to json array
            jsonArray.append(row)
  
    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)
          
csvFilePath = r'onHand.csv'
jsonFilePath = r'onHand2.json'
csv_to_json(csvFilePath, jsonFilePath)