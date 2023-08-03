"""A simple Flask server that extract the parameters from the request and and send them as a page to the client."""
from flask import Flask, redirect, render_template, request
from flask_cors import CORS
import json

app = Flask(__name__)

lst = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

@app.route('/')
def index():
    return redirect("/templates")

@app.route('/graph/')
def show_graph():

    #jsonStr = json.dumps(lst)

    #return jsonStr
    return render_template('test.html')

@app.route('/add/')
def add_data():
    try:
        """Extract the parameters from the request and send them as a page to the client."""
        # Get the parameters from the request
        parameters = request.args
        lst.append(float(parameters.get('arg', None)))

        if len(lst) >20:
            lst.pop(0)
        #print("Poor debug arg:", parameters.get('arg', None))
        print(lst)
        print(parameters)
        #return parameters
        
        return str(len(lst))
    except:
        return "error"
    
@app.route('/Data/')
def Data():
    jsonStr = json.dumps(lst)
    return jsonStr


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)