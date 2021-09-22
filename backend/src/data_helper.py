import mysql.connector
import json
import requests
from bs4 import BeautifulSoup
# Important! Use . before filenames in import
from .util import *
from .database_writer import *

# GOAL: return the number of sales for the specified year, make, model
# If not found, return -1 (sentinel)
def get_sales(year, make, model):
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    print(link)
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
                print(td.text)
                # RETURN THE VALUE BELOW
                print(td.find_next('td').text.replace('.', ''))
                return td.find_next('td').text.replace('.', '')
        

        counter = counter + 1
        td_counter = td_counter + 1
        if counter == 2:
            counter = 0
    return -1

# Prints all sales for each model year
def get_sales_all(year, make, model):
    link = "https://carsalesbase.com/us-" + make + "-" + model + "/"
    print(link)
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
    print(link)
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
            print(year)
        td_counter = td_counter + 1
        if td_counter >= 2:
            if counter % 2 == 1:
                sale = td.find_next('td').text.replace('.', '')
                # Creates dictionary entry into dict param with year as the key and the model year's sales
                dict[int(year)] = int(sale)
                #print(td.find_next('td').text.replace('.', ''))
    
def get_makers(self):
   return get_car_makers()

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

    print_json(year_array)
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

    print_json(models_array)
    return models_array

# pseudocode
# create a dict
# parse through complaint categories, add new category if not existing
# otherwise increment
# return top three complaint types
# if less than three complaint types present, return 2, 1, or 0 categories
def get_complaints_type_json():
    #nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make={}&model={}&modelYear={}".format(year, make, model)
    # HARD CODE
    nhtsa_link = "https://api.nhtsa.gov/complaints/complaintsByVehicle?make=toyota&model=rav4&modelYear=2019"
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
            if category_key in categories_dict:
                categories_dict[category_key] += 1
            else:
            
                categories_dict[category_key] = 1               

    return_dict = {}
    iteration = 0
    sorted_keys = sorted(categories_dict, key=categories_dict.get, reverse=True)
    for key in sorted_keys:
        if key != "UNKNOWN OR OTHER":
            return_dict[key] = categories_dict[key]
            iteration = iteration + 1
        if iteration == 3:
            break
    print(return_dict)

    return "PLAEhOLDER"

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