export const eventFilter = (item, selected, searchText) => {
    const matchesSearch = item.Title && item.Title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = (selected === 'all') || (item.Status && selected === item.Status);
    return matchesSearch && matchesStatus;
}