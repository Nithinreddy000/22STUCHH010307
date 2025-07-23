// logger.js

export async function log(stack, level, pkg, message) {
  // Only allow frontend stack and api package in frontend
  if (stack !== "frontend" || pkg !== "api") {
    console.warn("Invalid stack or package for frontend logging");
    return;
  }
  const payload = { stack, level, package: pkg, message };
  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}