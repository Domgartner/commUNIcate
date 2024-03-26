import json
import boto3
from boto3.dynamodb.conditions import Key

import requests
import time
import hashlib
from base64 import b64decode


# ---------------------------------------------------- UPDATE FUCNTIONSSS AS ----------------------------------------------------

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')
table2 = dynamodb.Table('communicate-class')
ssm = boto3.client("ssm", "ca-central-1")
polly = boto3.client("polly", "ca-central-1")

def handler(event, context):
    try:
        filter = event['queryStringParameters']['type']
        user_id = event['queryStringParameters']['userID'].strip('"')  # Remove leading and trailing "/"
        user_response = table.query(KeyConditionExpression=Key('userID').eq(user_id))  # query the DynamoDB table for the user's details based on userID
        # check if the query returned any items
        if user_response['Count'] == 0:
            # if no items were found, return a success response with an empty list of data
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'message': "Success",
                    'data': []
                })
            }
            return response

        if filter == "update" :
            # Query the DynamoDB table to get the details of all the friends
            data = json.loads(event['body'])
            name = str(data.get('name', ''))
            year = int(data.get('year', ''))
            major = str(data.get('major', ''))
            profilePic = data["profilePic"]
            
            
            timeStamp = str(time.time())
            secretTime = "timestamp=" + timeStamp + str("YkraOre5cCHZ-EBrNjU8NUCxy_g")
            api_key = str("643464235428857")
            secretTime_encode = secretTime.encode()
            secretTime_decode = hashlib.sha1(secretTime_encode)
            signature = secretTime_decode.hexdigest()
            cloudinaryData = {"api_key": api_key, "timestamp": timeStamp,"signature": signature}
            files = {'file': profilePic}
            cloudinaryImage = requests.post("https://api.cloudinary.com/v1_1/dkcw9xd6v/auto/upload", data=cloudinaryData, files=files)
            secure_url = cloudinaryImage.json()["secure_url"]
            version = secure_url.split("/")[-2]
            ImageURL = f"{secure_url.split(version)[0].rstrip('/')}/e_art:zorro/{version}/{secure_url.split(version)[1]}"

            Items={'userID': user_id,
                    'name': name,
                    'friends': user_response['Items'][0].get('friends', ''),
                    'major': major,
                    'profilePic' : ImageURL, # Update profilePic with the new URL
                    'year' :year}
            response = table.put_item(Item=Items)

            return {
                    'statusCode': 200,
                    'body': json.dumps({'message': 'Profile Updated successfully'})
            }
        else:
            name = user_response['Items'][0].get('name', '')
            year = int(user_response['Items'][0].get('year', 0))
            major = user_response['Items'][0].get('major', '')
            profilePic = user_response['Items'][0].get('profilePic', '')  # Retrieve profilePic from the query response
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': "Success",
                    'data': {
                        'name': name,
                        'year': year,
                        'major': major,
                        'profilePic': profilePic  # Use the retrieved profilePic
                    }
                })
            }
    except Exception:
        # if an exception occurs, return an error response
        response = {
            "statusCode": 404,  # set the HTTP status code to 404 (Not Found)
            "body": json.dumps(
                {'message': "Its not working"}  # return a JSON object with an error message
            )
        }
        return response