from database_writer import *
from data_helper import *
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
from util import *

write_sales_into_database()
exit()

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

