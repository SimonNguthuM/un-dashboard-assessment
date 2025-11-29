const statuses = ["active", "inactive" , "on leave"]
const departments = ["Engineering", "HR", "Sales"]

const tableBody = document.getElementById("tableBody")

const totalEmployeesEl = document.getElementById("totalEmployees")
const activeEmployeesEl = document.getElementById("activeEmployees")
const avgSalaryEl = document.getElementById("avgSalary")
const deptCountEl = document.getElementById("deptCount")

const statusFilter = document.getElementById("statusFilter")
const departmentFilter = document.getElementById("departmentFilter")

// function to generate a random number between two give numbers
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function showError(message) {
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center; color:red;">${message}</td>
        </tr>
    `;
}

async function fetchUserData() {
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
        renderTable(employeeData)
    }
    catch (error){
        showError("Failed!")
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
                <td>${emp.department}</td>
                <td>${emp.status}</td>
                <td>${emp.joinDate}</td>
                <td>${emp.salaryRange}</td>
            </tr>
        `
        tableBody.innerHTML += row
    })
}

renderTable(employeeData.slice(0, 10))

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

updateSummaryCards(employeeData)

function filterTable() {
    const selectedStatus = statusFilter.value
    const selectedDepartment = departmentFilter.value

    let filteredData = employeeData

    if (selectedStatus !== "all") {
        filteredData = filteredData.filter(emp => emp.status === selectedStatus)
    }

    if (selectedDepartment !== "all") {
        filteredData = filteredData.filter(emp => emp.department === selectedDepartment)
    }

    renderTable(filteredData)
}

statusFilter.addEventListener("change", filterTable)
departmentFilter.addEventListener("change", filterTable)

fetchUserData()