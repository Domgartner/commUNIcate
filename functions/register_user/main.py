import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-events')

def handler(event, context):
    try:        
        email = event['queryStringParameters']['email']
        id = event['queryStringParameters']['id']
        ogEmail = event['queryStringParameters']['OGemail']
        
        # Check if user already exists in the users list
        response = table.get_item(
            Key={
                'email': ogEmail,
                'id': id
            }
        )
    

        # Get the existing users list if it exists
        existing_users = response.get('Item', {}).get('users', [])

        # Add user to DynamoDB table if not already in the users list
        if email not in existing_users:
            response = table.update_item(
                Key={
                    'email': ogEmail,
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
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'User is already registered'})
            }
    except Exception as e:
        print('Error RSVPing:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error'})
        }
