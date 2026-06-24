function buildIncidentPrompt(processedTickets) {
    let prompt = `You are an AI Incident Detection Engine.
Analyze the following support tickets and group similar ones into incidents.

You MUST return ONLY a valid JSON array with NO extra text, no markdown, no explanation.
Each element in the array MUST follow this exact schema:
{
  "incident_name": "string (a short meaningful incident title)",
  "incident_summary": "string (1-2 sentence description of the issue pattern)",
  "severity": "low" | "medium" | "high",
  "tickets": ["ticketId1", "ticketId2"]
}

Example output:
[
  {
    "incident_name": "Login Page Errors",
    "incident_summary": "Multiple users unable to log in due to authentication failures.",
    "severity": "high",
    "tickets": ["123456", "123457"]
  }
]

Tickets:`;

    for (let ticket of processedTickets) {
        prompt += `
Ticket ID: ${ticket.id}
Subject: ${ticket.subject}
`;
    }

    prompt += `\nReturn ONLY the JSON array. No markdown. No explanation.`;
    return prompt;
}


async function callGemini(prompt) {
    const API_KEY = CONFIG.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    };


    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    const result = await response.json(); //raw response to js object

    const responseText = result.candidates[0].content.parts[0].text;

    const jsonString = extractJson(responseText);

    const incidents = parseGeminiResponse(jsonString);
    
    return incidents;
}


function extractJson(responseText) {
    let cleanText = responseText.replace("```json", "");
    cleanText = cleanText.replace("```", "");
    return cleanText.trim();
}


// Normalizes Gemini's response to a consistent shape regardless of key naming drift
function normalizeIncidents(raw) {
    // Handle if Gemini wraps array in an object like { incidents: [...] }
    const list = Array.isArray(raw) ? raw : (raw.incidents || raw.data || []);

    return list.map(function (item, index) {
        return {
            incident_name:    item.incident_name    || item.incidentName || item.name     || ("Incident " + (index + 1)),
            incident_summary: item.incident_summary || item.summary      || item.description || "",
            severity:         item.severity         || "medium",
            // Normalize all ticket IDs to strings for safe comparison in dashboard.js
            tickets: (item.tickets || item.ticket_ids || item.ticketIds || []).map(String)
        };
    });
}


function parseGeminiResponse(jsonString) {
    const raw = JSON.parse(jsonString);
    return normalizeIncidents(raw);
}


window.buildIncidentPrompt = buildIncidentPrompt;
window.extractJson = extractJson;