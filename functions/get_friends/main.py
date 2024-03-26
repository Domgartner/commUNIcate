import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')

def handler(event, context):
    try:
        filter = event['queryStringParameters']['activeFilter']
        user_id = event['queryStringParameters']['userID']  # get the value of the 'userID' query parameter from the event object
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
        
        # Extract the list of friends from the user's details
        user_friends_str = user_response['Items'][0].get('friends', '')
        user_friends = user_friends_str.split(',')  # Split the string to get individual user IDs
        if filter == "Following" :
            # Query the DynamoDB table to get the details of all the friends
            friends_details = []
            for friend_id in user_friends:
                friend_response = table.query(KeyConditionExpression=Key('userID').eq(friend_id))
                if friend_response['Count'] > 0:
                    friend_data = friend_response['Items'][0]
                    friend_profile = {
                        'id': friend_data.get('userID', ''), 
                        'name': friend_data.get('name', ''),
                        'profilePic': friend_data.get('profilePic', ''),
                        'major': friend_data.get('major', ''),
                        'year': str(friend_data.get('year', ''))  # Convert year to string
                    }
                    friends_details.append(friend_profile)
            
            # if items were found, return a success response with the data
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'message': "Success",
                    'data': friends_details
                })
            }
            return response
        else:
            # Scan the DynamoDB table to get details of all users
            all_users_response = table.scan()
            
            # Filter out users who are not in the friends list
            non_friends_details = []
            for user_data in all_users_response['Items']:
                if user_data['userID'] not in user_friends and user_data['userID'] != user_id:
                    non_friend_profile = {
                        'id': user_data.get('userID', ''), 
                        'name': user_data.get('name', ''),
                        'profilePic': user_data.get('profilePic', ''),
                        'major': user_data.get('major', ''),
                        'year': str(user_data.get('year', ''))  # Convert year to string
                    }
                    non_friends_details.append(non_friend_profile)
            
            # if items were found, return a success response with the data
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'message': "Success",
                    'data': non_friends_details
                })
            }
            return response
    except Exception:
        # if an exception occurs, return an error response
        response = {
            "statusCode": 404,  # set the HTTP status code to 404 (Not Found)
            "body": json.dumps(
                {'message': "Its not working"}  # return a JSON object with an error message
            )
        }
        return response
