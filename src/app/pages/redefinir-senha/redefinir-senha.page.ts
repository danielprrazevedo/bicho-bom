import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/loginService';
import { LoginPage } from '../login/login.page';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.page.html',
  styleUrls: ['./redefinir-senha.page.scss'],
})
export class RedefinirSenhaPage {

  constructor(
    private toastCtrl: ToastController,
    private loginService: LoginService,
    private router: Router
    
  ) { }

    form: FormGroup;

   async resetPassword() {
    if (this.form.valid) {

      let toast = await this.toastCtrl.create({ 
        message: 'Sua solicitação foi enviada ao seu email',
        duration: 3000,
        position: 'bottom' });
      this.loginService.resetPassword(this.form.get('email').value)
        .then(() => {
         
        this.router.navigate['/login'];  
          
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            alert('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            alert('O usuário não foi encontrado.');
          }

          toast.present();
        });
    }
  }


  login(){
    this.router.navigate['/login'];  
  }

}
