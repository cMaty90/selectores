export interface PaisSmall {
    name: Name;
    cca3: string;
}

export interface Name {
    common:     string; //aca esta el nombre
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}

/*------------------------------------------ */
//paise or codigo

