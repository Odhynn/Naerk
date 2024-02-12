import pandas as pd
import os
import re

def extract_lines_with_prefix(file_path, prefix):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    extracted_lines = [line.strip() for line in lines if re.match(r'^\s*{}.*$'.format(prefix), line)]

    return extracted_lines

directory = '/home/ulysses/Documents/Naerk/naerk-wiki/quartz/content/Gods'  # Specify the directory where your markdown files are located

for filename in os.listdir(directory):
    if filename.endswith('.md'):
        file_path = os.path.join(directory, filename)
        print (file_path)
        # with open(filename,'r') as f:
        #     lines = f.readlines()

# print(targets)