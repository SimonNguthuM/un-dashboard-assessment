const statuses = ["active", "inactive" , "on leave"]
const departments = ["Engineering", "HR", "Sales"]

// function to generate a random number between two give numbers
const getRandomInt = (min, max) => Math.floor(Math.random * (max - min + 1) + min)

function generateEmployees (num) {
    const employees = []

    for(let i = 1; i <= num; i++) {
        const salaryMin = getRandomInt(30000, 50000)
        const salaryMax = getRandomInt(51000, 100000)

        // generate an employee record template for each employee
        const employee = {
            ID: i,
            Name: `Employee ${i}`,
            Department: getRandomInt(0, departments.length-1),
            Status: getRandomInt(0, statuses.length-1),
            JoinDate: `2025-${getRandomInt(1, 12).toString().padStart(2, '0')}-${getRandomInt(1, 30).toString().padStart(2, '0')}`,
            SalaryRange: `${salaryMin}-${salaryMax}`
        }
        employees.push(employee)
    }
    return employees
}
