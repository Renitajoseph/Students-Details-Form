// script.js
// Sample student data
let students = [
    {
        id: 'S001',
        name: 'John Smith',
        age: 20,
        email: 'john@example.com',
        phone: '123-456-7890',
        gender: 'Male',
        course: 'Computer Science',
        address: '123 Main St, New York',
        status: 'Active'
    },
    {
        id: 'S002',
        name: 'Emma Johnson',
        age: 22,
        email: 'emma@example.com',
        phone: '987-654-3210',
        gender: 'Female',
        course: 'Business Administration',
        address: '456 Park Ave, Los Angeles',
        status: 'Active'
    },
    {
        id: 'S003',
        name: 'Michael Brown',
        age: 21,
        email: 'michael@example.com',
        phone: '555-123-4567',
        gender: 'Male',
        course: 'Electrical Engineering',
        address: '789 Oak St, Chicago',
        status: 'Inactive'
    }
];

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const totalStudentsEl = document.getElementById('totalStudents');
const activeStudentsEl = document.getElementById('activeStudents');
const inactiveStudentsEl = document.getElementById('inactiveStudents');

// Initialize the application
function init() {
    renderStudentTable();
    updateStatistics();

    // Form submission
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const student = {
            id: document.getElementById('studentId').value,
            name: document.getElementById('fullName').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
            course: document.getElementById('course').value,
            address: document.getElementById('address').value,
            status: document.getElementById('status').value
        };

        // Check if we're editing an existing student
        const existingIndex = students.findIndex(s => s.id === student.id);

        if (existingIndex !== -1) {
            // Update existing student
            students[existingIndex] = student;
        } else {
            // Add new student
            students.push(student);
        }

        renderStudentTable();
        updateStatistics();
        studentForm.reset();
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        renderStudentTable();
    });
}

// Render the student table
function renderStudentTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.course.toLowerCase().includes(searchTerm)
    );

    if (filteredStudents.length === 0) {
        emptyState.style.display = 'block';
        studentTableBody.innerHTML = '';
    } else {
        emptyState.style.display = 'none';
        studentTableBody.innerHTML = filteredStudents.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="font-bold">${student.name}</div>
                    <div class="text-sm text-gray-500">${student.gender}</div>
                </td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td><span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span></td>
                <td class="action-cell">
                    <button class="btn-action edit" onclick="editStudent('${student.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteStudent('${student.id}')" title="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Edit student
function editStudent(studentId) {
    const student = students.find(s => s.id === studentId);

    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('gender').value = student.gender;
        document.getElementById('course').value = student.course;
        document.getElementById('address').value = student.address;
        document.getElementById('status').value = student.status;

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Delete student
function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.id !== studentId);
        renderStudentTable();
        updateStatistics();
    }
}

// Update statistics
function updateStatistics() {
    totalStudentsEl.textContent = students.length;
    activeStudentsEl.textContent = students.filter(s => s.status === 'Active').length;
    inactiveStudentsEl.textContent = students.filter(s => s.status === 'Inactive').length;
}

// Initialize the app when the page loads
window.onload = init;