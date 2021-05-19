from DatabaseWriter import *
from GetData import *

while True:
    year = input("Year: ")
    make = input("Make: ")
    model = input("Model: ")
    getSales(year, make, model)