import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { PageLayout } from './components/PageLayout'
import { ContractList } from './components/ContractList'
import { ContractForm } from './components/ContractForm'
import { PaymentSchedule } from './components/PaymentSchedule'
import CreateReceiptVoucher  from './components/CreateReceiptVoucher';

import './App.css'

type Page = 'dashboard' | 'contracts' | 'contracts-create' | 'payment-schedule' | 'receipts-create'


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'dashboard' ? (
        <Dashboard onNavigate={handleNavigate} />
      ) : (
        <PageLayout onNavigate={handleNavigate}>
          {currentPage === 'contracts' && <ContractList onNavigate={handleNavigate} />}
          {currentPage === 'contracts-create' && <ContractForm />}
          {currentPage === 'payment-schedule' && <PaymentSchedule />}
          {currentPage === 'receipts-create' && <CreateReceiptVoucher />}
        </PageLayout>
      )}
    </>
  )
}

export default App
