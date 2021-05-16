import mysql.connector
import json
import requests
from bs4 import BeautifulSoup

def getSales(year, make, model):
    print("hallo, welt")
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
                print("found!")
                print(td.text)
                print(td.find_next('td').text.replace('.', ''))
        

        counter = counter + 1
        td_counter = td_counter + 1
        if counter == 2:
            counter = 0




getSales(2015, "toyota", "sequoia")
print("done")

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