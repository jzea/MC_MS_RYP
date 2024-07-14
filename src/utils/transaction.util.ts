import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export async function runInTransaction<T>(sequelize: Sequelize, work: (transaction: Transaction) => Promise<T>): Promise<T> {
  const transaction = await sequelize.transaction()
  try {
    const result = await work(transaction)
    await transaction.commit()
    return result
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
