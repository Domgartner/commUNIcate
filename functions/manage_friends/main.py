import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')

def handler(event, context):
    try:
        # Parse the query parameters to extract the friend's id
        friendID = event['queryStringParameters']['id']
        userID = 'user1'  # Assuming the userID is known or retrieved from somewhere
        # Query the DynamoDB table to get the user's details
        user_response = table.query(KeyConditionExpression=Key('userID').eq(userID))
        user_friends_str = user_response['Items'][0].get('friends', '')
        user_friends = user_friends_str.split(',')  # Split the string to get individual user IDs

        # if not user_data:
        if user_response['Count'] == 0:
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'message': "Success",
                    'data': []
                })
            }
            return response
        # Check if the friendID is already in the list of friends
        if friendID in user_friends:
            # Remove the friend from the list
            updated_friends = ','.join([str(f) for f in user_friends if f != friendID])
            updated_friends = [f for f in user_friends if f != friendID]

            # Join the list of friends back into a string
            updated_friends_str = ','.join(updated_friends)
            if  updated_friends_str == '':
                updated_friends_str = "LoserNoFriends"
       
            Items={'userID': userID,
                    'name': user_response['Items'][0].get('name', ''),
                    'friends': updated_friends_str,
                    'major': user_response['Items'][0].get('major', ''),
                    'profilePic' : user_response['Items'][0].get('profilePic', ''),
                    'year' :user_response['Items'][0].get('year', '')}
            response = table.put_item(Item=Items)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Friend removed successfully'})
            }
        else:
            # Add the friend to the list
            if "LoserNoFriends" in user_friends:
                new_friends = friendID # Initialize with just the new friend
            else:
                new_friends = ','.join(user_friends + [friendID]) 
            
            Items={'userID': userID,
                    'name': user_response['Items'][0].get('name', ''),
                    'friends': new_friends,
                    'major': user_response['Items'][0].get('major', ''),
                    'profilePic' : user_response['Items'][0].get('profilePic', ''),
                    'year' :user_response['Items'][0].get('year', '')}
            response = table.put_item(Item=Items)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Friend added successfully'})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }