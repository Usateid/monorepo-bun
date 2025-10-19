/**
 * Log di errore
 */
export function errorLog(message: string, error?: any) {
  const timestamp = new Date().toISOString();
  process.stderr.write(`\n[${timestamp}] ❌ ${message}\n`);

  if (error) {
    if (error instanceof Error) {
      process.stderr.write(`  ${error.message}\n`);
      if (error.stack) {
        process.stderr.write(`  ${error.stack}\n`);
      }
    } else {
      process.stderr.write(`  ${JSON.stringify(error, null, 2)}\n`);
    }
  }
}
