export const listOptions = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'wishlist', label: 'Wishlist' },
    { value: 'playlist', label: 'Playing' },
    { value: 'completed', label: 'Completed' },
];

export const listLabels: { [key: string]: string } = {
    backlog: 'Backlog',
    wishlist: 'Wishlist',
    playlist: 'Playing',
    completed: 'Completed',
};

export const listIcons: { [key: string]: string } = {
    backlog: 'progress-alert',
    playlist: 'motion-play-outline',
    wishlist: 'bookmark-outline',
    completed: 'checkbox-marked-circle-outline',
};

export const listDesc: { [key: string]: string } = {
    backlog: 'Games to Play',
    playlist: 'Currently Playing',
    wishlist: 'Wishlisted Games',
    completed: 'Completed Games',
};

export const listColors: { [key: string]: string } ={
    backlog: '#fc4503',
    playlist: '#0398fc',
    wishlist: '#fc036b',
    completed: '#17fc03',
}

export const listSort: { [key: string]: string } ={
    name: 'Name',
    addedDate: 'Date Added',
    listName: 'List',
} 