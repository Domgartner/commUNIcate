import json
import boto3
from boto3.dynamodb.conditions import Key
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-class')



def handler(event, context):

    try:
        user_id = event['queryStringParameters']['userID'] 
        user_response = table.query(KeyConditionExpression=Key('userID').eq(user_id))
        
            
        response = {
            "statusCode": 200,
            "body": json.dumps({
                'message': "Success",
                'data':user_response
            })
        }
        return response


        
   
        if user_response['Count'] == 0:
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'message': "Success",
                    'data': []
                })
            }
            
        return response
        # user_classes_str = user_response['Items']
        # user_classes = user_classes_str.split(',')
        user_classes_str = user_response['Items'][0].get('className', '')
         
        if 'Items' in user_response and len(user_response['Items']) > 0:
            user_classes_str = user_response['Items'][0].get('className', '')
        else:
            user_classes_str = ''
        
        response = {
            "statusCode": 200,
            "body": json.dumps({
                'message': "Success",
                'data': user_classes_str
            })
        }
        return response
        
    except Exception as e:
        response = {
            "statusCode": 400,
            "body": json.dumps({
                'message': "Bad Request",
                'error': str(e)
            })
        }
        return response


