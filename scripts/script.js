// home functionalities
let allIssues = []
let openIssues = []
let closedIssues = []


// tab toggle
function toggle(id) {
    const allBtns = document.querySelectorAll('.tab-btns');
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary');
    })
    const clickedBtn = getById(id);
    clickedBtn.classList.add('btn-primary');
}


// loading 
function Loading(status) {
    if (status) {
        getById('spinner').classList.remove('hidden')
        getById('issues-box').classList.add('hidden')
    } else {
        getById('spinner').classList.add('hidden')
        getById('issues-box').classList.remove('hidden')
    }
}


// modal - fetching
async function loadIssueDetails(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json()

    displayIssueDetails(details.data);
}


// modal - issue pop up
function displayIssueDetails(i) {
    const issueDetails = getById('issue-details');

    // "status": "success",
    // "message": "Issue fetched successfully",
    // "data": {
    // "id": 33,
    // "title": "Add bulk operations support",
    // "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
    // "status": "open",
    // "labels": [
    // "enhancement"
    // ],
    // "priority": "low",
    // "author": "bulk_barry",
    // "assignee": "",
    // "createdAt": "2024-02-02T10:00:00Z",
    // "updatedAt": "2024-02-02T10:00:00Z"
    // }

    issueDetails.innerHTML = `<div>
                        <h2 class="text-[#1F2937] font-bold text-2xl mb-2">${i.title}</h2>
                        <div class="flex gap-2 items-center">
                            <div class="badge ${i.status === "open" ? "badge-opened" : "badge-closed"} font-medium rounded-xl p-2">${i.status === "open" ? "Opened" : "Closed"}</div>
                            <div class="w-[5px] h-[5px] rounded-full bg-[#64748B]"></div>
                            <p class="">Opened by ${i.author ? i.author : "N/A"}</p>
                            <div class="w-[5px] h-[5px] rounded-full bg-[#64748B]"></div>
                            <p class="issue-updatedAt">${dateFormatter(i.updatedAt)}</p>
                        </div>
                    </div>
                    <div class="issue-labels flex flex-wrap gap-1">
                        ${labelMaker(i.labels)}
                    </div>
                    <p class="issue-description text-[#64748B]">${i.description}</p>
                    <div class="bg-[#F8FAFC] rounded-xl p-4 grid grid-cols-2 gap-2.5">
                        <div class="space-y-1">
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="font-semibold text-[#1F2937]">${i.assignee ? i.assignee : "N/A"}</p>
                        </div>
                        <div class="space-y-1">
                            <p class="text-[#64748B]">Priority:</p>
                            <div class="issue-priority ${priorityCheck(i.priority)} badge font-medium w-20 rounded-xl">
                                ${i.priority.toUpperCase()}</div>
                        </div>
                    </div>`;

    getById('issue_modal').showModal();
}


// issues load from here ----->
async function loadIssues() {
    Loading(true)
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    allIssues = data.data;

    // open issues
    allIssues.forEach(i => {
        if (i.status === "open") {
            openIssues.push(i);
        }
    })

    // closed issue
    allIssues.forEach(i => {
        if (i.status === "closed") {
            closedIssues.push(i);
        }
    })

    // first display call
    displayIssues(allIssues)
    Loading(false)
}


//load issues for the first call
loadIssues()


// Conditional Rendering Functions
function priorityCheck(para) {
    if (para === "high") {
        return 'badge-error';
    } else if (para === "medium") {
        return 'badge-warning';
    } else if (para === "low") {
        return 'badge-normal';
    }
}

function labelMaker(nodeList) {
    let labels = [];
    nodeList.forEach(i => {
        if (i === "bug") {
            labels.push(`<div class="badge-error badge badge-outline  rounded-xl font-medium">
                <i class="fa-solid fa-bug"></i>${i.toUpperCase()}
            </div>`);
        } else if (i === "enhancement") {
            labels.push(`<div class="badge-success  badge badge-outline  rounded-xl font-medium">
                <i class="fa-regular fa-star"></i>${i.toUpperCase()}
            </div>`);
        } else if (i === "help wanted") {
            labels.push(`<div class="badge-warning  badge badge-outline  rounded-xl font-medium">
                <i class="fa-regular fa-life-ring"></i>${i.toUpperCase()}
            </div>`);
        } else if (i === "good first issue") {
            labels.push(`<div class="badge-good  badge badge-outline  rounded-xl font-medium">
                <i class="fa-solid fa-circle-exclamation"></i>${i.toUpperCase()}
            </div>`);
        } else if (i === "documentation") {
            labels.push(`<div class="badge-doc  badge badge-outline  rounded-xl font-medium">
                <i class="fa-regular fa-file-lines"></i>${i.toUpperCase()}
            </div>`);
        }
    });
    labels = labels.join(' ');
    return labels;
}

