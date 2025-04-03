
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchImageAnalysis, analyzeImages } from '../services/mockData';
import { ImageAnalysis } from '../types';
import { exportImageAnalysisResults } from '../utils/helpers';
import { Button } from './ui/button';
import { Download, Upload } from 'lucide-react';

const ImageAnalysisComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('20250101');
  const [endDate, setEndDate] = useState<string>('20250301');
  const [analyses, setAnalyses] = useState<ImageAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderPath, setFolderPath] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchImageAnalysis(startDate, endDate);
      setAnalyses(data);
    } catch (error) {
      toast.error('데이터를 불러오는 데 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = () => {
    if (analyses.length === 0) {
      toast.error('다운로드할 데이터가 없습니다.');
      return;
    }
    
    exportImageAnalysisResults(analyses, startDate, endDate);
    toast.success('분석 결과가 Excel 형식으로 다운로드되었습니다.');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    setFolderPath(event.target.value);
  };

  const handleAnalyzeImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('이미지 파일을 선택해주세요.');
      return;
    }
    
    setAnalyzing(true);
    try {
      const filesArray = Array.from(selectedFiles);
      const results = await analyzeImages(filesArray);
      
      // Add the new results to the existing analyses
      setAnalyses(prev => [...results, ...prev]);
      
      toast.success(`${filesArray.length}개의a 이미지가 성공적으로 분석되었습니다.`);
      
      // Create a folder name with date and sequence
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const folderName = `${date}.001`;
      
      toast.info(`분석된 이미지가 '${folderName}' 폴더에 저장되었습니다.`);
    } catch (error) {
      toast.error('이미지 분석 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">부적절 이미지 검사</h1>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">이미지 폴더 선택</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="image-folder"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*"
              />
              <label 
                htmlFor="image-folder"
                className="flex-1 py-2 px-4 border rounded-md cursor-pointer hover:bg-gray-50"
              >
                {folderPath ? folderPath.substring(folderPath.lastIndexOf('\\') + 1) : '이미지 폴더를 선택하세요'}
              </label>
              <label 
                htmlFor="image-folder"
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md cursor-pointer"
              >
                <Upload className="w-5 h-5" />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {selectedFiles ? `${selectedFiles.length}개의 파일이 선택되었습니다.` : '이미지 파일을 여러 개 선택할 수 있습니다.'}
            </p>
          </div>
          <div>
            <Button
              onClick={handleAnalyzeImages}
              disabled={analyzing || !selectedFiles}
              className="yellow-button w-full md:w-auto"
            >
              {analyzing ? '검사 중...' : '검사 Start'}
            </Button>
            {analyzing && (
              <div className="mt-2 text-sm">
                <span className="processing">이미지 검사 중...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">검사 결과 다운로드</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="date-input"
            placeholder="YYYYMMDD"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>~</span>
          <input
            type="text"
            className="date-input"
            placeholder="YYYYMMDD"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button 
            onClick={fetchData}
            className="yellow-button ml-4"
          >
            조회
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">검사 결과 테이블</h2>
          <Button
            onClick={handleDownload}
            disabled={analyses.length === 0}
            className="blue-button flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            <span>다운로드</span>
          </Button>
        </div>
        
        <div className="table-container">
          {loading ? (
            <div className="p-8 text-center">
              <p className="processing">데이터 로딩 중...</p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="p-8 text-center">
              <p>데이터가 없습니다.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>검사 결과 생성일</th>
                  <th>Prompt</th>
                  <th>성적인 내용</th>
                  <th>폭력</th>
                  <th>차별</th>
                  <th>불법</th>
                  <th>가짜</th>
                  <th>충격적인</th>
                  <th>문화적</th>
                  <th>개인 권리</th>
                  <th>존중 위반</th>
                  <th>총합 점수</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis, index) => (
                  <tr key={analysis.id}>
                    <td>{index + 1}</td>
                    <td>{analysis.dateCreated}</td>
                    <td>{analysis.prompt}</td>
                    <td>{analysis.sexual}</td>
                    <td>{analysis.violence}</td>
                    <td>{analysis.discrimination}</td>
                    <td>{analysis.illegal}</td>
                    <td>{analysis.fake}</td>
                    <td>{analysis.shocking}</td>
                    <td>{analysis.culture}</td>
                    <td>{analysis.privacy}</td>
                    <td>{analysis.disrespect}</td>
                    <td>{analysis.totalScore}</td>
                    <td>
                      <div className="max-w-xs truncate" title={analysis.reason}>
                        {analysis.reason}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisComponent;
