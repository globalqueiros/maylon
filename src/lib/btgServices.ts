// src/lib/btgService.ts
import axios from 'axios';
import { db } from './db'; 

const BTG_API_BASE_URL = 'https://api.empresas.btgpactual.com';

export const obterAccessTokenValido = async () => {
  try {
    const [rows]: any = await db.query('SELECT * FROM btg_tokens ORDER BY created_at DESC LIMIT 1');
    const token = rows?.[0];
    
    if (!token) {
      throw new Error('Tabela tb_tokens_btg está vazia (nenhum token encontrado).');
    }

    const dataCriacao = token.createdAt || token.created_at;
    const tempoExpiracao = token.expiresIn || token.expires_in;

    if (dataCriacao && tempoExpiracao) {
      const expirado = Date.now() - new Date(dataCriacao).getTime() > (tempoExpiracao * 1000);
      if (expirado) {
        throw new Error('Token BTG encontrado no banco, mas já está expirado.');
      }
    }

    return {
      accessToken: token.accessToken || token.access_token
    };
  } catch (error: any) {
    console.error('❌ [BTG Service] Erro real no BD:', error);
    // Agora mostra o motivo exato se der erro de SQL, coluna ou expiração:
    throw new Error(`Erro no BD: ${error.message}`);
  }
};

export const gerarQrCodePix = async (chargeInfo: any) => {
  const { amount, debtor, description } = chargeInfo;

  try {
    const token = await obterAccessTokenValido();
    const valorParaBTG = Number(amount).toFixed(2);

    const companyId = process.env.BTG_COMPANY_ID;
    const pixKey = process.env.BTG_PIX_KEY;

    if (!companyId || !pixKey) {
      throw new Error('Variáveis BTG_COMPANY_ID ou BTG_PIX_KEY não definidas no .env');
    }

    const chargeData = {
      pixKey: pixKey,
      expiresIn: 3600,
      amount: {
        original: valorParaBTG,
        allowCustomerChangeValue: false
      },
      displayText: description || 'Pagamento Maylon Pass',
      payer: {
        name: debtor?.name || "Cliente Maylon",
        taxId: String(debtor?.document || "12345678909").replace(/\D/g, '') // Apenas números
      }
    };

    console.log('🚀 [BTG Service] Enviando payload Pix:', chargeData);

    const response = await axios.post(
      `${BTG_API_BASE_URL}/v1/companies/${companyId}/pix-cash-in/instant-collections`,
      chargeData,
      {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ [BTG Service] Resposta bruta do BTG:', response.data);

    // Captura o EMV independente de onde o BTG o posicione no JSON
    const codigoEmv = 
      response.data?.emv || 
      response.data?.pixCopiaECola || 
      response.data?.detail?.emv || 
      response.data?.qrCode?.emv || 
      "";

    return {
      sucesso: true,
      dados: response.data,
      qrcode: codigoEmv,
      emv: codigoEmv,
      txid: response.data?.txid || response.data?.id,
      status: response.data?.status
    };

  } catch (error: any) {
    const detalhesErro = error.response?.data || error.message;
    console.error('❌ [BTG Service] Erro ao criar cobrança Pix:', detalhesErro);
    return {
      sucesso: false,
      erro: 'Falha ao criar cobrança Pix',
      detalhes: detalhesErro
    };
  }
};