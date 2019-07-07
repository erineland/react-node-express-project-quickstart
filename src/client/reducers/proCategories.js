export default (
    state = {
        loadingCategories: false,
        categories: [],
    },
    action
) => {
    switch (action.type) {
        case 'PRO_CATEGORIES_PENDING':
            return {
                loadingCategories: true,
            }
        case 'PRO_CATEGORIES_FULFILLED':
            console.log(`updating the categories on state: ${JSON.stringify(action.payload)}`);
            return {
                loadingCategories: false,
                categories: action.payload
            }
        case 'PRO_CATEGORIES_REJECTED':
            return {
                loadingCategories: false,
                isRejected: true,
                error: action.payload
            }
        default:
            return state;
    };
}
