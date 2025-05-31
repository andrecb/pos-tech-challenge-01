export class BalanceService {
  private static instance: BalanceService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = '/api/balance';
  }

  public static getInstance(): BalanceService {
    if (!BalanceService.instance) {
      BalanceService.instance = new BalanceService();
    }
    return BalanceService.instance;
  }

  public async getBalance(): Promise<number> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Erro ao buscar saldo');
      }
      const data = await response.json();
      return data.totalAmount;
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
      throw error;
    }
  }
} 