import json
import boto3
import hashlib
from base64 import b64decode


# ---------------------------------------------------- UPDATE FUCNTIONSSS AS ----------------------------------------------------

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("communicate-events")

def handler(event, context):
    try:
        email = event['queryStringParameters']['email']
        id = event['queryStringParameters']['id']
        title = event['queryStringParameters']['title']
        date = event['queryStringParameters']['date']
        location = event['queryStringParameters']['location']
        capacity = event['queryStringParameters']['capacity']
        image_url = event['queryStringParameters']['image_url']
        registered = event['queryStringParameters']['registered']
        description = event['queryStringParameters']['description']
        tags = event['queryStringParameters'].get('tags', '').split(',') if event['queryStringParameters'].get('tags') else []
        users = event['queryStringParameters'].get('users', '').split(',') if event['queryStringParameters'].get('users') else []

        item = {
            'email': email,
            'id': id,
            'title': title,
            'date': date,
            'location': location,
            'capacity': capacity,
            'registered': registered,
            'description': description,
            'tags': tags,
            'users': users,
            'image_url': image_url 
        }

        # Put item into DynamoDB table
        response = table.put_item(Item=item)

        return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Profile Updated successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error updating event: {str(e)}')
        }
        