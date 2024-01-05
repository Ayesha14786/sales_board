
import { useFrappeGetCall, useFrappeGetDoc } from "frappe-react-sdk"


export const Card2 = () => {
    const { data: numberCard } = useFrappeGetDoc('Number Card', 'New Opportunity (Last 1 Month)')

    const { data } = useFrappeGetCall('frappe.desk.doctype.number_card.number_card.get_result', {
        doc: numberCard,
        filters: numberCard?.filters_json
    }, numberCard ? undefined : null)
    //console.log(numberCard)
    //console.log(data)
    return (
        <div className="mt-18 p-4 space-y-2">
            <h3 className="font-semibold ">New Opportunity</h3>
           <p>{data && <span>{data.message}</span>}<span className="ml-4 text-sm">(This Week)</span></p>
            
        </div>
    )
}