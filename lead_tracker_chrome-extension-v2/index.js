// javascript
let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const ulEl = document.getElementById('ul-el')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const tabEl = document.getElementById('tab-btn')

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen"}
]

tabEl.addEventListener('click', function(){
    chrome.tabs.query({active:true,lastFocusedWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

inputBtn.addEventListener('click',function(){
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let listItems = ''
    for(let i = 0; i < leads.length; i++){
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
        // listItems += "<li><a href='https://" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
        <li>
            <a href='https://${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>
        `
        
        // const li = document.createElement('li')
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    // ulEl.innerHTML = null;
    render(myLeads)
})