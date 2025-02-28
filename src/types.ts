export interface Country {
  isoCode: string;
  name: {
    language: string;
    text: string;
  }[];
  officialLanguages: string[];
}

export interface Holiday {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: { language: string; text: string }[];
  regionalScope: string;
  temporalScope: string;
  nationwide: boolean;
  subdivisions?: { code: string; shortName: string }[];
}
