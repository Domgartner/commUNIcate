# add your create-obituary function here

import json

import requests
from requests_toolbelt.multipart import decoder
import boto3
import base64
import os
import time
import hashlib

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("communicate-events")

client = boto3.client('ssm')

response = client.get_parameters_by_path (
    Path = '/the-last-show/',
    Recursive=True,
    WithDecryption=True
)

response = {key["Name"]: key["Value"] for key in response["Parameters"]}

def get_keys(key_path):
    return response[key_path]

def get_public_ip():
    res = requests.get("https://checkip.amazonaws.com")
    return res.text

def upload_to_cloudinary(filename, resource_type="image", extra_fields={}) :
    api_key = "485553813126649"
    cloud_name = "dp8wdd53c"
    # need this from parameter store
    api_secret = get_keys("/the-last-show/cloudinary-key")
    timestamp = int(time.time())

    body = {
        "timestamp": timestamp,
        "api_key": api_key,
    }

    files = {
        "file": open(filename, "rb")
    }

    timestamp = int(time.time())
    body["timestamp"] = timestamp
    body.update(extra_fields)

    body["signature"] = create_signature(body, api_secret)


    url = f"https://api.cloudinary.com/v1_1/{cloud_name}/{resource_type}/upload"
    res = requests.post(url, files=files, data=body)


    return res.json()


def create_signature(body, api_secret):
    exclude = ["api_key", "resource_type", "cloud_name"]
    sorted_body = sort_dictionary(body, exclude)
    query_string = create_query_string(sorted_body)
    query_string_appended = f"{query_string}{api_secret}"
    hashed = hashlib.sha1(query_string_appended.encode())
    signature = hashed.hexdigest()
    return signature


def sort_dictionary(dictionary, exclude):
    return {k: v for k, v in sorted(dictionary.items(), key=lambda item: item[0]) if k not in exclude}


def create_query_string(body):
    query_string = ""
    for idx, (k,v) in enumerate(body.items()):
        query_string = f"{k}={v}" if idx == 0 else f"{query_string}&{k}={v}"

    return query_string

def handler(event, context):
    body = event["body"]

    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
    
    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    name = binary_data[1].decode()
    born = binary_data[2].decode()
    died = binary_data[3].decode()
    id = binary_data[4].decode()
    print(id)
    print(id, type(id))
    print(name, type(name))
    print(born, type(born))

    file_name = os.path.join("/tmp", "event.png")
    with open(file_name, "wb") as f:
        f.write(binary_data[0])

    image = upload_to_cloudinary(file_name, extra_fields={"eager": "e_art:zorro,e_grayscale"})
    image_url = image["eager"][0]["secure_url"]
    try:
        table.put_item(Item={
            'id': id,
            'title': title,
            'date' : date,
            'location': location,
            'description': description,
            'tags': tags,
            '' 
            'image_url': image_url
        })
        return {
            "statusCode": 200,
            "body": json.dumps({
                "version": "3",
                "ip": get_public_ip(),
                "message": "sucessfully added note" 
            })
        }
    except Exception as exp:
        print(f"exception: {exp}")
        return{
            "statusCode": 500,
            "body": json.dumps({
                "message": str(exp)
            })
        }