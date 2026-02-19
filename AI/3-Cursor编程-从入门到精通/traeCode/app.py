from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/data')
def get_data():
    df = pd.read_excel('香港各区疫情数据_20250322.xlsx')
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)