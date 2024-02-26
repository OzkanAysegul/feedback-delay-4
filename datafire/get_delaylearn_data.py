# import firebase_admin
# import numpy as np
# import pandas as pd
# from datetime import datetime
# from firebase_admin import credentials, firestore, db
# import json
# import random
# import os
#
# ## log-in to firebase -- enter path to private key
# cred = credentials.Certificate('navrisk-a2035-firebase-adminsdk-ywbf2-8781ec1bf1.json')
# default_app = firebase_admin.initialize_app(cred)
# client = firestore.client()
#
# def save_data_to_csv(run_name):
#     # Get the data
#     dfs = []
#     start_data_list = []  # List to store 'start' data
#
#     target_date = datetime.strptime('01/06/2023', '%d/%m/%Y')  # June 7th, 2023
#
#     for subj in client.collection('navrisktask').document(run_name).collection('subjects').stream():
#         subjectID = subj.id
#         taskdata_collection = client.collection('navrisktask').document(run_name).collection('subjects').document(
#             subjectID).collection('taskdata').document('start')
#
#         start_data = taskdata_collection.get().to_dict()
#         print(start_data)
#         if start_data and "date" in start_data and "subjectID" in start_data:  # Add check for 'subjectID'
#             date_str = start_data["date"]
#             try:
#                 date = datetime.strptime(date_str, '%d/%m/%Y')
#                 if date > target_date:
#                     prolificID = start_data["subjectID"]
#                     start_time = start_data.get("start_time", "")
#                     scale = start_data.get("scale", [1, 1, 1, 1, 1, 1, 1])
#                     has_data = False
#
#                     taskdata_collection = client.collection('navrisktask').document(run_name).collection('subjects').document(
#                         subjectID).collection('taskdata').stream()
#
#                     for tc in taskdata_collection:
#                         if tc.id == "start":
#                             continue
#
#                         task_dict = tc.to_dict()
#                         sub_data = json.loads(task_dict['data'])
#                         sub_df = pd.DataFrame(sub_data)
#
#                         if not has_data:
#                             sub_df["subjectID"] = subjectID
#                             sub_df["prolificID"] = prolificID
#                             sub_df["start_time"] = start_time
#                             sub_df["date"] = date_str
#                             sub_df["scale"] = str(scale)  # Add scale data to dataframe
#                             dfs.append(sub_df)
#                             has_data = True
#                         else:
#                             sub_df["subjectID"] = ""
#                             sub_df["prolificID"] = prolificID
#                             sub_df["start_time"] = ""
#                             sub_df["date"] = date_str
#                             sub_df["scale"] = ""  # Add empty scale data to dataframe
#                             dfs.append(sub_df)
#
#                     if has_data:
#                         start_dict = {
#                             "subjectID": subjectID,
#                             "prolificID": prolificID,
#                             "start_time": start_time,
#                             "date": date_str
#                         }
#                         start_data_list.append(start_dict)
#
#             except ValueError:
#                 print(f"Ignored participant {subjectID} due to invalid date format")
#
#     start_combined_df = pd.DataFrame(start_data_list)
#
#     # Save 'start' data to a single CSV file
#     start_folder = os.path.join('..', 'data')
#     os.makedirs(start_folder, exist_ok=True)
#     start_combined_df.to_csv(os.path.join(start_folder, f'start_data_{run_name}.csv'), index=False)
#     print(f"Saved 'start' data for {run_name} to {start_folder}/start_data_{run_name}.csv")
#
#     # Save task data as separate CSV files based on prolificID
#     taskdata_folder = os.path.join(start_folder, run_name)
#     os.makedirs(taskdata_folder, exist_ok=True)
#
#     for sub_df in dfs:
#         prolificID = sub_df["prolificID"][0]
#
#         # Check if prolificID is a string longer than 0 characters
#         if isinstance(prolificID, str) and len(prolificID) > 15:
#             sub_df.to_csv(os.path.join(taskdata_folder, f'taskdata_{prolificID}.csv'), index=False)
#             print(f"Saved task data for prolificID: {prolificID} ({run_name})")
#         else:
#             print(f"Ignored task data for invalid prolificID: {prolificID} ({run_name})")
#
#
# # Run the function for each run name
# run_names = ['exp_nav', 'exp_nav_day2']
# # run_names = [ 'exp_nav_choice_day2']
# for run_name in run_names:
#     save_data_to_csv(run_name)
#
# # Continue with the rest of your code...
import firebase_admin
import numpy as np
import pandas as pd
from datetime import datetime
from firebase_admin import credentials, firestore, db
import json
import random
import os

