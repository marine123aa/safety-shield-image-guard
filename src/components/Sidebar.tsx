
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

interface SidebarItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems: SidebarItem[] = [
    {
      id: 'create-prompts',
      name: '우회 프롬프트 생성',
      path: '/create-prompts',
      icon: <span className="w-6 h-6 flex items-center justify-center">⌨️</span>
    },
    {
      id: 'view-prompts',
      name: '우회 프롬프트 보기',
      path: '/view-prompts',
      icon: <span className="w-6 h-6 flex items-center justify-center">📋</span>
    },
    {
      id: 'image-analysis',
      name: '부적절 이미지 검사',
      path: '/image-analysis',
      icon: <span className="w-6 h-6 flex items-center justify-center">🔍</span>
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold bg-yellow inline-block px-2">Galaxy AI 생성</h2>
        <h3 className="text-lg font-medium mt-1">이미지 검증</h3>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 rounded-lg text-left ${
                  location.pathname === item.path
                    ? 'bg-blue text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t">
        <div className="flex items-center justify-between">
          <img src="/lovable-uploads/af769949-119a-48b6-9681-85b3392ad109.png" alt="Samsung Logo" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
