const addContactBtn = document.getElementById('add-contact-btn');
const contactForm = document.getElementById('contact-form');
const addContactForm = document.getElementById('add-contact-form');
const contactList = document.getElementById('contact-list');

let contacts = [];

// Fetched the contacts from JSON file
// Load contacts from JSON file
function loadContacts() {
  fetch('contact.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          contacts = data;
          displayContacts();
      })
      .catch(error => {
          console.error('Error loading contacts:', error);
      });
} 


// Displays contacts in the contact list
function displayContacts() {
  contactList.innerHTML = '';
  
  if (contacts.length === 0) {
    contactList.innerHTML = '<p></p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('contact-table');
  
  // Created table header row
  const headerRow = document.createElement('tr');
  ['Name', 'Number', 'Email', 'Address', 'Action'].forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);

  // Created table rows with contact details
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    ['name', 'number', 'email', 'address'].forEach(key => {
      const cell = document.createElement('td');
      cell.textContent = contact[key];
      row.appendChild(cell);
    });

    // Added options column with buttons
    const optionsCell = document.createElement('td');
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.classList.add('viewbtn');
    viewBtn.addEventListener('click', () => viewContact(index));
    optionsCell.appendChild(viewBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editbtn');
    editBtn.addEventListener('click', () => editContact(index));
    optionsCell.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deletebtn');
    deleteBtn.addEventListener('click', () => deleteContact(index));
    optionsCell.appendChild(deleteBtn);

    row.appendChild(optionsCell);
    table.appendChild(row);
  });

  contactList.appendChild(table);
}

contactForm.style.position = 'fixed';
contactForm.style.top = '60%';
contactForm.style.left = '45%';
contactForm.style.transform = 'translate(-50%, -50%)';
contactForm.style.zIndex = '9999';



// Added contact button click event
addContactBtn.addEventListener('click', () => {
  contactForm.style.display = 'block';
});


// Added contact form submit event
addContactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const number = document.getElementById('number').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  contacts.push({ name, number, email, address });
  saveContacts();
  displayContacts();
  contactForm.style.display = 'none';
  addContactForm.reset();
});


// Save contacts to JSON file
function saveContacts() {
  fetch('contacts.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contacts)
  });
}



// Delete contact
function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  displayContacts();
}

// Edit contact
function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('number').value = contact.number;
  document.getElementById('email').value = contact.email;
  document.getElementById('address').value = contact.address;
  deleteContact(index);
  contactForm.style.display = 'block';
}

// View contact
function viewContact(index) {
  const contact = contacts[index];
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const contactElement = document.createElement('div');
    contactElement.classList.add('contact');
    contactElement.innerHTML = `
      <p> Name : ${contact.name}</p>
      <p> Mobile Number : ${contact.number}</p>
      <p> Email : ${contact.email}</p>
      <p> Address : ${contact.address}</p>
      <div class="contact-options">
        <button class="back-btn" onclick="displayContacts()">Go Back</button>
      </div>
       `;
    contactList.appendChild(contactElement);
  });
}


function redirectToHomePage() {
  window.location.href = "index.html";
}


document.body.style.backgroundImage = "url('images/bg-image.jpeg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";




