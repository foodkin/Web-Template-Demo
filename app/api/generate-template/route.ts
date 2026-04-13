import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pages, theme } = await req.json();

    if (!pages?.length || !theme) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pagesDescription = pages
      .map((p: { name: string; detail: string }) =>
        `- Halaman "${p.name}": ${p.detail || 'Konten umum untuk halaman ini'}`
      )
      .join('\n');

    const prompt = `Kamu adalah ahli web designer. Buat sebuah landing page HTML yang LENGKAP, INDAH, dan PROFESIONAL.

TEMA WEBSITE: ${theme}

HALAMAN / SECTION YANG HARUS ADA (tampilkan sebagai section scrollable dalam satu halaman):
${pagesDescription}

INSTRUKSI PENTING:
1. Buat dalam SATU file HTML yang lengkap (include semua CSS inline dalam <style> tag)
2. Desain harus MODERN, PREMIUM, dan menarik
3. Gunakan warna yang sesuai dengan tema
4. Tambahkan smooth scrolling, hover effects, dan animasi halus
5. Navbar sticky dengan link ke setiap section
6. Setiap section harus memiliki konten placeholder yang relevan dengan tema
7. Footer yang informatif
8. Fully responsive (mobile-friendly)
9. JANGAN gunakan gambar eksternal (gunakan gradient/SVG/CSS shapes sebagai pengganti)
10. Return HANYA kode HTML valid, TANPA penjelasan, TANPA markdown, TANPA backtick

Mulai langsung dengan <!DOCTYPE html>`;

    const apiKey = process.env.GROQ_API_KEY

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 8192,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    console.log('Groq response status:', response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq error:', response.status, err);
      return NextResponse.json({ error: `AI error: ${response.status} - ${err}` }, { status: 500 });
    }

    const data = await response.json();
    let html = data.choices?.[0]?.message?.content ?? '';

    // Bersihkan kalau ada markdown backtick
    html = html.replace(/^```html\n?/, '').replace(/^```\n?/, '').replace(/\n?```$/, '').trim();

    return NextResponse.json({ html });
  } catch (err) {
    console.error('Generate template error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}