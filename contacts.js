const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readDb() {
  try {
    const dbRow = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRow);

    return db;
  } catch (error) {
    console.log(error);
  }
}

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  try {
    const db = await readDb();

    return db;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const db = await readDb();
    const filteredContacts = db.filter((contact) => contact.id === contactId);

    return filteredContacts;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const db = await readDb();
    const removedContact = db.find((contact) => contact.id === contactId);
    const updateContact = db.filter((contact) => contact.id !== contactId);
    console.log(`Contact ${removedContact.name} has been removed`);
    await writeDb(updateContact);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const db = await readDb();
    db.push(newContact);
    console.log(`new contact ${name} has been added`);
    await writeDb(db);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
