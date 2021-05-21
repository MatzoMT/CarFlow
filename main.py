from DatabaseWriter import *
from GetData import *

print("Example: 2015 hyundai sonata should print all sales")
#getSalesAll(2015, 'hyundai', 'sonata')


while True:
    year = input("Year: ")
    make = input("Make: ")
    model = input("Model: ")
    getSales(int(year), make, model)