## log-in to firebase -- enter path to private key
cred = credentials.Certificate('delaylearn-firebase-adminsdk-fz6vv-aefb0a1662.json')


## commend-out if already run in session
#default_app = firebase_admin.initialize_app(cred)
## ##


client = firestore.client()


def convert_date_format(date_string):
    try:
        # Attempt to parse the date string using the "MM/DD/YYYY" format
        original_format = "%d/%m/%Y"
        date_object = datetime.strptime(date_string, original_format)
        
        # Convert the datetime object to the desired format "DD/MM/YYYY"
        desired_format = "%y%m%d"
        converted_date = date_object.strftime(desired_format)

        #print(converted_date)
        return converted_date

    except ValueError:
        # If the date format is not "MM/DD/YYYY", return the original date string
        original_format = "%m/%d/%Y"
        date_object = datetime.strptime(date_string, original_format)

        # Convert the datetime object to the desired format "YYMMDD"
        desired_format = "%y%m%d"
        converted_date = date_object.strftime(desired_format)
        #print(converted_date)
        return converted_date


def convert_time_format(time_string):
    try:
        # Parse the time string using the original format with AM/PM indicator
        original_format = "%I:%M:%S %p"
        date_object = datetime.strptime(time_string, original_format)

        # Convert the datetime object to the desired format "HHMMSS"
        desired_format = "%H%M%S"
        converted_time = date_object.strftime(desired_format)

        return converted_time

    except ValueError:
        # If the time format is not "HH:MM:SS AM/PM", return the original time string
        converted_time = time_string.replace(':', '')
        return converted_time



