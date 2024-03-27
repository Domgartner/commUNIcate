# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('communicate')
# table2 = dynamodb.Table('communicate-class')

# def handler(event, context):
#     try:
#       # Extract data from the event
        
#         userID = event['queryStringParameters']['userID']
#         name = event['queryStringParameters']['name']
#         major = event['queryStringParameters']['major']
#         yearOfMajor = event['queryStringParameters']['yearOfMajor']
        

#         # profilePic = data.get('profilePic', '')
#         if not (userID or name or major or yearOfMajor):
#             return {
#                 'statusCode': 400,
#                 'body': json.dumps({'message': 'Missing required fields'})
#             }
        
#         Items={'userID': userID,
#                 'name': name,
#                 'friends': 'LoserNoFriends',
#                 'major': major,
#                 'profilePic' : "none",
#                 'year' :yearOfMajor}
#         response = table.put_item(Item=Items)

         
#         Items2={'userID': userID,
#               'classNames': 'LoserNoClasses',
#               'items': []}

#         response = table2.put_item(Item=Items2)
#         return {
#             'statusCode': 200,
#             'body': json.dumps({'message': 'User added successfully'})
#         }
#     except Exception as e:
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'message': str(e)})
#         }



import json
import boto3
import requests
import time

import hashlib
from base64 import b64decode

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')
table2 = dynamodb.Table('communicate-class')

def handler(event, context):
    # return {
    #         'statusCode': 200,
    #         'body': json.dumps({'message': 'User added successfully'})
    #     }

    try:
       # Extract data from the event
        userID = event['queryStringParameters']['userID']
        name = event['queryStringParameters']['name']
        major = event['queryStringParameters']['major']
        yearOfMajor = event['queryStringParameters']['yearOfMajor']
     
        # profilePic = event['queryStringParameters']['profilePic']
        profilePic = event['body']
        
        # profilePic2 = profilePic['profilePic']
        # typerz = type(data) 
        # start_index = data.find('"userID":"') + len('"userID":"')
        # start_index = data.find("u")
        # userID = data['userID']
        # name = data['name']
        # major = data['major']
        # yearOfMajor = data['yearOfMajor']
        # profilePic = data['profilePic']
        
      

        
        
        timeStamp = str(time.time())
        secretTime = "timestamp=" + timeStamp + str("")
        api_key = str("")
        secretTime_encode = secretTime.encode()
        secretTime_decode = hashlib.sha1(secretTime_encode)
        signature = secretTime_decode.hexdigest()
        cloudinaryData = {"api_key": api_key, "timestamp": timeStamp,"signature": signature}
       
        # Upload image to Cloudinary
        files = {'file': profilePic}
     

        cloudinaryImage = requests.post(f"https://api.cloudinary.com/v1_1/dbz2svzwj/auto/upload", data=cloudinaryData, files=files)
        secure_urls = cloudinaryImage.json()
        secure_url = secure_urls.get("secure_url")
        
        # version = secure_url.split("/")[-2]

        # ImageURL = f"{secure_url.split(version)[0].rstrip('/')}/e_art:zorro/{version}/{secure_url.split(version)[1]}"
        
        # return {
        #     'statusCode': 200,
        #     'body': json.dumps({'message': 'User added successfully',
        #         'data':secure_url
        #     })
        # }
        
       


        

        # profilePic = data.get('profilePic', '')
        if not (userID or name or major or yearOfMajor):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }
        
        Items={'userID': userID,
                'name': name,
                'friends': 'LoserNoFriends',
                'major': major,
                'profilePic' : secure_url,
                'year' :yearOfMajor}
        response = table.put_item(Item=Items)

        
        Items2={'userID': userID,
               'classNames': 'LoserNoClasses',
               'items': []}

        response = table2.put_item(Item=Items2)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User added successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
