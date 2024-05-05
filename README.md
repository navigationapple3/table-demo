# Next.js Reactive Data Table

This project aims to build a reactive and editable data table using Next.js, TailwindCSS, and Supabase. The functionality should resemble that of Clay/Airtable, supporting CRUD operations, pagination, real-time updates, and advanced features such as search, column sorting, filtering, and image insertion.

## Objective

The objective of this project is to create a robust and user-friendly data table application leveraging modern web technologies. By utilizing Next.js for server-side rendering, TailwindCSS for styling, Supabase for database management, and additional libraries like Redux Toolkit for state management, we aim to deliver a responsive and efficient solution for managing tabular data.

## Requirements

1. **Next.js Setup:**

   - Set up a new Next.js project.
   - Utilize TypeScript for enhanced type safety and developer experience.

2. **TailwindCSS Integration:**

   - Integrate TailwindCSS for styling the application.
   - Ensure the UI is responsive and maintains a clean design.

3. **Supabase Setup:**

   - Create a new Supabase project.
   - Define a schema for the table, including at least 4 different data types (e.g., text, number, date, images).
   - Enable real-time capabilities on the table in Supabase.

4. **Data Table Features:**
   **Data Display:** Fetch and display data from the AWS product list in a table format.

   - **Update and Enter Columns:** Allow users to directly edit the cell content and add new columns dynamically.
   - **Pagination:** Implement pagination controls, allowing users to navigate through the data. Include options to select pagination size (e.g., 10, 50, 100 rows per page).

5. **Advanced Features:**
   - **Search Implementation:** Implement search functionality to allow users to search for specific data.
   - **Column Sorting and Filtering:** Allow users to sort and filter columns for better data organization.
   - **Image Insertion:** Enable users to insert images into a cell (limited to <2MB).

## TODO:

- Implement efficient handling and rendering of large datasets (up to 50,000 rows) to ensure optimal performance.
- Utilize Supabase's real-time capabilities to enable immediate updates across all clients when changes are made to the data.

## Dependencies

- **@reduxjs/toolkit:** State management library for managing application state efficiently.
- **@supabase/ssr:** Supabase client library for server-side rendering.
- **@supabase/supabase-js:** Supabase JavaScript client library for interacting with Supabase services.
- **antd:** React UI library for building clean and efficient user interfaces.
- **lodash:** Utility library for simplifying JavaScript operations.
- **next:** Framework for building React applications with server-side rendering.
- **react:** JavaScript library for building user interfaces.
- **react-dom:** Entry point for working with the DOM in React.
- **react-redux:** Official React bindings for Redux, enabling the integration of Redux with React applications.
- **redux:** State container for JavaScript applications.
- **uuid:** Library for generating unique identifiers.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up a Supabase project and define the required table schema.
4. Update Supabase configuration in the application to connect to your project.
5. Run the development server using `npm run dev`.
6. Start exploring and testing the functionality of the reactive data table.

## Contributors

- Project Lead & Developer

## License

This project is licensed under the [MIT License](LICENSE).
