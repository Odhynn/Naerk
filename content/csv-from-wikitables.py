import os
import re

directory = '/home/ulysses/Documents/Naerk/naerk-wiki/quartz/content/Gods'  # Specify the directory where your markdown files are located

csv_dir = f"{directory}/.data"
if not os.path.exists(csv_dir): 
    os.makedirs(csv_dir)

for filename in os.listdir(directory):
    if filename.endswith('.md'):
        file_path = os.path.join(directory, filename)

        with open(file_path,'r') as input:
            # read tables within callouts
            # EXPECTATION: it should only occur in wikitables
            targets = [line for line in input if "> > | " in line]
        name = filename.replace(".md","")
        delimiter = '\t'
        with open(f"{csv_dir}/{name}.tsv", 'w') as output:
            output.write(f"Name\t{name}\n")
            for line in targets:
                parsed_line = line
                # parsed_line = parsed_line.replace("\"","'")

                # parse callout and table syntax
                parsed_line = parsed_line.replace("> > | ","")
                parsed_line = parsed_line.replace(" | ","\t")
                parsed_line = parsed_line.replace(" |","")
                
                # remove link syntax (keep target name if renamed)
                parsed_line = re.sub(r"\[\[(.*?)\|", "", parsed_line)
                parsed_line = parsed_line.replace("]]","")
                parsed_line = parsed_line.replace("[[","")
                parsed_line = parsed_line.replace("|\n","")
                # remove table subheader row md syntax
                parsed_line = parsed_line.replace("---\t---\n","")
                # EXPECTATION: 'or' separate list items
                parsed_line = parsed_line.replace(" or ",", ")
                #  remove double quotes
                parsed_line = parsed_line.replace('"', "")
                # EXPECTATION: '-' denotes NaN values
                parsed_line = parsed_line.replace("\t-","\t")

                output.write(parsed_line)