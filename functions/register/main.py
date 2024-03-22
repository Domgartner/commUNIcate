import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate')
table2 = dynamodb.Table('communicate-class')

def handler(event, context):
    try:
       # Extract data from the event
        data = json.loads(event['body'])
        userID = str(data.get('userID', ''))
        name = str(data.get('name', ''))
        major = str(data.get('major', ''))
        yearOfMajor = int(data.get('yearOfMajor', ''))

        # profilePic = data.get('profilePic', '')
        if not (userID or name or major or yearOfMajor):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }
        
        Items={'userID': userID,
                'name': name,
                'friends': 'LoserNoFriends',
                'major': major,
                'profilePic' : "none",
                'year' :yearOfMajor}
        response = table.put_item(Item=Items)

         
        Items2={'userID': userID,
               'className': 'LoserNoClasses',
               'items': 'LoserNoItems'}

        response = table2.put_item(Item=Items2)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User added successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }