import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('communicate-class')

def handler(event, context):
    try:
        data = json.loads(event['body'])
        userID = data.get('userID', '')
        className = data.get('className', '')
        date = data.get('date', '')
        id = data.get('id', '')
        itemName = data.get('itemName', '')
        type = event["queryStringParameters"]["type"]
        # Get the current items list from the table
        response = table.get_item(Key={'userID': userID})
        items = response.get('Item', {}).get('items', [])
        # classesAlr = response.get('Item', {}).get('classNames', [])
        classNames = response.get('Item', {}).get('classNames')
        if type == "add":
            Item = {
                'class': className,
                'date': date,
                'id': id,
                'itemName': itemName
            }
            
            # Append the new Item to the items list
            items.append(Item)

            new_item = {
                "userID":userID,
                "classNames": classNames,
                "items": items
            }

            # Update the items list in the table
            table.put_item(Item=new_item)
            
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'Items': 'class events stored successfully'
                })
            }
            return response
        elif type == "delete":
            for i in items:
                if i['id'] == id:
                    items.remove(i)
                    break
            new_item = {
                "userID":userID,
                "classNames": classNames,
                "items": items
            }
            table.put_item(Item=new_item)
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    'Items': 'class events deleted successfully'
                })
            }
            return response
        
    except Exception as e:
        response = {
            "statusCode": 400,
            "body": json.dumps({
                'message': 'Bad Request',
                'error': str(e)
            })
        }
    return response
