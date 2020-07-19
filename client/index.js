
document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => {console.log(data);loadHTMLTable(data['data']);});
    console.log('loadeddd');
    //loadHTMLTable([]);
});
console.log("yesssssss");


document.querySelector('table tbody').addEventListener('click', function(event){
    console.log(event.target);
    if(event.target.className ==="delete-row-btn"){
        deleteRowById(event.target.dataset.id);
    }
    if(event.target.class === "edit-row-btn"){
        editRowById(event.target.dataset.id)
    }
});

function deleteRowById(id){
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.success){
            //location.reload();
        }
    });
}


function editRowById(id){
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
}

const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick=function(){
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value="";
    
    fetch('http://localhost:5000/insert', {
        headers:{
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => {console.log(data);insertRowIntoTable(data['data'])});
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');
    console.log(data);
    let tableHtml = "<tr>";

    for(var key in data){
        console.log(data[key]);
        if(data.hasOwnProperty(key)){
            if(key == 'date'){
                data[key] = new Date(data[key]).toLocaleString();     
            }
            tableHtml += `<td> ${data[key]}</td>`;
        }
    }
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit></td>`;

    tableHtml += "</tr>";

    if(isTableData){
        table.innerHTML=tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML= tableHtml;
    }

}

let loadHTMLTable = (data)=>{
    const table= document.querySelector('table tbody');
   //console.log(data[1]);

    if(data.length==0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return 0;
    }

    let tableHtml = "";
    data.forEach(function({id, Name, date}){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${new Date(date).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete></td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Edit></td>`;
        tableHtml +="</tr>";

    });
    table.innerHTML = tableHtml;

}
