const PageInfo = `
    """
    The specification includes the pagination metadata
    in a common type.
    """
    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }
`

export default PageInfo