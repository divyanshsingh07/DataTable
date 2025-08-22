
import React from 'react'
import { DataTable } from './Component/DataTable'
import { FiDatabase, FiTrash2 } from 'react-icons/fi'

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

const fullData: User[] = [
  { id: 101, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', age: 26 },
  { id: 102, name: 'Ishita Patel', email: 'ishita.patel@example.com', age: 31 },
  { id: 103, name: 'Vivaan Gupta', email: 'vivaan.gupta@example.com', age: 24 },
  { id: 104, name: 'Diya Iyer', email: 'diya.iyer@example.com', age: 29 },
  { id: 105, name: 'Advait Reddy', email: 'advait.reddy@example.com', age: 33 },
  { id: 106, name: 'Meera Nair', email: 'meera.nair@example.com', age: 27 },
  { id: 107, name: 'Kabir Singh', email: 'kabir.singh@example.com', age: 35 },
]

const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
] as const

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState<User[]>([])
  const [data, setData] = React.useState<User[]>(fullData)
  const [justCleared, setJustCleared] = React.useState(false)
  const [justLoadedData, setJustLoadedData] = React.useState(false)

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <h1 className='text-2xl font-semibold'>Reusable DataTable</h1>
        <div className="flex items-center gap-2">
          <button
            className={`inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-50 ${loading ? 'opacity-70' : ''}`}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 800)
            }}
            title="Simulate loading"
            disabled={loading}
          >
            <FiDatabase className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading…' : 'Load'}
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-50 ${justCleared || justLoadedData ? 'animate-bounce' : ''}`}
            onClick={() => {
              setSelected([])
              setData(prev => {
                if (prev.length) {
                  setJustCleared(true)
                  setTimeout(() => setJustCleared(false), 600)
                  return []
                } else {
                  const next = fullData
                  setJustLoadedData(true)
                  setTimeout(() => setJustLoadedData(false), 600)
                  return next
                }
              })
            }}
            title="Toggle data on/off"
          >
            {data.length ? <FiTrash2 className={justCleared ? 'animate-pulse' : ''} /> : <FiDatabase className={justLoadedData ? 'animate-bounce' : ''} />}
            {data.length ? 'Clear' : 'Load Data'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Selected: {selected.length}</span>
      </div>

      {selected.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
          <div className="mb-2 font-medium">Selected rows</div>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {selected.map(user => (
              <li key={user.id} className="rounded bg-white px-2 py-1 text-gray-800 shadow-sm">
                <span className="mr-2 inline-block rounded bg-blue-600 px-1.5 py-0.5 text-xs font-medium text-white">{user.id}</span>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <DataTable<User>
        data={data}
        columns={columns as any}
        loading={loading}
        selectable
        onRowSelect={setSelected}
      />
    </div>
  )
}

export default App
