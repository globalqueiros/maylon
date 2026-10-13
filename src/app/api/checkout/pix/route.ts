// src/app/api/checkout/pix/route.ts
import { NextResponse } from 'next/server';
import { gerarQrCodePix } from '../../../../lib/btgServices';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await gerarQrCodePix(body);
    
    if (result.sucesso) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ erro: result.erro }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ erro: 'Erro interno no servidor' }, { status: 500 });
  }
}