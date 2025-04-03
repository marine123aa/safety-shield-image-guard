
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchPrompts } from '../services/mockData';
import { PromptDetail, Category, CategoryFilter } from '../types';
import { exportPromptResults } from '../utils/helpers';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const ViewPrompts: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('20250101');
  const [endDate, setEndDate] = useState<string>('20250301');
  const [prompts, setPrompts] = useState<PromptDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilter>({
    sexual: false,
    violence: false,
    discrimination: false,
    illegal: false,
    fake: false,
    shocking: false,
    culture: false,
    privacy: false,
    disrespect: false,
    etc: false
  });

  const categoryLabels: Record<Category, string> = {
    sexual: '성적인 내용',
    violence: '폭력',
    discrimination: '차별',
    illegal: '불법',
    fake: '가짜',
    shocking: '충격적인',
    culture: '문화적 민감성',
    privacy: '개인 권리/사생활',
    disrespect: '환경/생태계 존중 위반',
    etc: '기타'
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchPrompts(startDate, endDate, categoryFilters);
      setPrompts(data);
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
    if (prompts.length === 0) {
      toast.error('다운로드할 데이터가 없습니다.');
      return;
    }
    
    exportPromptResults(prompts, startDate, endDate);
    toast.success('데이터가 Excel 형식으로 다운로드되었습니다.');
  };

  const handleCategoryToggle = (category: Category) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleApplyFilters = () => {
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">우회 프롬프트 보기</h1>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">프롬프트 생성일</h2>
        <div className="flex items-center gap-2 mb-4">
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
            onClick={handleApplyFilters}
            className="ml-4 yellow-button"
          >
            적용
          </Button>
        </div>
      </div>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">카테고리 선택</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`category-button ${categoryFilters[key as Category] ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(key as Category)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleApplyFilters}
            className="yellow-button"
          >
            필터 적용
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">프롬프트 목록</h2>
          <Button
            onClick={handleDownload}
            disabled={prompts.length === 0}
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
          ) : prompts.length === 0 ? (
            <div className="p-8 text-center">
              <p>데이터가 없습니다.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>프롬프트 생성일</th>
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
                  <th>기타</th>
                </tr>
              </thead>
              <tbody>
                {prompts.map((prompt, index) => (
                  <tr key={prompt.id}>
                    <td>{index + 1}</td>
                    <td>{prompt.dateCreated}</td>
                    <td>{prompt.prompt}</td>
                    <td>{prompt.sexual}</td>
                    <td>{prompt.violence}</td>
                    <td>{prompt.discrimination}</td>
                    <td>{prompt.illegal}</td>
                    <td>{prompt.fake}</td>
                    <td>{prompt.shocking}</td>
                    <td>{prompt.culture}</td>
                    <td>{prompt.privacy}</td>
                    <td>{prompt.disrespect}</td>
                    <td>{prompt.etc}</td>
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

export default ViewPrompts;
