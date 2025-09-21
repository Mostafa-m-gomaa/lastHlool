import React from 'react'
import AnalyseComp from './analysisComponent'

const AnalysisPage = () => {
  return (
    <div className='flex flex-col gap-4 py-4 w-full'>
      <h1>صفحة التحليلات</h1>
      <div className="flex flex-col lg:flex-row w-full flex justify-center gap-2">

      <AnalyseComp />
      <AnalyseComp />
      </div>
    </div>
  )
}

export default AnalysisPage