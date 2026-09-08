const fs = require('fs');

async function testUpload() {
  const formData = new FormData();
  // We can use a Blob or File. In Node 18+, FormData is built-in.
  const blob = new Blob(['hello world'], { type: 'text/plain' });
  formData.append('file', blob, 'test.txt');

  try {
    const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    console.log('Status:', res.status);
    console.log('Body:', await res.text());
  } catch(e) {
    console.error('Error:', e);
  }
}

testUpload();
