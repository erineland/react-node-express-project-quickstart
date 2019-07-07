export default (
    state = {
        searchResults: [],
        numPages: 1,
        activePage: 1,
        loading: false,
        error: undefined,
    },
    action
) => {
    switch (action.type) {
        case 'SET_ERROR':
            console.log(`setting an error on the state: ${action.error}`);
            return {
                error: action.error
            }
        case 'SEARCH_LOCAL_PROS_PENDING':
            return {
                searchResults: [],
                loading: true,
                error: undefined,
            }
        case 'SEARCH_LOCAL_PROS_FULFILLED':
            // Parsing results and setting state
            const maxResultsPerPage = 20;
            const searchResults = action.payload.results;
            console.log(`searchResults are: ${JSON.stringify(searchResults)}`);
            const numPages = Math.ceil(action.payload.totalCount / maxResultsPerPage);

            if (searchResults.length === 0) {
                return {
                    searchResults: [],
                    numPages: 1,
                    activePage: 1,
                    error: 'No local professionals found for this search. Please try again.',
                    loading: false,
                }
            } else {
                return {
                    searchResults: searchResults,
                    numPages: numPages,
                    activePage: Math.ceil((action.payload.offset / maxResultsPerPage) + 1),
                    error: undefined,
                    loading: false,
                };
            }
        case 'SEARCH_LOCAL_PROS_REJECTED':
            return {
                searchResults: [],
                numPages: 1,
                activePage: 1,
                searchResults: [],
                loading: false,
                error: action.payload.message,
            }
        default:
            return state;
    }
};
