import frappe as _frappe

@_frappe.whitelist(allow_guest=True)
def get_document_flow_from_root_document():
    def setdata(linked_document, i, parent, unwanted_doctypes, visited_doctypes):
        doc = []

        for linked_docu in linked_document:
            if linked_docu != parent and linked_docu not in unwanted_doctypes and linked_docu not in visited_doctypes:
                docflow = {'doctype': linked_docu, 'level': i, 'parent': parent}
                doc.append(docflow)
                visited_doctypes.add(linked_docu)
        return doc

    flow = []
    filtered_lead_docs = []
    visited_doctypes = set()
    
    unwanted_doctypes = ['Customer', 'Issue', 'Comment', 'Activity Log', 'Contact', 'View Log', 'Prospect', 'Project', 'Production Plan', 'Purchase Receipt', 'Pick List', 'Serial No', 'Dunning', 'Job Card', 'Maintenance Schedule']

    for i in range(3):
        if filtered_lead_docs:
            for filtered_lead_doc in filtered_lead_docs:
                linked_documents = _frappe.call("frappe.desk.form.linked_with.get_linked_doctypes", doctype=filtered_lead_doc, without_ignore_user_permissions_enabled=False)
                filtered_lead_docs = [doc for doc in linked_documents if doc not in unwanted_doctypes]
                flow.extend(setdata(linked_documents, i+1, filtered_lead_doc, unwanted_doctypes, visited_doctypes))
        else:
            linked_docs = _frappe.call("frappe.desk.form.linked_with.get_linked_doctypes", doctype='Lead', without_ignore_user_permissions_enabled=False)
            filtered_lead_docs = [doc for doc in linked_docs if doc not in unwanted_doctypes]
            flow.append({'doctype': 'Lead', 'level': i, 'parent': 'Lead'})
            flow.extend(setdata(filtered_lead_docs, i+1, 'Lead', unwanted_doctypes, visited_doctypes))       
    return flow


@_frappe.whitelist()
def get_leads_count_in_date_range(from_date, to_date):
    try:
        # Validate input dates
        from_date = _frappe.utils.getdate(from_date)
        to_date = _frappe.utils.getdate(to_date)

        # Query to get the count of leads in the date range
        leads_count = _frappe.db.count('Lead', filters={'creation': ('between', [from_date, to_date])})

        return leads_count

    except Exception as e:
        _frappe.log_error(f"Error in get_leads_count_in_date_range: {str(e)}")
        return 0
    
@_frappe.whitelist()
def get_opportunity_count_in_date_range(from_date, to_date):
    try:
        # Validate input dates
        from_date = _frappe.utils.getdate(from_date)
        to_date = _frappe.utils.getdate(to_date)

        # Query to get the count of leads in the date range
        opportunity_count = _frappe.db.count('Opportunity', filters={'creation': ('between', [from_date, to_date])})

        return opportunity_count

    except Exception as e:
        _frappe.log_error(f"Error in get_opportunity_count_in_date_range: {str(e)}")
        return 0
    
@_frappe.whitelist()
def calculate_average_conversion_time():
    # Query lead and opportunity data
    leads = _frappe.get_all("Lead", filters={"status": "Opportunity"}, fields=["title", "creation"])

    # Modify the filter to use the 'lead' field in the Opportunity
    opportunities = _frappe.get_all("Opportunity", filters={"title": ["in", [lead["title"] for lead in leads]]}, fields=["title", "creation"])

    # Calculate conversion time for each lead
    conversion_times = []
    for lead in leads:
        lead_creation_date = lead["creation"]
        opportunity = None
        for opp in opportunities:
            if opp["title"] == lead["title"]:
                opportunity = opp
                break

        if opportunity:
            opportunity_creation_date = opportunity["creation"]
            conversion_time = opportunity_creation_date - lead_creation_date
            conversion_times.append(conversion_time.days)

    # Calculate average conversion time
    if conversion_times:
        average_conversion_time = round(sum(conversion_times) / len(conversion_times), 2)
        return average_conversion_time
    else:
        return "No converted leads found"

@_frappe.whitelist()
def get_lost_quotations_name_and_reasons(from_date, to_date):
    result = _frappe.db.sql("""
        SELECT name, order_lost_reason
        FROM `tabQuotation`
        WHERE `status` = 'Lost' AND `creation` BETWEEN %s AND %s
    """, (from_date, to_date), as_dict=True)

    formatted_result = []
    for row in result:
        name = row['name']
        reason = row['order_lost_reason']

        formatted_result.append({'name': name, 'reason': reason})


    return formatted_result

