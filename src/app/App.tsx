import { useState } from 'react';
import { Calculator, Sigma, Binary, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { BasicCalculator } from '@/app/components/BasicCalculator';
import { ScientificCalculator } from '@/app/components/ScientificCalculator';
import { TICalculator } from '@/app/components/TICalculator';
import { AlphaOmegaCalculator } from '@/app/components/AlphaOmegaCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans break-keep [overflow-wrap:anywhere]">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 헤더 */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-neutral-900" />
            <h1 className="text-4xl font-bold text-neutral-900">다기능 계산기</h1>
          </div>
          <p className="text-neutral-600 text-lg">
            사칙연산부터 삼각함수와 통계 계산까지
          </p>
        </header>

        {/* 계산기 본체 */}
        <div className="w-full max-w-2xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>단순</span>
              </TabsTrigger>
              <TabsTrigger value="scientific" className="flex items-center gap-2">
                <Sigma className="w-4 h-4" />
                <span>공학</span>
              </TabsTrigger>
              <TabsTrigger value="ti" className="flex items-center gap-2">
                <Binary className="w-4 h-4" />
                <span>확장</span>
              </TabsTrigger>
              <TabsTrigger value="alphaomega" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>고급</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0">
              <BasicCalculator />
            </TabsContent>

            <TabsContent value="scientific" className="mt-0">
              <ScientificCalculator />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TICalculator />
            </TabsContent>

            <TabsContent value="alphaomega" className="mt-0">
              <AlphaOmegaCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}