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

export function ScientificCalculator() {
  const {
    expression,
    history,
    setExpression,
    appendValue,
    clearAll,
    deleteLast,
    calculate,
    historyUp,
    historyDown,
    insertAns,
    angleMode,
    toggleAngleMode,
  } = useCalculator();

  const [maxLines, setMaxLines] = useState(3);
  const [shiftActive, setShiftActive] = useState(false);

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
        clearAll();
        setShiftActive(false);
      } else if (e.key === '(' || e.key === ')') {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleButtonClick(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expression, history, calculate, historyUp, historyDown, deleteLast, clearAll, appendValue]);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      calculate();
    } else if (value === 'AC') {
      clearAll();
      setShiftActive(false);
    } else if (value === 'DEL') {
      deleteLast();
    } else if (value === 'SHIFT') {
      setShiftActive(!shiftActive);

    } else if (value === 'Ans') {
      insertAns();
      setShiftActive(false);
    } else if (value === '×10ˣ') {
      appendValue('*10^');
      setShiftActive(false);
    } else if (value === 'π') {
      appendValue('pi');
      setShiftActive(false);
    } else if (value === 'e') {
      appendValue('e');
      setShiftActive(false);
    } else if (value === 'x²') {
      appendValue('^2');
      setShiftActive(false);
    } else if (value === '√') {
      appendValue('sqrt(');
      setShiftActive(false);
    } else if (value === 'xʸ') {
      appendValue('^');
      setShiftActive(false);
    } else if (value === 'ˣ√') {
      appendValue('^(1/');
      setShiftActive(false);
    } else if (value === 'log(') {
      appendValue('log10(');
      setShiftActive(false);
    } else if (value === '10ˣ') {
      appendValue('10^');
      setShiftActive(false);
    } else if (value === 'ln(') {
      appendValue('log(');
      setShiftActive(false);
    } else if (value === 'eˣ') {
      appendValue('e^');
      setShiftActive(false);
    } else if (value === 'sin(') {
      appendValue('sin(');
      setShiftActive(false);
    } else if (value === 'sin⁻¹(') {
      appendValue('asin(');
      setShiftActive(false);
    } else if (value === 'cos(') {
      appendValue('cos(');
      setShiftActive(false);
    } else if (value === 'cos⁻¹(') {
      appendValue('acos(');
      setShiftActive(false);
    } else if (value === 'tan(') {
      appendValue('tan(');
      setShiftActive(false);
    } else if (value === 'tan⁻¹(') {
      appendValue('atan(');
      setShiftActive(false);
    } else if (value === '(-') {
      appendValue('(-');
      setShiftActive(false);
    } else if (value === 'abs(') {
      appendValue('abs(');
      setShiftActive(false);
    } else if (value === '÷') {
      appendValue('/');
    } else if (value === '×') {
      appendValue('*');
    } else {
      appendValue(value);
      setShiftActive(false);
    }
  };

  const functionRow1 = [
    { primary: '√', shift: 'x²', label: '√' },
    { primary: 'x²', shift: '√', label: 'x²' },
    { primary: 'xʸ', shift: 'ˣ√', label: 'xʸ' },
    { primary: 'log(', shift: '10ˣ', label: 'log' },
    { primary: 'ln(', shift: 'eˣ', label: 'ln' },
  ];

  const functionRow2 = [
    { primary: '(-', label: '(−)' },
    { primary: 'abs(', label: 'abs' },
    { primary: 'sin(', shift: 'sin⁻¹(', label: 'sin' },
    { primary: 'cos(', shift: 'cos⁻¹(', label: 'cos' },
    { primary: 'tan(', shift: 'tan⁻¹(', label: 'tan' },
  ];

  const functionRow3 = [
    { primary: '(', label: '(' },
    { primary: ')', label: ')' },
  ];

  const numpadButtons = [
    ['7', '8', '9', 'DEL', 'AC'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '+', '-'],
    ['0', '.', '×10ˣ', 'Ans', '='],
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
          onClick={() => handleButtonClick('SHIFT')}
          variant={shiftActive ? 'default' : 'secondary'}
          className="h-12 font-semibold"
        >
          SHIFT
        </Button>
        <Button
          onClick={toggleAngleMode}
          variant="outline"
          className="h-12 font-semibold"
        >
          {angleMode}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {functionRow1.map((btn) => (
          <Button
            key={btn.label}
            onClick={() => handleButtonClick(shiftActive && btn.shift ? btn.shift : btn.primary)}
            variant="secondary"
            className="h-12 text-sm font-semibold relative"
          >
            <div className="flex flex-col items-center">
              {btn.shift && (
                <span className="text-xs text-orange-400 mb-0.5">{btn.shift}</span>
              )}
              <span>{btn.label}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {functionRow2.map((btn) => (
          <Button
            key={btn.label}
            onClick={() => handleButtonClick(shiftActive && btn.shift ? btn.shift : btn.primary)}
            variant="secondary"
            className="h-12 text-sm font-semibold relative"
          >
            <div className="flex flex-col items-center">
              {btn.shift && (
                <span className="text-xs text-orange-400 mb-0.5">{btn.shift}</span>
              )}
              <span>{btn.label}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {functionRow3.map((btn) => (
          <Button
            key={btn.label}
            onClick={() => handleButtonClick(btn.primary)}
            variant="secondary"
            className="h-12 text-sm font-semibold"
          >
            {btn.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-2">
        {numpadButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {row.map((btn) => (
              <Button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                variant={
                  btn === '=' ? 'default' : 
                  btn === 'DEL' || btn === 'AC' ? 'destructive' : 
                  'outline'
                }
                className="h-14 text-lg font-semibold"
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
