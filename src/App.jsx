import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
  const [formData, setFormData] = useState({
    date: 'DD / MM / YYYY', timing: 'Dinner', occasion: 'Cocktail', location: 'Greater Noida', guest: '00 Pax',
    welcomeDrink: 'Sharbat in Silver Glasses', syrups: [], garnish: [],
    mixologist: 7, butlers: 4,
  });

  const [theme, setTheme] = useState('gold');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedList = [...formData[field]];
    if (checked) updatedList.push(value);
    else updatedList = updatedList.filter(item => item !== value);
    setFormData(prev => ({ ...prev, [field]: updatedList }));
  };

  const downloadPDF = () => {
    const capture = document.querySelector('#itinerary-render');
    capture.style.transform = "scale(1)";
    capture.style.boxShadow = "none";

    html2canvas(capture, { scale: 3, useCORS: true, logging: false }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
      doc.save(`Drink_Devils_${formData.occasion}_Premium.pdf`);
      capture.style.transform = "scale(0.65)";
      capture.style.boxShadow = "0 0 50px rgba(0,0,0,0.8)";
    });
  };

  const themeStyles = {
    gold: { bg: '#fffaf5', text: '#2d1b10', accent: '#d4af37', border: 'rgba(45, 27, 16, 0.15)', sub: '#8a766a', name: 'LUXURY GOLD' },
    dark: { bg: '#111111', text: '#ffffff', accent: '#d4af37', border: 'rgba(255, 255, 255, 0.1)', sub: '#888', name: 'MIDNIGHT PRO' },
    wine: { bg: '#2d0a0a', text: '#ffffff', accent: '#e6b8af', border: 'rgba(230, 184, 175, 0.2)', sub: '#b09590', name: 'ROYAL WINE' }
  };

  const currentStyle = themeStyles[theme];

  // Flower Ornament Component
  const CornerFlower = ({ style }) => (
    <svg style={{ position: 'absolute', width: '80px', height: '80px', opacity: 0.2, ...style }} viewBox="0 0 100 100">
      <path d="M50 0 C60 20 80 30 100 30 C80 40 60 50 50 100 C40 50 20 40 0 30 C20 30 40 20 50 0" fill={currentStyle.accent} />
      <circle cx="50" cy="45" r="5" fill={currentStyle.accent} />
    </svg>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#050505', color: '#fff', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. SIDEBAR (Glass Effect) */}
      <div style={{ width: '220px', background: 'rgba(20, 27, 45, 0.7)', backdropFilter: 'blur(10px)', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '30px 20px', background: 'linear-gradient(90deg, #ff5722, #f44336)', fontWeight: '900', textAlign: 'center', fontSize: '18px', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(255,87,34,0.3)' }}>DRINK DEVILS</div>
        <div style={{ flex: 1, marginTop: '20px' }}>
          <div style={sidebarActive}>📄 Test Panel</div>
          <div style={sidebarItem}>📋 History Log</div>
          {['Summaries', 'Settings'].map(item => <div key={item} style={sidebarItem}>› {item}</div>)}
        </div>
      </div>

      {/* 2. FORM PANEL */}
      <div style={{ width: '360px', background: '#0a0a0a', padding: '25px', borderRight: '1px solid #222', overflowY: 'auto' }}>
        <h3 style={labelStyle}>EVENT LOGISTICS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
          <input type="text" name="date" placeholder="Date (15 Oct 2026)" onChange={handleChange} style={inputStyle} />
          <select name="timing" onChange={handleChange} style={inputStyle}>
            <option>Select Timing</option>
            {['Lunch', 'Dinner', 'Cocktail Hours', 'Brunch'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="occasion" onChange={handleChange} style={inputStyle}>
            <option>Select Occasion</option>
            {['Wedding', 'Cocktail Party', 'Engagement'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <input type="text" name="location" placeholder="Venue Location" onChange={handleChange} style={inputStyle} />
          <input type="text" name="guest" placeholder="Pax Count" onChange={handleChange} style={inputStyle} />
        </div>

        <h3 style={labelStyle}>MENU CONCEPTS</h3>
        <div style={checkboxGroup}>
          {['Signature Cocktail', 'Classic Mocktail', 'Sharbat'].map(item => (
            <label key={item} style={checkboxLabel}><input type="checkbox" value={item} onChange={(e) => handleCheckboxChange(e, 'syrups')} /> {item}</label>
          ))}
        </div>

        <button onClick={downloadPDF} style={mainBtn}>DOWNLOAD PROPOSAL</button>
      </div>

      {/* 3. PREVIEW (The Masterpiece) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', overflow: 'auto', background: 'radial-gradient(circle, #111 0%, #000 100%)' }}>
        <div id="itinerary-render" style={{
          width: '210mm', height: '297mm',
          backgroundColor: currentStyle.bg, color: currentStyle.text,
          padding: '25mm 20mm', position: 'relative', transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundImage: theme === 'gold' ? 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' : 'none',
          boxShadow: '0 0 80px rgba(0,0,0,0.9)',
          transform: 'scale(0.65)', transformOrigin: 'top center',
          flexShrink: 0, boxSizing: 'border-box'
        }}>
          
          {/* Floral Ornaments */}
          <CornerFlower style={{ top: '10mm', left: '10mm' }} />
          <CornerFlower style={{ top: '10mm', right: '10mm', transform: 'rotate(90deg)' }} />
          <CornerFlower style={{ bottom: '10mm', left: '10mm', transform: 'rotate(-90deg)' }} />
          <CornerFlower style={{ bottom: '10mm', right: '10mm', transform: 'rotate(180deg)' }} />

          {/* Central Watermark */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '200px', fontWeight: '900', opacity: 0.03, pointerEvents: 'none', letterSpacing: '-10px' }}>DD</div>

          <header style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '10px', color: currentStyle.sub, marginBottom: '15px', fontWeight: 'bold' }}>PREMIUM EXPERIENCE</p>
            <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${currentStyle.accent}, transparent)`, width: '100%' }}></div>
            <h1 style={{ fontSize: '56px', fontWeight: '400', margin: '25px 0', letterSpacing: '1px', fontFamily: 'serif', textShadow: theme === 'gold' ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none' }}>Package Details</h1>
            <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${currentStyle.accent}, transparent)`, width: '100%' }}></div>
          </header>

          <section style={{ padding: '0 5mm' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { l: 'Event Date', v: formData.date || '---' },
                  { l: 'Service Timing', v: formData.timing },
                  { l: 'Function Type', v: formData.occasion },
                  { l: 'Event Venue', v: formData.location || '---' },
                  { l: 'Estimated Pax', v: formData.guest || '0' }
                ].map((item, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${currentStyle.border}` }}>
                    <td style={{ padding: '22px 0', fontSize: '12px', color: currentStyle.sub, textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '700' }}>{item.l}</td>
                    <td style={{ padding: '22px 0', textAlign: 'right', fontWeight: '700', fontSize: '24px', fontFamily: 'serif' }}>{item.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div style={{ marginTop: '60px', display: 'flex', gap: '50px', padding: '0 5mm' }}>
             <div style={{ flex: 1.2, padding: '20px', borderLeft: `3px solid ${currentStyle.accent}`, background: 'rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', color: currentStyle.accent }}>The Bar Menu</h4>
                <p style={{ fontSize: '18px', color: currentStyle.text }}><strong>Selection:</strong> {formData.syrups.join(', ') || '---'}</p>
                <p style={{ fontSize: '18px', marginTop: '10px' }}><span style={{ opacity: 0.6 }}>Welcome:</span> {formData.welcomeDrink}</p>
             </div>
             <div style={{ flex: 0.8, padding: '20px' }}>
                <h4 style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', color: currentStyle.accent }}>Personnel</h4>
                <p style={{ fontSize: '22px', fontWeight: '700' }}>{formData.mixologist} Mixologists</p>
                <p style={{ fontSize: '22px', fontWeight: '700', opacity: 0.8 }}>{formData.butlers} Prof. Butlers</p>
             </div>
          </div>
          
          <footer style={{ position: 'absolute', bottom: '20mm', left: '20mm', right: '20mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ fontSize: '10px', color: currentStyle.sub, letterSpacing: '2px', fontWeight: 'bold' }}>DRINK DEVILS LUXURY SERVICES</div>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '2px', opacity: 0.8 }}>DRINK DEVILS</div>
                <div style={{ height: '4px', width: '50px', background: currentStyle.accent, marginLeft: 'auto' }}></div>
             </div>
          </footer>
        </div>
      </div>

      {/* 4. STYLE SELECTOR */}
      <div style={{ width: '240px', background: '#0a0a0a', padding: '25px', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={labelStyle}>COLOUR PALETTE</p>
        {Object.keys(themeStyles).map(t => (
          <div key={t} onClick={() => setTheme(t)} style={{
            ...themeCard, backgroundColor: themeStyles[t].bg, border: theme === t ? `2px solid ${themeStyles[t].accent}` : '1px solid #222',
            boxShadow: theme === t ? `0 0 20px ${themeStyles[t].accent}44` : 'none', transform: theme === t ? 'translateX(-5px)' : 'none'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
               <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: themeStyles[t].accent, border: '2px solid rgba(0,0,0,0.1)' }}></div>
               <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: themeStyles[t].text, opacity: 0.5 }}></div>
            </div>
            <span style={{ color: theme === 'gold' ? '#2d1b10' : '#fff', fontSize: '11px', fontWeight: '900' }}>{themeStyles[t].name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal CSS Styles
const sidebarItem = { padding: '16px 25px', fontSize: '14px', cursor: 'pointer', color: '#666', transition: '0.3s' };
const sidebarActive = { ...sidebarItem, background: 'rgba(255,87,34,0.1)', color: '#ff5722', borderLeft: '4px solid #ff5722', fontWeight: 'bold' };
const inputStyle = { width: '100%', backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '14px', outline: 'none', transition: '0.3s' };
const labelStyle = { fontSize: '11px', color: '#d4af37', fontWeight: '900', letterSpacing: '3px', marginBottom: '15px' };
const checkboxGroup = { display: 'flex', flexDirection: 'column', gap: '10px', background: '#050505', padding: '15px', borderRadius: '12px', border: '1px solid #222' };
const checkboxLabel = { fontSize: '13px', color: '#888', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' };
const mainBtn = { marginTop: '20px', padding: '20px', borderRadius: '15px', border: 'none', backgroundColor: '#d4af37', color: '#000', fontWeight: '900', fontSize: '14px', cursor: 'pointer', width: '100%', boxShadow: '0 10px 30px rgba(212,175,55,0.3)', transition: '0.3s' };
const themeCard = { padding: '20px', borderRadius: '18px', cursor: 'pointer', transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)' };

export default App;