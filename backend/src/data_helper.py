import mysql.connector
import json
import requests
from bs4 import BeautifulSoup
# Important! Use . before filenames in import
from .util import *
from .database_writer import *
import operator

# GOAL: return the number of sales for the specified year, make, model
# If not found, return -1 (sentinel)
def get_sales(year, make, model):
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    #print(link)
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'html.parser')
    table = soup.find_all('table')[1]
    tds = table.find_all('td')
    counter = 0
    td_counter = 0
    for td in tds:

        if td_counter >= 2:
            # A year less is compared, assuming U.S. convention of having MY ahead by 1 year
            if ((year - 1 == int(td.text.replace('.', '').strip()))):
                #print(td.text)
                # RETURN THE VALUE BELOW
                #print(td.find_next('td').text.replace('.', ''))
                return td.find_next('td').text.replace('.', '')
        

        counter = counter + 1
        td_counter = td_counter + 1
        if counter == 2:
            counter = 0
    return -1

# Prints all sales for each model year
def get_sales_all(year, make, model):
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'html.parser')
    table = soup.find_all('table')[1]
    tds = table.find_all('td')
    counter = 0
    td_counter = 0
    for td in tds:
        counter = counter + 1
        td_counter = td_counter + 1
        if td_counter >= 2:
            if counter % 2 == 1:
                print(td.find_next('td').text.replace('.', ''))

# Prints all sales for each model year
def get_all_sales_json(make, model):
    year = 0
    dict = {}
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'html.parser')
    table = soup.find_all('table')[1]
    tds = table.find_all('td')
    counter = 0
    td_counter = 0
    #dict['brod'] = 5
    for td in tds:
        counter = counter + 1
        # if statement reassigns year only if it is the first iteration
        if td_counter % 2 == 1:
            year = td.find_next('td').text.replace('.', '')
        td_counter = td_counter + 1
        if td_counter >= 2:
            if counter % 2 == 1:
                sale = td.find_next('td').text.replace('.', '')
                # Creates dictionary entry into dict param with year as the key and the model year's sales
                dict[int(year)] = int(sale)
                #print(td.find_next('td').text.replace('.', ''))
    return dict


#getSales(2015, "hyundai", "veloster")
#print("done")

# Prints all sales for each model year
def initialize_sales_dict(make, model, dict):
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    html_text = requests.get(link).text
    soup = BeautifulSoup(html_text, 'html.parser')
    table = soup.find_all('table')[1]
    tds = table.find_all('td')
    counter = 0
    td_counter = 0
    #dict['brod'] = 5
    for td in tds:
        counter = counter + 1
        # if statement reassigns year only if it is the first iteration
        if td_counter % 2 == 1:
            year = td.find_next('td').text.replace('.', '')
        td_counter = td_counter + 1
        if td_counter >= 2:
            if counter % 2 == 1:
                sale = td.find_next('td').text.replace('.', '')
                # Creates dictionary entry into dict param with year as the key and the model year's sales
                dict[int(year)] = int(sale)
                #print(td.find_next('td').text.replace('.', ''))
    
def get_makers(self):
   return get_car_makers()

def get_all_entries():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )
    mycursor = mydb.cursor()

    mycursor.execute("SELECT Year, Make, Model FROM car_project.car_info WHERE Year > 1999 ORDER BY Year DESC")

    entries = mycursor.fetchall()
    entries_array = []

    for entry in entries:
        formatted_entry = str(entry[0]) + " " + entry[1] + " " + entry[2]
        entries_array.append(formatted_entry)

    return entries_array

def get_all_years():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT DISTINCT Year FROM car_project.car_info ORDER BY Year DESC")

    years = mycursor.fetchall()
    year_array = []

    for year in years:
        year_array.append(year[0])

    #print_json(year_array)
    return year_array


def get_all_models(year, make):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT Model FROM car_project.car_info WHERE Year='"+str(year)+"'AND Make='"+make+"'")

    models = mycursor.fetchall()
    models_array = []

    for model in models:
        models_array.append(model[0])

    #print_json(models_array)
    return models_array

