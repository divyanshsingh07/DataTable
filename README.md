# DataTable

A modern, reusable React + TypeScript DataTable component with TailwindCSS styling. Built with modular architecture for easy customization and extension.

## 🌐 Live Demo

**[View Live Demo](https://datatable-divyanshsingh07.vercel.app/)**

## ✨ Features

- **📊 Tabular Data Display** - Clean, responsive table layout
- **🔄 Column Sorting** - Ascending/descending sorting with visual indicators
- **☑️ Row Selection** - Single/multiple row selection with checkboxes
- **⏳ Loading States** - Skeleton loading with smooth animations
- **📭 Empty States** - Graceful handling when no data is available
- **🎨 Modern UI** - Beautiful TailwindCSS styling with hover effects
- **📱 Responsive** - Works seamlessly across all device sizes
- **🔧 TypeScript** - Full type safety and IntelliSense support

## 🚀 Installation

```bash
npm install react-icons
```

## 📦 Usage

### Basic Implementation

```tsx
import { DataTable } from './Component/DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30 },
];

function App() {
  return (
    <DataTable<User>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(selectedRows) => console.log(selectedRows)}
    />
  );
}
```

### Props Interface

```tsx
interface DataTableProps<T> {
  data: T[];                    // Array of data to display
  columns: Column<T>[];         // Column configuration
  loading?: boolean;            // Show loading state
  selectable?: boolean;         // Enable row selection
  onRowSelect?: (selectedRows: T[]) => void; // Selection callback
}

interface Column<T> {
  key: string;                  // Unique column identifier
  title: string;                // Column header text
  dataIndex: keyof T;           // Data property to display
  sortable?: boolean;           // Enable sorting for this column
}
```

## 🏗️ Architecture

The component is built with a modular architecture:

```
DataTable/
├── DataTable.tsx      # Main orchestrator component
├── TableHeader.tsx    # Column headers with sorting
├── TableBody.tsx      # Data rows container
├── TableRow.tsx       # Individual row rendering
├── TableCell.tsx      # Cell wrapper component
├── LoadingState.tsx   # Skeleton loading UI
├── EmptyState.tsx     # No data message
├── types.ts           # TypeScript interfaces
└── index.ts           # Public exports
```

## 🎯 Key Components

### DataTable
- Manages sorting state and row selection
- Handles data transformation and filtering
- Coordinates between child components

### TableHeader
- Renders column headers with sort controls
- Includes select-all checkbox when selection is enabled
- Visual feedback for sort direction

### TableBody
- Renders data rows or loading/empty states
- Handles row selection state

### TableRow
- Individual row with checkbox for selection
- Hover effects and visual feedback

## 🎨 Styling

Built with TailwindCSS for consistent, modern styling:
- Clean borders and rounded corners
- Hover effects on interactive elements
- Responsive design patterns
- Consistent spacing and typography

## 🔧 Customization

### Adding Custom Cell Renderers

```tsx
// Extend the Column interface
interface CustomColumn<T> extends Column<T> {
  render?: (value: any, record: T) => React.ReactNode;
}

// Use in your columns
const columns: CustomColumn<User>[] = [
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id',
    render: (id) => (
      <button onClick={() => handleEdit(id)}>
        Edit
      </button>
    )
  }
];
```

### Custom Loading States

```tsx
// Override the default loading component
<DataTable
  data={data}
  columns={columns}
  loading={true}
  LoadingComponent={CustomSpinner}
/>
```

## 📱 Responsive Design

The table automatically handles:
- Horizontal scrolling on small screens
- Proper text wrapping and overflow
- Touch-friendly interactions
- Consistent spacing across devices

## 🚀 Performance Features

- Efficient re-rendering with React hooks
- Optimized sorting algorithms
- Lazy loading support ready
- Minimal bundle size impact

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

## 🔗 Dependencies

- React 19+
- TypeScript 5.8+
- TailwindCSS
- react-icons

---

Built with ❤️ using modern React patterns and TypeScript best practices.
