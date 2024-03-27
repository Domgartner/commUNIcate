# add your get-notes function here
import json
import boto3
from boto3.dynamodb.conditions import Key


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("communicate-events")

def handler(event, context):

    email = event["queryStringParameters"]["email"]
    id = event["queryStringParameters"]["id"]

    try:
        table.delete_item(Key = {
            "email": email,
            "id" : id,
        })


        return {
            "statusCode": 200,
            "body": "success",
        }
    
    except Exception as exp:
        print(exp)
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": str(exp)
            })
        }
  

    
