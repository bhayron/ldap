import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Company from 'App/Models/Company'

export default class CompanySeeder extends BaseSeeder {
  public async run() {
    await Company.create({
      id: 1,
      name: 'Simple Cycle Studio',
      responsible: 'Kaique Tavares',
    })
  }
}