def get_safety_ratings(year, make, model):
    vehicle_id = get_vehicle_id(year, make, model)
    nhtsa_link = "https://api.nhtsa.gov/SafetyRatings/VehicleId/" + str(vehicle_id)
    print("LINK IS HERE!!!")
    print(nhtsa_link)
    source_code = requests.get(nhtsa_link)
    plain_text = source_code.text
    site_json = json.loads(plain_text)
    json_info = {}
    json_info["OverallRating"] = site_json["Results"][0]["OverallRating"]
    json_info["OverallFrontCrashRating"] = site_json["Results"][0]["OverallFrontCrashRating"]
    json_info["OverallSideCrashRating"] = site_json["Results"][0]["OverallSideCrashRating"]
    json_info["RolloverRating"] = site_json["Results"][0]["RolloverRating"]
    json_info["FrontCrashDriversideRating"] = site_json["Results"][0]["FrontCrashDriversideRating"]
    json_info["FrontCrashPassengersideRating"] = site_json["Results"][0]["FrontCrashPassengersideRating"]
    json_info["SideCrashDriversideRating"] = site_json["Results"][0]["SideCrashDriversideRating"]
    json_info["SideCrashPassengersideRating"] = site_json["Results"][0]["SideCrashPassengersideRating"]
    print_json(json_info)
    return json_info



def get_vehicle_id(year, make, model):
    nhtsa_link = "https://api.nhtsa.gov/SafetyRatings/modelyear/" + year +"/make/" +make+"/model/" + model
    source_code = requests.get(nhtsa_link)
    plain_text = source_code.text
    # Converts JSON information into Python dictionary
    site_json = json.loads(plain_text)
    try:
        id = site_json["Results"][0]["VehicleId"]
        return id
    except:
        return 0

def get_vehicle_picture(vehicle_id):
    nhtsa_link = "https://api.nhtsa.gov/SafetyRatings/VehicleId/" + str(vehicle_id)
    source_code = requests.get(nhtsa_link)
    plain_text = source_code.text
    site_json = json.loads(plain_text)
    try:
        picture_url = site_json["Results"][0]["VehiclePicture"]
        return picture_url
    except:
        return "s"

# pseudocode
# create a dict
# parse through complaint categories, add new category if not existing
# otherwise increment
# return top three complaint types
# if less than three complaint types present, return 2, 1, or 0 categories
def get_complaints_type_json(year, make, model):
    #nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make={}&model={}&modelYear={}".format(year, make, model)
    # HARD CODE
   # nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make=hyundai&model=elantra&modelYear=2014"
    nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make="+make+"&model="+model+"&modelYear=" + year

    categories_dict = {}
    source_code = requests.get(nhtsa_link)
    plain_text = source_code.text
    # Converts JSON information into Python dictionary
    site_json = json.loads(plain_text)
    results = site_json["results"]
    # BROKEN: EX: Electrical System
    """
    pseudo:
    replace whitespace with hyphens
    replace comma with space
    parse each word, separated by space
    remove hyphens before storing in dict
    """
    for complaint in results:
        category = complaint["components"].replace(' ', '-').replace(',', ' ')
        #category = complaint["components"].replace(',', ' ')

        for formatted_category in category.split():
            category_key = formatted_category.replace('-', ' ')
            if category_key == "UNKNOWN OR OTHER":
                continue
            if category_key in categories_dict:
                categories_dict[category_key] += 1
            else:
            
                categories_dict[category_key] = 1               

    return_dict = {}
    iteration = 0
    sorted_keys = sorted(categories_dict, key=categories_dict.get, reverse=True)
    for key in sorted_keys:

        return_dict[key] = categories_dict[key]
        iteration = iteration + 1
        if iteration == 3:

            break
    sorted_return_dict = dict(sorted(return_dict.items(), key=operator.itemgetter(1),reverse=True))

    return sorted_return_dict

