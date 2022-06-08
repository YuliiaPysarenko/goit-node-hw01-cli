const {getContactById, listContacts, removeContact, addContact} = require('./contacts');

// index.js
const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const data = await listContacts();
        console.table(data);
      break;

    case "get":
        const contact = await getContactById(id);
        console.table(contact);
      break;

    case "add":
        await addContact(name, email, phone);
        console.log('The contact is successfully added!');
        console.table(await listContacts());
      break;

    case "remove":
        await removeContact(id);
        console.log('The contact is successfully removed!');
        console.table(await listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);