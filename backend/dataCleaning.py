#Importing Numpy and Pandas
import numpy as np
import pandas as pd

#Reading the csv files
matches=pd.read_csv(r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\matches.csv")
deliveries=pd.read_csv(r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\deliveries.csv")

#Features Required are Batting Team, Bowling Team, Venure(City), Runs_Left, Balls_Left, Wickets_left, total_runs, crr, rrr, result

# Calculating total runs scored in each inning of each match
total_score_df=deliveries.groupby(['match_id', 'inning']).sum()['total_runs'].reset_index()

# Considering only 1st inning for the prediction of result
total_score_df=total_score_df[total_score_df['inning']==1]

# Merging total_score_df with matches dataset
match_df=matches.merge(total_score_df[['match_id', 'total_runs']], left_on='id', right_on='match_id')


# Keeping only reuired teams currently playing in IPL
teams=['Kolkata Knight Riders', 'Chennai Super Kings', 'Rajasthan Royals', 'Mumbai Indians', 'Punjab Kings', 'Royal Challengers Bengaluru', 'Delhi Capitals', 'Sunrisers Hyderabad']

# Changing the team old names to new names 
match_df['team1']=match_df['team1'].replace({'Delhi Daredevils':'Delhi Capitals', 'Deccan Chargers':'Sunrisers Hyderabad', 'Kings XI Punjab':'Punjab Kings', 'Royal Challengers Bangalore':'Royal Challengers Bengaluru'})
match_df['team2']=match_df['team2'].replace({'Delhi Daredevils':'Delhi Capitals', 'Deccan Chargers':'Sunrisers Hyderabad', 'Kings XI Punjab':'Punjab Kings', 'Royal Challengers Bangalore':'Royal Challengers Bengaluru'})

# Updating team names in deliveries as well
deliveries['batting_team'] = deliveries['batting_team'].replace({
    'Delhi Daredevils': 'Delhi Capitals',
    'Deccan Chargers': 'Sunrisers Hyderabad',
    'Kings XI Punjab': 'Punjab Kings',
    'Royal Challengers Bangalore': 'Royal Challengers Bengaluru'
})

deliveries['bowling_team'] = deliveries['bowling_team'].replace({
    'Delhi Daredevils': 'Delhi Capitals',
    'Deccan Chargers': 'Sunrisers Hyderabad',
    'Kings XI Punjab': 'Punjab Kings',
    'Royal Challengers Bangalore': 'Royal Challengers Bengaluru'
})


#Droping team not playing current i.e not in teams list
match_df=match_df[match_df['team1'].isin(teams)]
match_df=match_df[match_df['team2'].isin(teams)]

#Dropping the matches where D/L method was applied
match_df=match_df[match_df['dl_applied']==0] 

#Getting only required columns form the match_df dataframe
match_df=match_df[['match_id', 'city', 'winner', 'total_runs']]

#Merging match_df with deliveries dataframe
final_df=match_df.merge(deliveries, on='match_id')

# Keeping only 2nd inning for the prediction of result
final_df=final_df[final_df['inning']==2]

#Calculating current score after each ball of each mathch
# Make sure total_runs_y is numeric
final_df['total_runs_y'] = pd.to_numeric(final_df['total_runs_y'], errors='coerce')

# Now cumulative sum within each match
final_df['current_score'] = final_df.groupby('match_id')['total_runs_y'].cumsum()

#Calculating runs left to win
final_df['runs_left']=final_df['total_runs_x']+1-final_df['current_score']

#Calculating balls left to win
final_df['balls_left']=120-(final_df['over']-1)*6-final_df['ball']

#Calculating Wickets Left
# Fill missing values, mark dismissal as 1, else 0
final_df['player_dismissed'] = final_df['player_dismissed'].fillna("0")
final_df['player_dismissed'] = final_df['player_dismissed'].apply(lambda x: 0 if x=="0" else 1)
final_df['player_dismissed'] = final_df['player_dismissed'].astype(int)

# Cumulative sum of wickets fallen per match
final_df['wickets_fallen'] = final_df.groupby('match_id')['player_dismissed'].cumsum()

# Wickets left
final_df['wickets_left'] = 10 - final_df['wickets_fallen']

# Calculating current run rate
final_df['crr']=final_df['current_score']*6/(120-final_df['balls_left'])

# Calculationg required runrate
final_df['rrr']=final_df['runs_left']*6/final_df['balls_left']

# Calculating Whether batting team won or not
def result(row):
    return 1 if row['batting_team']==row['winner'] else 0
  
final_df['result']=final_df.apply(result, axis=1)


# Getting only required columns
final_df=final_df[['batting_team', 'bowling_team', 'city', 'runs_left', 'balls_left', 'wickets_left', 'total_runs_x', 'crr', 'rrr', 'result']]

final_df.dropna(inplace=True) # Dropping the na values
final_df=final_df[final_df['balls_left']!=0] # Removing the rows where balls left is 0

# Shuffling the dataframe to reduce the biasness
final_df = final_df.sample(final_df.shape[0])

# Saving the cleaned dataframe to a csv file
final_df.to_csv(r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\final_Database.csv", index=False)

