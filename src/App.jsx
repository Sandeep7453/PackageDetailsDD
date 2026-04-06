import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
  const [formData, setFormData] = useState({
    date: 'DD / Month / Year',
    occasion: 'Wedding',
    location: 'Greator Noida',
    guest: 'no. of guest',
    welcomeDrink: 'Sharbat in Silver Glasses',
    mixologist: 7,
    butlers: 4,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const downloadPDF = () => {
    const capture = document.querySelector('#itinerary-render');
    html2canvas(capture, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
      doc.save(`Drink_Devils_${formData.occasion}.pdf`);
    });
  };

  // Wavy Border SVG Component
  const WavyLine = () => (
    <svg width="100%" height="20" viewBox="0 0 500 20" preserveAspectRatio="none">
      <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10" 
            fill="transparent" stroke="#2d1b10" strokeWidth="2" />
    </svg>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0d0d0d', color: '#fff', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* LEFT: THE CONTROL CENTER */}
      <div style={{ width: '380px', background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)', padding: '40px 30px', borderRight: '1px solid #333', boxShadow: '10px 0 30px rgba(0,0,0,0.5)', overflowY: 'auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#d4af37', fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', margin: 0 }}>DRINK DEVILS</h1>
          <p style={{ color: '#555', fontSize: '11px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Operations Portal v2.0</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={labelStyle}>EVENT LOGISTICS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" name="date" placeholder="Event Date (e.g. 11th April)" onChange={handleChange} style={inputStyle} />
              <input type="text" name="location" placeholder="Venue/Location" onChange={handleChange} style={inputStyle} />
              <input type="number" name="guest" placeholder="Guest Count (Pax)" onChange={handleChange} style={inputStyle} />
              <select name="occasion" onChange={handleChange} style={inputStyle}>
                <option value="Wedding">Wedding</option>
                <option value="Cocktail">Cocktail</option>
                <option value="Corporate">Corporate</option>
              </select> 
            </div>
          </div>

          <div>
            <p style={labelStyle}>MENU DETAILS</p>
            <textarea name="welcomeDrink" placeholder="Describe Welcome Drinks..." onChange={handleChange} style={{ ...inputStyle, height: '90px', resize: 'none' }} />
          </div>

          <div>
            <p style={labelStyle}>STAFFING ENGINE</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={statBox}>
                <span style={statLabel}>BARTENDERS</span>
                <input type="number" name="mixologist" value={formData.mixologist} onChange={handleChange} style={statInput} />
              </div>
              <div style={statBox}>
                <span style={statLabel}>BUTLERS</span>
                <input type="number" name="butlers" value={formData.butlers} onChange={handleChange} style={statInput} />
              </div>
            </div>
          </div>

          <button onClick={downloadPDF} style={mainBtn}>DOWNLOAD ITINERARY</button>
        </div>
      </div>

      {/* RIGHT: THE LUXURY PREVIEW */}
      <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', overflowY: 'auto' }}>
        <div id="itinerary-render" style={{
          width: '595px', height: '842px', backgroundColor: '#fffaf5', color: '#2d1b10',
          padding: '60px', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")'
        }}>
          
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid rgba(45, 27, 16, 0.05)', pointerEvents: 'none' }}></div>

          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '14px', letterSpacing: '6px', color: '#888', marginBottom: '10px' }}>PROPOSAL</h2>
            
            <WavyLine />
            <h1 style={{ fontSize: '42px', fontWeight: '300', fontFamily: 'serif', margin: '10px 0', padding: '0 40px' }}>Package Details</h1>
            <WavyLine />
          </header>

          <section style={{ marginBottom: '60px', padding: '0 20px' }}>
            <table style={{ width: '100%', fontSize: '18px', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Date', key: 'date' },
                  { label: 'Occasion', key: 'occasion' },
                  { label: 'Location', key: 'location' },
                  { label: 'Guest', key: 'guest' }
                ].map((item) => (
                  <tr key={item.key} style={{ borderBottom: '1px solid rgba(45, 27, 16, 0.1)' }}>
                    <td style={{ padding: '15px 0', color: '#888', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px' }}>{item.label}</td>
                    <td style={{ padding: '15px 0', textAlign: 'right', fontWeight: '600' }}>{formData[item.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div style={{ display: 'flex', gap: '40px', padding: '0 20px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={sectionHead}>Bar Itinerary</h3>
              <p style={{ fontSize: '17px', lineHeight: '1.6', marginTop: '15px' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>Welcome:</span> {formData.welcomeDrink}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={sectionHead}>The Team</h3>
              <div style={{ marginTop: '15px' }}>
                <p style={{ margin: '5px 0', fontSize: '17px' }}><strong>{formData.mixologist}</strong> Expert Mixologists</p>
                <p style={{ margin: '5px 0', fontSize: '17px' }}><strong>{formData.butlers}</strong> Professional Butlers</p>
              </div>
            </div>
          </div>

          <footer style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '11px', color: '#888', lineHeight: '1.5' }}>
              © 2026 DRINK DEVILS LUXURY<br />PRIVATE & CONFIDENTIAL
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>DRINK DEVILS</div>
              <div style={{ height: '3px', background: '#d4af37', width: '40px', marginLeft: 'auto' }}></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = { width: '100%', backgroundColor: '#252525', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', outline: 'none' };
const labelStyle = { fontSize: '11px', color: '#d4af37', fontWeight: '800', letterSpacing: '2px', marginBottom: '8px' };
const statBox = { flex: 1, backgroundColor: '#252525', padding: '12px', borderRadius: '10px', border: '1px solid #333', textAlign: 'center' };
const statLabel = { display: 'block', fontSize: '9px', color: '#555', fontWeight: 'bold', marginBottom: '5px' };
const statInput = { background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', width: '100%', outline: 'none' };
const mainBtn = { marginTop: '10px', padding: '16px', borderRadius: '10px', border: 'none', backgroundColor: '#d4af37', color: '#000', fontWeight: '900', fontSize: '14px', cursor: 'pointer' };
const sectionHead = { fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', borderBottom: '2px solid #d4af37', display: 'inline-block', paddingBottom: '5px', color: '#888' };

export default App;