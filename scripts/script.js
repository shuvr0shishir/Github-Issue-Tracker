// home functionalities
let allIssues = []
let openIssues = []
let closedIssues = []

// current tab
let currentTab = 'all-tab';

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

    const issue = details.data
    issue && displayIssueDetails(issue)
}


// modal - issue pop up
function displayIssueDetails(i) {
    const issueDetails = getById('issue-details');
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

    getById('issue-modal').showModal();
}


// modal - new issue post
function displayIssueForm() {
    getById('issue-post-modal').showModal();

    const issueInputBox = getById('issue-input-box');
    issueInputBox.innerHTML = `
    <form id="issue-form" class="space-y-3">
            <!-- Title -->
            <div>
                <label class="font-medium">Title</label>
                <input id="new-title" type="text" name="title" placeholder="Enter issue title" class="input input-bordered outline-none w-full"
                    required>
            </div>

            <!-- Description -->
            <div>
                <label class="font-medium">Description</label>
                <textarea id="new-description" name="description" placeholder="Enter issue description"
                    class="textarea textarea-bordered outline-none w-full" required></textarea>
            </div>

            <!-- Labels -->
            <div>
                <label class="font-medium">Labels</label>
                <div id="new-labels" class="grid grid-cols-2 gap-1">
                    <label><input type="checkbox" value="bug"> Bug</label>
                    <label><input type="checkbox" value="good first issue"> Good First Issue</label>
                    <label><input type="checkbox" value="enhancement"> Enhancement</label>
                    <label><input type="checkbox" value="help wanted"> Help Wanted</label>
                    <label><input type="checkbox" value="documentation"> Documentation</label>
                </div>
            </div>

            <!-- Priority -->
            <div>
                <label class="font-medium">Priority</label>
                <select id="new-priority" name="priority" class="select select-bordered outline-none w-full">
                    <option disabled selected hidden>Choose priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <!-- Status -->
            <div>
                <label class="font-medium">Status</label>
                <select id="new-status" name="status" class="select select-bordered outline-none w-full">
                    <option disabled selected hidden>Choose status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
            </div>


            <!-- Author -->
            <div>
                <label class="font-medium">Author</label>
                <input id="new-author" type="text" name="author" placeholder="Enter author name" class="input input-bordered outline-none w-full">
            </div>

            <!-- Assignee -->
            <div>
                <label class="font-medium">Assignee</label>
                <input id="new-assignee" type="text" name="assignee" placeholder="Assign to someone" class="input input-bordered outline-none w-full">
            </div>
        </form>`;
    // onclick handler on post btn in html onclick="issueMaker()"
}

// new issue maker
function issueMaker() {
    // for multiple labels 
    const selectedLabels = document.querySelectorAll('#new-labels input:checked');
    let labels = [...selectedLabels];
    labels = labels.map(el => el.value);

    // making data object with form data
    const newIssue = {
        id: allIssues.length + 1,
        title: getById("new-title").value,
        description: getById("new-description").value,
        labels: labels,
        priority: getById("new-priority").value,
        status: getById("new-status").value,
        author: getById("new-author").value,
        assignee: getById("new-assignee").value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // after making data object it push as array first element
    allIssues.unshift(newIssue);
    if (newIssue.status === "open") {
        openIssues.unshift(newIssue);
    } else if (newIssue.status === "closed") {
        closedIssues.unshift(newIssue);
    }

    // current tab refresh
    refresh()
    toggle(currentTab)
}


// start from here ---------------------------------------------------------------------------------------->
async function loadIssues() {
    Loading(true)
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()

    allIssues = data.data;
    openIssues = allIssues.filter(i => i.status === "open");
    closedIssues = allIssues.filter(i => i.status === "closed");

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


    // issue card generating
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


// refresh current tab
function refresh() {
    Loading(true)
    setTimeout(() => {
        Loading(false)
    }, 300);

    if (currentTab === 'all-tab') {
        displayIssues(allIssues);
    } else if (currentTab === 'open-tab') {
        displayIssues(openIssues);
    } else if (currentTab === 'close-tab') {
        displayIssues(closedIssues);
    }

    // clear search input
    searchTxt.value = '';
}


// allTab - click event handler
const allTab = getById('all-tab');
allTab.addEventListener('click', () => {
    currentTab = 'all-tab';
    toggle('all-tab')
    refresh()
});


// openTab - click event handler
const openTab = getById('open-tab');
openTab.addEventListener('click', () => {
    currentTab = 'open-tab';
    toggle('open-tab')
    refresh()
});


// closeTab - click event handler
const closeTab = getById('close-tab');
closeTab.addEventListener('click', () => {
    currentTab = 'close-tab';
    toggle('close-tab')
    refresh()
});


// search 
const searchBtn = getById('search-btn');
const searchTxt = getById('search-txt');

async function searchFunctionality(e) {
    if (searchTxt.value.trim() === '') {
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
}

// search btn click event handler
searchBtn.addEventListener('click', searchFunctionality)

// search - enter btn event handler
searchTxt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchFunctionality();
    }
});


// new issue - click event handler
const newIssueBtn = getById('new-issue-btn');
newIssueBtn.addEventListener('click', () => {
    displayIssueForm()
})


// done by dev shishir bhai ;)