# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('communicate')
# table2 = dynamodb.Table('communicate-class')

# def handler(event, context):
#     try:
#        # Extract data from the event
#         data = json.loads(event['body'])
#         userID = str(data.get('userID', ''))
#         name = str(data.get('name', ''))
#         major = str(data.get('major', ''))
#         yearOfMajor = int(data.get('yearOfMajor', ''))

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
#                'classNames': 'LoserNoClasses',
#                'items': []}

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


# REGISTER FUCNTIONSNSNSN--------------------------------------------------------------------------------------------------------

import json
import boto3
import requests
import time
import hashlib
from base64 import b64decode

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')
table2 = dynamodb.Table('communicate-class')
ssm = boto3.client("ssm", "ca-central-1")
polly = boto3.client("polly", "ca-central-1")

def handler(event, context):
    try:
        # Extract data from the event
        data = json.loads(event['body'])
        userID = str(data.get('userID', ''))
        name = str(data.get('name', ''))
        profilePic = data["profilePic"]
        major = str(data.get('major', ''))
        yearOfMajor = int(data.get('yearOfMajor', ''))

        # Cloudinary configuration
        timeStamp = str(time.time())
        secretTime = "timestamp=" + timeStamp + str("YkraOre5cCHZ-EBrNjU8NUCxy_g")
        api_key = str("643464235428857")
        secretTime_encode = secretTime.encode()
        secretTime_decode = hashlib.sha1(secretTime_encode)
        signature = secretTime_decode.hexdigest()
        cloudinaryData = {"api_key": api_key, "timestamp": timeStamp,"signature": signature}

        # Upload image to Cloudinary
        files = {'file': profilePic}
        cloudinaryImage = requests.post("https://api.cloudinary.com/v1_1/dkcw9xd6v/auto/upload", data=cloudinaryData, files=files)
        secure_url = cloudinaryImage.json()["secure_url"]
        version = secure_url.split("/")[-2]
        ImageURL = f"{secure_url.split(version)[0].rstrip('/')}/e_art:zorro/{version}/{secure_url.split(version)[1]}"

        # Validate required fields
        if not (userID or name or major or yearOfMajor):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }

        # Save user data to DynamoDB tables
        Items = {'userID': userID,
                 'name': name,
                 'friends': 'LoserNoFriends',
                 'major': major,
                 'profilePic': ImageURL,  # Update this with Cloudinary image URL if needed
                 'year': yearOfMajor}
        response = table.put_item(Item=Items)

        Items2 = {'userID': userID,
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
