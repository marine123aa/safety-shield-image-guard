
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PromptDetail, ImageAnalysis, GeneratedImage } from '../types';

export const formatDate = (dateString: string): string => {
  if (dateString.length !== 8) return dateString;
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
};

export const downloadAsExcel = (data: any[], fileName: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);
};

export const downloadJSON = (data: any, fileName: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, `${fileName}.json`);
};

export const getCategoryCount = (prompts: PromptDetail[], category: keyof PromptDetail): number => {
  return prompts.filter(prompt => prompt[category] === 'O').length;
};

export const exportPromptResults = (
  prompts: PromptDetail[],
  startDate: string,
  endDate: string
): void => {
  const fileName = `prompt_results_${startDate}_${endDate}`;
  downloadAsExcel(prompts, fileName);
};

export const exportImageAnalysisResults = (
  analyses: ImageAnalysis[],
  startDate: string,
  endDate: string
): void => {
  const fileName = `image_analysis_${startDate}_${endDate}`;
  downloadAsExcel(analyses, fileName);
};

export const getAverageScore = (analyses: ImageAnalysis[], category: keyof ImageAnalysis): number => {
  if (!analyses.length) return 0;
  const sum = analyses.reduce((acc, curr) => {
    const value = curr[category];
    return acc + (typeof value === 'number' ? value : 0);
  }, 0);
  return parseFloat((sum / analyses.length).toFixed(1));
};

export const exportGeneratedImage = (image: GeneratedImage): void => {
  downloadJSON(image, `prompt_${Date.now()}`);
};
