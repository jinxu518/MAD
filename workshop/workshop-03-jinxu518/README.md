# MIU-CS571-2023-10-Workshop03
## Develop a Contacts Application using React Native
* Create a new React Native application from scratch: npx create-expo-app <your-app-name>
* Copy the `contacts.js` file into your project and install `react-native-uuid` (npm install). Note that this file has a default export for an array of sample contacts. Each contact has a `name` and `phone number`.
* Create a reusable `Contact` functional-component that displays a single contact (`name` and `phone`). Validate all `props` types.
* Display all contacts in `App` component using `ScrollView` component.
* Add a button to `App` to toggle displaying the list of contacts.
* Replace `ScrollView` with `FlatList` component and notice the performance difference with a big number of contacts.
* Add a button to sort the contacts by name alphabetically, descending and ascending.

* Add a button to display a form for adding a new contact:
* Create `AddContactForm` functional-component and handle adding the form values (both `name` and `phone`) where `phone` has to be 10 digits number. Validate all `state` types.
* Save all contacts to AsyncStorage and get all existing contacts when loading the application

## Please submit this workshop by 3:00 PM this Saturday.

