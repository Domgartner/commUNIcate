# add your get-obituaries function here
import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("communicate-events")

def handler(event, context):
    try:
        res = table.scan()
        return {
            "statusCode": 200,
            "body": json.dumps(res["Items"])
        }
    except Exception as exp:
        print(exp)
        return{
            "statusCode": 500,
            "body": json.dumps({"message": str(exp)})
        }
    
