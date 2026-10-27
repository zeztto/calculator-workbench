import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface HistoryItem {
  expression: string;
  result: string;
}

interface CalculatorDisplayProps {
  history: HistoryItem[];
  currentExpression: string;
  maxLines: number;
  onMaxLinesChange: (lines: number) => void;
  onExpressionChange: (expression: string) => void;
  onCalculate: () => void;
}

export function CalculatorDisplay({ 
  history, 
  currentExpression, 
  maxLines, 
  onMaxLinesChange,
  onExpressionChange,
  onCalculate
}: CalculatorDisplayProps) {
  // 모든 히스토리를 표시하고 스크롤 가능하게 변경
  const displayItems = history;
  
  // 줄 수에 따라 높이를 동적으로 계산 (각 줄당 약 70px)
  const historyHeight = maxLines * 70;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onCalculate();
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex gap-2">
          {[1, 3, 5].map((num) => (
            <Button
              key={num}
              onClick={() => onMaxLinesChange(num)}
              variant={maxLines === num ? "default" : "outline"}
              size="sm"
              className="w-12 h-8"
            >
              {num}줄
            </Button>
          ))}
        </div>
      </div>
      
      {/* 히스토리 표시 영역 */}
      <ScrollArea 
        className="w-full rounded-md border bg-neutral-950 p-4"
        style={{ height: `${historyHeight}px` }}
      >
        <div className="space-y-2 font-mono">
          {displayItems.length > 0 ? (
            displayItems.map((item, index) => (
              <div key={index} className="min-h-6">
                {item.expression && (
                  <div className="text-neutral-400 text-sm break-all">
                    {item.expression}
                  </div>
                )}
                {item.result && (
                  <div className="text-white text-lg font-semibold break-all">
                    = {item.result}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </ScrollArea>
      
      {/* 현재 입력 필드 */}
      <div className="relative">
        <Input
          aria-label="계산 수식"
          value={currentExpression}
          onChange={(e) => onExpressionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="수식을 입력하세요..."
          className="w-full h-14 text-xl font-mono pr-28 bg-neutral-950 border text-white placeholder:text-neutral-500 focus-visible:ring-2"
          autoFocus
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
          Enter로 계산
        </div>
      </div>
    </div>
  );
}