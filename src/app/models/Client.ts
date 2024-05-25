export interface Client {
    name: string;
    email: string;
    phone: string;
    agreedToTermsAndConditions: boolean;
    consentForAdvertising: boolean;
    password?: string;  // Opcional, pois pode não ser necessário em todas as interações
    token?: string;     // Opcional, pode ser definido após o login
  }