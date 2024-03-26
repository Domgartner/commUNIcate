import json
import boto3
import base64
from requests_toolbelt.multipart import decoder

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-events')

def handler(event, context):
    body = event["body"]

    if event["isBase64Encoded"]:
        body = base64.b64decode(body)

    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    email = binary_data[0].decode()
    id = binary_data[1].decode()
    try:
        # Update DynamoDB table with the user's email
        response = table.update_item(
            Key={
                'email': email,
                'id': id
            },
            UpdateExpression='SET #users = list_append(if_not_exists(#users, :empty_list), :user)',
            ExpressionAttributeNames={'#users': 'users'},
            ExpressionAttributeValues={':user': [email], ':empty_list': []},
            ReturnValues='ALL_NEW'
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'RSVP successful'})
        }
    except Exception as e:
        print('Error RSVPing:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error'})
        }
