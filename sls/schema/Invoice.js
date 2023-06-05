const Invoice = `
    type Invoice {
        items: [Item!]!,
        user: User!,
        
        square_id: String!
    }

    type InvoiceConnection {
        edges: [InvoiceEdge!]!,
        pageInfo: PageInfo!
    }

    type InvoiceEdge {
        node: Invoice, 
        cursor: String!
    }
`

export default Invoice