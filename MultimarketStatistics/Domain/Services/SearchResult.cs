namespace Domain.Services
{
    public class SearchResult<T>
    {
        public SearchResult(int total, int found, T foundItem)
        {
            Total = total;
            Found = found;
            FoundItem = foundItem;
        }

        public int Total { get; }
        public int Found { get; }
        public T FoundItem { get; }
    }
}