#BUG
#2012 NISSAN JUKE: FUEL SYSTEM, GASOLINE complaint category
def get_all_complaint_types_json(year, make, model):
    nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make="+make+"&model="+model+"&modelYear=" + year
    json_array = []
    categories_dict = {}
    source_code = requests.get(nhtsa_link)
    plain_text = source_code.text
    # Converts JSON information into Python dictionary
    site_json = json.loads(plain_text)
    results = site_json["results"]
    # BROKEN: EX: Electrical System
    for complaint in results:
        category = complaint["components"].replace(' ', '-').replace(',', ' ')
        #category = complaint["components"].replace(',', ' ')
        category_key = ""
        for formatted_category in category.split():
            category_key = formatted_category.replace('-', ' ')
            if category_key == "UNKNOWN OR OTHER":
                continue
            if category_key in categories_dict:
                categories_dict[category_key] += 1
            else:
                categories_dict[category_key] = 1   

    categories_dict = dict(sorted(categories_dict.items(), key=lambda item: item[1], reverse=True))

    for category in categories_dict:
        json_info = {}
        json_info["category"] = category
        json_info["numberComplaints"] = categories_dict[category]
        json_array.append(json_info)
    return json_array

def get_recharts_complaints(make, model):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM (SELECT * FROM car_project.car_info WHERE Make='"+make+"'AND Model='"+model+"' ORDER BY Year DESC LIMIT 16) AS Resp ORDER BY Resp.Year ASC")

    years = mycursor.fetchall()
    
    complaints_array = []
    
    for year in years:
        json_info = {}
        json_info["year"] = year[0]
        json_info["complaints"] = year[3]
        complaints_array.append(json_info)

    return complaints_array

def get_recharts_sales(make, model):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM (SELECT * FROM car_project.sales_info WHERE Make='"+make+"'AND Model='"+model+"' ORDER BY Year DESC LIMIT 16) AS Resp ORDER BY Resp.Year ASC")

    years = mycursor.fetchall()
    
    sales_array = []
    info = {}
    
    for year in years:
        json_info = {}
        json_info["year"] = year[0]
        json_info["sales"] = year[3]
        sales_array.append(json_info)
    #print(sales_array)

    return sales_array


# Return complaints, sales in recharts form
def get_recharts_info(make, model):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM (SELECT * FROM car_project.car_info WHERE Make='"+make+"'AND Model='"+model+"' ORDER BY Year DESC LIMIT 16) As Resp ORDER BY Resp.Year ASC")

    years = mycursor.fetchall()
    


    info_array = []
    info_array = []
    info = {}


    for year in years:
        json_info = {}
        json_info["year"] = year[0]
        json_info["complaints"] = year[3]
        sales_cursor = mydb.cursor()
        sales_cursor.execute("SELECT Sales FROM car_project.sales_info WHERE Year='" + str(year[0]) + "' AND Make='"+make+"' AND Model='"+model+"'")
        sales = sales_cursor.fetchall()
        try:
            json_info["sales"] = sales[0][0]
        except:
            json_info["sales"] = 0
        info_array.append(json_info)
    return info_array

"""
    for year, sales in zip(years, sales):
        json_info = {}
        json_info["year"] = year[0]
        json_info["complaints"] = year[3]
        json_info["sales"] = sales[3]
        info_array.append(json_info)
"""



# pseudocode 
"""
def get_makes_for_year(year):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="car_project"
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM car_project.car_info WHERE Year='{}'".format(year))

    myresult = mycursor.fetchall()

"""

"""
    public static int printSales(String year, String make, String model) {
        int sales = 0;
        try {
            String link = "https://carsalesbase.com/us-" + make + "-" + model + "/";
            System.out.println(link);
            Document document = Jsoup.connect(link).get();
            Element table = document.select("table").get(1); // select the first table.
            Elements rows = table.select("tr");
            for (int i = 1; i < rows.size(); i++) { // first row is the col names so skip it.
                Element row = rows.get(i);
                Elements cols = row.select("td");
                int intYear = Integer.parseInt(year) - 1;
                if (cols.get(0).text().equals(String.valueOf(intYear))) {
                    System.out.println("REACHED");
                    Element thing = cols.get(1);
                    sales = Integer.parseInt(thing.text().replace(".", ""));
                    System.out.println("SALES: " + sales);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sales;
    } // printSales

"""