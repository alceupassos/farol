/**
 * Utilitário para gerenciar cookie de autenticação TOTP
 * Cookie expira em 24 horas
 */

const TOTP_COOKIE_NAME = 'farol_totp_auth';
const TOTP_COOKIE_EXPIRY_HOURS = 24;

export const totpCookie = {
  /**
   * Define cookie de autenticação TOTP válido por 24h
   */
  set: (): void => {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + TOTP_COOKIE_EXPIRY_HOURS);
    
    document.cookie = `${TOTP_COOKIE_NAME}=authenticated; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    
    console.log('TOTP Cookie definido. Expira em:', expiryDate.toLocaleString('pt-BR'));
  },

  /**
   * Verifica se existe cookie TOTP válido
   */
  isValid: (): boolean => {
    const cookies = document.cookie.split(';');
    const totpCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${TOTP_COOKIE_NAME}=`)
    );
    
    return !!totpCookie;
  },

  /**
   * Remove cookie de autenticação TOTP
   */
  clear: (): void => {
    document.cookie = `${TOTP_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
    console.log('TOTP Cookie removido');
  },

  /**
   * Obtém tempo restante até expiração do cookie (em horas)
   */
  getTimeRemaining: (): number | null => {
    if (!totpCookie.isValid()) {
      return null;
    }

    // Cookies não fornecem tempo de expiração diretamente
    // Retornamos uma estimativa baseada em quando foi definido
    const cookieValue = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith(`${TOTP_COOKIE_NAME}=`));
    
    if (!cookieValue) return null;

    // Assumimos que o cookie foi definido recentemente
    // Em produção, você poderia armazenar o timestamp no valor do cookie
    return TOTP_COOKIE_EXPIRY_HOURS;
  }
};
