import mysql.connector
import json
import requests
from bs4 import BeautifulSoup

def parseYears():
    # Establishes connection with databae located on computer
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )
    
    url = "https://webapi.nhtsa.gov/api/Recalls/vehicle?format=json"
    source_code = requests.get(url)
    plain_text = source_code.text
    # Converts JSON information into Python dictionary
    site_json = json.loads(plain_text)

    error_count = 0
    error_string=""

    # for loop parses each year given in results URL above except for placeholder 9999
    for year in site_json["Results"]:
        if year["ModelYear"] != "9999":
            # Following URL returns list of automakers registered for the selected year
            url_year = "https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/" + year["ModelYear"] + "?format=json"
            source_code_year = requests.get(url_year)
            plain_text_year = source_code_year.text
            year_site_json = json.loads(plain_text_year)
            
            # for loop that takes the parsed year and automaker to search for its models for that year
            for make in year_site_json["Results"]:
                try:
                    url_make = "https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/" + year["ModelYear"] + "/make/" + make["Make"] + "?format=json"
                    source_code_make = requests.get(url_make)
                    plain_text_make = source_code_make.text
                    make_site_json = json.loads(plain_text_make)
                except:
                    error_count = error_count + 1
                    error_string = error_string + " " + year["ModelYear"] + " " + make["Make"] + "\n"
                    print("ERROR")

                # for loop that inserts each model into database
                for model in make_site_json["Results"]:
                    try:
                        url_model = "https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/" + year["ModelYear"] + "/make/" + make["Make"] + "/model/" + model["Model"] + "?format=json"
                        source_code_model = requests.get(url_model)
                        plain_text_model = source_code_model.text
                        model_site_json = json.loads(plain_text_model)

                        print(year["ModelYear"] + " " + make["Make"] + " " + model["Model"] + " " + str(model_site_json["Count"]))
                        mycursor = mydb.cursor()
                        value = [year["ModelYear"],make["Make"],model["Model"],str(model_site_json["Count"])]
                        print(value)
                        mycursor.execute('INSERT INTO car_information (Year, Make, Model, Complaints) VALUES (%s,%s,%s,%s)',value)
                        mydb.commit()
                    except:
                        error_count = error_count + 1
                        error_string = error_string + " " + year["ModelYear"] + " " + make["Make"] + "\n"
                        print("ERROR")
                #print(year["ModelYear"] + make["Make"])

    print("Number of errors: " + str(error_count))
    print("Error models: " + error_string)
                

            




parseYears()

"""
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="car_project"
)

mycursor = mydb.cursor()

sql = "INSERT INTO car_information (Year, Make, Model) VALUES (%s, %s, %s)"
val = ("2015","Volkswagen", "Passat")
mycursor.execute(sql, val)

mydb.commit()

print(mycursor.rowcount, "record inserted.")
"""