import { useState, useEffect } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { Button } from '@/app/components/ui/button';
import { useCalculator, HistoryItem } from '@/app/hooks/useCalculator';

function formatResult(raw: string): string {
  const num = parseFloat(raw);
  if (isNaN(num)) return raw;
  if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(4);
  return raw;
}

export function TICalculator() {
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
    insertAns,
    angleMode,
    toggleAngleMode,
  } = useCalculator();

  const [maxLines, setMaxLines] = useState(3);
  const [secondFunction, setSecondFunction] = useState(false);

  const formattedHistory: HistoryItem[] = history.map((item) => ({
    expression: item.expression,
    result: formatResult(item.result),
  }));

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
      } else if (e.key === '+' || e.key === '-') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '*') {
        e.preventDefault();
        appendValue('*');
      } else if (e.key === '/') {
        e.preventDefault();
        appendValue('/');
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
      } else if (e.key === ',') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '%') {
        e.preventDefault();
        handleButtonClick('%');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expression, history, calculate, historyUp, historyDown, deleteLast, clear, appendValue]);

  const handleButtonClick = (value: string) => {
    if (value === 'enter') {
      calculate();
    } else if (value === 'clear') {
      clear();
    } else if (value === 'delete') {
      deleteLast();
    } else if (value === '2nd') {
      setSecondFunction(!secondFunction);
    } else if (value === 'ans') {
      insertAns();
    } else if (value === 'mode') {
      setSecondFunction(false);
    } else if (value === 'π') {
      appendValue('pi');
      setSecondFunction(false);
    } else if (value === 'e') {
      appendValue('e');
      setSecondFunction(false);
    } else if (value === '√(') {
      appendValue('sqrt(');
      setSecondFunction(false);
    } else if (value === 'x²') {
      appendValue('^2');
      setSecondFunction(false);
    } else if (value === '^') {
      appendValue('^');
      setSecondFunction(false);
    } else if (value === 'ˣ√y') {
      appendValue('^(1/');
      setSecondFunction(false);
    } else if (value === 'log(') {
      appendValue('log10(');
      setSecondFunction(false);
    } else if (value === 'ln(') {
      appendValue('log(');
      setSecondFunction(false);
    } else if (value === '10^(') {
      appendValue('10^(');
      setSecondFunction(false);
    } else if (value === 'e^(') {
      appendValue('e^(');
      setSecondFunction(false);
    } else if (value === 'sin(') {
      appendValue('sin(');
      setSecondFunction(false);
    } else if (value === 'cos(') {
      appendValue('cos(');
      setSecondFunction(false);
    } else if (value === 'tan(') {
      appendValue('tan(');
      setSecondFunction(false);
    } else if (value === 'sin⁻¹(') {
      appendValue('asin(');
      setSecondFunction(false);
    } else if (value === 'cos⁻¹(') {
      appendValue('acos(');
      setSecondFunction(false);
    } else if (value === 'tan⁻¹(') {
      appendValue('atan(');
      setSecondFunction(false);
    } else if (value === 'x⁻¹') {
      appendValue('^(-1)');
      setSecondFunction(false);
    } else if (value === 'n/d') {
      appendValue('/');
      setSecondFunction(false);
    } else if (value === '÷') {
      appendValue('/');
    } else if (value === '×') {
      appendValue('*');
    } else if (value === '+/-') {
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
    } else {
      appendValue(value);
      setSecondFunction(false);
    }
  };

  const buttonLayout = [
    [
      { primary: 'x²', secondary: '√(', label: 'x²', secondLabel: '√' },
      { primary: '^', secondary: 'ˣ√y', label: '^', secondLabel: 'ˣ√y' },
      { primary: 'log(', secondary: '10^(', label: 'log', secondLabel: '10ˣ' },
      { primary: 'ln(', secondary: 'e^(', label: 'ln', secondLabel: 'eˣ' },
      { primary: '(-', secondary: '', label: '(−)', secondLabel: '' },
    ],
    [
      { primary: 'sin(', secondary: 'sin⁻¹(', label: 'sin', secondLabel: 'sin⁻¹' },
      { primary: 'cos(', secondary: 'cos⁻¹(', label: 'cos', secondLabel: 'cos⁻¹' },
      { primary: 'tan(', secondary: 'tan⁻¹(', label: 'tan', secondLabel: 'tan⁻¹' },
      { primary: 'π', secondary: 'e', label: 'π', secondLabel: 'e' },
      { primary: '÷', secondary: '', label: '÷', secondLabel: '' },
    ],
    [
      { primary: 'x⁻¹', secondary: 'n/d', label: 'x⁻¹', secondLabel: 'n/d' },
      { primary: 'abs(', secondary: '', label: 'abs', secondLabel: '' },
      { primary: '(', secondary: '', label: '(', secondLabel: '' },
      { primary: ')', secondary: '', label: ')', secondLabel: '' },
      { primary: '×', secondary: '', label: '×', secondLabel: '' },
    ],
    [
      { primary: ',', secondary: '', label: ',', secondLabel: '' },
      { primary: 'ans', secondary: '', label: 'ans', secondLabel: '' },
      { primary: '7', secondary: '', label: '7', secondLabel: '' },
      { primary: '8', secondary: '', label: '8', secondLabel: '' },
      { primary: '9', secondary: '', label: '9', secondLabel: '' },
    ],
    [
      { primary: '!', secondary: '', label: 'x!', secondLabel: '' },
      { primary: '%', secondary: '', label: '%', secondLabel: '' },
      { primary: '4', secondary: '', label: '4', secondLabel: '' },
      { primary: '5', secondary: '', label: '5', secondLabel: '' },
      { primary: '6', secondary: '', label: '6', secondLabel: '' },
    ],
    [
      { primary: '', secondary: '', label: '', secondLabel: '' },
      { primary: '', secondary: '', label: '', secondLabel: '' },
      { primary: '1', secondary: '', label: '1', secondLabel: '' },
      { primary: '2', secondary: '', label: '2', secondLabel: '' },
      { primary: '3', secondary: '', label: '3', secondLabel: '' },
    ],
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <CalculatorDisplay
        history={formattedHistory}
        currentExpression={expression}
        maxLines={maxLines}
        onMaxLinesChange={setMaxLines}
        onExpressionChange={setExpression}
        onCalculate={calculate}
      />
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleButtonClick('2nd')}
          variant={secondFunction ? 'default' : 'secondary'}
          className="h-12 font-semibold"
        >
          2nd
        </Button>
        <Button
          onClick={toggleAngleMode}
          variant="outline"
          className="h-12 font-semibold"
        >
          {angleMode}
        </Button>
      </div>

      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((btn, columnIndex) => btn.label ? (
            <Button
              key={btn.label}
              onClick={() => handleButtonClick(secondFunction && btn.secondary ? btn.secondary : btn.primary)}
              variant="secondary"
              className="h-12 text-sm font-semibold relative"
            >
              <div className="flex flex-col items-center">
                {btn.secondLabel && (
                  <span className="text-xs text-blue-400 mb-0.5">{btn.secondLabel}</span>
                )}
                <span>{btn.label}</span>
              </div>
            </Button>
          ) : <div key={columnIndex} aria-hidden="true" />)}
        </div>
      ))}

      <div className="grid grid-cols-5 gap-2">
        <Button
          onClick={() => clear()}
          variant="secondary"
          className="h-12 text-sm font-semibold"
        >
          초기화
        </Button>
        <Button
          onClick={() => handleButtonClick('+/-')}
          variant="secondary"
          className="h-12 text-sm font-semibold"
        >
          +/−
        </Button>
        <Button
          onClick={() => handleButtonClick('.')}
          variant="outline"
          className="h-12 text-lg font-semibold"
        >
          .
        </Button>
        <Button
          onClick={() => handleButtonClick('0')}
          variant="outline"
          className="h-12 text-lg font-semibold"
        >
          0
        </Button>
        <Button
          onClick={() => handleButtonClick('enter')}
          variant="default"
          className="h-12 text-sm font-semibold row-span-2"
        >
          계산
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <Button
          onClick={() => handleButtonClick('delete')}
          variant="destructive"
          className="h-12 text-sm font-semibold col-span-2"
        >
          삭제
        </Button>
        <Button
          onClick={() => handleButtonClick('clear')}
          variant="destructive"
          className="h-12 text-sm font-semibold"
        >
          지우기
        </Button>
        <Button
          onClick={() => handleButtonClick('-')}
          variant="outline"
          className="h-12 text-lg font-semibold"
        >
          −
        </Button>
        <Button
          onClick={() => handleButtonClick('+')}
          variant="outline"
          className="h-12 text-lg font-semibold"
        >
          +
        </Button>
      </div>
    </div>
  );
}
