
import { Ayah } from '../types';

const API_BASE = 'https://api.alquran.cloud/v1';

export const QuranService = {
  async getJuz(juzId: number): Promise<Ayah[]> {
    const response = await fetch(`${API_BASE}/juz/${juzId}/quran-simple`);
    const data = await response.json();
    return data.data.ayahs;
  },

  async getSurah(surahId: number): Promise<Ayah[]> {
    const response = await fetch(`${API_BASE}/surah/${surahId}/quran-simple`);
    const data = await response.json();
    // In surah endpoint, metadata is slightly different, adjust structure
    return data.data.ayahs.map((a: any) => ({
      ...a,
      surah: {
        number: data.data.number,
        name: data.data.name,
        englishName: data.data.englishName,
        numberOfAyahs: data.data.numberOfAyahs
      }
    }));
  },

  async getSurahList(): Promise<any[]> {
    const response = await fetch(`${API_BASE}/surah`);
    const data = await response.json();
    return data.data;
  }
};
