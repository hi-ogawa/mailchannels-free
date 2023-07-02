#!/bin/bash
set -eu -o pipefail

curl -X 'POST' \
  'https://mailchannels-free-hiro18181.vercel.app/trpc/sendMail' \
  -H 'Content-Type: application/json' \
  -d '{
  "input": {
    "subject": "test subject",
    "content": [
      {
        "type": "text/plain",
        "value": "test content"
      }
    ],
    "from": {
      "email": "from@example.com",
      "name": "test sender"
    },
    "personalizations": [
      {
        "to": [
          {
            "email": "to@example.com",
            "name": "test receiver"
          }
        ]
      }
    ]
  }
}'
