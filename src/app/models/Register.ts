export interface Register {

  name: string;
  email: string;
  password: string;
  phone?: string;
  agreedToTermsAndConditions: boolean;
  consentForAdvertising: boolean;
    
  }