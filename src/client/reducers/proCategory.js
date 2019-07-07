export default (
  state = {
    categoryName: undefined,
    categoryId: undefined
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_PRO_CATEGORY':
      console.log(`updating the chosen category on state: ${action.categoryId} ${action.categoryName}`);
      return {
        categoryId: action.categoryId,
        categoryName: action.categoryName,
      }
    default:
      return state;
  };
}
