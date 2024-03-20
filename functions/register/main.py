import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')  # Name of your DynamoDB table

def lambda_handler(event, context):
    # Extract data from the event
    data = json.loads(event['body'])
    
    # Extract attributes from the data
    userID = data['userID']
    name = data['name']
    major = data['major']
    yearOfMajor = data['yearOfMajor']
    # profilePic = data.get('profilePic', '')  # Check if profilePic is provided
    
    # Validation (you may add more validation logic as needed)
    if not (name and major and yearOfMajor):
        return {
            'statusCode': 400,
            'body': json.dumps('Missing required fields')
        }
    
    # Put item into DynamoDB table
    response = table.put_item(
        Item={
            'userID': userID,  # Assuming you have userUid available in the Lambda context
            'name': name,
            'major': major,
            'year': yearOfMajor,
            # 'profilePic': profilePic
        }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Item added to DynamoDB table successfully')
    }
