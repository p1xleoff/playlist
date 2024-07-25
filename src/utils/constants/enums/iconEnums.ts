export enum IconSize {
    s = 18,
    m = 24,
    l = 36
}

export enum IconColor {
    Green = 'limegreen',
}


interface IconProperties {
    name: string;
    size: IconSize;
    color: IconColor;
}


const createIcon = (name: string, size: IconSize, color: IconColor): IconProperties => {
    return {
      name,
      size,
      color
    };
  }; 