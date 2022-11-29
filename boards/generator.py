import json
from module import generate

# adas = json.dumps(obj, ident=4)
#with open("samples.json, ")

FILE = "games.json"

def addGame(difficulty, n=1):
    with open(FILE, 'r+') as f:
        data = json.load(f)
        for i in range(n):
            newGame = generate(difficulty)
            data[difficulty]["list"].append(newGame)
            data[difficulty]["length"] += 1
            print(f"{difficulty} - {i+1}")
        
        f.seek(0)
        json.dump(data, f)
        f.truncate()

def resetGames():
    with open(FILE, 'r+') as f:
        data = {
            "easy": {
                "list":[],
                "length":0
            },
            "medium": {
                "list":[],
                "length":0
            },
            "hard": {
                "list":[],
                "length":0
            }
        }
    
        f.seek(0)
        json.dump(data, f)
        f.truncate()

if __name__ == '__main__':
    resetGames()
    n = 10
    addGame("easy", n)
    addGame("medium", n)
    addGame("hard", n)
    pass