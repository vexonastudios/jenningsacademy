"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function useSpeechAsync(voiceId) {
  const audioRef = useRef(null);
  const mountedRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsPlaying(true);
    const audio = new Audio(`/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    
    const finish = () => {
      if (mountedRef.current) setIsPlaying(false);
      resolve();
    };
    
    audio.onended = finish;
    audio.onerror = finish;
    audio.play().catch(finish);
  }), [voiceId]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (mountedRef.current) setIsPlaying(false);
  }, []);

  return { speakAsync, stop, isPlaying };
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

function buildOptionsAudio(q, isExplain) {
  const source = isExplain ? q.explainBack : q;
  const opts = source.options;
  if (!opts || opts.length === 0) return "";

  const optTexts = opts.map(o => o.text);
  let optionsString = "";
  if (optTexts.length === 1) optionsString = optTexts[0];
  else if (optTexts.length === 2) optionsString = `${optTexts[0]} ... or ${optTexts[1]}`;
  else {
    const last = optTexts.pop();
    optionsString = `${optTexts.join("... ")} ... or ${last}`;
  }

  if (source.question) {
    return `${source.question} ... ${optionsString}?`;
  }

  if (q.type === "spot-flaw") {
      return `Is this ... ${optionsString}?`;
  }
  if (q.type === "fair-unfair") {
      return `Is this a ... ${optionsString}?`;
  }
  if (q.type === "contradiction-hunt") {
      return `Do these state that ... ${optionsString}?`;
  }
  return `What do you think? Is it ... ${optionsString}?`;
}

export default function LogicEngine({ content, voiceId, isTestMode, onComplete }) {
  const { speakAsync, stop, isPlaying } = useSpeechAsync(voiceId);

  // Flow State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState(() => content[0]?.concept ? "concept-intro" : "intro");
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showingExplain, setShowingExplain] = useState(false);
  const [reorderedList, setReorderedList] = useState(null);

  // Metrics
  const [scoreAcc, setScoreAcc] = useState(0);

  const q = content[currentIndex];
  const isChain = q.type === "build-chain";

  // Intro Audio Sequence
  useEffect(() => {
    let isActive = true;
    if (phase === "concept-intro") {
      speakAsync(`${q.concept.title}. ${q.concept.description}`).then(() => {
        // Wait for user to click "Got it!"
      });
    } else if (phase === "intro") {
      speakAsync(q.audioText).then(() => {
        if (!isActive) return;
        setPhase("interaction");
        if (isChain) {
          setReorderedList([...q.parts]);
        } else {
          speakAsync(buildOptionsAudio(q, false));
        }
      });
    }
    return () => {
      isActive = false;
      // We intentionally do NOT call stop() here, as transitioning to "interaction"
      // would instantly kill the queued options audio we just explicitly triggered.
    };
  }, [currentIndex, phase, q, speakAsync, isChain]);

  // Clean up ALL audio when the engine unmounts entirely
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleOptionClick = (opt) => {
    if (phase !== "interaction" && phase !== "explain-back") return;
    setSelectedOpt(opt);

    const isCorrect = isChain 
      ? JSON.stringify(reorderedList.map(i => i.id)) === JSON.stringify(q.correctOrder)
      : opt.isCorrect;

    if (isCorrect && !showingExplain) {
      setScoreAcc(s => s + 1);
    }
    
    if (isTestMode) {
      setPhase("test-transition");
      setTimeout(() => {
         nextQuestionCore(true);
      }, 1200);
      return;
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
    
    if (isTestMode) {
      setPhase("test-transition");
      setTimeout(() => {
         nextQuestionCore(true);
      }, 1200);
      return;
    }
    
    setPhase("feedback");
    speakAsync(isCorrect ? "Excellent chain." : "That structure is flawed. The claim should be supported by evidence to yield a conclusion.");
  };

  const nextQuestion = () => nextQuestionCore(false);

  const nextQuestionCore = (skipExplain) => {
    stop();
    if (!skipExplain && phase === "feedback" && q.explainBack && selectedOpt?.isCorrect) {
      // Go to explain back
      setPhase("explain-back");
      setShowingExplain(true);
      setSelectedOpt(null);
      speakAsync(buildOptionsAudio(q, true));
      return;
    }

    // Go to next question or complete
    if (currentIndex + 1 < content.length) {
      const nextQ = content[currentIndex + 1];
      setCurrentIndex(c => c + 1);
      setPhase(nextQ.concept ? "concept-intro" : "intro");
      setSelectedOpt(null);
      setShowingExplain(false);
      setReorderedList(null);
    } else {
      setPhase("complete");
      const finalScore = Math.max(0, Math.round((scoreAcc / content.length) * 100));
      if (isTestMode) {
         speakAsync(`Test complete! You scored ${finalScore} percent.`);
      } else {
         speakAsync(`Great job! You finished today's logic lesson.`);
      }
    }
  };

  const isInteraction = phase === "interaction" || phase === "explain-back";
  const isFeedback = phase === "feedback" || phase === "explain-feedback";

  if (phase === "complete") {
    const finalScore = Math.max(0, Math.round((scoreAcc / content.length) * 100));
    return (
      <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto px-6 py-8 items-center justify-center">
         <div className="bg-white rounded-3xl p-10 shadow-xl border-4 border-indigo-50 text-center w-full min-h-[300px] flex flex-col items-center justify-center animate-[slideUp_0.4s_ease-out]">
            {isTestMode ? (
               <>
                 <h2 className="text-4xl font-black text-slate-800 mb-4">Test Complete!</h2>
                 <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-purple-600 my-8">
                   {finalScore}%
                 </div>
                 <p className="text-lg text-slate-500 font-medium mb-10">
                   Great job showing what you've learned.
                 </p>
               </>
            ) : (
               <>
                 <div className="bg-emerald-100 text-emerald-600 p-6 rounded-full mb-6">
                    <CheckCircle2 className="w-16 h-16" />
                 </div>
                 <h2 className="text-4xl font-black text-slate-800 mb-4">Lesson Complete!</h2>
                 <p className="text-lg text-slate-500 font-medium mb-10">
                   You crushed today's reasoning challenges!
                 </p>
               </>
            )}
            <button 
              onClick={() => onComplete({ score: finalScore })}
              className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl py-5 rounded-[2rem] shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3"
            >
               Finish Day <ArrowRight className="w-7 h-7" />
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto px-6 py-8">
      
      {/* Timeline Tracker */}
      <div className="flex justify-center gap-1.5 mb-8 w-full">
        {content.map((_, i) => {
          const isPast = i < currentIndex || (i === currentIndex && isFeedback);
          const isCurrent = i === currentIndex && !isFeedback;
          return (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500
              ${isCurrent ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)] scale-y-110" 
                : isPast ? "bg-emerald-400" : "bg-slate-200"}`} 
            />
          );
        })}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {phase === "concept-intro" && q.concept && (
          <div className="bg-indigo-50 border-4 border-indigo-100 rounded-3xl p-8 w-full mb-8 text-center animate-[slideUp_0.3s_ease-out]">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">New Logic Concept</h3>
            <h2 className="text-4xl font-black text-indigo-900 mb-6">{q.concept.title}</h2>
            <p className="text-xl text-indigo-800 font-medium leading-relaxed mb-8">
              {q.concept.description}
            </p>
            <button
              onClick={() => {
                stop();
                setPhase("intro");
              }}
              disabled={isPlaying}
              className={`px-8 py-4 rounded-full font-bold text-xl shadow-md transition-all mx-auto flex items-center justify-center gap-2
                ${isPlaying 
                  ? "bg-indigo-200 text-indigo-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"}`}
            >
              {isPlaying ? "Listen..." : "Got it!"} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scenario Box */}
        {phase !== "concept-intro" && (!showingExplain || phase === "explain-back" || phase === "explain-feedback") && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 w-full mb-8 relative">
            <button 
              onClick={() => {
                stop();
                if (phase === "interaction" || phase === "explain-back") {
                  speakAsync(buildOptionsAudio(q, showingExplain));
                } else {
                  speakAsync(showingExplain ? q.explainBack.question : q.audioText);
                }
              }}
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

          {isInteraction && !isChain && (showingExplain ? q.explainBack.options : q.options).map((opt, i) => {
            const isSelected = selectedOpt === opt;
            const styleClass = phase === "test-transition" && isSelected 
                ? "bg-indigo-500 text-white border-indigo-600" 
                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-transparent";
            return (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className={`w-full p-4 rounded-xl border-2 font-semibold text-lg transition-colors text-left ${styleClass}`}
              >
                {opt.text}
              </button>
            );
          })}

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
                disabled={isPlaying}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg
                  ${isPlaying 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                {isPlaying ? "Listen..." : "Continue"} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
