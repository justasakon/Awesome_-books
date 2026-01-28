import BookCollection from './modules/bookCollection.js';
import UserInterface from './modules/ui.js';
// Initialization
const collection = new BookCollection();
// eslint-disable-next-line no-new
new UserInterface(collection);