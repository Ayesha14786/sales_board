
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import DynamicFlow from './components/DynamicFlow'
//import Ftest1 from './components/Ftest1'
//import { Opportunity } from './components/Opportunity'
//import { Opp } from './components/Opp'
//import Ftest1Wrapper from './components/Ftest1Wrapper'

//import { Whitlist } from './components/Whitlist'
//import Flow from './components/Flow'
//import { Dashboard } from './pages/Dashboard'

import { Heading } from './components/Heading'
//import { SubHeading } from './pages/SubHeading'
//import DatePicker from './components/DatePicker'
//import { useState } from 'react'
//import Lcount from './components/Lcount'
//import { AverageLeadOpp } from './components/AverageLeadOpp'
import { Kpi } from './components/Kpi'
//import {FlowChart} from './pages/FlowChart'
//import { Flowchart1 } from './pages/Flowchart1'



function App() {
	return (

		<FrappeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={
						<div className='lg:h-screen lg:w-full bg-gray-100'>
							{/*<Heading />
							<SubHeading />*/}
							{/*<FlowChart />*/}
							{/*<Flowchart1 />*/}
							{/*<Flow />*/}
							{/*<Whitlist />*/}
							<Heading />
							{/*<DynamicFlow />
							<SubHeading />*/}
							
							<Kpi />
							{/*<Ftest1Wrapper />*/}
						</div>
					} />
				</Routes>
                
			</BrowserRouter>
		</FrappeProvider>

	)
}

export default App
