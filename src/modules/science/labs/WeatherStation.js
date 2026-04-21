"use client";

import { useState, useEffect } from "react";
import { CheckCircle, CloudSun } from "lucide-react";

// The simulated "day" has readings from each instrument
const WEATHER_SCENARIOS = [
  {
    id: "sunny_warm",
    label: "Sunny & Warm",
    thermometer: 78,  // °F
    anemometer: 5,    // mph wind
    rainGauge: 0,     // inches
    humidity: 40,     // %
    skyEmoji: "☀️",
    correctWeather: "sunny",
    correctTemp: "warm",
    correctWind: "calm",
    correctPrecip: "none",
  },
  {
    id: "stormy_cool",
    label: "Stormy & Cool",
    thermometer: 52,
    anemometer: 28,
    rainGauge: 1.2,
    humidity: 92,
    skyEmoji: "⛈️",
    correctWeather: "stormy",
    correctTemp: "cool",
    correctWind: "windy",
    correctPrecip: "rain",
  },
  {
    id: "cloudy_mild",
    label: "Partly Cloudy",
    thermometer: 65,
    anemometer: 12,
    rainGauge: 0,
    humidity: 60,
    skyEmoji: "⛅",
    correctWeather: "cloudy",
    correctTemp: "mild",
    correctWind: "breezy",
    correctPrecip: "none",
  },
];

const OPTIONS = {
  weather: ["sunny", "cloudy", "stormy"],
  temp: ["cold", "cool", "mild", "warm", "hot"],
  wind: ["calm", "breezy", "windy"],
  precip: ["none", "rain", "snow"],
};

const INSTRUMENTS = [
  {
    id: "thermometer",
    name: "Thermometer",
    desc: "Measures air temperature in degrees Fahrenheit.",
    emoji: "🌡️",
    unit: "°F",
    color: "bg-rose-100 border-rose-300",
  },
  {
    id: "anemometer",
    name: "Anemometer",
    desc: "Measures wind speed in miles per hour. The cups spin faster with stronger wind!",
    emoji: "💨",
    unit: "mph",
    color: "bg-sky-100 border-sky-300",
  },
  {
    id: "rainGauge",
    name: "Rain Gauge",
    desc: "Collects and measures the amount of rainfall in inches.",
    emoji: "🧪",
    unit: "in.",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: "humidity",
    name: "Hygrometer",
    desc: "Measures humidity — how much water vapor is in the air. High humidity makes it feel muggy!",
    emoji: "💦",
    unit: "%",
    color: "bg-teal-100 border-teal-300",
  },
];

