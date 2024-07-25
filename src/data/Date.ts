// dateformatter.ts

export function formatDate(dateString: string): string {
    // Split the date string into parts
    const parts = dateString.split('T')[0].split('-');
    
    // Convert month from numeric to abbreviation
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthAbbr = months[parseInt(parts[1], 10) - 1];
    
    // Formatted date string "Jul 16, 2024"
    return `${monthAbbr} ${parseInt(parts[2], 10)}, ${parts[0]}`;
}
