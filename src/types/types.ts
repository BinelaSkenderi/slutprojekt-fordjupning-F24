// Interface for City and Weather
export interface Weather {
    name: string;
    weather: {
        description: string;
    }[];
    main: {
        temp: number;
    }
    wind: {
        speed: number;
    }
}