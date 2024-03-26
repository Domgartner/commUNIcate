# # add your get-obituaries function here
# import json
# import boto3
# import base64
# from requests_toolbelt.multipart import decoder

# dynamodb = boto3.resource("dynamodb")
# table = dynamodb.Table("communicate-events")
# def handler(event, context):
#     body = event["body"]

#     if event["isBase64Encoded"]:
#         body = base64.b64decode(body)
    
#     content_type = event["headers"]["content-type"]
#     data = decoder.MultipartDecoder(body, content_type)    
    

#     binary_data = [part.content for part in data.parts]
#     email = binary_data[0].decode()
#     id = binary_data[1].decode()
#     title = binary_data[2].decode()
#     date = binary_data[3].decode()
#     location = binary_data[4].decode()
#     description = binary_data[5].decode()
    
#     try:        
#         # Update item in DynamoDB
#         response = table.update_item(
#             Key={
#                 'email': email,
#                 'id': id
#             },
#             UpdateExpression='set title = :title, #date = :date, location = :location, description = :description',
#             ExpressionAttributeValues={
#                 ':title': title,
#                 ':date': date,
#                 ':location': location,
#                 ':description': description
#             },
#             ExpressionAttributeNames={
#                 '#date': 'date'  # date is a reserved word in DynamoDB, so using an alias
#             },
#             ReturnValues='UPDATED_NEW'
#         )
        
#         return {
#             'statusCode': 200,
#             'body': json.dumps('Event updated successfully')
#         }
#     except Exception as e:
#         return {
#             'statusCode': 500,
#             'body': json.dumps(f'Error updating event: {str(e)}')
#         }



import json
import boto3
import hashlib
from base64 import b64decode


# ---------------------------------------------------- UPDATE FUCNTIONSSS AS ----------------------------------------------------

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("communicate-events")
ssm = boto3.client("ssm", "ca-central-1")
polly = boto3.client("polly", "ca-central-1")

def handler(event, context):
    try:
        data = json.loads(event['body'])
        email = str(data.get('email', ''))
        id = str(data.get('id', ''))
        title = str(data.get('title', ''))
        date = str(data.get('date', ''))
        location = str(data.get('location', ''))
        capacity = str(data.get('capacity', ''))
        description = str(data.get('description', ''))
        image_url = str(data.get('image_url', ''))
        registered = str(data.get('registered', ''))
        tags = data.get('tags', [])
        users = data.get('users', [])

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
        