from src.database_writer import *
from src.data_helper import *
import json
import requests
import PIL
from PIL import ImageTk, Image
import tkinter as tk
from tkinter import *
import time
import threading
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from src.util import *
import sqlparse as sqlparse

#get_sales_test()
sales_test_two_word_brands()
exit()

"""
# Establishes connection with databae located on computer
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="car_project"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM car_project.car_info WHERE Year='2016' AND Make='Honda'")

myresult = mycursor.fetchall()


for x in myresult:
  print(x)
  blue = x[0]
  print(blue)
"""


parse_years()

print("Example: 2015 hyundai sonata should print all sales")
dict = get_all_sales_json(2015, 'hyundai', 'sonata')
print("printing json:")
print_json(dict)
print("END")

complaintsdict = {}
get_all_complaints('cadillac', 'dts', complaintsdict)
print(complaintsdict)
#getSalesAll(2015, 'hyundai', 'sonata')

hydict = {}
initialize_sales_dict('cadillac', 'dts', hydict)
"""
print('hydict: ')
print(hydict)
"""
"""
df = pd.DataFrame(list(hydict.items()), columns=['Model Year', 'Sales'])
print(df)
df_complaints = pd.DataFrame(list(complaintsdict.items()), columns=['Model Year', 'Complaints'])
df.plot(x='Model Year',y='Sales',color='blue')
df_complaints.plot(x='Model Year',y='Complaints',color='red')
plt.show()
"""

