import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-events')

def handler(event, context):
    try:        
        email = event['queryStringParameters']['email']
        id = event['queryStringParameters']['id']
        

        # profilePic = data.get('profilePic', '')
        if not (id or email):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }
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