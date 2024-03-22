import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-class')

def handler(event, context):
    try:
        # Parse the query parameters to extract the user's ID and the class name
        data = json.loads(event['body'])
        userID = str(data.get('userID', ''))
        className = str(data.get('class', ''))

        type = event['queryStringParameters']['type']
        # Query the DynamoDB table to get the user's details
        if type == "enroll":
            user_response = table.query(KeyConditionExpression=Key('userID').eq(userID))
            user_classes_str = user_response['Items'][0].get('classNames', '')
            items = user_response['Items'][0].get('items', [])
            user_classes = user_classes_str.split(',')  # Split the string to get individual classes

            # Check if the class is already in the list of classes
            if className in user_classes:
                response = {
                    "statusCode": 200,
                    "body": json.dumps({
                        'message': "Class already enrolled",
                    })
                }
                return response
            # Add the class to the list
            if "LoserNoClasses" in user_classes:
                user_classes.remove("LoserNoClasses")
            new_classes = ','.join(user_classes + [className])
            Items = {
                'userID': userID,
                'classNames': new_classes,
                'items': items
            }
            response = table.put_item(Item=Items)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Class enrolled successfully'})
            }

        elif type == "unenroll":
            user_response = table.query(KeyConditionExpression=Key('userID').eq(userID))
            user_classes_str = user_response['Items'][0].get('classNames', '')
            items = user_response['Items'][0].get('items', [])
            user_classes = user_classes_str.split(',')  # Split the string to get individual classes

            # Remove the class from the list
            if className in user_classes:
                user_classes.remove(className)

            items = [item for item in items if item.get('class') != className]

            # Update classes or add LoserNoClasses if empty
            new_classes = ','.join(user_classes) if user_classes else "LoserNoClasses"
            Items = {
                'userID': userID,
                'classNames': new_classes,
                 'items': items
            }
            response = table.put_item(Item=Items)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Class unenrolled successfully'})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
