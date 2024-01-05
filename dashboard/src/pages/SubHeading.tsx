

import { ProcessFlow } from "../components/ProcessFlow"

//import ProcessFlow from "../components/ProcessFlow"
import { Dashboard } from "./Dashboard"

export const SubHeading = () => {
    return (
    <>
        <div className="flex">
           {/* <Dashboard />*/}
            <div className="grow">
                <ProcessFlow />
            </div> 
        </div>          
    </>     
        
    )
}