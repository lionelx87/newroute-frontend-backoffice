import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatePhone(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null =>  {
        const { value } = control;
        const regex = new RegExp("^[0-9,]*$");
        const hasPhones = regex.test(value);
        return !hasPhones ? { validPhones: true } : null;
    }
}