import { ValidationRule } from '@/lib/types/form-config';

export class FormValidator {
  static validateField(value: unknown, rules: ValidationRule[]): string | null {
    for (const rule of rules) {
      const error = this.validateRule(value, rule);
      if (error) return error;
    }
    return null;
  }

  private static validateRule(value: unknown, rule: ValidationRule): string | null {
    switch (rule.type) {
      case 'required':
        return !value || (typeof value === 'string' && value.trim() === '') 
          ? rule.message : null;
      
      case 'minLength':
        return value && typeof value === 'string' && value.length < Number(rule.value) 
          ? rule.message : null;
      
      case 'maxLength':
        return value && typeof value === 'string' && value.length > Number(rule.value) 
          ? rule.message : null;
      
      case 'min':
        return value && Number(value) < Number(rule.value) 
          ? rule.message : null;
      
      case 'max':
        return value && Number(value) > Number(rule.value) 
          ? rule.message : null;
      
      case 'pattern':
        return value && typeof value === 'string' && !new RegExp(String(rule.value)).test(value) 
          ? rule.message : null;
      
      case 'custom':
        // Custom validation logic can be implemented here
        return null;
      
      default:
        return null;
    }
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
  }
}
