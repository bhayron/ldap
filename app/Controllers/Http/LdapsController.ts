import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ldap from 'ldapjs'

export default class LdapsController {


  public async index({ }: HttpContextContract) {

    function authenticateDN(username: string, password: string) {

      var client = ldap.createClient({
        url: 'ldap://177.84.108.75:60389'
      });
      var opts = {
        filter: '(objectClass=*)',
        scope: 'sub',
        attributes: ['sn']
      };

      client.bind(username, password, function (err) {
        if (err) {
          console.log("Error in new connetion " + err)
        } else {
          console.log("Success");
          client.search('ou=users,ou=system', opts, function (err, res) {
            if (err) {
              console.log("Error in search " + err)
            } else {
              res.on('searchEntry', function (entry) {
                console.log('entry: ' + JSON.stringify(entry.object));
              });
              res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
              });
              res.on('error', function (err) {
                console.error('error: ' + err.message);
              });
              res.on('end', function (result) {
                console.log('status: ' + result.status);
              });
            }


          });
        }
      });
    }

    authenticateDN("uid=administrador, ou=administrador", "#850017Ti!@2023$123")

    return { api: 'Bhayron Lindo' }
  }


}
