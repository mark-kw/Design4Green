import csv
import json


def is_incont(incont):
    if not incont:
        return False
    if incont.upper() == "INCONTOURNABLE":
        return True
    return False


def get_cycle(cycle):
    if not cycle:
        return "N/A"
    else:
        return cycle


def get_score(row):
    if row[2]:
        return row


def get_difficulty(row):
    if not row[15]:
        return "N/A"
    if row[15] == "*":
        return "easy"
    elif row[15] == "**":
        return "medium"
    elif row[15] == "***":
        return "hard"
    else:
        return "N/A"


def get_object(row):
    res = {
        "id": row[1],
        "famille": row[0],
        "cycle": get_cycle(row[8]),
        "descript": row[5],
        "test": row[9],
        "incont": is_incont(row[17]),
        "title": row[6],
        "score_people": row[2],
        "score_planet": row[3],
        "score_prosperity": row[4],
        "justif": row[7],
        "difficulty": get_difficulty(row)
    }

    return res


my_obj = {}
with open("docs/inr.csv", 'r') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';')
    i = 0
    for row in spamreader:
        if row[0]:
            if not row[9]:
                continue
            else:
                try:
                    my_obj[row[0]].append(get_object(row))
                except KeyError:
                    my_obj[row[0]] = []
                    my_obj[row[0]].append(get_object(row))

with open("web/input.json", "w", encoding='utf-8') as jsonfile:
    #json.dumps(my_obj, jsonfile, ensure_ascii=False)
    json.dump(my_obj, jsonfile, default=lambda D: D.__dict__, sort_keys=True, indent=2, ensure_ascii=False)
    #jsonfile.write(json_string)
