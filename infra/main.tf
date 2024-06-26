terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
  access_key = ""
  secret_key = ""
}

locals {
  register = "register"
  create = "create_event"
  get_events = "get-events"
  messaging = "messaging"
  enroll = "class-enroll"
  get_class = "read-class-info"
  manage_friends = "manage-friends"
  get_friends = "get-friends"
  manage_class_items = "manage-class-items"
  update_profile = "update-profile"

  handler_name = "main.handler"

  artifact_register = "artifact_register.zip"
  artifact_create = "artifact_create.zip"
  artifact_get_events = "artifact_get_events.zip"
  artifact_messaging = "artifact_messaging.zip"
  artifact_enroll = "artifact_class_enroll.zip"
  artifact_get_class = "artifact_get_class.zip"
  artifact_manage_friends = "artifact_manage_friends.zip"
  artifact_get_friends = "artifact_get_friends.zip"
  artifact_manage_class_items = "artifact_manage_class_items.zip"
  artifact_update_profile = "artifact_update_profile.zip"
}

resource "aws_iam_role" "lambda_exec" {
  name               = "iam-communicate"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# ------------ policies --------------- #
resource "aws_iam_role_policy_attachment" "lambda_exec_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_exec.name
}
resource "aws_iam_role_policy_attachment" "lambda_SSM" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
  role       = aws_iam_role.lambda_exec.name
}

# !!!!!!!!! IF WE DECIDE TO USE DYNAMODB !!!!!!!!!!!
resource "aws_iam_role_policy_attachment" "lambda_dynamodb" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role       = aws_iam_role.lambda_exec.name
}
# ------------ policies --------------- #

# -------------- create Lambda functions --------------- #
resource "aws_lambda_function" "lambda-register" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.register
  handler          = local.handler_name
  filename         = local.artifact_register
  source_code_hash = data.archive_file.data_register_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-create" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.create
  handler          = local.handler_name
  filename         = local.artifact_create
  source_code_hash = data.archive_file.data_create_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-get-events" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.get_events
  handler          = local.handler_name
  filename         = local.artifact_get_events
  source_code_hash = data.archive_file.data_get_events_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-messaging" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.messaging
  handler          = local.handler_name
  filename         = local.artifact_messaging
  source_code_hash = data.archive_file.data_messaging_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-enroll" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.enroll
  handler          = local.handler_name
  filename         = local.artifact_enroll
  source_code_hash = data.archive_file.data_enroll_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-get-class" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.get_class
  handler          = local.handler_name
  filename         = local.artifact_get_class
  source_code_hash = data.archive_file.data_get_class_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-manage-friends" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.manage_friends
  handler          = local.handler_name
  filename         = local.artifact_manage_friends
  source_code_hash = data.archive_file.data_manage_friends_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-get-friends" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.get_friends
  handler          = local.handler_name
  filename         = local.artifact_get_friends
  source_code_hash = data.archive_file.data_get_friends_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-manage-class-items" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.manage_class_items
  handler          = local.handler_name
  filename         = local.artifact_manage_class_items
  source_code_hash = data.archive_file.data_manage_class_items_zip.output_base64sha256
  runtime = "python3.9"
}
resource "aws_lambda_function" "lambda-update-profile" {
  role             = aws_iam_role.lambda_exec.arn
  function_name    = local.update_profile
  handler          = local.handler_name
  filename         = local.artifact_update_profile
  source_code_hash = data.archive_file.data_update_profile_zip.output_base64sha256
  runtime = "python3.9"
}
# -------------- create Lambda functions --------------- #



