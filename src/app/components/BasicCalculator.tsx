import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { CalculatorDisplay } from './CalculatorDisplay';
import { Button } from '@/app/components/ui/button';
import { useCalculator } from '@/app/hooks/useCalculator';

export function BasicCalculator() {
  const {
    expression,
    history,
    setExpression,
    appendValue,
    clear,
    deleteLast,
    calculate,
    historyUp,
    historyDown,
  } = useCalculator();

  const [maxLines, setMaxLines] = useState(3);
  const [memory, setMemory] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.activeElement?.closest('button, a, textarea, select, [role="tab"], [contenteditable="true"]')) return;
      if (document.activeElement?.tagName === 'INPUT') {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculate();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          historyUp();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          historyDown();
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clear();
      } else if (e.key === '(' || e.key === ')') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '%') {
        e.preventDefault();
        handleButtonClick('%');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expression, history, calculate, historyUp, historyDown, deleteLast, clear]);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clear();
    } else if (value === 'AC') {
      clear();
      setMemory(0);
    } else if (value === '⌫') {
      deleteLast();
    } else if (value === '%') {
      appendValue('/100');
    } else if (value === '±') {
      if (expression) {
        try {
          const result = evaluate(expression);
          setExpression((-result).toString());
        } catch {
          setExpression(`-(${expression})`);
        }
      }
    } else if (value === '√') {
      appendValue('sqrt(');
    } else if (value === 'x²') {
      appendValue('^2');
    } else if (value === 'MC') {
      setMemory(0);
    } else if (value === 'MR') {
      appendValue(memory.toString());
    } else if (value === 'M+') {
      if (expression) {
        try {
          const result = evaluate(expression);
          setMemory((prev) => prev + result);
        } catch { /* silent fail for invalid expression */ }
      }
    } else if (value === 'M-') {
      if (expression) {
        try {
          const result = evaluate(expression);
          setMemory((prev) => prev - result);
        } catch { /* silent fail for invalid expression */ }
      }
    } else {
      appendValue(value);
    }
  };

  const buttons = [
    ['MC', 'MR', 'M+', 'M-', 'AC'],
    ['√', 'x²', '%', '±', '⌫'],
    ['7', '8', '9', '/', '*'],
    ['4', '5', '6', '-', '+'],
    ['1', '2', '3', '(', ')'],
    ['0', '00', '.', 'C', '='],
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <CalculatorDisplay
        history={history}
        currentExpression={expression}
        maxLines={maxLines}
        onMaxLinesChange={setMaxLines}
        onExpressionChange={setExpression}
        onCalculate={calculate}
      />
      
      <div className="grid gap-2">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {row.map((btn, btnIndex) => (
              <Button
                key={`${rowIndex}-${btnIndex}-${btn}`}
                onClick={() => handleButtonClick(btn)}
                variant={
                  btn === '=' ? 'default' : 
                  btn === 'AC' || btn === 'C' || btn === '⌫' ? 'destructive' : 
                  btn.startsWith('M') ? 'secondary' :
                  'outline'
                }
                className="h-14 text-lg font-semibold"
                disabled={btn === ''}
              >
                {btn}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
