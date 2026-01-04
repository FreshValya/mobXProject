export type IsoCountryCode = string; // e.g., "US", "DE"
export type LanguageCode = string; // e.g., "en"
export type FilePath = string | null;

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: LanguageCode;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: FilePath;
  name: string;
  origin_country: IsoCountryCode;
}

export interface ProductionCountry {
  iso_3166_1: IsoCountryCode;
  name: string;
}