# -------- create function URL for Lambda functions ---------- #
resource "aws_lambda_function_url" "url-register" {
  function_name      = aws_lambda_function.lambda-register.function_name
  authorization_type = "NONE"   # AWS_IAM for secured access
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-create" {
  function_name      = aws_lambda_function.lambda-create.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-get-events" {
  function_name      = aws_lambda_function.lambda-get-events.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-messaging" {
  function_name      = aws_lambda_function.lambda-messaging.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-enroll" {
  function_name      = aws_lambda_function.lambda-enroll.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-get-class" {
  function_name      = aws_lambda_function.lambda-get-class.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-manage-friends" {
  function_name      = aws_lambda_function.lambda-manage-friends.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-get-friends" {
  function_name      = aws_lambda_function.lambda-get-friends.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-manage-class-items" {
  function_name      = aws_lambda_function.lambda-manage-class-items.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
resource "aws_lambda_function_url" "url-update-profile" {
  function_name      = aws_lambda_function.lambda-update-profile.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}
# -------- create function URL for Lambda functions ---------- #

# -------------------- DynamoDB Table ---------------------- #
resource "aws_dynamodb_table" "communicate" {
  name           = "communicate"
  hash_key       = "userID"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  attribute {
    name = "userID"
    type = "S"
  }

}

resource "aws_dynamodb_table" "communicate-class" {
  name           = "communicate-class"
  hash_key       = "userID"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  attribute {
    name = "userID"
    type = "S"
  }
}
# -------------------- DynamoDB Table ---------------------- #

# ------------------- create artifacts --------------------- #
data "archive_file" "data_register_zip" {
  type        = "zip"
  source_file = "../functions/register/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_register
}
data "archive_file" "data_create_zip" {
  type        = "zip"
  source_file = "../functions/create/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_create
}
data "archive_file" "data_get_events_zip" {
  type        = "zip"
  source_file = "../functions/get_events/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_get_events
}
data "archive_file" "data_messaging_zip" {
  type        = "zip"
  source_file = "../functions/messaging/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_messaging
}
data "archive_file" "data_enroll_zip" {
  type        = "zip"
  source_file = "../functions/enroll/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_enroll
}
data "archive_file" "data_get_class_zip" {
  type        = "zip"
  source_file = "../functions/get_class/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_get_class
}
data "archive_file" "data_manage_friends_zip" {
  type        = "zip"
  source_file = "../functions/manage_friends/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_manage_friends
}
data "archive_file" "data_get_friends_zip" {
  type        = "zip"
  source_file = "../functions/get_friends/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_get_friends
}
data "archive_file" "data_manage_class_items_zip" {
  type        = "zip"
  source_file = "../functions/manage_class_Items/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_manage_class_items
}
data "archive_file" "data_update_profile_zip" {
  type        = "zip"
  source_file = "../functions/update_profile/main.py"         # UPDATE PATH AFTER
  output_path = local.artifact_update_profile
}
# ------------------- create artifacts -------------------- #

# ------------ CloudWatch IAM Policy for pubishing logs ------------- #
# resource "aws_iam_policy" "logs" {
#   name        = "lambda_logs"
#   description = "IAM policy for logging from a lambda"
#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": [
#         "logs:CreateLogGroup",
#         "logs:CreateLogStream",
#         "logs:PutLogEvents"
#       ],
#       "Resource": [
#         "arn:aws:logs:ca-central-1:409601214226:log-group:/aws/lambda/*",
#         "arn:aws:logs:ca-central-1:409601214226:log-group:/aws/lambda/*:log-stream:*"
#       ],
#       "Effect": "Allow"
#     }
#   ]
# }
# EOF
# }

resource "aws_iam_policy" "logs" {
  name        = "lambda_logs"
  description = "IAM policy for logging from a lambda"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:Query"
      ],
      "Resource":[
                "arn:aws:dynamodb:::table/",
                "arn:aws:logs:::",
                "arn:aws:dynamodb:ca-central-1:409601214226:table/communicate",
                "arn:aws:dynamodb:ca-central-1:409601214226:table/communicate-class"
                ],
      "Effect": "Allow"
    }
  ]
}
EOF
}
# ------------ CloudWatch IAM Policy for pubishing logs ------------- #

# ---------------------- Outputs ---------------------- #
output "lambda_url_register" {
  value = aws_lambda_function_url.url-register.function_url
}
output "lambda_url_create" {
  value = aws_lambda_function_url.url-create.function_url
}
output "lambda_url_get_events" {
  value = aws_lambda_function_url.url-get-events.function_url
}
output "lambda_url_messaging" {
  value = aws_lambda_function_url.url-messaging.function_url
}
output "lambda_url_enroll" {
  value = aws_lambda_function_url.url-enroll.function_url
}
output "lambda_url_get_class" {
  value = aws_lambda_function_url.url-get-class.function_url
}
output "lambda_url_manage_friends" {
  value = aws_lambda_function_url.url-manage-friends.function_url
}
output "lambda_url_get_friends" {
  value = aws_lambda_function_url.url-get-friends.function_url
}
output "lambda_url_manage_class_items" {
  value = aws_lambda_function_url.url-manage-class-items.function_url
}
output "lambda_url_update_profile" {
  value = aws_lambda_function_url.url-update-profile.function_url
}
# ---------------------- Outputs ---------------------- #
