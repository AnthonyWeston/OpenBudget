import { Injectable } from '@angular/core';
import { CategorizedExpenseData } from '../interfaces/categorized-expense-data';
import { Observable, from } from 'rxjs';
import { BudgetItem } from '../interfaces/budget-item';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenses: CategorizedExpenseData[] = [
    {
      'Rent & Utilities': [{ name: 'Rent', amount: 500 }, { name: 'Utilities', amount: 125 }]
    },
    {
      'Groceries & Food': [{ name: 'Groceries', amount: 250 }, { name: 'Eating out', amount: 50 }]
    },
    {
      'Medical': [{ name: 'Counseling', amount: 100 }]
    },
    {
      'Pet Supplies': [{ name: 'Cat litter', amount: 25 }, { name: 'Cat food', amount: 25 }]
    },
  ]

  constructor() { }

  getExpenses(): Observable<any> {
    return from(this.expenses);
  }

  addExpenses(expense: CategorizedExpenseData): void {
    this.expenses.push(expense);
  }

  getTotalExpenses(): Observable<number> {
    return from([this.expenses
      .map(expenseCategory => Object.values(expenseCategory))
      .reduce((allExpenses: BudgetItem[], expenses: BudgetItem[][]) => allExpenses.concat(expenses[0]), [])
      .reduce((sum: number, expense: BudgetItem) => sum += expense.amount, 0)
    ]);
  }
}
