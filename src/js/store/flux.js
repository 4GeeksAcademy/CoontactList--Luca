const getState = ({ getStore, getActions, setStore }) => {
	const createAgenda = async (Luca) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/${Luca}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ Luca: Luca }),
			});
  
			if (!response.ok) {
				throw new Error("Failed to create new agenda: " + response.statusText);
			}
		} catch (error) {
			console.error("Error creating agenda:", error.message);
			throw new Error("Error creating agenda: " + error.message);
		}
	};
  
	return {
		store: {
			// Your existing store data
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			contacts: [], // Initialize an empty array for contacts
		},
		actions: {
			getContactList: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/{Luca}/contacts", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
  
					if (!response.ok) {
						throw new Error("Failed to retrieve contact list: " + response.statusText);
					}
  
					const data = await response.json();
					setStore({ contacts: data.contacts });
				} catch (error) {
					console.error("Error retrieving contact list:", error.message);
					// Call createAgenda in case of error
					await createAgenda("{Luca}");
					throw new Error("Error retrieving contact list: " + error.message);
				}
			},  
		addContact: async (newContact) => {
		  try {
			// Set agenda_slug for the new contact
			// newContact.agenda_slug = "Luca_agenda";
  
			// Make a POST request to add the contact
			const response = await fetch(
			  "https://playground.4geeks.com/contact/agendas/{Luca}/contacts",
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(newContact),
			  }
			);
  
			if (!response.ok) {
			  // Handle the error gracefully
			  console.error("Failed to add contact:", response.statusText);
			  // Optionally, you can throw a custom error here
			} else {
			  // Contact added successfully, update the contact list
			  await getActions().getContactList();
			}
		  } catch (error) {
			// Handle any other errors
			console.error("Error adding contact:", error.message);
			// Optionally, you can throw a custom error here
		  }
		},
  
		deleteContact: async (contactId) => {
		  try {
			const response = await fetch(
			  `https://playground.4geeks.com/contact/agendas/{Luca}/contacts/${contactId}`,
			  {
				method: "DELETE",
			  }
			);
  
			if (!response.ok) {
			  throw new Error("Failed to delete contact: " + response.statusText);
			}
  
			// Get the current store
			const store = getStore();
  
			// Update the contacts array by filtering out the deleted contact
			const updatedContacts = store.contacts.filter(
			  (contact) => contact.id !== contactId
			);
  
			// Set the updated contacts array in the store
			setStore({ contacts: updatedContacts });
		  } catch (error) {
			console.error("Error deleting contact:", error.message);
			throw new Error("Error deleting contact: " + error.message);
		  }
		},
  
		editContact: async (editedContact) => {
		  try {
			// Make a PUT request to update the contact
			const response = await fetch(
			  `https://playground.4geeks.com/contact/agendas/{Luca}/contacts/${editedContact.id}`,
			  {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(editedContact),
			  }
			);
  
			if (!response.ok) {
			  // Handle the error gracefully
			  console.error("Failed to edit contact:", response.statusText);
			  // Optionally, you can throw a custom error here
			} else {
			  // Contact edited successfully, update the contact list
			  await getActions().getContactList();
			}
		  } catch (error) {
			// Handle any other errors
			console.error("Error editing contact:", error.message);
			// Optionally, you can throw a custom error here
		  }
		},
	  },
	};
  };
  
  export default getState;