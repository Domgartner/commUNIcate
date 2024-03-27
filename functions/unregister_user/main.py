import json
import boto3
import base64
from requests_toolbelt.multipart import decoder

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-events')

def handler(event, context):    
    try:

        email = event['queryStringParameters']['email']
        id = event['queryStringParameters']['id']

        if not (id or email):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }
        
        # Retrieve the item from DynamoDB to get the users list
        item = table.get_item(
            Key={
                'email': email,
                'id': id
            }
        )
        
        # Get the users list from the item
        users = item.get('Item', {}).get('users', [])

        # Find the index of the email in the users list
        index = users.index(email)

        # Update DynamoDB table to remove the user's email from the users list
        response = table.update_item(
            Key={
                'email': email,
                'id': id
            },
            UpdateExpression=f'REMOVE #users[{index}]',
            ExpressionAttributeNames={'#users': 'users'},
            ReturnValues='ALL_NEW'
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'RSVP removed successfully'})
        }
    except ValueError:
        # If email is not found in users list
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Email not found in RSVP list'})
        }
    except Exception as e:
        print('Error removing RSVP:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error'})
        }