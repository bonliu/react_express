import pandas as pd
import json

# import os
# THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
# print(THIS_FOLDER)

table = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
df = table[0]
df = df[['Symbol', 'Security']]

data_list = []
for _, row in df.iterrows():
    data_list.append({'symbol': row['Symbol'], 'security': row['Security']})

with open('./client/src/components/data/sp500.json', 'w') as fp:
    json.dump(data_list, fp)