@_frappe.whitelist()
def get_average():
    # Initialize Average
    Average = []

    def get_creation_dates(docs, field):
        return {doc[field]: doc["creation"] for doc in docs}

    conversion_times = []

    def calculate_average_conversion_time(docs_1, docs_2, conversion_times, edge_name, field_1, field_2):
        for doc_1 in docs_1:
            creation_date_1 = doc_1["creation"]

            doc_2 = None
            for doc in docs_2:
                if doc[field_2] == doc_1[field_1]:
                    doc_2 = doc
                    break

            if doc_2:
                creation_date_2 = doc_2["creation"]
                conversion_time = creation_date_2 - creation_date_1
                conversion_times.append(conversion_time.days)

        if conversion_times:
            average_conversion_time = abs(round(sum(conversion_times) / len(conversion_times), 2))
            Average.append({'edge': edge_name, 'value': average_conversion_time})
        else:
            Average.append({'edge': edge_name, 'value': 0})

        # Initialize conversion_times
        conversion_times.clear()

    leads = _frappe.get_all("Lead", filters={"status": "Opportunity"}, fields=["title", "creation"])
    opportunities = _frappe.get_all("Opportunity", filters={"title": ["in", [lead["title"] for lead in leads]]}, fields=["title", "creation"])
    calculate_average_conversion_time(leads, opportunities, conversion_times, 'Lead-Opportunity', 'title', 'title')

    # Repeat the same pattern for other document types, adjusting field names as needed
    lead_1s = _frappe.get_all("Lead", filters={"status": "Quotation"}, fields=["title", "creation"])
    quotation_1s = _frappe.get_all("Quotation", filters={"title": ["in", [lead_1["title"] for lead_1 in lead_1s]], "status": "Open"}, fields=["title", "creation"])
    calculate_average_conversion_time(lead_1s, quotation_1s, conversion_times, 'Lead-Quotation', 'title', 'title')

    opportunitie_2s = _frappe.get_all("Opportunity", fields=["name", "creation"])
    rfqs = _frappe.get_all("Request for Quotation", filters={"opportunity": ["in", [opportunity_2["name"] for opportunity_2 in opportunitie_2s]]}, fields=["opportunity", "creation"])
    calculate_average_conversion_time(opportunitie_2s, rfqs, conversion_times, 'Opportunity-Request for Quotation', 'name', 'opportunity')

    opportunitie_3s = _frappe.get_all("Opportunity", fields=["customer_name", "creation"])
    sqs = _frappe.get_all("Supplier Quotation", filters={"title": ["in", [opportunity_3["customer_name"] for opportunity_3 in opportunitie_3s]]}, fields=["title", "creation"])
    calculate_average_conversion_time(opportunitie_3s, sqs, conversion_times, 'Opportunity-Supplier Quotation', 'customer_name', 'title')

    quotation_2s = _frappe.get_all("Quotation", filters={"status": "Ordered"}, fields=["title", "creation"])
    salesorder_1s = _frappe.get_all("Sales Order", filters={"customer_name": ["in", [quotation_2["title"] for quotation_2 in quotation_2s]]}, fields=["customer_name", "creation"])
    calculate_average_conversion_time(quotation_2s, salesorder_1s, conversion_times, 'Quotation-Sales Order', 'title', 'customer_name')

    salesorder_2s = _frappe.get_all("Sales Order", fields=["customer_name", "creation", "name"])
    salesinvoices = _frappe.get_all("Sales Invoice", filters={"customer_name": ["in", [salesorder_2["customer_name"] for salesorder_2 in salesorder_2s]]}, fields=["customer_name", "creation"])
    calculate_average_conversion_time(salesorder_2s, salesinvoices, conversion_times, 'Sales Order-Sales Invoice', 'customer_name', 'customer_name')

    purchaseorders = _frappe.get_all("Purchase Order", filters={"customer_name": ["in", [salesorder_2["customer_name"] for salesorder_2 in salesorder_2s]]}, fields=["customer_name", "creation"])
    calculate_average_conversion_time(salesorder_2s, purchaseorders, conversion_times, 'Sales Order-Purchase Order', 'customer_name', 'customer_name')

    materialrequests = _frappe.get_all("Material Request", filters={"customer": ["in", [salesorder_2["customer_name"] for salesorder_2 in salesorder_2s]]}, fields=["customer", "creation"])
    calculate_average_conversion_time(salesorder_2s, materialrequests, conversion_times, 'Sales Order-Material Request', 'customer_name', 'customer')

    workorders = _frappe.get_all("Work Order", filters={"sales_order": ["in", [salesorder_2["name"] for salesorder_2 in salesorder_2s]]}, fields=["sales_order", "creation"])
    calculate_average_conversion_time(salesorder_2s, workorders, conversion_times, 'Sales Order-Work Order', 'name', 'sales_order')

    posinvoices = _frappe.get_all("POS Invoice", filters={"customer": ["in", [salesorder_2["customer_name"] for salesorder_2 in salesorder_2s]]}, fields=["customer", "creation"])
    calculate_average_conversion_time(salesorder_2s, posinvoices, conversion_times, 'Sales Order-POS Invoice', 'customer_name', 'customer')

    deliverynotes = _frappe.get_all("Delivery Note", filters={"customer_name": ["in", [salesorder_2["customer_name"] for salesorder_2 in salesorder_2s]]}, fields=["customer", "creation"])
    calculate_average_conversion_time(salesorder_2s, deliverynotes, conversion_times, 'Sales Order-Delivery Note', 'customer_name', 'customer_name')
   

    return Average



    



