import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export type ValidationRule = {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
};

export class Validator {
  private errors: Record<string, string[]> = {};

  validate(data: any, rules: ValidationRule[]): boolean {
    this.errors = {};

    for (const rule of rules) {
      const value = data[rule.field];
      const fieldErrors: string[] = [];

      // Required validation
      if (rule.required && (value === undefined || value === null || value === '')) {
        fieldErrors.push(`${rule.field} is required`);
        this.errors[rule.field] = fieldErrors;
        continue;
      }

      // Skip other validations if value is not provided and not required
      if (!rule.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Type validation
      if (rule.type) {
        if (!this.validateType(value, rule.type)) {
          fieldErrors.push(`${rule.field} must be of type ${rule.type}`);
        }
      }

      // String validations
      if (rule.type === 'string' && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          fieldErrors.push(`${rule.field} must be at least ${rule.minLength} characters`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          fieldErrors.push(`${rule.field} must not exceed ${rule.maxLength} characters`);
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          fieldErrors.push(`${rule.field} has invalid format`);
        }
      }

      // Number validations
      if (rule.type === 'number' && typeof value === 'number') {
        if (rule.min !== undefined && value < rule.min) {
          fieldErrors.push(`${rule.field} must be at least ${rule.min}`);
        }
        if (rule.max !== undefined && value > rule.max) {
          fieldErrors.push(`${rule.field} must not exceed ${rule.max}`);
        }
      }

      // Email validation
      if (rule.type === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          fieldErrors.push(`${rule.field} must be a valid email address`);
        }
      }

      // Custom validation
      if (rule.custom) {
        const customResult = rule.custom(value);
        if (customResult !== true) {
          fieldErrors.push(
            typeof customResult === 'string' ? customResult : `${rule.field} validation failed`
          );
        }
      }

      if (fieldErrors.length > 0) {
        this.errors[rule.field] = fieldErrors;
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  private validateType(value: any, type: string): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'date':
        return value instanceof Date || !isNaN(Date.parse(value));
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      default:
        return true;
    }
  }

  getErrors(): Record<string, string[]> {
    return this.errors;
  }
}

/**
 * Middleware factory for request validation
 */
export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator();
    const isValid = validator.validate(req.body, rules);

    if (!isValid) {
      throw new AppError(400, 'Validation failed', true);
    }

    next();
  };
};

/**
 * Validation rules for Job Request
 */
export const jobRequestValidationRules: ValidationRule[] = [
  { field: 'title', required: true, type: 'string', minLength: 3, maxLength: 200 },
  { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 2000 },
  { field: 'priority', required: true, type: 'string', custom: (value) =>
    ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(value) || 'Priority must be LOW, MEDIUM, HIGH, or URGENT'
  },
  { field: 'departmentId', required: true, type: 'number', min: 1 },
  { field: 'locationId', required: false, type: 'number', min: 1 },
  { field: 'assetId', required: false, type: 'number', min: 1 },
  { field: 'costCenterId', required: false, type: 'number', min: 1 },
];
