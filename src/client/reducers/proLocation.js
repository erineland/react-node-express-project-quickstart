export default (state = { location: undefined }, action) => {
    switch (action.type) {
        case 'UPDATE_PRO_LOCATION':
            console.log(`updating the location on state: ${action.location}`);
            return {
                location: action.location,
            }
        default:
            return state;
    };
}
