const addContactBtn = document.getElementById('add-contact-btn');
const contactForm = document.getElementById('contact-form');
const addContactForm = document.getElementById('add-contact-form');
const contactList = document.getElementById('contact-list');

let contacts = [];

// Fetch contacts from JSON file
fetch('contact.json')
  .then(response => response.json())
  .then(data => {
    contacts = data;
    displayContacts();
  });

// Display contacts in the contact list
function displayContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const contactElement = document.createElement('div');
    contactElement.classList.add('contact');
    contactElement.innerHTML = `
      <h3>${contact.name}</h3>
      <p>${contact.number}</p>
      <p>${contact.email}</p>
      <p>${contact.address}</p>
      <div class="contact-options">
        <button class="view-btn" onclick="viewContact(${index})">View</button>
        <button class="edit-btn" onclick="editContact(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
      </div>
    `;
    contactList.appendChild(contactElement);
  });
}

// Add contact button click event
addContactBtn.addEventListener('click', () => {
  contactForm.style.display = 'block';
});

// Add contact form submit event
addContactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const number = document.getElementById('number').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  contacts.push({ name, number, email, address });
  saveContacts();
  displayContacts();
  contactForm.style.display = 'flex';
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
  alert(`Name: ${contact.name}\nNumber: ${contact.number}\nEmail: ${contact.email}\nAddress: ${contact.address}`);
}













