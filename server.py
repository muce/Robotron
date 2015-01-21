from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')


def hello(name=None):
    return render_template('index.html', name="CT-909 HTML TEST")


def hello_world():
    return 'CT-909'
    
if __name__ == '__main__':
    app.run(debug=True)
