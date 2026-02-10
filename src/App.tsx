import { useState } from 'react'
import './index.css'
import { LasoForm, type FormValues } from './components/LasoForm'
import { LasoGrid } from './components/LasoGrid'
import { tinhLaso, type Laso, type LasoInput } from './lib/canchi-engine'

function App() {
  const [laso, setLaso] = useState<Laso | null>(null)
  const [lastFormValues, setLastFormValues] = useState<FormValues | undefined>()

  const handleSubmit = (input: LasoInput, formValues: FormValues) => {
    const result = tinhLaso(input)
    setLaso(result)
    setLastFormValues(formValues)
  }

  return (
    <div className="min-h-screen bg-background py-4 px-2 sm:py-6 sm:px-4 md:py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">CanChi</h1>
        <p className="text-muted-foreground mt-2">Lập lá số tử vi trực tuyến</p>
      </header>

      {!laso ? (
        <LasoForm onSubmit={handleSubmit} initialValues={lastFormValues} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={() => setLaso(null)}
              className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              ← Sửa thông tin
            </button>
          </div>
          <LasoGrid laso={laso} ten={lastFormValues?.ten} />
        </div>
      )}
    </div>
  )
}

export default App
