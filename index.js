import express from 'express';

const app = express();
app.use(express.json());

// App manifest endpoint - ChatGPT calls this to discover your app's capabilities
app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.json({
    schema_version: 'v1',
    name_for_human: 'Current Time App',
    name_for_model: 'time_app',
    description_for_human: 'Get the current date and time',
    description_for_model: 'Use this app when the user asks for the current time, date, or what time it is. This app provides the current date and time in a human-readable format.',
    api: {
      type: 'openapi',
      url: `${req.protocol}://${req.get('host')}/openapi.json`
    },
    auth: {
      type: 'none'
    }
  });
});

// OpenAPI specification endpoint
app.get('/openapi.json', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'Current Time App',
      version: '1.0.0',
      description: 'A simple app that returns the current time'
    },
    servers: [
      {
        url: `${req.protocol}://${req.get('host')}`
      }
    ],
    paths: {
      '/time': {
        get: {
          operationId: 'getCurrentTime',
          summary: 'Get the current date and time',
          description: 'Returns the current date and time in a formatted string',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      current_time: {
                        type: 'string',
                        description: 'Human-readable current time'
                      },
                      timestamp: {
                        type: 'string',
                        description: 'ISO 8601 timestamp'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
});

// The actual function that ChatGPT will call
app.get('/time', (req, res) => {
  const now = new Date();
  const timeString = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  res.json({
    current_time: timeString,
    timestamp: now.toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Current Time App is running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Current Time App is running on port ${PORT}`);
  console.log(`📍 Manifest: http://localhost:${PORT}/.well-known/ai-plugin.json`);
  console.log(`📍 OpenAPI: http://localhost:${PORT}/openapi.json`);
  console.log(`📍 Time endpoint: http://localhost:${PORT}/time`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
