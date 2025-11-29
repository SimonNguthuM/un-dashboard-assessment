const statuses = ["active", "inactive" , "on leave"]
const departments = ["Engineering", "HR", "Sales"]

const tableBody = document.getElementById("tableBody")

const totalEmployeesEl = document.getElementById("totalEmployees")
const activeEmployeesEl = document.getElementById("activeEmployees")
const avgSalaryEl = document.getElementById("avgSalary")
const deptCountEl = document.getElementById("deptCount")

// function to generate a random number between two give numbers
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function generateEmployees (num) {
    const employees = []

    for(let i = 1; i <= num; i++) {
        const salaryMin = getRandomInt(30000, 50000)
        const salaryMax = getRandomInt(51000, 100000)

        // generate an employee record template for each employee
        const employee = {
            id: i,
            name: `Employee ${i}`,
            department: departments[getRandomInt(0, departments.length-1)],
            status: statuses[getRandomInt(0, statuses.length-1)],
            joinDate: `2025-${getRandomInt(1, 12).toString().padStart(2, '0')}-${getRandomInt(1, 30).toString().padStart(2, '0')}`,
            salaryRange: `${salaryMin}-${salaryMax}`
        }
        employees.push(employee)
    }
    return employees
}
const employeeData = generateEmployees (50)

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
    activeEmployeesEl.textContent = activeEmployees;
    avgSalaryEl.textContent = `$${avgSalary}`;
    deptCountEl.textContent = deptCount;
}

updateSummaryCards(employeeData)