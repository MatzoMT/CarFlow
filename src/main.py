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


print("Example: 2015 hyundai sonata should print all sales")
getSalesAll(2015, 'hyundai', 'sonata')


xpoints = np.array([1, 8])
xpoints = np.array([4, 8])
ypoints = np.array([3, 10])

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
