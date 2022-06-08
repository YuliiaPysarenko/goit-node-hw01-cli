const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts () {
    const dataString = await fs.readFile(contactsPath, 'utf8');
    const data = JSON.parse(dataString);
    return data;
}
// listContacts().then(value => console.log(value));

async function getContactById (contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId.toString());
    return contact ? contact : null;
}
// getContactById('48bd1cd8-72ca-42cc-8457-156bb8c30873').then(value => console.log(value));

async function removeContact (contactId) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId.toString());

    const deletedContact = allContacts[index];
    if(index !== -1) {
        allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deletedContact ? deletedContact : null;
}

// deleteById(
//     'cf050c0e-3bac-4a51-9557-58e4b7fe3359');

async function addContact (name, email, phone) {
    const newContact = {
        id: uuidv4(),
        name, 
        email, 
        phone
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}
// addContact(4500, 'mango');

module.exports = {
    getContactById, listContacts, removeContact, addContact
}