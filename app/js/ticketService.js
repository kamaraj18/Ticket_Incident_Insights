async function getRecentTickets() {
  try {

    // Fetched the ticket details
    const response = await ZOHODESK.request({
      url: "https://desk.zoho.com/api/v1/tickets?limit=20&from=0",
      type: "GET",      
      postBody: {},
      connectionLinkName: "deskconnection",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = JSON.parse(response);  // response comes back as a string converted to js object
   
    var response1 = JSON.parse(data.response);
    var tickets = response1.statusMessage.data;
                                 
    var processedTickets = []; //Filterd the raw response to get the required ticket data

    for(let ticket of tickets){
        processedTickets.push({
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        priority: ticket.priority,
        createdTime: ticket.createdTime,
        description: ticket.description || ""
    });
    }

    return processedTickets;  // now usable by the caller
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw err;                          // re-throw so caller can handle it
  }

}

window.getRecentTickets = getRecentTickets; 