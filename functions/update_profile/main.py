import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')

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
            # data = json.loads(event['body'])
            # name = str(data.get('name', ''))
            # year = int(data.get('year', ''))
            # major = str(data.get('major', ''))
            name = event['queryStringParameters']['name']
            userID = event['queryStringParameters']['userID']
            type = event['queryStringParameters']['type']
            year = event['queryStringParameters']['year']
            major = event['queryStringParameters']['major']
            
            Items={'userID': user_id,
                    'name': name,
                    'friends': user_response['Items'][0].get('friends', ''),
                    'major': major,
                    'profilePic' : "none",
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
            return {
                'statusCode': 200,
                'body': json.dumps({
                'message': "Success",
                'data': {
                    'name': name,
                    'year': year,
                    'major': major
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