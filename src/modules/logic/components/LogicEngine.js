"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function useSpeechAsync(voiceId) {
  const audioRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      audioRef.current?.pause();
    };
  }, []);

  const speakAsync = useCallback((text) => new Promise((resolve) => {
    if (!voiceId || !text || !mountedRef.current) { resolve(); return; }
    audioRef.current?.pause();
    const audio = new Audio(`/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(resolve);
  }), [voiceId]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  return { speakAsync, stop };
}

// Custom Draggable List for "Build Chain"
function DraggableList({ items, onReorder }) {
  const [list, setList] = useState(items);

  useEffect(() => { setList(items); }, [items]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === dropIndex) return;
    const newList = [...list];
    const [dragged] = newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, dragged);
    setList(newList);
    onReorder(newList);
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      {list.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          className="p-4 bg-white border-2 border-slate-200 rounded-xl cursor-grab active:cursor-grabbing text-slate-800 font-semibold text-center select-none shadow-sm hover:border-slate-300 transition-colors"
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default function LogicEngine({ content, voiceId, onComplete }) {
  const { speakAsync, stop } = useSpeechAsync(voiceId);

  // Flow State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro -> interaction -> feedback -> (explain-back) -> feedback
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showingExplain, setShowingExplain] = useState(false);
  const [reorderedList, setReorderedList] = useState(null);

  // Metrics
  const [scoreAcc, setScoreAcc] = useState(0);

  const q = content[currentIndex];
  const isChain = q.type === "build-chain";

  useEffect(() => {
    if (phase === "intro") {
      speakAsync(q.audioText).then(() => {
        setPhase("interaction");
        if (isChain) setReorderedList([...q.parts]);
      });
    }
    return () => stop();
  }, [currentIndex, phase, q, speakAsync, stop, isChain]);

  const handleOptionClick = (opt) => {
    if (phase !== "interaction" && phase !== "explain-back") return;
    setSelectedOpt(opt);

    const isCorrect = isChain 
      ? JSON.stringify(reorderedList.map(i => i.id)) === JSON.stringify(q.correctOrder)
      : opt.isCorrect;

    if (isCorrect && !showingExplain) {
      setScoreAcc(s => s + 1);
    }

    setPhase(showingExplain ? "explain-feedback" : "feedback");
    
    // Read feedback if available
    if (opt.feedback) {
      speakAsync(opt.feedback);
    }
  };

  const handleListSubmit = () => {
    if (!reorderedList) return;
    const isCorrect = JSON.stringify(reorderedList.map(i => i.id)) === JSON.stringify(q.correctOrder);
    setSelectedOpt({ isCorrect, feedback: isCorrect ? "Excellent chain." : "That structure is technically flawed." });
    if (isCorrect) setScoreAcc(s => s + 1);
    
    setPhase("feedback");
    speakAsync(isCorrect ? "Excellent chain." : "That structure is flawed. The claim should be supported by evidence to yield a conclusion.");
  };

  const nextQuestion = () => {
    stop();
    if (phase === "feedback" && q.explainBack && selectedOpt?.isCorrect) {
      // Go to explain back
      setPhase("explain-back");
      setShowingExplain(true);
      setSelectedOpt(null);
      speakAsync(q.explainBack.question);
      return;
    }

    // Go to next question or complete
    if (currentIndex + 1 < content.length) {
      setCurrentIndex(c => c + 1);
      setPhase("intro");
      setSelectedOpt(null);
      setShowingExplain(false);
      setReorderedList(null);
    } else {
      onComplete({ score: Math.round((scoreAcc / content.length) * 100) });
    }
  };

  const isInteraction = phase === "interaction" || phase === "explain-back";
  const isFeedback = phase === "feedback" || phase === "explain-feedback";

  return (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto px-6 py-8">
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-indigo-500 h-full transition-all duration-500" 
          style={{ width: `${((currentIndex + (isFeedback ? 1 : 0)) / content.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Scenario Box */}
        {(!showingExplain || phase === "explain-back" || phase === "explain-feedback") && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 w-full mb-8 relative">
            <button 
              onClick={() => speakAsync(showingExplain ? q.explainBack.question : q.audioText)}
              className="absolute top-4 right-4 text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <Volume2 className="w-6 h-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed pr-8 whitespace-pre-wrap">
              {showingExplain ? q.explainBack.question : q.scenario}
            </h2>
          </div>
        )}

        {/* Options / Interactions */}
        <div className="w-full flex flex-col gap-3">
          {(phase === "intro") && !isChain && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-pulse flex gap-2">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animation-delay-200"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animation-delay-400"></div>
              </div>
            </div>
          )}

          {isInteraction && !isChain && (showingExplain ? q.explainBack.options : q.options).map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              className="w-full p-4 rounded-xl border-2 border-transparent bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold text-lg transition-colors text-left"
            >
              {opt.text}
            </button>
          ))}

          {isInteraction && isChain && (
            <>
              <DraggableList items={reorderedList} onReorder={setReorderedList} />
              <button
                onClick={handleListSubmit}
                className="mt-6 w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl transition-all shadow-md active:scale-95"
              >
                Submit Order
              </button>
            </>
          )}

          {isFeedback && (
            <div className="w-full flex flex-col items-center gap-6 mt-4">
              <div className={`flex flex-col items-center gap-3 p-6 rounded-2xl w-full border-2 ${selectedOpt?.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                {selectedOpt?.isCorrect ? (
                  <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-rose-500" />
                )}
                {selectedOpt?.feedback && (
                  <p className="text-lg font-medium text-center" style={{ color: selectedOpt?.isCorrect ? '#065f46' : '#991b1b' }}>
                    {selectedOpt.feedback}
                  </p>
                )}
              </div>
              
              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
