# media-publisher

## Installation

```
npm install
```

## Setup

Provide the following environment variables:

- HF_API_KEY - API access token for https://huggingface.co

## Usage

### Add a story

```
curl -X POST http://localhost:3000/stories -H "Content-Type: application/json" -d '{"title":"Alice","contents":"from wonderland"}'
```

### Get all stories

```
curl http://localhost:3000/stories
```

## Tools

### Classification engine test

```
npm exec tsx src/verify.ts
```

Note that it currently rejects any contents.
