from DatabaseWriter import *
from GetData import *
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
#getSalesAll(2015, 'hyundai', 'sonata')


xpoints = np.array([1, 8, 9, 10, 11])
ypoints = np.array([3, 10, 11, 12, 13])

plt.plot(xpoints, ypoints, 'o')
plt.show()


"""
# while loop to test getSales
while True:
    year = input("Year: ")
    make = input("Make: ")
    model = input("Model: ")
    getSales(int(year), make, model)
"""
