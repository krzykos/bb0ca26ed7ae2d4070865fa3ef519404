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

## TODOs

Time is running out, but some more ideas:

1. Do the AI research so the verification gives trustworthy decisions.
2. Switch to NestJS framework so the endpoints and verification service are covered by unit tests. (NestJS can serve apps with Fastify)
3. Develop a new publisher job that scans through `approved` stories, publishes them to the social media and switches to new status `published`.
4. Use real database instead of the in-memory mock.
5. Create a social media mock as a separate web application with the in-memory database. It could be useful in integration tests.
