function renderDashboard(incidents, processedTickets) {

    const dashboard = document.getElementById("output");

    dashboard.innerHTML = `
        <h2>AI Incident Dashboard</h2>
    `;

    for (let incident of incidents) {
        // compare gemini responsed tickets id's with the processedTickets[] id's to find Related tickets
        const relatedTickets = findRelatedTickets(
            incident,
            processedTickets
        );


        dashboard.innerHTML += `
            <div class="incident-card">

                <h3>${incident.incident_name}</h3>

                <p>
                    <b>Tickets :</b>
                    ${incident.tickets.length}
                </p>

                <p>
                    <b>Related Tickets</b>
                </p>

                <ul>

                    ${buildTicketList(relatedTickets)}

                </ul>

                <hr>

            </div>
        `;
    }
}

// compare gemini responsed tickets id's with the processedTickets[] id's to find Related tickets
function findRelatedTickets(incident, processedTickets) {
    const incidentTicketIds = incident.tickets.map(String); // converts id's to strings

    return processedTickets.filter(ticket =>
        incidentTicketIds.includes(String(ticket.id))       // normalize ticket.id too
    );
}

//It converts the related tickets data into clickable 
function buildTicketList(relatedTickets) {
    let html = "";

    for (let ticket of relatedTickets) {
        html += `
            <li>
                <a href="javascript:void(0)" 
                   onclick="openTicket('${ticket.id}')" 
                   style="color:#0070d2; text-decoration:underline; cursor:pointer;">
                    ${ticket.subject}
                </a>
            </li>
        `;
    }

    return html;
}

function openTicket(ticketId) {
    ZOHODESK.invoke("OPEN_TICKET", { ticketId: ticketId })
        .catch(function () {
            // Fallback: open in a new browser tab if SDK navigation fails
            window.open(
                "https://desk.zoho.com/support/ShowHomePage.do#Cases/dv/" + ticketId,
                "_blank"
            );
        });
}

window.openTicket = openTicket;

window.openTicket = openTicket;

window.renderDashboard = renderDashboard;