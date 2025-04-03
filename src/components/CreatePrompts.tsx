
import React, { useState } from 'react';
import { toast } from 'sonner';
import { generatePrompts, generateImages } from '../services/mockData';
import { GeneratedImage } from '../types';
import { exportGeneratedImage } from '../utils/helpers';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Pagination from './Pagination';

const CreatePrompts: React.FC = () => {
  const [keywords, setKeywords] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState<boolean>(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const promptsPerPage = 5;

  const handleGeneratePrompts = async () => {
    if (!keywords.trim()) {
      toast.error('키워드를 입력해주세요.');
      return;
    }

    setIsGenerating(true);
    try {
      const prompts = await generatePrompts(keywords);
      setGeneratedPrompts(prompts);
      toast.success(`${prompts.length}개의 프롬프트가 생성되었습니다.`);
      
      // Generate images for the prompts
      setIsGeneratingImages(true);
      const images = await generateImages(prompts);
      setGeneratedImages(images);
      setIsGeneratingImages(false);
    } catch (error) {
      toast.error('프롬프트 생성 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportImage = (image: GeneratedImage) => {
    exportGeneratedImage(image);
    toast.success('이미지가 JSON 형식으로 다운로드되었습니다.');
  };

  // Calculate current prompts to display
  const indexOfLastPrompt = currentPage * promptsPerPage;
  const indexOfFirstPrompt = indexOfLastPrompt - promptsPerPage;
  const currentPrompts = generatedImages.slice(indexOfFirstPrompt, indexOfLastPrompt);
  const totalPages = Math.ceil(generatedImages.length / promptsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">우회 프롬프트 생성</h1>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">키워드를 입력하세요</h2>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <textarea
              className="w-full p-3 border rounded-md"
              rows={3}
              placeholder="폭력, 차별, 성적인 콘텐츠 등의 키워드를 입력하세요. 여러 키워드는 쉼표(,)로 구분합니다."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              키워드를 쉼표(,)로 구분하여 입력하세요.
            </p>
          </div>
          <div>
            <Button
              onClick={handleGeneratePrompts}
              disabled={isGenerating || !keywords.trim()}
              className="yellow-button flex items-center gap-2"
            >
              {generatedPrompts.length > 0 ? `${generatedPrompts.length}개 생성` : '생성'}
            </Button>
            <div className="mt-2 text-sm">
              {isGenerating ? (
                <span className="processing">프롬프트 생성 중...</span>
              ) : generatedPrompts.length > 0 ? (
                <span className="completed">완료</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {isGeneratingImages && (
        <div className="mt-4 p-4 bg-blue-light rounded-md">
          <p className="processing">이미지 생성 중...</p>
        </div>
      )}
      
      {currentPrompts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">이미지 표시</h2>
          
          <div className="space-y-8">
            {currentPrompts.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-white">
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                  <h3 className="font-medium">{`${indexOfFirstPrompt + index + 1}. ${image.prompt}`}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportImage(image)}
                    className="flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>저장</span>
                  </Button>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-2 border rounded">
                        <img
                          src={image.imagen3}
                          alt="Imagen3"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">Imagen3</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-2 border rounded">
                        <img
                          src={image.dalle}
                          alt="DALLE"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">DALLE</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-2 border rounded">
                        <img
                          src={image.midjourney}
                          alt="Midjourney"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">Midjourney</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePrompts;