def save_data_to_csv(run_name):
    # Get the data
    dfs = []
    start_data_list = []  # List to store 'start' data

    target_date = datetime.strptime('01/01/2023', '%d/%m/%Y')  # June 7th, 2023

    for subj in client.collection('delaylearntaskv4').document(run_name).collection('subjects').stream():
        subjectID = subj.id
        taskdata_collection = client.collection('delaylearntaskv4').document(run_name).collection('subjects').document(
            subjectID).collection('taskdata').document('start')

        start_data = taskdata_collection.get().to_dict()
        print(start_data)
        if start_data and "date" in start_data and "subjectID" in start_data:  # Add check for 'subjectID'
            date_str = start_data["date"]
            try:
                if len(date_str.split('/')[0]) == 1:
                    date = datetime.strptime(date_str, '%m/%d/%Y')
                else:
                    date = datetime.strptime(date_str, '%d/%m/%Y')
            except ValueError:
                print(f"Ignored participant {subjectID} due to invalid date format")
                continue

            if date > target_date:
                prolificID = start_data["subjectID"]
                start_time = start_data.get("start_time", "")
                has_data = False

                taskdata_collection = client.collection('delaylearntaskv4').document(run_name).collection('subjects').document(
                    subjectID).collection('taskdata').stream()

                for tc in taskdata_collection:
                    if tc.id == "start":
                        continue

                    task_dict = tc.to_dict()
                    sub_data = json.loads(task_dict['data'])
                    sub_df = pd.DataFrame(sub_data)

                    if not has_data:
                        sub_df["subjectID"] = subjectID
                        sub_df["prolificID"] = prolificID
                        sub_df["start_time"] = start_time
                        sub_df["date"] = date_str
                        dfs.append(sub_df)
                        has_data = True
                    else:
                        #sub_df["subjectID"] = ""
                        sub_df["prolificID"] = prolificID
                        sub_df["start_time"] = ""
                        sub_df["date"] = date_str
                        dfs.append(sub_df)

                if has_data:
                    
                    
                    date_string = sub_df["date"][0]
                    time_string = sub_df["start_time"][0]

                    converted_date = convert_date_format(date_string)
                    converted_time = convert_time_format(time_string)
                    
                    if len(prolificID) > 18:
                        start_dict = {
                            #"subjectID": subjectID,
                            #"prolificID":  "'"+"taskdata_" + prolificID + ".csv"+ "'",
                            "filename":  "'"+"taskdata_" + converted_date + "_" + converted_time + "_" + run_name + "_" + prolificID + ".csv"+ "'",
                            "prolificID": prolificID,
                            "start_time": start_time,
                            "date": date_str
                        }
                        start_data_list.append(start_dict)

    # start_combined_df = pd.DataFrame(start_data_list)
    #
    # # Save 'start' data to a single CSV file
    # start_folder = os.path.join('..', 'data')
    # os.makedirs(start_folder, exist_ok=True)
    #
    #
    # # Check if prolificID is a string longer than 0 characters
    # if start_combined_df['prolificID'].str.len().gt(15).all():
    #     start_combined_df.to_csv(os.path.join(start_folder, f'start_data_{run_name}.csv'), index=False)
    #     print(f"Saved 'start' data for {run_name} to {start_folder}/start_data_{run_name}.csv")
    # else:
    #     print("Ignoring 'start' data CSV file as prolificID is not a string longer than 0 characters.")
    #
    # # Save task data as separate CSV files based on prolificID
    # taskdata_folder = os.path.join(start_folder, run_name)
    # os.makedirs(taskdata_folder, exist_ok=True)
    #
    # for sub_df in dfs:
    #     prolificID = sub_df["prolificID"][0]
    #
    #     # Check if prolificID is a string longer than 0 characters
    #     if isinstance(prolificID, str) and len(prolificID) > 15:
    #         sub_df.to_csv(os.path.join(taskdata_folder, f'taskdata_{prolificID}.csv'), index=False)
    #         print(f"Saved task data for prolificID: {prolificID} ({run_name})")
    #     else:
    #         print(f"Ignored task data for invalid prolificID: {prolificID} ({run_name})")



    # Save 'start' data to a single CSV file
 #   start_folder = os.path.join('..', 'data')
    start_folder = os.path.join('.')
    os.makedirs(start_folder, exist_ok=True)

    # Check if prolificID is a string longer than 10 characters
    valid_start_data = [data for data in start_data_list if isinstance(data["prolificID"], str) and len(data["prolificID"]) > 18]

    if valid_start_data:
        start_combined_df = pd.DataFrame(valid_start_data)
        start_combined_df.to_csv(os.path.join(start_folder, f'start_data_{run_name}.csv'), index=False)
    else:
        print("Ignoring 'start' data CSV file as no valid prolificID found.")

    # Save task data as separate CSV files based on prolificID
    taskdata_folder = os.path.join(start_folder, run_name)
    os.makedirs(taskdata_folder, exist_ok=True)

    for sub_df in dfs:
        prolificID = sub_df["prolificID"][0]
        date_string = sub_df["date"][0]
        time_string = sub_df["start_time"][0]

        # Check if prolificID is a string longer than 10 characters
        if isinstance(prolificID, str) and len(prolificID) > 10:

            converted_date = convert_date_format(date_string)
            converted_time = convert_time_format(time_string)

            file_path = os.path.join(taskdata_folder, f'taskdata_{converted_date}_{converted_time}_{run_name}_{prolificID}.csv')

            if not os.path.exists(file_path):
                sub_df.to_csv(os.path.join(file_path), index=False)
                print(f"Saved task data for prolificID: {prolificID} ({run_name})")
            else:
                print(f"CSV file '{file_path}' already exists. Not saving.")

        else:
            print(f"Ignored task data for invalid prolificID: {prolificID} ({run_name})")




# Run the function for each run name
#run_names = ['exp_survey','exp_fwdspan']
run_names = ['exp_learn','exp_test','exp_post_survey','exp_survey']
#run_names = ['exp_learn']



for run_name in run_names:
    save_data_to_csv(run_name)

# Continue with the rest of your code...
