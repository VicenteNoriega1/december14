// ChatGPT App using OpenAI Apps SDK
// Implements a tool to get the current time

/**
 * Tool: get_current_time
 * Returns the current time in ISO 8601 format from the system clock
 */
export function get_current_time() {
  const currentTime = new Date().toISOString();
  return {
    time: currentTime
  };
}

// Tool handler for the Apps SDK
export async function handleToolCall(toolName, parameters) {
  if (toolName === 'get_current_time') {
    return get_current_time();
  }
  throw new Error(`Unknown tool: ${toolName}`);
}

// Demo function to show the tool working
export function demo() {
  console.log('ChatGPT Time App - OpenAI Apps SDK');
  console.log('===================================\n');
  console.log('Tool: get_current_time');
  console.log('Description: Returns the current time in ISO 8601 format\n');
  
  const result = get_current_time();
  console.log('Result:', JSON.stringify(result, null, 2));
  console.log('\nThe tool is ready to be used by ChatGPT!');
}

// Run demo if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}
