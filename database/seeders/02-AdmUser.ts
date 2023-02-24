import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Login from 'App/Models/Login'

export default class AdmUserSeeder extends BaseSeeder {
  public async run() {
    const adm = await Login.create({
      id: 1,
      email: 'bhayronklivilan@gmail.com',
      type: 'admin',
      password: 'secret123',
    })
    await adm.related('user').create({
      id: 1,
      name: 'Bhayron',
      lastname: 'Adm',
      sector: 'staff',
      phone: '63992712877',
      companyId: 1,
    })
    const standard = await Login.create({
      id: 2,
      email: 'bhayronklivilan@hotmail.com',
      type: 'standard',
      password: 'secret123',
    })
    await standard.related('user').create({
      id: 2,
      name: 'Bhayron',
      lastname: 'User',
      sector: 'staff',
      phone: '63992712877',
      companyId: 1,
    })
    const adm2 = await Login.create({
      id: 3,
      email: 'kaique.tavares@simplecyclestudio.com.br',
      type: 'admin',
      password: '102030Scs!',
    })
    await adm2.related('user').create({
      id: 3,
      name: 'Kaique',
      lastname: 'Adm',
      sector: 'staff',
      phone: '11997821999',
      companyId: 1,
    })
    const standard2 = await Login.create({
      id: 4,
      email: 'suporte@simplecyclestudio.com.br',
      type: 'standard',
      password: '102030Scs!',
    })
    await standard2.related('user').create({
      id: 4,
      name: 'Kaique',
      lastname: 'User',
      sector: 'staff',
      phone: '11997821999',
      companyId: 1,
    })
  }
}
