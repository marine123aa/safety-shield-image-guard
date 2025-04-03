
import React from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const handleClearCache = () => {
    toast.success('캐시가 성공적으로 삭제되었습니다.');
  };

  const handleResetSettings = () => {
    toast.success('설정이 초기화되었습니다.');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">설정</h1>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">데이터베이스 연결 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">데이터베이스 이름</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue="EY_AI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">서버 주소</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue="localhost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">포트</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue="3306"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">사용자 이름</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              defaultValue="********"
            />
          </div>
          <div>
            <Button className="yellow-button">연결 테스트</Button>
            <Button className="blue-button ml-2">설정 저장</Button>
          </div>
        </div>
      </div>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">API 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">OpenAI API 키</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              defaultValue="sk-********************************"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Midjourney API 키</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              defaultValue="mj-********************************"
            />
          </div>
          <div>
            <Button className="yellow-button">API 키 확인</Button>
            <Button className="blue-button ml-2">설정 저장</Button>
          </div>
        </div>
      </div>
      
      <div className="feature-section">
        <h2 className="text-lg font-medium mb-4">시스템 유지관리</h2>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleClearCache}
          >
            캐시 삭제
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetSettings}
          >
            설정 초기화
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
