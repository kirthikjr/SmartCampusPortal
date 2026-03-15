let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const form = document.getElementById("complaintForm");
const list = document.getElementById("complaintList");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const complaint = {
        id: Date.now(),
        name: document.getElementById("name").value,
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value,
        status: "Pending"
    };

    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    form.reset();
    displayComplaints();
});

function displayComplaints(){
    list.innerHTML = "";
    let pending=0, solved=0;

    complaints.forEach(c=>{
        if(c.status==="Pending") pending++;
        if(c.status==="Solved") solved++;

        const card = document.createElement("div");
        card.className="complaint-card";

        card.innerHTML = `
            <h3>${c.title}</h3>
            <p><strong>Student:</strong> ${c.name}</p>
            <p><strong>Category:</strong> ${c.category}</p>
            <p class="priority">Priority: ${c.priority}</p>
            <p>${c.description}</p>

            <select onchange="updateStatus(${c.id}, this.value)">
                <option ${c.status==="Pending"?"selected":""}>Pending</option>
                <option ${c.status==="In Progress"?"selected":""}>In Progress</option>
                <option ${c.status==="Solved"?"selected":""}>Solved</option>
            </select>

            <button onclick="deleteComplaint(${c.id})">Delete</button>

            <span class="badge ${c.status.toLowerCase().replace(' ','')}">
                ${c.status}
            </span>
        `;

        list.appendChild(card);
    });

    document.getElementById("totalCount").innerText = complaints.length;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("solvedCount").innerText = solved;
}

function updateStatus(id, newStatus){
    complaints = complaints.map(c=>{
        if(c.id===id){
            c.status=newStatus;
        }
        return c;
    });
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

function deleteComplaint(id){
    complaints = complaints.filter(c=>c.id!==id);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

displayComplaints();