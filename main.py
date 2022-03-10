import sys
import random
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page2')
def page2():
    return render_template('page2.html', num=random.randint(1, 10000))

app.run(host=sys.argv[1], port=int(sys.argv[2])) # sys.argv is controlled by javascript/index.js
