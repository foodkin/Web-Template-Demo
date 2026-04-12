import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pages, theme } = await req.json();

    if (!pages?.length || !theme) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pagesDescription = pages
      .map(
        (p: { name: string; detail: string }) =>
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 8192,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }

    const data = await response.json();
    const html = data.content?.[0]?.text ?? '';

    return NextResponse.json({ html });
  } catch (err) {
    console.error('Generate template error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