export default function WeatherStation({ speak, onComplete }) {
  const [scenarioIdx] = useState(() => Math.floor(Math.random() * WEATHER_SCENARIOS.length));
  const scenario = WEATHER_SCENARIOS[scenarioIdx];

  const [viewed, setViewed] = useState({});
  const [forecast, setForecast] = useState({ weather: "", temp: "", wind: "", precip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Weather Station! Scientists who study weather are called meteorologists. Click each instrument to read today's data, then fill in the forecast board!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const handleReadInstrument = (inst) => {
    if (viewed[inst.id]) return;
    setViewed(prev => ({ ...prev, [inst.id]: true }));
    speak(`${inst.name}: ${scenario[inst.id]} ${inst.unit}. ${inst.desc}`);
  };

  const allViewed = INSTRUMENTS.every(i => viewed[i.id]);

  const handleSubmit = () => {
    if (submitted) {
      // "Try Again" — reset form for a fresh attempt
      setSubmitted(false);
      setResults(null);
      setForecast({ weather: "", temp: "", wind: "", precip: "" });
      speak("No problem! Look at each instrument reading carefully and try again.");
      return;
    }

    const r = {
      weather: forecast.weather === scenario.correctWeather,
      temp: forecast.temp === scenario.correctTemp,
      wind: forecast.wind === scenario.correctWind,
      precip: forecast.precip === scenario.correctPrecip,
    };
    setResults(r);
    setSubmitted(true);

    const allRight = Object.values(r).every(Boolean);
    if (allRight) {
      speak(`Outstanding forecast! You read every instrument correctly and predicted ${scenario.label}. You are a real meteorologist!`);
    } else {
      const wrong = Object.entries(r).filter(([, v]) => !v).map(([k]) => k);
      speak(`Good effort! Your ${wrong.join(" and ")} prediction was off. Look at the instrument readings once more and hit Try Again!`);
    }
  };

  const allRight = results && Object.values(results).every(Boolean);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-sky-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-sky-400">
          <CloudSun className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Weather Station</h3>
        </div>
        <p className="text-sky-100/80 text-sm mb-6 leading-relaxed">
          Click each instrument to read today's weather data, then complete the <strong className="text-white">Forecast Board</strong>!
        </p>

        {/* Instrument shelf */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs uppercase font-black text-sky-400 tracking-wider mb-2 border-b border-sky-800 pb-2">Instruments</h4>
          {INSTRUMENTS.map(inst => (
            <button
              key={inst.id}
              onClick={() => handleReadInstrument(inst)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 font-bold text-sm text-left transition-all
                ${viewed[inst.id]
                  ? "bg-sky-900/60 border-sky-600 text-sky-200"
                  : "bg-white/10 border-sky-700 text-white hover:bg-white/20 active:scale-95"}`}
            >
              <span className="text-xl shrink-0">{inst.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span>{inst.name}</span>
                  {viewed[inst.id] && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                {viewed[inst.id] && (
                  <div className="text-sky-300 font-black text-xs mt-0.5">
                    {scenario[inst.id]} {inst.unit}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {!allViewed && (
          <p className="text-sky-400 text-xs font-semibold text-center mt-2">Read all instruments first!</p>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-gradient-to-b from-sky-300 to-sky-100 flex flex-col items-center justify-center p-8 gap-6 relative overflow-hidden">
        {/* Sky scene */}
        <div className="text-7xl drop-shadow-lg animate-pulse">{scenario.skyEmoji}</div>

        {/* Forecast Board */}
        <div className={`bg-white/90 backdrop-blur rounded-2xl shadow-xl border-2 border-sky-200 p-6 w-full max-w-md transition-opacity ${allViewed ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <h3 className="font-extrabold text-slate-800 text-center mb-4 text-lg">📋 Forecast Board</h3>

          {submitted && allRight ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-black text-emerald-600 text-lg mb-1">Perfect Forecast!</p>
              <p className="text-slate-500 text-sm">Today is: {scenario.label}</p>
              <button onClick={onComplete} className="mt-4 bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-transform hover:-translate-y-1">
                Finish Lab
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { key: "weather", label: "Sky Conditions", opts: OPTIONS.weather },
                { key: "temp", label: "Temperature", opts: OPTIONS.temp },
                { key: "wind", label: "Wind", opts: OPTIONS.wind },
                { key: "precip", label: "Precipitation", opts: OPTIONS.precip },
              ].map(({ key, label, opts }) => (
                <div key={key}>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">{label}</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {opts.map(opt => {
                      const selected = forecast[key] === opt;
                      const isRight = submitted && results && results[key] && selected;
                      const isWrong = submitted && results && !results[key] && selected;
                      return (
                        <button
                          key={opt}
                          disabled={submitted && allRight}
                          onClick={() => setForecast(f => ({ ...f, [key]: opt }))}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all capitalize
                            ${isRight ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                              : isWrong ? "bg-rose-100 border-rose-400 text-rose-700"
                              : selected ? "bg-sky-600 border-sky-600 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                disabled={Object.values(forecast).some(v => !v) || !allViewed}
                onClick={handleSubmit}
                className={`w-full mt-4 py-3 rounded-xl font-bold transition-all shadow-md
                  ${Object.values(forecast).every(v => v) && allViewed
                    ? "bg-sky-600 hover:bg-sky-500 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
              >
                {submitted ? "Try Again →" : "Submit Forecast →"}
              </button>

              {submitted && !allRight && (
                <p className="text-xs text-rose-500 font-semibold text-center">
                  Not quite! Look at the readings again and try a different forecast.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
