# Goalrilla Dealer Quote API
Serverless API for handling dealer quotes (currently specifically for Goalrilla)

## Installation

Ensure git, node.js 6.1.0+ and yarn are installed

1. Clone repository `git clone https://github.com/escaladesports/goalrilla-quote-api.git`
2. `yarn` (installs dependencies)

## Environment variables
Sensitive credentials are located in `env.yml` - make sure that the Google Sheets API key and similar multiline entries should be prefixed by | and a newline in order to preserve newlines. See example.env.yml for expected entries.

## Running development server

Use `yarn dev` to run a local testing server using serverless-offline

## Deployment

Use `serverless deploy` to deploy to AWS Lambda