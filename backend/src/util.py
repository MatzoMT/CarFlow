import json

# Prints json in easier-to-read format
def print_json(dict_json):
    print(json.dumps(dict_json, indent=4))

# For reading API key and instances from secrets.json
def read_from_file_as_json(path):
    with open(path, 'r') as infile:
        file_contents = infile.read()
    # converts a valid JSON string to a dict, returns dict
    file_contents = json.loads(file_contents)
    return file_contents