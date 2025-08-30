
#WORKING ON MODELLING
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

final_df=pd.read_csv(r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\final_Database.csv")
X=final_df.iloc[:,:-1] # All rows, all columns except the last one
y=final_df.iloc[:,-1] # All rows, only the last column

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2, random_state=1)

# Handling String Columns such as batting_team, bowling_team, city
from sklearn.compose import ColumnTransformer
trf=ColumnTransformer([
    ('trf', OneHotEncoder(sparse_output=False, drop='first'), ['batting_team', 'bowling_team', 'city'])
], remainder='passthrough')

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

# Random Forest Classifier gives better accuracy (99%) but its better in a situtation when we want to fiind whether the team will won or losse
# Accuracy is 80.76%
pipe1=Pipeline(steps=[('step1', trf),
                     ('step2', RandomForestClassifier())]) 

# Logistic Regression is better in situation when we want to find the probability of winning
pipe2=Pipeline(steps=[('step1', trf),
                     ('step2', LogisticRegression(solver='liblinear'))])

pipe2.fit(X_train, y_train)
pipe1.fit(X_train, y_train)

y_pred=pipe2.predict(X_test)

from sklearn.metrics import accuracy_score
import joblib
joblib.dump(pipe2, r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\winpredictor.pkl")