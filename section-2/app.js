const statuses = ["active", "inactive" , "on leave"]
const departments = ["Engineering", "HR", "Sales"]

const tableBody = document.getElementById("tableBody")

const totalEmployeesEl = document.getElementById("totalEmployees")
const activeEmployeesEl = document.getElementById("activeEmployees")
const avgSalaryEl = document.getElementById("avgSalary")
const deptCountEl = document.getElementById("deptCount")

const statusFilter = document.getElementById("statusFilter")

const fetchTimeEl = document.getElementById("fetchTime")

const searchInput = document.getElementById("searchInput")
const sortBy = document.getElementById("sortBy")
const locationFilter = document.getElementById("locationFilter")

const clearFiltersBtn = document.getElementById("clearFilters")
const resultsCount = document.getElementById("resultsCount")

const cityCanvas = document.getElementById("cityChart")
const chartLegend = document.getElementById("chartLegend")

// function to generate a random number between two give numbers
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

let employeeData = []

function showError(message) {
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center; color:red;">${message}</td>
        </tr>
    `;
}

function showLoading () {
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center; font-style:italic;">Loading data...</td>
        </tr>
    `
}

async function fetchUserData() {
    showLoading()
    const startTime = performance.now()
    try {
        const response = await fetch ("https://jsonplaceholder.typicode.com/users")
        if(!response.ok) throw new Error ("Failed to fetch")
        const users = await response.json()

        employeeData = users.map(user => {
            const salaryMin = getRandomInt(30000, 50000)
            const salaryMax = getRandomInt(51000, 100000) 
            
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                department: user.company.name,
                location: user.address.city,
                status: statuses[getRandomInt(0, statuses.length-1)],
                joinDate: `2023-${getRandomInt(1, 12).toString().padStart(2, '0')}-${getRandomInt(1, 31).toString().padStart(2, '0')}`,
                salaryRange: `$${salaryMin} - $${salaryMax}`
            }
        })

        const locations = [...new Set(employeeData.map(emp => emp.location))]

        locationFilter.innerHTML = locations.map(loc => `
            <label>
                <input type="checkbox" value="${loc}" class="location-checkbox">
                ${loc}
            </label><br>
        `).join("")

        renderTable(employeeData)
        updateSummaryCards(employeeData)  

        const endTime = performance.now()
        const duration = (endTime - startTime).toFixed(2)
        fetchTimeEl.innerHTML = `api fetch time: ${duration}ms`
    }
    catch (error){
        showError("Failed! Please check console")
        console.error(error)
    }
}

function renderTable (data) {
    tableBody.innerHTML = "" /*clear any existing content to avoid duplicates*/

    data.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.status}</td>
                <td>${emp.joinDate}</td>
                <td>${emp.salaryRange}</td>
            </tr>
        `
        tableBody.innerHTML += row
    })
}

function updateSummaryCards (data){
    const totalEmployees = data.length 

    const activeEmployees = data.filter(emp => emp.status === "active").length

    const avgSalary = Math.round(
        data.reduce((sum, emp) => {
            const [min, max] = emp.salaryRange
                .replace(/\$/g,'')
                .split('-')
                .map(Number)
            return sum + (min + max)/2
        }, 0) / data.length
    )

    const deptCount = new Set(data.map(emp => emp.department)).size
    
    totalEmployeesEl.textContent = totalEmployees
    activeEmployeesEl.textContent = activeEmployees
    avgSalaryEl.textContent = `$${avgSalary}`
    deptCountEl.textContent = deptCount
}

function filterTable() {
    // Status filter
    let filteredData = [...employeeData]

    const selectedStatus = statusFilter.value
    if (selectedStatus !== "all") {
        filteredData = filteredData.filter(emp => emp.status === selectedStatus)
    }

    // filter using searchbar
    const query = searchInput.value.toLowerCase()
    if (query.trim() !== ""){
        filteredData = filteredData.filter(emp => 
            emp.name.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query)
        )
    }

    // filter using sort
    const sortType = sortBy.value
    if (sortType === "az") {
        filteredData.sort((a, b) => a.name.localeCompare(b.name))
    }
    else if (sortType === "za") {
        filteredData.sort((a, b) => b.name.localeCompare(a.name))
    }

    // filter using location
    const checkedLocations = [...document.querySelectorAll(".location-checkbox:checked")].map(cb => cb.value) 
    if (checkedLocations.length > 0) {
        filteredData = filteredData.filter(emp => checkedLocations.includes(emp.location))
    }

    resultsCount.textContent = `${filteredData.length} results found`

    renderTable(filteredData)
    const cityData = getCityData(filteredData)
    renderCityChart(cityData)
}

function clearAllFilters() {
    statusFilter.value = "all"
    searchInput.value = ""
    sortBy.value = "none"
    document.querySelectorAll(".location-checkbox").forEach(cb => cb.checked = false)

    // re-render original table
    renderTable(employeeData);
    updateSummaryCards(employeeData)
}

function getCityData(data) {
    const result = {};
    data.forEach(emp => {
        result[emp.location] = (result[emp.location] || 0) + 1;
    });
    return result;
}

function renderCityChart (data) {
    const container = document.querySelector(".chart-container")
    container.innerHTML = ""

    const vals = Object.values(data)
    const max = vals.length ? Math.max(...vals) : 0

    for (const city in data) {
        const value = data[city]
        const percentage = max > 0? (value / max) * 100 : 0 

        const row = `
            <div class="chart-row">
                <span class="chart-label">${city}</span>
                <div class="chart-bar" style="width:${percentage}%"></div>
                <span class="chart-value">${value}</span>
            </div>
        `

        container.innerHTML += row
    }
}


// Event listeners for sidebar filters
statusFilter.addEventListener("change", filterTable)
searchInput.addEventListener("input", filterTable)
sortBy.addEventListener("change", filterTable)
locationFilter.addEventListener("change", filterTable)
clearFiltersBtn.addEventListener("click", clearAllFilters);

fetchUserData()