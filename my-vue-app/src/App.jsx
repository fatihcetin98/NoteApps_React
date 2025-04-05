import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/searchbar';

function App() {
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('notlar1');
  const [notes, setNotes] = useState({
    notlar1: [],
    notlar2: [],
    notlar3: [],
    notlar4: [],
    notlar5: [],
  });

  const colorOptions = [
    { key: 'notlar1', color: 'rgba(70, 130, 180, 0.85)', label: 'Mavi' },
    { key: 'notlar2', color: 'rgba(220, 20, 60, 0.85)', label: 'Kırmızı' },
    { key: 'notlar3', color: 'rgba(138, 43, 226, 0.85)', label: 'Mor' },
    { key: 'notlar4', color: 'rgba(255, 215, 0, 0.85)', label: 'Sarı' },
    { key: 'notlar5', color: 'rgba(60, 179, 113, 0.85)', label: 'Yeşil' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (note.trim() === '') return;

    setNotes((prev) => ({
      ...prev,
      [selectedSection]: [...prev[selectedSection], note],
    }));

    setNote('');
  };

  const filteredNotes = {};
  for (const key in notes) {
    filteredNotes[key] = notes[key].filter((n) =>
      n.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="app-container">
    <h1 className="app-title">NotesApp</h1>

    <div className="searchbar-wrapper">
      <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
    </div>

      <div className="note-input-container">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notunuzu yazın..."
          rows={4}
          className="note-textarea"
        />

        <div className="color-selector">
          {colorOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedSection(opt.key)}
              className={`color-button ${selectedSection === opt.key ? 'selected' : ''}`}
              style={{ backgroundColor: opt.color }}
              title={`Not Alanı (${opt.label})`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="save-button"
        onMouseOver={(e) => {
          e.currentTarget.classList.add('hovered');
        }}
        onMouseOut={(e) => {
          e.currentTarget.classList.remove('hovered');
        }}
      >
        Kaydet
      </button>

      <div className="note-sections">
        {colorOptions.map((opt, i) => (
          <div key={opt.key}>
            <h2 className="section-header" style={{ backgroundColor: opt.color }}>
              Not Alanı {i + 1}
            </h2>
            {filteredNotes[opt.key].map((n, idx) => (
              <div
                key={idx}
                className="note"
                style={{ backgroundColor: opt.color, borderColor: opt.color }}
              >
                {n}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