function dateFormatter(dateString) {
    return new Date(dateString).toLocaleDateString('en-US');
}


// card rendering function
function displayIssues(selectedTab) {
    // update issues count
    const issuesCount = getById('issues-count')
    issuesCount.innerHTML = selectedTab.length;

    const issuesContainer = getById('issues-container')
    issuesContainer.innerHTML = ''

    //Data Info----------->
    // "id": 1,
    // "title": "Fix navigation menu on mobile devices",
    // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    // "status": "open",
    // "labels": [
    // "bug",
    // "help wanted"
    // ],
    // "priority": "high",
    // "author": "john_doe",
    // "assignee": "jane_smith",
    // "createdAt": "2024-01-15T10:30:00Z",
    // "updatedAt": "2024-01-15T10:30:00Z"

    /* issue card generating */
    selectedTab.forEach(i => {
        const issueCard = document.createElement('div');
        issueCard.className = `issue-card ${i.status === "open" ? "status-open" : "status-closed"} rounded-md shadow-md`     //card status border top
        issueCard.innerHTML = `
        <div onclick="loadIssueDetails(${i.id})" class="space-y-3 border-b border-gray-200  p-4">
        <div class="flex justify-between">
            <img class="issue-status" src="./assets/${i.status === "open" ? "status-open" : "status-closed"}.png" alt="">
                <div class="issue-priority ${priorityCheck(i.priority)} badge badge-soft font-medium w-20 rounded-xl">${i.priority.toUpperCase()}</div>
        </div>
        <h2 class="issue-title font-semibold ">${i.title}</h2>
        <p class="issue-description text-[#64748B] text-[14px] line-clamp-2">${i.description}</p>
        <div class="issue-labels flex flex-wrap gap-1">
            ${labelMaker(i.labels)}
        </div>
    </div>
    <div class="space-y-2 p-4 text-[#64748B] text-[12px]">
        <div class="flex justify-between">
            <p class="issue-author">Author: ${i.author ? i.author : "N/A"}</p>
            <p class="issue-createdAt">Created: ${dateFormatter(i.createdAt)}</p>
        </div>
        <div class="flex justify-between">
            <p class="issue-assignee">Assignee: ${i.assignee ? i.assignee : "N/A"}</p>
            <p class="issue-updatedAt">Updated: ${dateFormatter(i.updatedAt)}</p>
        </div>
    </div> `;

        issuesContainer.appendChild(issueCard);
    })
}


// allTab - click event handler
const allTab = getById('all-tab');
allTab.addEventListener('click', () => {
    toggle('all-tab')

    Loading(true)
    setTimeout(() => {
        Loading(false)
    }, 300);

    displayIssues(allIssues);
});


// openTab - click event handler
const openTab = getById('open-tab');
openTab.addEventListener('click', () => {
    toggle('open-tab')

    Loading(true);
    setTimeout(() => {
        Loading(false)
    }, 300);

    displayIssues(openIssues);
    
});


// closeTab - click event handler
const closeTab = getById('close-tab');
closeTab.addEventListener('click', () => {
    toggle('close-tab')

    Loading(true)
    setTimeout(() => {
        Loading(false)
    }, 300);
    
    displayIssues(closedIssues);
});


// search - click event handler
const searchBtn = getById('search-btn');
searchBtn.addEventListener('click', async () => {
    const searchTxt = getById('search-txt');
    if (searchTxt.value === '') {
        alert('Enter some word!');
        return
    }

    Loading(true);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchTxt.value}`);
    const data = await res.json()
    const searchResult = data.data;

    // tab highlight remove
    const allBtns = document.querySelectorAll('.tab-btns');
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary');
    })

    displayIssues(searchResult);
    Loading(false)
})

// done by dev shishir bhai ;)