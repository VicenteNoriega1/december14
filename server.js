import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import express from 'express';

// Create Express app
const app = express();
app.use(express.json());

// Helper function to get current time
function getCurrentTime() {
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
  return {
    current_time: timeString,
    timestamp: now.toISOString()
  };
}

// Create MCP Server with tool definitions
const server = new McpServer({
  name: 'time-app',
  version: '1.0.0',
});

// Register the get_current_time tool
server.tool(
  'get_current_time',
  'Get the current date and time. Use this when the user asks what time it is, what the date is, or for the current time.',
  {},  // No input parameters needed
  async () => {
    const timeData = getCurrentTime();
    return {
      content: [
        {
          type: 'text',
          text: `The current time is: ${timeData.current_time}\n\nTimestamp: ${timeData.timestamp}`,
        },
      ],
    };
  }
);

// Serve a simple homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Current Time ChatGPT App</title>
      <style>
        body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; line-height: 1.6; }
        h1 { color: #10a37f; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
        .section { margin: 30px 0; }
        .endpoint { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>🕒 Current Time ChatGPT App</h1>
      <p>A simple beginner-friendly ChatGPT app built with the OpenAI Apps SDK (Model Context Protocol).</p>
      
      <div class="section">
        <h2>What This App Does</h2>
        <p>This app provides a <code>get_current_time</code> tool that returns the current date and time when asked.</p>
      </div>

      <div class="section">
        <h2>MCP Endpoints</h2>
        <div class="endpoint">
          <strong>POST</strong> <code>/mcp</code> - Main MCP endpoint for tool discovery and execution
        </div>
        <div class="endpoint">
          <strong>GET</strong> <code>/health</code> - Health check endpoint
        </div>
      </div>

      <div class="section">
        <h2>How to Connect to ChatGPT</h2>
        <ol>
          <li>Make sure this app is publicly accessible (use ngrok for local testing)</li>
          <li>In ChatGPT, go to Settings > Apps</li>
          <li>Click "Connect app"</li>
          <li>Enter your app's MCP endpoint URL: <code>${req.protocol}://${req.get('host')}/mcp</code></li>
          <li>ChatGPT will discover the available tools and start using them!</li>
        </ol>
      </div>

      <div class="section">
        <h2>Try It Now</h2>
        <p>Current time: <strong id="time"></strong></p>
        <script>
          document.getElementById('time').textContent = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
          });
        </script>
      </div>
    </body>
    </html>
  `);
});

// MCP endpoint for ChatGPT Apps
app.post('/mcp', express.json(), async (req, res) => {
  try {
    // Handle MCP requests through the server
    if (req.body.method === 'tools/list') {
      const response = await server.request(req.body, null);
      return res.json(response);
    } else if (req.body.method === 'tools/call') {
      const response = await server.request(req.body, null);
      return res.json(response);
    } else if (req.body.method === 'initialize') {
      return res.json({
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'time-app',
          version: '1.0.0',
        },
      });
    }
    
    res.status(404).json({ error: 'Method not found' });
  } catch (error) {
    console.error('Error handling MCP request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Current Time ChatGPT App is running',
    mcp_endpoint: '/mcp'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Current Time ChatGPT App is running!`);
  console.log(`📍 Homepage: http://localhost:${PORT}`);
  console.log(`📍 MCP endpoint: http://localhost:${PORT}/mcp`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  console.log(`\n💡 To connect from ChatGPT, use the MCP endpoint URL above`);
});
