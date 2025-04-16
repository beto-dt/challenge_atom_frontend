import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Guarda un valor en localStorage
   * @param key Clave bajo la cual se guardará el valor
   * @param value Valor a guardar (será convertido a JSON)
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  }

  /**
   * Recupera un valor desde localStorage
   * @param key Clave del valor a recuperar
   * @returns El valor deserializado o null si no existe
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error('Error recuperando de localStorage:', error);
      return null;
    }
  }

  /**
   * Elimina un valor de localStorage
   * @param key Clave del valor a eliminar
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
    }
  }
}
