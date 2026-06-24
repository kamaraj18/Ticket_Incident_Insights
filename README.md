# Ticket Incident Insights

**Ticket Incident Insights** is an AI-powered Zoho Desk extension that helps support teams identify recurring issues by automatically grouping related support tickets into meaningful incidents. It uses Google's Gemini Large Language Model (LLM) to understand the context of ticket subjects instead of relying on predefined keywords, making incident detection more accurate and adaptable across different business domains.

---

## Features

* Detects recurring incidents using Google Gemini AI.
* Groups similar support tickets into a single incident.
* Displays AI-generated incidents in a dashboard.
* Shows related tickets for each detected incident.
* Opens related tickets directly in Zoho Desk.

---

## Tech Stack

| Technology                   | Purpose                         |
| ---------------------------- | ------------------------------- |
| Zoho Desk                    | Extension Platform              |
| Zoho Desk JavaScript SDK     | Platform Integration            |
| Zoho Desk REST APIs          | Fetch Recent Tickets            |
| Google Gemini 2.5 Flash API  | AI-Based Incident Detection     |
| Google AI Studio             | API Key Management              |
| JavaScript (ES6)             | Application Logic               |
| HTML5                        | User Interface                  |
| CSS3                         | Styling                         |
| ZET (Zoho Extension Toolkit) | Extension Development & Testing |

---

## Installation

This project is currently available as a **private Zoho Desk extension** developed for internship evaluation purposes.

**Extension Installation Link**

https://desk.zoho.com/installExtension?extensionId=e852a23c-4bce-4d61-92e8-5098b2f45f98&version=1.0&hash=47b770b0a18db010d659ebe02897acfaeffc25a378a5cc6bf6fda73cdec5a30e

---

## Using the Extension

1. Open the widget Zoho Desk.
2. The extension automatically retrieves recent support tickets.
3. Ticket information is analyzed using Google Gemini.
4. Similar tickets are grouped into incidents.
5. Review the generated incident dashboard.
6. Click any related ticket to open its detail page in Zoho Desk.

---

## Project Structure

```text
app/
│
├── widget.html
│
├── js/
│   ├── extension.js
│   ├── ticketService.js
│   ├── geminiService.js
│   └── dashboard.js
│
├── plugin-manifest.json
```

---

## Future Improvements

* Generate AI-based root cause summaries for detected incidents.
* Suggest relevant Knowledge Base articles based on incident type.

