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
}


resource "aws_dynamodb_table" "communicate-events" { # creating the table, got this from his github
  name         = "communicate-events"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1 #keep this

  # up to 1KB per second
  write_capacity = 1 #keep this

  hash_key = "email"
  range_key = "name"

  attribute {
    name = "email"
    type = "S"
  }


  attribute {
    name = "name"
    type = "S"
  }

}













# the locals block is used to declare constants that you can use throughout your code
locals {
  function_name = "get-events"     
  handler_name  = "main.handler"

  function_name_2 = "create-event"     
  handler_name_2  = "main.handler"

  function_name_3 = "update-event"
  handler_name_3 = "main.handler"


  get_path = "../functions/get_events/main.py"
  create_path = "../functions/create/main.py"
  update_path = "../functions/update/main.py"


  get_artifact = "get.zip"
  create_artifact = "create.zip"
  update_artifact = "update.zip"
}


















# create a role for the Lambda function to assume
# every service on AWS that wants to call other AWS services should first assume a role.
# then any policy attached to the role will give permissions
# to the service so it can interact with other AWS services
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role
resource "aws_iam_role" "lambda_get_events" {
  name               = "iam-for-lambda-${local.function_name}"
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

resource "aws_iam_role" "lambda_create_events" {
  name               = "iam-for-lambda-${local.function_name_2}"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
  })

  # permission policy document that defines the permissions granted to the role
  inline_policy {
    name = "lambda_create_obituary_permissions"
    policy = jsonencode({
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": ["ssm:GetParametersByPath"],
          "Resource": ["arn:aws:ssm:ca-central-1:869019704283:parameter/the-last-show/*"]
        },
      ]
    })
  }  
}



resource "aws_iam_role" "lambda_update_event" {
  name               = "iam-for-lambda-${local.function_name_3}"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
  })
}














# create archive file from main.py for get
data "archive_file" "file_1" {
  type = "zip"
  source_file = local.get_path
  output_path = local.get_artifact
}

# create archive file from main.py for create
data "archive_file" "file_2" {
  type = "zip"
  source_file = local.create_path
  output_path = local.create_artifact
}

# create archive file from main.py for update
data "archive_file" "file_3" {
  type = "zip"
  source_file = local.update_path
  output_path = local.update_artifact
}


# artifcat zip is your deployment package
# should chnage the artifact names to be different (though it does not matter in this case)


















# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
# see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime

resource "aws_lambda_function" "lambda_func_get" {
  role          = aws_iam_role.lambda_get_events.arn
  function_name = local.function_name
  handler       = local.handler_name
  filename      = local.get_artifact
  source_code_hash = data.archive_file.file_1.output_base64sha256
  runtime = "python3.9"
}

resource "aws_lambda_function" "lambda_func_create" {
  role          = aws_iam_role.lambda_create_events.arn
  function_name = local.function_name_2
  handler       = local.handler_name_2
  filename      = local.create_artifact
  source_code_hash = data.archive_file.file_2.output_base64sha256
  runtime = "python3.9"
}

resource "aws_lambda_function" "lambda_func_update" {
  role          = aws_iam_role.lambda_update_event.arn
  function_name = local.function_name_3
  handler       = local.handler_name_3
  filename      = local.update_artifact
  source_code_hash = data.archive_file.file_3.output_base64sha256
  runtime = "python3.9"
}



















# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "logs_1" {
  name        = "lambda-logging-${local.function_name}"
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
        "dynamodb:Scan",
        "dynamodb:DeleteItem" 
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.communicate-events.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}


# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "logs_2" {
  name        = "lambda-logging-${local.function_name_2}"
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
        "dynamodb:Query",
        "dynamodb:DeleteItem" 
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.communicate-events.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "logs_3" {
  name        = "lambda-logging-${local.function_name_3}"
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
        "dynamodb:Query",
        "dynamodb:DeleteItem" 
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.communicate-events.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}


















# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_1" {
  role       = aws_iam_role.lambda_get_events.name
  policy_arn = aws_iam_policy.logs_1.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_2" {
  role       = aws_iam_role.lambda_create_events.name
  policy_arn = aws_iam_policy.logs_2.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_3" {
  role       = aws_iam_role.lambda_update_event.name
  policy_arn = aws_iam_policy.logs_3.arn
}



















# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "url_1" {
  function_name      = aws_lambda_function.lambda_func_get.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}


resource "aws_lambda_function_url" "url_2" {
  function_name      = aws_lambda_function.lambda_func_create.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}


resource "aws_lambda_function_url" "url_3" {
  function_name      = aws_lambda_function.lambda_func_update.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}








output "lambda_url_get" {
  value = aws_lambda_function_url.url_1.function_url
}

output "lambda_url_create" {
  value = aws_lambda_function_url.url_2.function_url
}

output "lambda_url_update" {
  value = aws_lambda_function_url.url_2.function_url
}
