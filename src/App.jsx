import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
  const [formData, setFormData] = useState({
    date: 'DD / MM / YYYY',
    timing: 'Dinner',
    occasion: 'Cocktail',
    location: 'Greater Noida',
    guest: '00',
    welcomeDrink: 'Sharbat in Silver Glasses',
    syrups: [], // Multiple select array
    garnish: [], // Multiple select array
    mixologist: 7,
    butlers: 4,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Multi-select Checkbox Logic
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedList = [...formData[field]];
    if (checked) {
      updatedList.push(value);
    } else {
      updatedList = updatedList.filter(item => item !== value);
    }
    setFormData(prev => ({ ...prev, [field]: updatedList }));
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

  const WavyLine = () => (
    <svg width="100%" height="15" viewBox="0 0 500 20" preserveAspectRatio="none">
      <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10" 
            fill="transparent" stroke="#2d1b10" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0a0a0a', color: '#fff', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* LEFT: THE CONTROL CENTER */}
      <div style={{ width: '400px', background: '#111', padding: '30px', borderRight: '1px solid #333', overflowY: 'auto' }}>
        <h1 style={{ color: '#d4af37', fontSize: '28px', fontWeight: '900', margin: '0 0 20px 0' }}>DRINK DEVILS</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Section 1: Logistics */}
          <div>
            <p style={labelStyle}>EVENT LOGISTICS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" name="date" placeholder="Event Date" onChange={handleChange} style={inputStyle} />
              
              <select name="timing" onChange={handleChange} style={inputStyle}>
                <option value="">Select Timing</option>
                {['Lunch', 'Dinner', 'Breakfast', 'Brunch', 'Party', 'High Tea'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select name="occasion" onChange={handleChange} style={inputStyle}>
                <option value="">Select Occasion</option>
                {['Haldi', 'Sundowner', 'Cocktail', 'Birthday', 'Anniversary', 'Wedding'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>

              <input type="text" name="location" placeholder="Venue/Location" onChange={handleChange} style={inputStyle} />
              <input type="text" name="guest" placeholder="Guest Count (Pax)" onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          {/* Section 2: Syrups (Multi-Select) */}
          <div>
            <p style={labelStyle}>SYRUPS / DRINK TYPES</p>
            <div style={checkboxGroupStyle}>
              {['Signature Cocktail', 'Signature Mocktail', 'Classic Cocktail', 'Classic Mocktail', 'Sharbat'].map(item => (
                <label key={item} style={checkboxLabelStyle}>
                  <input type="checkbox" value={item} onChange={(e) => handleCheckboxChange(e, 'syrups')} /> {item}
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Garnish */}
          <div>
            <p style={labelStyle}>GARNISH / ADD-ONS</p>
            <div style={checkboxGroupStyle}>
              {['Dehydrated Fruits', 'Fresh Herbs', 'Edible Flowers', 'Salt/Sugar Rim', 'Smoke Effect'].map(item => (
                <label key={item} style={checkboxLabelStyle}>
                  <input type="checkbox" value={item} onChange={(e) => handleCheckboxChange(e, 'garnish')} /> {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p style={labelStyle}>STAFF</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" name="mixologist" placeholder="Bartenders" onChange={handleChange} style={inputStyle} />
              <input type="number" name="butlers" placeholder="Butlers" onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <button onClick={downloadPDF} style={mainBtn}>GENERATE PREMIUM PDF</button>
        </div>
      </div>

      {/* RIGHT: THE LUXURY PREVIEW */}
      <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', overflowY: 'auto' }}>
        <div id="itinerary-render" style={{
          width: '595px', height: '842px', backgroundColor: '#fffaf5', color: '#2d1b10',
          padding: '60px', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")'
        }}>
          
          <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '12px', letterSpacing: '6px', color: '#888', marginBottom: '10px' }}>OFFICIAL PROPOSAL</h2>
            <WavyLine />
            <h1 style={{ fontSize: '42px', fontWeight: '300', fontFamily: 'serif', margin: '10px 0' }}>Package Details</h1>
            <WavyLine />
          </header>

          <section style={{ marginBottom: '40px' }}>
            <table style={{ width: '100%', fontSize: '16px', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Date', val: formData.date },
                  { label: 'Timing', val: formData.timing },
                  { label: 'Occasion', val: formData.occasion },
                  { label: 'Location', val: formData.location },
                  { label: 'Pax (Guests)', val: formData.guest }
                ].map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(45, 27, 16, 0.1)' }}>
                    <td style={{ padding: '12px 0', color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '2px' }}>{item.label}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>{item.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h3 style={sectionHead}>Bar Itinerary & Concept</h3>
              <p style={{ fontSize: '15px', marginTop: '10px' }}><strong>Syrups:</strong> {formData.syrups.join(', ') || 'None selected'}</p>
              <p style={{ fontSize: '15px' }}><strong>Garnish:</strong> {formData.garnish.join(', ') || 'None selected'}</p>
              <p style={{ fontSize: '15px' }}><strong>Welcome Drink:</strong> {formData.welcomeDrink}</p>
            </div>

            <div>
              <h3 style={sectionHead}>Execution Team</h3>
              <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
                <p style={{ margin: 0 }}><strong>{formData.mixologist}</strong> Mixologists</p>
                <p style={{ margin: 0 }}><strong>{formData.butlers}</strong> Professional Butlers</p>
              </div>
            </div>
          </div>

          <footer style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '10px', color: '#888' }}>© 2026 DRINK DEVILS LUXURY<br />CONFIDENTIAL DOCUMENT</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>DRINK DEVILS</div>
              <div style={{ height: '3px', background: '#d4af37', width: '30px', marginLeft: 'auto' }}></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Internal Styles
const inputStyle = { width: '100%', backgroundColor: '#222', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '14px', outline: 'none' };
const labelStyle = { fontSize: '10px', color: '#d4af37', fontWeight: '800', letterSpacing: '2px', marginBottom: '8px' };
const checkboxGroupStyle = { display: 'flex', flexDirection: 'column', gap: '5px', background: '#1a1a1a', padding: '10px', borderRadius: '8px' };
const checkboxLabelStyle = { fontSize: '12px', color: '#ccc', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' };
const mainBtn = { marginTop: '10px', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#d4af37', color: '#000', fontWeight: '900', fontSize: '14px', cursor: 'pointer' };
const sectionHead = { fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', borderBottom: '2px solid #d4af37', display: 'inline-block', paddingBottom: '5px' };

export default App;