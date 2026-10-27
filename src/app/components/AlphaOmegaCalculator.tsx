import { useState, useEffect } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useCalculator, HistoryItem } from '@/app/hooks/useCalculator';

function formatResult(raw: string): string {
  const num = parseFloat(raw);
  if (isNaN(num)) return raw;
  if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(4);
  return raw;
}

export function AlphaOmegaCalculator() {
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
  const [functionTab, setFunctionTab] = useState('basic');

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
      } else if (e.key === ',') {
        e.preventDefault();
        handleButtonClick(',');
      } else if (e.key === '%') {
        e.preventDefault();
        handleButtonClick('%');
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
    } else if (value === 'π') {
      appendValue('pi');
      setShiftActive(false);
    } else if (value === 'e') {
      appendValue('e');
      setShiftActive(false);
    } else if (value === 'τ') {
      appendValue('tau');
      setShiftActive(false);
    } else if (value === 'φ') {
      appendValue('phi');
      setShiftActive(false);
    } else if (value === '÷') {
      appendValue('/');
      setShiftActive(false);
    } else if (value === '×') {
      appendValue('*');
      setShiftActive(false);
    } else if (value === '×10ˣ') {
      appendValue('*10^');
      setShiftActive(false);
    } else {
      appendValue(value);
      setShiftActive(false);
    }
  };

  const basicButtons = [
    [
      { primary: 'abs(', shift: 'sign(', label: 'abs' },
      { primary: 'sqrt(', shift: 'cbrt(', label: '√' },
      { primary: '^2', shift: '^3', label: 'x²' },
      { primary: '^', shift: 'nthRoot(', label: 'xʸ' },
      { primary: '!', shift: '', label: 'x!' },
    ],
    [
      { primary: 'exp(', shift: 'expm1(', label: 'exp' },
      { primary: 'log(', shift: 'log1p(', label: 'ln' },
      { primary: 'log10(', shift: 'log2(', label: 'log' },
      { primary: '10^', shift: '2^', label: '10ˣ' },
      { primary: 'e^', shift: '', label: 'eˣ' },
    ],
    [
      { primary: 'ceil(', shift: 'floor(', label: 'ceil' },
      { primary: 'round(', shift: 'fix(', label: 'round' },
      { primary: 'mod(', shift: 'gcd(', label: 'mod' },
      { primary: 'lcm(', shift: '', label: 'lcm' },
      { primary: 'random()', shift: '', label: 'rand' },
    ],
    [
      { primary: 'π', shift: 'τ', label: 'π' },
      { primary: 'e', shift: 'φ', label: 'e' },
      { primary: '(', shift: '', label: '(' },
      { primary: ')', shift: '', label: ')' },
      { primary: ',', shift: '', label: ',' },
    ],
  ];

  const trigButtons = [
    [
      { primary: 'sin(', shift: 'asin(', label: 'sin' },
      { primary: 'cos(', shift: 'acos(', label: 'cos' },
      { primary: 'tan(', shift: 'atan(', label: 'tan' },
      { primary: 'sec(', shift: 'asec(', label: 'sec' },
      { primary: 'csc(', shift: 'acsc(', label: 'csc' },
    ],
    [
      { primary: 'cot(', shift: 'acot(', label: 'cot' },
      { primary: 'sinh(', shift: 'asinh(', label: 'sinh' },
      { primary: 'cosh(', shift: 'acosh(', label: 'cosh' },
      { primary: 'tanh(', shift: 'atanh(', label: 'tanh' },
      { primary: 'sech(', shift: 'asech(', label: 'sech' },
    ],
    [
      { primary: 'csch(', shift: 'acsch(', label: 'csch' },
      { primary: 'coth(', shift: 'acoth(', label: 'coth' },
      { primary: 'atan2(', shift: '', label: 'atan2' },
      { primary: 'hypot(', shift: '', label: 'hypot' },
      { primary: '', shift: '', label: '' },
    ],
  ];

  const statsButtons = [
    [
      { primary: 'mean(', shift: 'median(', label: 'mean' },
      { primary: 'mode(', shift: 'std(', label: 'mode' },
      { primary: 'variance(', shift: '', label: 'var' },
      { primary: 'min(', shift: 'max(', label: 'min' },
      { primary: 'sum(', shift: 'prod(', label: 'sum' },
    ],
    [
      { primary: 'combinations(', shift: 'permutations(', label: 'nCr' },
      { primary: 'permutations(', shift: 'combinations(', label: 'nPr' },
      { primary: 'gamma(', shift: '', label: 'gamma' },
      { primary: 'factorial(', shift: '', label: 'n!' },
      { primary: '', shift: '', label: '' },
    ],
  ];

  const advancedButtons = [
    [
      { primary: 'complex(', shift: '', label: 'cplx' },
      { primary: 're(', shift: 'im(', label: 're' },
      { primary: 'arg(', shift: 'conj(', label: 'arg' },
      { primary: 'abs(', shift: '', label: '|z|' },
      { primary: '', shift: '', label: '' },
    ],
    [
      { primary: 'matrix([', shift: '])', label: 'mat' },
      { primary: 'det(', shift: 'inv(', label: 'det' },
      { primary: 'transpose(', shift: '', label: 'T' },
      { primary: 'trace(', shift: '', label: 'tr' },
      { primary: '', shift: '', label: '' },
    ],
    [
      { primary: 'erf(', shift: '', label: 'erf' },
      { primary: 'zeta(', shift: '', label: 'zeta' },
      { primary: 'norm(', shift: '', label: 'norm' },
      { primary: 'cross(', shift: 'dot(', label: 'cross' },
      { primary: '', shift: '', label: '' },
    ],
  ];

  const numpadButtons = [
    ['7', '8', '9', 'DEL', 'AC'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '+', '-'],
    ['0', '.', '×10ˣ', 'Ans', '='],
  ];

  interface ButtonDef {
    primary: string;
    shift: string;
    label: string;
  }

  const renderButtonGrid = (buttons: ButtonDef[][]) => {
    return buttons.map((row, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-5 gap-2">
        {row.map((btn, btnIndex) => {
          if (!btn.label) {
            return <div key={btnIndex} className="h-12"></div>;
          }
          return (
            <Button
              key={btn.label}
              onClick={() => handleButtonClick(shiftActive && btn.shift ? btn.shift : btn.primary)}
              variant="secondary"
              className="h-12 text-sm font-semibold relative"
              disabled={!btn.primary}
            >
              <div className="flex flex-col items-center justify-center">
                {btn.shift && (
                  <span className="text-[10px] text-orange-400 absolute top-0.5 left-1">{btn.shift}</span>
                )}
                <span>{btn.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    ));
  };

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
          SHIFT {shiftActive && '(활성)'}
        </Button>
        <Button
          onClick={toggleAngleMode}
          variant="outline"
          className="h-12 font-semibold"
        >
          {angleMode}
        </Button>
      </div>

      <Tabs value={functionTab} onValueChange={setFunctionTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">기본</TabsTrigger>
          <TabsTrigger value="trig">삼각</TabsTrigger>
          <TabsTrigger value="stats">통계</TabsTrigger>
          <TabsTrigger value="advanced">고급</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-4 space-y-2">
          {renderButtonGrid(basicButtons)}
        </TabsContent>

        <TabsContent value="trig" className="mt-4 space-y-2">
          {renderButtonGrid(trigButtons)}
        </TabsContent>

        <TabsContent value="stats" className="mt-4 space-y-2">
          {renderButtonGrid(statsButtons)}
        </TabsContent>

        <TabsContent value="advanced" className="mt-4 space-y-2">
          {renderButtonGrid(advancedButtons)}
        </TabsContent>
      </Tabs>

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
