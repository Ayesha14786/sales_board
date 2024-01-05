import { useFrappeGetCall } from 'frappe-react-sdk';


export const FlowData = () => {

    const {data, error, isValidating} = useFrappeGetCall('sales_board.sales_board.get_document_flow_from_root_document');
  return {data , error , isValidating}
}
