from database_writer import *
from get_data import *
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


print("Example: 2015 hyundai sonata should print all sales")
getSales(2015, 'hyundai', 'sonata')

complaintsdict = {}
getAllComplaints('cadillac', 'dts', complaintsdict)
print(complaintsdict)
#getSalesAll(2015, 'hyundai', 'sonata')

hydict = {}
initializeSalesDict('cadillac', 'dts', hydict)
"""
print('hydict: ')
print(hydict)
"""

df = pd.DataFrame(list(hydict.items()), columns=['Model Year', 'Sales'])
print(df)
df_complaints = pd.DataFrame(list(complaintsdict.items()), columns=['Model Year', 'Complaints'])
df.plot(x='Model Year',y='Sales',color='blue')
df_complaints.plot(x='Model Year',y='Complaints',color='red')
plt.show()

"""
xpoints = np.array([1, 8, 9, 10, 11])
ypoints = np.array([3, 10, 11, 12, 13])

plt.plot(xpoints, ypoints, 'o')
plt.show()
"""


"""
# while loop to test getSales
while True:
    year = input("Year: ")
    make = input("Make: ")
    model = input("Model: ")
    getSales(int(year), make, model)
"""
