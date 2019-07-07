import ProFinderService from '../service/pro-finder-service';
export default searchParams => ({
    type: 'SEARCH_LOCAL_PROS',
    payload: ProFinderService.searchForLocalProfessionals(
        Number.parseInt(searchParams.categoryId),
        searchParams.location,
        searchParams.searchResultsOffset
    )
})
